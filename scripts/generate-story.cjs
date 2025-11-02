#!/usr/bin/env node
/*
  Generates src/data/generatedStoryNodes.ts from all Markdown nodes under story/ (recursive).
  Node-only, no external deps. Metadata is a JSON object inside an HTML comment at the top of each file.
*/
const fs = require('fs');
const path = require('path');

const STORY_DIR = path.resolve(__dirname, '..', 'story');
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'generatedStoryNodes.ts');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full));
    else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) {
      if (e.name.toLowerCase() === 'readme.md') continue; // ignore docs
      files.push(full);
    }
  }
  return files;
}

function readNode(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let meta = {};
  let body = raw;
  const start = raw.indexOf('<!--');
  const end = raw.indexOf('-->');
  if (start === 0 && end > start) {
    const jsonText = raw.slice(start + 4, end).trim();
    try {
      meta = JSON.parse(jsonText || '{}');
    } catch (e) {
      throw new Error(`Invalid JSON metadata in ${filePath}: ${e.message}`);
    }
    body = raw.slice(end + 3).trimStart();
  }
  return { meta, body };
}

function deriveKeyFromPath(rel) {
  const noExt = rel.replace(/\.md$/i, '');
  return noExt
    .split(path.sep)
    .map(seg => seg.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, ''))
    .filter(Boolean)
    .join('__');
}

function escapeJsString(s) {
  return JSON.stringify(s);
}

function main() {
  if (!fs.existsSync(STORY_DIR)) {
    console.error(`Story directory not found: ${STORY_DIR}`);
    process.exit(1);
  }
  const files = walk(STORY_DIR);
  // Pass 1: map file -> key
  const toRel = f => path.relative(STORY_DIR, f);
  const fileToKey = new Map();
  for (const f of files) {
    const rel = toRel(f);
    const { meta } = readNode(f);
    const key = meta.key || deriveKeyFromPath(rel);
    fileToKey.set(rel, key);
  }

  // Pass 2: build nodes
  const nodes = [];
  for (const f of files) {
    const rel = toRel(f);
    const { meta, body } = readNode(f);
    const key = meta.key || deriveKeyFromPath(rel);
    const id = meta.id || key;
    const requiresName = !!meta.requiresName;
    const imagePath = meta.imagePath === undefined ? null : meta.imagePath;
    let diceCheck = meta.diceCheck || undefined;
    if (diceCheck && typeof diceCheck === 'object') {
      const dc = { ...diceCheck };
      for (const k of ['success', 'fail']) {
        if (typeof dc[k] === 'string' && dc[k].toLowerCase().endsWith('.md')) {
          const targetRel = path.relative(STORY_DIR, path.resolve(path.dirname(path.join(STORY_DIR, rel)), dc[k]));
          const resolved = fileToKey.get(targetRel);
          if (resolved) dc[k] = resolved;
        }
      }
      diceCheck = dc;
    }
    let choices = Array.isArray(meta.choices) ? meta.choices : undefined;
    if (choices) {
      choices = choices.map(ch => {
        let next = ch.next;
        if (typeof next === 'string' && next.toLowerCase().endsWith('.md')) {
          const targetRel = path.relative(STORY_DIR, path.resolve(path.dirname(path.join(STORY_DIR, rel)), next));
          const resolved = fileToKey.get(targetRel);
          next = resolved || ch.next;
        }
        return { text: String(ch.text || ''), next: String(next || '') };
      });
    }

    const hasPlayerName = body.includes('PLAYERNAME');
    const textExpr = hasPlayerName
      ? `((playerName) => ${escapeJsString(body)}.replace(/PLAYERNAME/g, String(playerName)))`
      : `${escapeJsString(body)}`;

    nodes.push({ key, code: `  ${JSON.stringify(key)}: {
    id: ${escapeJsString(id)},
    text: ${textExpr},
    ${requiresName ? 'requiresName: true,' : ''}
    ${diceCheck ? `diceCheck: ${JSON.stringify(diceCheck)},` : ''}
    ${choices ? `choices: ${JSON.stringify(choices)},` : ''}
    imagePath: ${imagePath === null ? 'null' : escapeJsString(String(imagePath))},
  }` });
  }

  const sorted = nodes.sort((a, b) => a.key.localeCompare(b.key));
  const entries = sorted.map(n => n.code).join(',\n');
  const out = `/* AUTO-GENERATED. Do not edit by hand. */\nimport type { StoryNode } from './storyNodes';\n\nexport const generatedStoryNodes: Record<string, StoryNode> = {\n${entries}\n};\n`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, out, 'utf8');
  console.log(`Wrote ${OUT_FILE} with ${nodes.length} nodes.`);
}

main();
