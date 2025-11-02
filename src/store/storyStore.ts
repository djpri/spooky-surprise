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
    currentPath: "faith" | "reflection" | "corruption" | null;
    setCurrentPath: (
        path: "faith" | "reflection" | "corruption" | null
    ) => void;
    gameStarted: boolean;
    setGameStarted: (started: boolean) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
    currentNode: "prologue",
    visited: ["prologue"],
    lastRoll: null,
    soundEnabled: getInitialSoundEnabled(),
    playerName: "",
    volume: 0.25,
    currentPath: null,
    gameStarted: false,
    setGameStarted: (started) => set({ gameStarted: started }),
    setVolume: (value) => set(() => ({ volume: value })),
    setPlayerName: (name) => set({ playerName: name }),
    setCurrentPath: (path) => set({ currentPath: path }),
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
    startGame: () =>
        set((state) => ({
            currentNode: "prologue",
            visited: ["prologue"],
            lastRoll: null,
            soundEnabled: state.soundEnabled,
            currentPath: null,
            playerName: "",
            gameStarted: true,
        })),
    reset: () =>
        set((state) => ({
            currentNode: "prologue",
            visited: ["prologue"],
            lastRoll: null,
            soundEnabled: state.soundEnabled,
            currentPath: null,
            playerName: "",
            gameStarted: false,
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
