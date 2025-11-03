import { useState, useEffect, useRef } from "react";
import { useStoryStore } from "../store/storyStore";
import { getAudioContext } from "../utils/audioContext";
import { loadAudioBuffer } from "../utils/typeClickHelper.ts";
import clickSound from "../assets/audio/typewriterClick.ogg";

interface TypewriterProps {
    text: string;
    speed?: number; // milliseconds per character
    onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 100,
    onComplete,
}) => {
    const [displayed, setDisplayed] = useState("");
    const { soundEnabled } = useStoryStore();

    const soundEnabledRef = useRef(soundEnabled);
    useEffect(() => {
        soundEnabledRef.current = soundEnabled;
    }, [soundEnabled]);

    const gainRef = useRef<GainNode | null>(null);

    useEffect(() => {
        setDisplayed("");
        let cancelled = false;

        const ctx = getAudioContext();
        let buffer: AudioBuffer | null = null;

        if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
        }

        const setupGainNode = () => {
            if (!gainRef.current) {
                const g = ctx.createGain();
                g.gain.value = 0.2; // <-- volume control (0.0 silent, 1.0 full)
                g.connect(ctx.destination);
                gainRef.current = g;
            }
        };

        const loadAndType = async () => {
            try {
                buffer = await loadAudioBuffer(ctx, clickSound);
            } catch (err) {
                console.error("Failed to load typewriter click sound:", err);
            }

            setupGainNode();

            const playClick = () => {
                if (!soundEnabledRef.current || !buffer || !gainRef.current)
                    return;

                const src = ctx.createBufferSource();
                src.buffer = buffer;
                src.playbackRate.value = 0.9 + Math.random() * 0.2;
                src.connect(gainRef.current);
                src.start(0);

                src.onended = () => {
                    try {
                        src.disconnect();
                    } catch {
                        // ignore
                    }
                };
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
    }, [text, speed, onComplete]);

    // mid animation catch
    useEffect(() => {
        const ctx = getAudioContext();
        if (soundEnabled && ctx.state === "suspended") {
            ctx.resume().catch(() => {});
        }
    }, [soundEnabled]);

    return <span>{displayed}</span>;
};
