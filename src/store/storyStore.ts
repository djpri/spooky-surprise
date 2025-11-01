import { create } from "zustand";
import { storyNodes } from "../data/storyNodes";

const getInitialSoundEnabled = () => {
    if (typeof window === "undefined") {
        return false;
    }
    const stored = window.localStorage.getItem("soundEnabled");
    return stored !== null ? stored === "true" : false;
};

interface StoryState {
    currentNode: string;
    visited: string[];
    lastRoll: number | null;
    soundEnabled: boolean;
    setNode: (id: string) => void;
    recordRoll: (value: number | null) => void;
    reset: () => void;
    setSoundEnabled: (value: boolean) => void;
    playerName: string;
    setPlayerName: (name: string) => void;
    volume: number;
    setVolume: (value: number) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
    currentNode: "Neamh",
    visited: ["Neamh"],
    lastRoll: null,
    soundEnabled: getInitialSoundEnabled(),
    playerName: "",
    volume: 0.25,
    setVolume: (value) => set(() => ({ volume: value })),
    setPlayerName: (name) => set({ playerName: name }),
    setNode: (id) =>
        set((state) => ({
            currentNode: storyNodes[id] ? id : state.currentNode,
            visited: state.visited.includes(id)
                ? state.visited
                : [...state.visited, id],
            lastRoll: null,
        })),
    recordRoll: (value) =>
        set(() => ({
            lastRoll: value,
        })),
    reset: () =>
        set((state) => ({
            currentNode: "Neamh",
            visited: ["Neamh"],
            lastRoll: null,
            soundEnabled: state.soundEnabled,
        })),
    setSoundEnabled: (value) =>
        set(() => {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("soundEnabled", String(value));
            }
            return {
                soundEnabled: value,
            };
        }),
}));
