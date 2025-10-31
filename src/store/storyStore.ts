import { create } from 'zustand'
import { storyNodes } from '../data/storyNodes'

interface StoryState {
  currentNode: string
  visited: string[]
  lastRoll: number | null
  setNode: (id: string) => void
  recordRoll: (value: number | null) => void
  reset: () => void
}

export const useStoryStore = create<StoryState>((set) => ({
  currentNode: 'intro',
  visited: ['intro'],
  lastRoll: null,
  setNode: (id) =>
    set((state) => ({
      currentNode: storyNodes[id] ? id : state.currentNode,
      visited: state.visited.includes(id) ? state.visited : [...state.visited, id],
      lastRoll: null,
    })),
  recordRoll: (value) =>
    set(() => ({
      lastRoll: value,
    })),
  reset: () =>
    set(() => ({
      currentNode: 'intro',
      visited: ['intro'],
      lastRoll: null,
    })),
}))
