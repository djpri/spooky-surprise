import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storyNodes, type StoryNode } from "../data/storyNodes";
import { useStoryStore } from "../store/storyStore";
import { NameInput } from "./name";
import { Typewriter } from "./typewriter";
import { Button } from "./ui/Button";

interface SceneProps {
  node: StoryNode;
}

export default function Scene({ node }: SceneProps) {
  const { setNode, recordRoll, lastRoll, playerName, setPlayerName, reset } =
    useStoryStore();
  const [isRolling, setIsRolling] = useState(false);
  const [isTyped, setIsTyped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { gameStarted } = useStoryStore();

  // Check if this is an ending node
  const isEnding = node.id.startsWith("Ending —");

  const handleRestart = () => {
    reset();
    setPlayerName("");
  };

  const choices = useMemo(() => node.choices ?? [], [node.choices]);

  // Reset typewriter completion when node changes
  useEffect(() => {
    setIsTyped(false);
  }, [node]);

  // Stable callback so Typewriter doesn't restart mid-typing
  const handleTypedComplete = useCallback(() => {
    setIsTyped(true);
  }, []);

  const handleChoice = (nextId: string) => {
    if (!storyNodes[nextId]) return;
    setNode(nextId);
  };

  const handleDiceRoll = () => {
    if (!node.diceCheck || isRolling) return;

    setIsRolling(true);
    const roll = Math.ceil(Math.random() * 20);

    recordRoll(roll);

    const result =
      roll >= node.diceCheck.target
        ? node.diceCheck.success
        : node.diceCheck.fail;

    setTimeout(() => {
      setIsRolling(false);
      handleChoice(result);
    }, 1100);
  };

  const fullText = useMemo(() => {
    return typeof node.text === "function"
      ? node.text(playerName)
      : node.text.replaceAll("PLAYERNAME", playerName || "____");
  }, [node, playerName]);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-3xl space-y-6 rounded-2xl border border-border/60 bg-surface/80 p-4 sm:p-6 md:p-8 shadow-lg shadow-primary/15"
    >
      <header className="space-y-2 text-center">
        <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-secondary">
          Chapter: {node.id}
        </h3>
      </header>

      <p className="text-lg leading-relaxed text-foreground/90 md:max-w-2xl">
        {gameStarted ? (
          <span className="typewriter">
            <Typewriter
              text={fullText}
              speed={16}
              onComplete={handleTypedComplete}
            />
          </span>
        ) : (
          fullText
        )}
        {node.requiresName && isTyped && (
          <NameInput playerName={playerName} setPlayerName={setPlayerName} />
        )}
      </p>

      {choices.length > 0 && (
        <div className="space-y-2 w-full">
          <h4 className="font-heading text-lg uppercase tracking-wide text-foreground/80">
            Choices
          </h4>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {choices.map((choice) => (
              <Button
                key={`${node.id}-${choice.next}-${choice.text}`}
                className="h-auto justify-start whitespace-normal py-3 text-left leading-relaxed"
                onClick={() => handleChoice(choice.next)}
                disabled={node.requiresName && !playerName}
              >
                {choice.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {isEnding && choices.length === 0 && (
        <div className="space-y-2">
          <Button
            onClick={handleRestart}
            className="w-full py-3 text-base font-semibold"
          >
            Restart Adventure
          </Button>
        </div>
      )}

      {node.diceCheck && (
        <div className="space-y-3 rounded-xl border border-border/40 bg-background/60 p-4">
          <p className="text-sm text-foreground/80">
            Roll for{" "}
            <span className="font-semibold uppercase">
              {node.diceCheck.stat}
            </span>{" "}
            — target {node.diceCheck.target}
          </p>
          <Button
            className="w-full py-3 text-base font-semibold"
            onClick={handleDiceRoll}
            disabled={isRolling}
          >
            {isRolling ? "Rolling..." : "Roll the Dice"}
          </Button>
        </div>
      )}

      {lastRoll !== null && (
        <p className="text-center text-sm text-foreground/70">
          You rolled a {lastRoll}.
        </p>
      )}
    </div>
  );
}
