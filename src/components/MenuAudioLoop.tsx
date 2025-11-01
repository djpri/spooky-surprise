import { useEffect } from "react";
import menuTrack from "../assets/audio/menu.mp3";
import { useStoryStore } from "../store/storyStore";

const OVERLAP_SECONDS = 0.4;
const FADE_IN_SECONDS = 0.4;
const FADE_OUT_SECONDS = 0.8;
const START_DELAY_SECONDS = 0.1;
const TARGET_VOLUME = 0.5;

export default function MenuAudioLoop() {
    const { soundEnabled } = useStoryStore();

    useEffect(() => {
        if (typeof window === "undefined" || !soundEnabled) {
            return;
        }

        const AudioContextClass =
            (window.AudioContext as typeof AudioContext | undefined) ||
            (
                window as typeof window & {
                    webkitAudioContext?: typeof AudioContext;
                }
            ).webkitAudioContext;

        if (!AudioContextClass) {
            return;
        }

        const context = new AudioContextClass();
        const gainNodes: GainNode[] = [
            context.createGain(),
            context.createGain(),
        ];
        const slotSources: (AudioBufferSourceNode | null)[] = [null, null];
        const timeouts: number[] = [];
        let stopped = false;

        gainNodes.forEach((gain) => {
            gain.gain.value = 0;
            gain.connect(context.destination);
        });

        const scheduleTimeout = (callback: () => void, delayMs: number) => {
            const timeout = window.setTimeout(() => {
                const index = timeouts.indexOf(timeout);
                if (index >= 0) {
                    timeouts.splice(index, 1);
                }
                if (!stopped) {
                    callback();
                }
            }, delayMs);
            timeouts.push(timeout);
        };

        const playSlot = (
            slotIndex: number,
            startTime: number,
            buffer: AudioBuffer
        ) => {
            if (stopped) {
                return;
            }

            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(gainNodes[slotIndex]);

            // Stop any previous source on this slot.
            if (slotSources[slotIndex]) {
                try {
                    slotSources[slotIndex]?.stop();
                } catch {
                    // Ignore errors if the source has already ended.
                }
            }
            slotSources[slotIndex] = source;

            const stopTime = startTime + buffer.duration;
            const fadeInEnd = startTime + FADE_IN_SECONDS;
            const fadeOutStart = Math.max(
                fadeInEnd,
                stopTime - FADE_OUT_SECONDS
            );

            const gain = gainNodes[slotIndex].gain;
            gain.cancelScheduledValues(startTime);
            gain.setValueAtTime(0, startTime);
            gain.linearRampToValueAtTime(TARGET_VOLUME, fadeInEnd);
            gain.setValueAtTime(TARGET_VOLUME, fadeOutStart);
            gain.linearRampToValueAtTime(0, stopTime);

            try {
                source.start(startTime);
                source.stop(stopTime);
            } catch {
                // If scheduling fails, abort this iteration.
                return;
            }

            const nextStart = startTime + buffer.duration - OVERLAP_SECONDS;
            if (nextStart <= startTime) {
                return;
            }

            const delayMs = Math.max(
                (nextStart - context.currentTime) * 1000,
                0
            );
            scheduleTimeout(
                () => playSlot((slotIndex + 1) % 2, nextStart, buffer),
                delayMs
            );
        };

        const start = async () => {
            try {
                await context.resume().catch(() => undefined);
                const response = await fetch(menuTrack);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await context.decodeAudioData(arrayBuffer);

                if (stopped) {
                    return;
                }

                const initialStart = context.currentTime + START_DELAY_SECONDS;
                playSlot(0, initialStart, audioBuffer);
            } catch {
                // Swallow errors to avoid crashing the app if audio fails to load.
            }
        };

        start();

        return () => {
            stopped = true;
            timeouts.forEach((id) => window.clearTimeout(id));
            slotSources.forEach((source) => {
                if (source) {
                    try {
                        source.stop();
                    } catch {
                        /* ignore */
                    }
                }
            });
            gainNodes.forEach((gain) => gain.disconnect());
            context.close().catch(() => undefined);
        };
    }, [soundEnabled]);

    return null;
}
