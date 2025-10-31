import Scene from './Scene'
import { useStoryStore } from '../store/storyStore'
import { storyNodes } from '../data/storyNodes'

export default function StoryRenderer() {
  const { currentNode } = useStoryStore()
  const node = storyNodes[currentNode]

  if (!node) {
    return (
      <div className="rounded-lg border border-destructive/60 bg-destructive/10 p-4 text-destructive-foreground">
        Unknown node: {currentNode}
      </div>
    )
  }

  return <Scene node={node} />
}
