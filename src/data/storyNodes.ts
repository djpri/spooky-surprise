import { corruptionNodes } from "./corruptionNodes";
import { faithNodes } from "./faithNodes";
import { reflectionNodes } from "./reflectionNodes";

export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryNode {
  id: string;
  text: string | ((playerName: string) => string);
  choices?: StoryChoice[];
  diceCheck?: {
    stat: string;
    target: number;
    success: string;
    fail: string;
  };
  requiresName?: boolean;
  imagePath: string | null;
  audioPath?: string;
}

export const storyNodes: Record<string, StoryNode> = {
  prologue: {
    id: "Prologue — The Stirring",
    text: "You wake in the Chapel of Sighing Stone. Dust hangs. The lens in your palm is warm as a kept ember.\n\nYou stand in the hush between worlds, memory hanging just out of reach. The voice that calls you isn't from above or below — it comes from within, threaded through the pulse of light under your skin. You remember the creed, the burden, the endless hunt… but not your name. That part was left behind in the last turning of the Veil.\n\nThe world will not know you until you speak it again. Who are you, Brichan?\n",
    requiresName: true,

    choices: [
      { text: "Path of Faith — The Light That Burns", next: "faith__start" },
      {
        text: "Path of Reflection — The Mirror's Truth",
        next: "reflection__start",
      },
      {
        text: "Path of Corruption — The Root Flame",
        next: "corruption__start",
      },
    ],
    imagePath: "/backgrounds/brichan.webp",
  },
  ...faithNodes,
  ...reflectionNodes,
  ...corruptionNodes,
};
