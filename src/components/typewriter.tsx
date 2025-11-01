import { useState, useEffect } from "react";
import { useStoryStore } from "../store/storyStore";
import { getAudioContext } from "../utils/audioContext";
import { loadAudioBuffer } from "../utils/typeClickHelper";
import clickSound from "../assets/audio/typewriterClick.ogg";

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
        setDisplayed("");
        let cancelled = false;

        const ctx = getAudioContext();
        let buffer: AudioBuffer | null = null;

        const loadAndType = async () => {
            try {
                buffer = await loadAudioBuffer(ctx, clickSound);
            } catch (err) {
                console.error("Failed to load typewriter click sound:", err);
            }

            const playClick = () => {
                if (!soundEnabled || !buffer) return;
                const src = ctx.createBufferSource();
                src.buffer = buffer;
                src.playbackRate.value = 0.9 + Math.random() * 0.2;
                src.connect(ctx.destination);
                src.start(0);
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

        loadAndType();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, speed, onComplete]); // removed soundEnabled from deps

    // mid animation catch
    useEffect(() => {
        const ctx = getAudioContext();
        if (soundEnabled && ctx.state === "suspended") {
            ctx.resume().catch(() => {});
        }
    }, [soundEnabled]);

    return <span>{displayed}</span>;
};
