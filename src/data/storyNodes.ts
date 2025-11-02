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
// Use generated nodes as the canonical source.
export { generatedStoryNodes as storyNodes } from "./generatedStoryNodes";
