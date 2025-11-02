import { useMemo, useState } from "react";
import { storyNodes } from "../data/storyNodes";
import { useStoryStore } from "../store/storyStore";

interface TreeNode {
  name: string;
  path: string;
  children: TreeNode[];
  isLeaf: boolean;
}

export function StoryStateInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "visited">("id");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["faith", "reflection", "corruption", "prologue"])
  );

  const {
    currentNode,
    visited,
    playerName,
    currentPath,
    lastRoll,
    soundEnabled,
    setNode,
    reset,
    setGameStarted,
  } = useStoryStore();

  // Get all available story nodes
  const allNodes = Object.keys(storyNodes);

  // Build tree structure
  const buildTree = (nodeIds: string[]): TreeNode[] => {
    const tree: Record<string, TreeNode> = {};
    const roots: TreeNode[] = [];

    nodeIds.forEach((nodeId) => {
      const parts = nodeId.split("__");
      let currentPath = "";

      parts.forEach((part, index) => {
        if (index === 0) {
          currentPath = part;
        } else {
          currentPath += "__" + part;
        }

        if (!tree[currentPath]) {
          tree[currentPath] = {
            name: part,
            path: currentPath,
            children: [],
            isLeaf: false,
          };

          if (index === 0) {
            roots.push(tree[currentPath]);
          } else {
            const parentPath = parts.slice(0, index).join("__");
            if (tree[parentPath]) {
              tree[parentPath].children.push(tree[currentPath]);
            }
          }
        }

        if (index === parts.length - 1) {
          tree[currentPath].isLeaf = true;
        }
      });
    });

    return roots.sort((a, b) => a.name.localeCompare(b.name));
  };

  // Filter nodes based on search
  const filteredNodes = allNodes.filter(
    (nodeId) =>
      nodeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (storyNodes[nodeId as keyof typeof storyNodes]?.text &&
        typeof storyNodes[nodeId as keyof typeof storyNodes].text ===
          "string" &&
        (storyNodes[nodeId as keyof typeof storyNodes].text as string)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  // Build and memoize tree
  const tree = useMemo(() => buildTree(filteredNodes), [filteredNodes]);

  const handleJumpToNode = (nodeId: string) => {
    setGameStarted(true);
    setNode(nodeId);
    setSearchQuery("");
  };

  const getNodePreview = (nodeId: string) => {
    const node = storyNodes[nodeId as keyof typeof storyNodes];
    if (!node) return "Unknown node";
    const text =
      typeof node.text === "string"
        ? node.text
        : node.text(playerName || "Player");
    return text.substring(0, 100).replace(/\n/g, " ") + "...";
  };

  // Recursive tree rendering component
  const TreeItemRender = ({ node: treeNode }: { node: TreeNode }) => {
    const isExpanded = expandedFolders.has(treeNode.path);
    const isCurrentNode = currentNode === treeNode.path;
    const isVisited = visited.includes(treeNode.path);

    if (treeNode.isLeaf) {
      return (
        <div className="ml-4">
          <button
            className={`w-full text-left px-2 py-1 text-sm font-mono flex justify-between items-center cursor-auto hover:bg-gray-200 rounded ${
              isCurrentNode ? "bg-black text-white font-bold" : ""
            }`}
            onClick={() => handleJumpToNode(treeNode.path)}
          >
            <span className="truncate flex items-center gap-1">
              📄 {treeNode.name}
            </span>
            {isVisited && <span className="text-xs">✓</span>}
          </button>
          <div className="ml-6 px-2 text-xs opacity-50 line-clamp-2">
            {getNodePreview(treeNode.path)}
          </div>
        </div>
      );
    }

    return (
      <div className="ml-2">
        <button
          onClick={() => {
            const newExpanded = new Set(expandedFolders);
            if (isExpanded) {
              newExpanded.delete(treeNode.path);
            } else {
              newExpanded.add(treeNode.path);
            }
            setExpandedFolders(newExpanded);
          }}
          className="w-full text-left px-2 py-1 text-sm font-bold cursor-auto hover:bg-gray-200 rounded flex items-center gap-2"
        >
          <span>{isExpanded ? "▼" : "▶"}</span>
          <span>📁 {treeNode.name}</span>
        </button>
        {isExpanded && (
          <div className="border-l border-gray-300">
            {treeNode.children
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((child) => (
                <TreeItemRender key={child.path} node={child} />
              ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-black text-white text-xl font-bold hover:bg-gray-800 transition-all hover:scale-110 cursor-auto border border-white"
        onClick={() => setIsOpen(true)}
        title="Open Story State Inspector"
      >
        📖
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-5 z-50 w-[500px] max-h-[80vh] bg-white text-black rounded-lg border-2 border-black shadow-lg flex flex-col cursor-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-100">
        <h2 className="text-lg font-bold">Story Inspector</h2>
        <button
          className="w-7 h-7 bg-black text-white rounded hover:bg-gray-700 font-bold"
          onClick={() => setIsOpen(false)}
          title="Close inspector"
        >
          ✕
        </button>
      </div>

      {/* Current State */}
      <div className="p-3 border-b-2 border-black bg-gray-50 space-y-2 text-sm overflow-y-auto max-h-24">
        <div className="flex justify-between">
          <span className="font-bold">Current Node:</span>
          <span className="font-mono">{currentNode}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Player Name:</span>
          <span className="font-mono">{playerName || "(not set)"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Path:</span>
          <span className="font-mono">{currentPath || "(none)"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Visited:</span>
          <span className="font-mono">{visited.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Last Roll:</span>
          <span className="font-mono">{lastRoll ?? "(none)"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Sound:</span>
          <span className="font-mono">{soundEnabled ? "✓" : "✗"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 border-b-2 border-black bg-gray-50 space-y-2">
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border-2 border-black rounded font-mono text-sm bg-white"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy(sortBy === "id" ? "visited" : "id")}
            className="flex-1 px-2 py-2 bg-gray-200 hover:bg-gray-300 border-2 border-black rounded font-bold text-sm cursor-auto"
          >
            Sort: {sortBy === "id" ? "ID ↑" : "Visited ↑"}
          </button>
          <button
            onClick={reset}
            className="flex-1 px-2 py-2 bg-red-200 hover:bg-red-300 border-2 border-black rounded font-bold text-sm cursor-auto"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tree View */}
      <div className="flex-1 overflow-y-auto border-b-2 border-black p-2">
        <div className="sticky top-0 text-xs font-bold mb-2 bg-gray-50 pb-2">
          Story Tree ({filteredNodes.length}/{allNodes.length})
        </div>
        {filteredNodes.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No matches
          </div>
        ) : (
          tree.map((root) => <TreeItemRender key={root.path} node={root} />)
        )}
      </div>
    </div>
  );
}
