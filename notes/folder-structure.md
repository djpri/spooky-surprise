# Story Folder Structure — Source of Truth and Generation

This document defines exactly how to organize the `story/` folder and generate the runtime story graph used by the app. Follow these rules and steps when adding or editing story content.

## Overview

- Author your narrative nodes as Markdown files under `story/`.
- A generator scans `story/**/*.md` and emits `src/data/generatedStoryNodes.ts` (typed `StoryNode`).
- The app consumes this generated map via `src/data/storyNodes.ts` (re-export). Do not edit the generated file by hand.

## Required Top-Level Layout

- Root entry: `story/prologue.md` — the first node the game loads.
  - Must have exactly three choices that link to the three branches:
    - `./faith/start.md`
    - `./reflection/start.md`
    - `./corruption/start.md`
- Branch roots:
  - `story/faith/start.md`
  - `story/reflection/start.md`
  - `story/corruption/start.md`
- Deeper structure mirrors the state tree, grouped in readable directories (hyphen‑separated slugs), e.g.:
  - `story/faith/village-at-dusk/...`
  - `story/reflection/chamber-of-glass/...`
  - `story/corruption/beneath-the-altar/...`

## Node File Format (every .md node)

- The file must begin at byte 0 with an HTML comment containing a JSON object. Example:
  <!--
  {
    "key": "optionalStableKey",
    "id": "Readable Title",
    "requiresName": false,
    "imagePath": null,
    "diceCheck": { "stat": "insight", "target": 14, "success": "./success-node.md", "fail": "./fail-node.md" },
    "choices": [
      { "text": "Choice A", "next": "./path/to/node-a.md" },
      { "text": "Choice B", "next": "someExistingKey" }
    ]
  }
  -->
- After the comment, the Markdown body is the narrative text for the node.
- Special token: writing `PLAYERNAME` in the body generates a text function at runtime that replaces it with the player’s name.

### JSON fields

- `key` (string, optional): Stable key to reference this node. If omitted, the generator derives a unique key from the file path.
- `id` (string, required): Human‑readable chapter/title shown in the UI.
- `requiresName` (boolean, optional): If true, the UI asks for the player’s name at this node.
- `imagePath` (string|null, optional): Background image path or `null`. Safe to leave `null` unless you have an asset.
- `diceCheck` (object, optional): `{ stat, target, success, fail }`.
  - `stat` (string): One of: `fortitude`, `insight`, `presence`, `reason`, `will`, `ritual`, `mercy`.
  - `target` (number): DC for a d20 roll.
  - `success` and `fail` (string): Either a key or a relative `.md` path; the generator resolves `.md` paths to keys.
- `choices` (array, optional on endings): Each item is `{ text, next }`.
  - `next` may be a key or a relative `.md` path; the generator resolves paths to keys.

## Branch and Choice Rules

- Non‑terminal nodes MUST present at least two choices.
- Terminal nodes (endings) MUST present zero choices.
  - Endings should include “Ending — …” at the start of `id` and align with `notes/endings.md` tone tags.
- Use `diceCheck` where tension is warranted; the result routes to follow‑up nodes or endings.
- For the Reflection branch, Mr. Harriot’s scene is non‑terminal: trading glaze should return to the branch or onward scenes, not end the story.

## Naming and Paths

- Use lower‑kebab‑case for directories and filenames (e.g., `chamber-of-glass/mirror-consumes.md`).
- Use `start.md` as the entry file for each branch directory.
- Prefer clear, evocative `id` values; filenames are for organization; keys are for stable linking.
- The generator ignores any `README.md` in `story/`.

## Generation Commands

- Manual generation: `npm run generate:story`
  - Writes `src/data/generatedStoryNodes.ts` and prints node count.
- Build (auto‑generates first via `prebuild`): `npm run build`
- Dev (regenerate manually when you edit `story/`): `npm run dev` and re‑run `generate:story` as needed.

## Validation Checklist (after edits)

- Prologue has exactly three choices to `faith/start.md`, `reflection/start.md`, `corruption/start.md`.
- Every non‑ending node has at least two choices.
- Every ending node has zero choices and an “Ending — …” `id`.
- All `diceCheck.success`/`fail` and `choices[].next` resolve to valid keys (use relative `.md` paths if unsure; the generator resolves them).
- Optional: grep for accidental empty choice arrays (should only appear in endings):
  - `npm run generate:story`
  - Open `src/data/generatedStoryNodes.ts` and confirm no `choices: []` entries except endings.

## Notes on Content Cohesion

- Keep branch flow consistent with `notes/state-tree.md` and `notes/plot-outline.md`.
- Align ending tones with `notes/endings.md`:
  - Good endings only: Reflection (Break the Cycle/Transcendent) and Corruption (Earned Balance).
- Maintain lens names and creed per `notes/glossary.md` and `notes/lenses.md`.

## Do Not Edit

- Never hand‑edit `src/data/generatedStoryNodes.ts` — it is overwritten by the generator.

By following this file, you can safely rebuild or extend the `story/` tree after updating the notes.
