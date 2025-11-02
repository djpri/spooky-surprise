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
    const { currentNode, reset, soundEnabled, setSoundEnabled, setPlayerName } =
        useStoryStore();
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
        </div>
    );
}

export default App;
