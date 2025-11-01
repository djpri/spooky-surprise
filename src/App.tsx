import { useState, useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle";
import { SettingsMenu } from "./components/SettingsMenu";
import { Button } from "./components/ui/Button";
import StoryRenderer from "./components/StoryRenderer";
import { useStoryStore } from "./store/storyStore";
import MenuAudioLoop from "./components/MenuAudioLoop";
import { GhostCursor } from "./components/GhostCursor";
import DynamicBackground from "./components/DynamicBackground";

function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const {
        currentNode,
        visited,
        reset,
        soundEnabled,
        setSoundEnabled,
        setPlayerName,
    } = useStoryStore();
    const visitedCount = visited.length;
    const toggleSound = () => setSoundEnabled(!soundEnabled);
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
            <GhostCursor />
            <DynamicBackground currentNode={currentNode} />
            <MenuAudioLoop />
            <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
                <div className="mx-auto flex min-h-screen flex-col items-center justify-center gap-16 px-4 py-16 z-20">
                    <h2 className="font-heading text-center text-7xl font-semibold tracking-widest">
                        Spooky <span className="text-secondary">Surprise</span>
                    </h2>
                    <h3 className="text-center text-2xl text-foreground/70">
                        An Interactive Halloween Adventure
                    </h3>

                    <section className="w-full max-w-3xl">
                        <StoryRenderer />
                    </section>

                    <section className="w-full max-w-3xl space-y-4 rounded-2xl border border-border/70 bg-surface/70 p-6 text-center shadow-inner">
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-wide text-foreground/60">
                                Current Location
                            </p>
                            <p className="font-heading text-3xl text-secondary">
                                {currentNode}
                            </p>
                            <Button
                                className="mt-4 w-full py-3 text-base"
                                onClick={() => {
                                    reset();
                                    setPlayerName("");
                                }}
                            >
                                Restart Adventure
                            </Button>
                        </div>

                        <div className="space-y-3 text-left">
                            <h3 className="font-heading text-lg uppercase tracking-wide text-foreground/70">
                                Visited
                            </h3>
                            <p className="text-sm text-foreground/60">
                                {visitedCount} locations explored
                            </p>
                            <ul className="grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
                                {visited.map((nodeId) => (
                                    <li
                                        key={nodeId}
                                        className="rounded border border-border/50 bg-background/40 px-3 py-2"
                                    >
                                        {nodeId}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <div className="mt-auto w-full pb-8 pt-12">
                        <div className="flex justify-center gap-4">
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
        </div>
    );
}

export default App;
