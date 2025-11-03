// Background images for story scenes
import Muir from "./Muir.jpg";
import amulet from "./amulet.jpg";
import brichan from "./brichan.webp";
import brichanCave from "./brichan_cave.webp";
import cellar from "./cellar.jpg";
import lantern from "./lantern.jpg";
import lanternTaken from "./lanternTaken.jpg";
import moonDoor from "./moonDoor.jpg";
import secretPassage from "./secretPassage.jpg";
import soulLock from "./soulLock.jpg";
import staircase from "./staircase.jpg";
import study from "./study.jpg";
import talamh from "./talamh.jpg";
import whisper from "./whisper.jpg";

export const backgroundImages = {
  Muir,
  amulet,
  brichan,
  brichanCave,
  cellar,
  lantern,
  lanternTaken,
  moonDoor,
  secretPassage,
  soulLock,
  staircase,
  study,
  talamh,
  whisper,
} as const;

// Export types for convenience
export type BackgroundImageKey = keyof typeof backgroundImages;
