import { useEffect, useState } from "react";
import BSODOverlay from "./components/BSODOverlay";
import DynamicBackground from "./components/DynamicBackground";
import { GhostCursor } from "./components/GhostCursor";
import MazeOverlay from "./components/MazeOverlay";
import MenuAudioLoop from "./components/MenuAudioLoop";
import { SettingsMenu } from "./components/SettingsMenu";
import StoryRenderer from "./components/StoryRenderer";
import ThemeToggle from "./components/ThemeToggle";
import { Button } from "./components/ui/Button";
import { useStoryStore } from "./store/storyStore";

function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showMaze, setShowMaze] = useState(false);
    const [showBSOD, setShowBSOD] = useState(false);
    const {
        currentNode,
        reset,
        soundEnabled,
        setSoundEnabled,
        setPlayerName,
        gameStarted,
        setGameStarted,
    } = useStoryStore();
    const toggleSound = () => setSoundEnabled(!soundEnabled);
    const openMazeIfSupported = () => {
        if (typeof window === "undefined") return;
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isDesktop || !hasFinePointer) {
            // Silently do nothing on unsupported devices
            return;
        }
        setShowMaze(true);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/9cf674f529.js";
        script.crossOrigin = "anonymous";
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {!showMaze && <GhostCursor />}
            <DynamicBackground currentNode={currentNode} />
            {!showBSOD && <MenuAudioLoop />}
            <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
                <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-16 px-4 py-16 z-20">
                    <h2 className="font-heading text-center text-7xl font-semibold tracking-widest">
                        <button
                            onClick={openMazeIfSupported}
                            className="underline-offset-4 hover:underline"
                            aria-label="Open spooky maze"
                            title="Spooky (click me)"
                        >
                            Spooky
                        </button>{" "}
                        {/* Intentionally no hover/gesture to suggest interaction */}
                        <span
                            className="text-secondary"
                            onClick={() => setShowBSOD(true)}
                        >
                            Surprise
                        </span>
                    </h2>
                    <h3 className="text-center text-2xl text-foreground/70">
                        An Interactive Halloween Adventure
                    </h3>

                    {!gameStarted ? (
                        <section className="w-full max-w-3xl">
                            <div className=" space-y-6 rounded-2xl border border-border/60 bg-surface/80 p-8 shadow-lg shadow-primary/15 max-w-716px">
                                <h2 className="mb-6 font-heading text-4xl font-semibold text-center text-secondary">
                                    Welcome to Spooky Surprise!
                                </h2>
                                <p className="mb-4 text-lg text-foreground/90">
                                    Embark on a thrilling interactive adventure
                                    where your choices shape the story! Dive
                                    into a world of mystery, make critical
                                    decisions, and see where your path leads.
                                    Are you ready to begin?
                                </p>
                                <button
                                    className="w-full py-3 text-base font-semibold bg-secondary text-background rounded-md hover:bg-secondary/90 transition"
                                    onClick={() => {
                                        reset();
                                        setPlayerName("");
                                        setTimeout(
                                            () => setGameStarted(true),
                                            1
                                        );
                                    }}
                                >
                                    Start Adventure
                                </button>
                            </div>
                        </section>
                    ) : (
                        <section className="w-full max-w-3xl">
                            <StoryRenderer />
                        </section>
                    )}
                    <div className="mt-auto w-full pb-8 pt-12">
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => {
                                    reset();
                                    setPlayerName("");
                                }}
                            >
                                Restart Adventure
                            </Button>
                            <Button onClick={() => setIsSettingsOpen(true)}>
                                Settings
                            </Button>
                            <ThemeToggle />
                            <Button
                                className="px-4 py-2 text-sm"
                                onClick={toggleSound}
                                aria-pressed={soundEnabled}
                            >
                                {soundEnabled ? (
                                    <i className="fas fa-volume-high mr-2"></i>
                                ) : (
                                    <i className="fas fa-volume-mute mr-2"></i>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <SettingsMenu
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
            {showMaze && <MazeOverlay onClose={() => setShowMaze(false)} />}
            {showBSOD && <BSODOverlay onClose={() => setShowBSOD(false)} />}
        </div>
    );
}

export default App;
