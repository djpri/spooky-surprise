import {
    useMemo,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";
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
    const [isTyped, setIsTyped] = useState(false);
    const [lockedWidth, setLockedWidth] = useState<number | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

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

    useLayoutEffect(() => {
        if (cardRef.current) {
            const { width } = cardRef.current.getBoundingClientRect();
            setLockedWidth(width);
        }
    }, []);

    const fullText = useMemo(() => {
        return typeof node.text === "function"
            ? node.text(playerName)
            : node.text.replaceAll("PLAYERNAME", playerName || "____");
    }, [node, playerName]);

    return (
        <div
            ref={cardRef}
            className="space-y-6 rounded-2xl border border-border/60 bg-surface/80 p-8 shadow-lg shadow-primary/15"
            style={
                lockedWidth
                    ? {
                          width: lockedWidth,
                          maxWidth: lockedWidth,
                          overflowX: "clip",
                      }
                    : { width: "100%", maxWidth: "48rem" }
            }
        >
            <header className="space-y-2 text-center">
                <h3 className="font-heading text-3xl font-semibold text-secondary">
                    Chapter: {node.id}
                </h3>
            </header>

            <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap break-words">
                <span className="typewriter block w-full">
                    <Typewriter
                        text={fullText}
                        speed={30}
                        onComplete={handleTypedComplete}
                    />
                </span>
                {node.requiresName && isTyped && (
                    <NameInput
                        playerName={playerName}
                        setPlayerName={setPlayerName}
                    />
                )}
            </p>

            {choices.length > 0 && (
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
