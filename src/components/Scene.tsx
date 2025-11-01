import { useMemo, useState } from "react";
import { Typewriter } from "./typewriter";
import { storyNodes, type StoryNode } from "../data/storyNodes";
import { useStoryStore } from "../store/storyStore";
import { Button } from "./ui/Button";
import { NameInput } from "./name";

interface SceneProps {
    node: StoryNode;
}

export default function Scene({ node }: SceneProps) {
    const { setNode, recordRoll, lastRoll, playerName, setPlayerName } =
        useStoryStore();
    const [isRolling, setIsRolling] = useState(false);

    const choices = useMemo(() => node.choices ?? [], [node.choices]);

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
        <div className="w-full max-w-3xl space-y-6 rounded-2xl border border-border/60 bg-surface/80 p-8 shadow-lg shadow-primary/15">
            <header className="space-y-2 text-center">
                <h3 className="font-heading text-3xl font-semibold text-secondary">
                    Chapter: {node.id}
                </h3>
            </header>

            <p className="text-lg leading-relaxed text-foreground/90">
                <span className="typewriter">
                    <Typewriter text={fullText} speed={30} />
                </span>
                {node.requiresName && (
                    <>
                        {" "}
                        <NameInput
                            playerName={playerName}
                            setPlayerName={setPlayerName}
                        />
                    </>
                )}
            </p>

            {/* Choices */}
            {choices.length > 0 ? (
                <div className="space-y-2">
                    <h4 className="font-heading text-lg uppercase tracking-wide text-foreground/80">
                        Choices
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2">
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
            ) : !node.diceCheck ? (
                <p className="rounded-lg border border-border/40 bg-background/60 p-4 text-center text-sm text-foreground/70">
                    No choices remain here. Perhaps another path will reveal
                    itself later.
                </p>
            ) : null}

            {/* Dice check block */}
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

            {/* Display roll result */}
            {lastRoll !== null && (
                <p className="text-center text-sm text-foreground/70">
                    You rolled a {lastRoll}.
                </p>
            )}
        </div>
    );
}
