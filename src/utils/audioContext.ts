let ctx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
    if (!ctx) {
        const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
                .webkitAudioContext;

        if (!AudioCtx) {
            throw new Error("Web Audio API is not supported in this browser.");
        }

        ctx = new AudioCtx();
    }
    return ctx;
}
