import { useState, useEffect } from "react";
import { useStoryStore } from "../store/storyStore";
import { getAudioContext } from "../utils/audioContext";
import { loadAudioBuffer } from "../utils/typeClickHelper";

interface TypewriterProps {
    text: string;
    speed?: number; // milliseconds per character
    onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 50,
    onComplete,
}) => {
    const [displayed, setDisplayed] = useState("");
    const { soundEnabled } = useStoryStore();

    useEffect(() => {
        setDisplayed(""); // clear for new text
        let cancelled = false;

        // check for muted audio
        if (!soundEnabled) {
            const silentType = (i: number) => {
                if (cancelled) return;
                if (i < text.length) {
                    setDisplayed((prev) => prev + text[i]);
                    setTimeout(() => silentType(i + 1), speed);
                } else {
                    onComplete?.();
                }
            };
            silentType(0);
            return () => {
                cancelled = true;
            };
        }

        // if not we type!
        const ctx = getAudioContext();
        let buffer: AudioBuffer | null = null;

        const loadClick = async () => {
            try {
                buffer = await loadAudioBuffer(
                    ctx,
                    "/sounds/typewriterClick.ogg"
                );
            } catch (err) {
                console.error("Failed to load typewriter click sound:", err);
            }

            const playClick = () => {
                if (!buffer) return;
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.playbackRate.value = 0.9 + Math.random() * 0.2; // slight variation on playback this also controls the pitch as the playback rate is changed
                source.connect(ctx.destination);
                source.start(0);
            };

            const typeChar = (i: number) => {
                if (cancelled) return;

                if (i < text.length) {
                    setDisplayed((prev) => prev + text[i]);
                    playClick();
                    setTimeout(() => typeChar(i + 1), speed);
                } else {
                    onComplete?.();
                }
            };

            typeChar(0);
        };
        loadClick();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, speed, onComplete]);

    return <span>{displayed}</span>;
};
