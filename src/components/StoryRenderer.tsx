import { useEffect } from "react";
import { storyNodes } from "../data/storyNodes";
import { useStoryStore } from "../store/storyStore";
import Scene from "./Scene";

export default function StoryRenderer() {
  const { currentNode, setCurrentPath } = useStoryStore();
  const node = storyNodes[currentNode];

  useEffect(() => {
    // Determine path based on current node
    if (currentNode.startsWith("faith__")) {
      setCurrentPath("faith");
    } else if (currentNode.startsWith("reflection__")) {
      setCurrentPath("reflection");
    } else if (currentNode.startsWith("corruption__")) {
      setCurrentPath("corruption");
    } else {
      // Reset to null for prologue or other nodes
      setCurrentPath(null);
    }
  }, [currentNode, setCurrentPath]);

  if (!node) {
    return (
      <div className="rounded-lg border border-destructive/60 bg-destructive/10 p-4 text-destructive-foreground">
        Unknown node: {currentNode}
      </div>
    );
  }

  return <Scene node={node} />;
}
