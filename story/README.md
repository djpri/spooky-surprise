# Story Folder (Node Source)

This folder is the source of truth for story nodes. A generator script scans `story/**/*.md` and produces `src/data/generatedStoryNodes.ts` compatible with the app’s `StoryNode` type.

Format for each node file:

<!--
{
  "key": "OptionalFriendlyKey",
  "id": "Human‑readable title",
  "requiresName": false,
  "imagePath": "./images/example.jpg",
  "diceCheck": { "stat": "fortitude", "target": 12, "success": "someKey", "fail": "otherKey" },
  "choices": [
    { "text": "Choice text", "next": "TargetKeyOrRelativeMdPath" }
  ]
}
-->

Then, the Markdown body is the narrative text. If the text contains the token `PLAYERNAME`, the generator will output a function node that replaces all `PLAYERNAME` instances at runtime.

Images
- Store images in `src/assets/images/background`. In node metadata, set `imagePath` to the filename (e.g., `lantern.jpg`). The generator copies from assets to `public/backgrounds/` and rewrites the path for runtime.

Key rules:
- If `key` is omitted, the key is derived from the file path (safe, unique).
- `choices[].next` may be a key or a relative path to another `.md` node (resolved during generation).
- You can omit `choices` for leaf nodes while drafting.
