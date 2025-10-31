import { create } from 'zustand'
import { storyNodes } from '../data/storyNodes'

const getInitialSoundEnabled = () => {
  if (typeof window === 'undefined') {
    return false
  }
  const stored = window.localStorage.getItem('soundEnabled')
  return stored !== null ? stored === 'true' : false
}

interface StoryState {
  currentNode: string
  visited: string[]
  lastRoll: number | null
  soundEnabled: boolean
  setNode: (id: string) => void
  recordRoll: (value: number | null) => void
  reset: () => void
  setSoundEnabled: (value: boolean) => void
}

export const useStoryStore = create<StoryState>((set) => ({
  currentNode: 'intro',
  visited: ['intro'],
  lastRoll: null,
  soundEnabled: getInitialSoundEnabled(),
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
    set((state) => ({
      currentNode: 'intro',
      visited: ['intro'],
      lastRoll: null,
      soundEnabled: state.soundEnabled,
    })),
  setSoundEnabled: (value) =>
    set(() => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('soundEnabled', String(value))
      }
      return {
        soundEnabled: value,
      }
    }),
}))
