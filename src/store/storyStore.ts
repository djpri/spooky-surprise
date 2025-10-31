import { create } from 'zustand'
import { storyNodes } from '../data/storyNodes'

interface StoryState {
  currentNode: string
  inventory: string[]
  visited: string[]
  lastRoll: number | null
  setNode: (id: string) => void
  addItem: (item: string) => void
  recordRoll: (value: number | null) => void
  reset: () => void
}

export const useStoryStore = create<StoryState>((set) => ({
  currentNode: 'intro',
  inventory: [],
  visited: ['intro'],
  lastRoll: null,
  setNode: (id) =>
    set((state) => ({
      currentNode: storyNodes[id] ? id : state.currentNode,
      visited: state.visited.includes(id) ? state.visited : [...state.visited, id],
      lastRoll: null,
    })),
  addItem: (item) =>
    set((state) => ({
      inventory: state.inventory.includes(item) ? state.inventory : [...state.inventory, item],
    })),
  recordRoll: (value) =>
    set(() => ({
      lastRoll: value,
    })),
  reset: () =>
    set(() => ({
      currentNode: 'intro',
      inventory: [],
      visited: ['intro'],
      lastRoll: null,
    })),
}))
