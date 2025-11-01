import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useStoryStore } from "../store/storyStore";
import { unlockAudioContext } from "../utils/audioContext";

type SettingsMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function SettingsMenu({ isOpen, onClose }: SettingsMenuProps) {
    const { soundEnabled, setSoundEnabled } = useStoryStore();
    const { volume, setVolume } = useStoryStore();
    const handleResetGame = () => {
        if (
            window.confirm(
                "Are you sure you want to reset your game progress? This action cannot be undone."
            )
        ) {
            // Clear all game-related data but keep settings
            const soundSetting = localStorage.getItem("soundEnabled");
            const themeSetting = localStorage.getItem("theme");

            localStorage.clear();

            // Restore settings
            if (soundSetting !== null) {
                localStorage.setItem("soundEnabled", soundSetting);
            }
            if (themeSetting !== null) {
                localStorage.setItem("theme", themeSetting);
            }

            alert("Game progress has been reset!");
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-6">
                {/* Sound Toggle */}
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="sound-toggle"
                        className="text-lg text-foreground"
                    >
                        Sound
                    </label>
                    <button
                        id="sound-toggle"
                        onClick={async () => {
                            if (!soundEnabled) {
                                await unlockAudioContext();
                            }
                            setSoundEnabled(!soundEnabled);
                        }}
                        className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              ${soundEnabled ? "bg-primary" : "bg-muted"}
            `}
                        role="switch"
                        aria-checked={soundEnabled}
                    >
                        <span
                            className={`
                inline-block h-4 w-4 transform rounded-full bg-surface transition-transform
                ${soundEnabled ? "translate-x-6" : "translate-x-1"}
              `}
                        />
                    </button>
                </div>
                <div>
                    <label
                        htmlFor="music-volume"
                        className="mb-2 block text-lg text-foreground"
                    >
                        Music Volume
                    </label>
                    <input
                        id="music-volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full cursor-pointer accent-primary"
                    />
                </div>
                {/* Reset Game Button */}
                <div className="border-t border-border pt-6">
                    <Button
                        id="reset-game-button"
                        onClick={handleResetGame}
                        className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground"
                    >
                        Reset Game
                    </Button>
                    <p className="mt-2 text-sm text-foreground/60">
                        This will clear all your current progress from storage.
                    </p>
                </div>
            </div>
        </Modal>
    );
}
