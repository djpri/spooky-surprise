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

/**
 * Ensures the AudioContext is resumed after a user gesture.
 * Returns a promise that resolves once it’s running.
 */

export function unlockAudioContext(): Promise<void> {
    const context = getAudioContext();

    if (context.state === "running") {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const tryResume = () => {
            context
                .resume()
                .then(() => {
                    window.removeEventListener("click", tryResume);
                    window.removeEventListener("keydown", tryResume);
                    window.removeEventListener("touchstart", tryResume);
                    resolve();
                })
                .catch(() => {
                    // Ignore; browser might block until next gesture
                });
        };

        // try immediately
        context
            .resume()
            .then(resolve)
            .catch(() => {
                // wait for any gesture if immediate resume fails
                window.addEventListener("click", tryResume, { once: true });
                window.addEventListener("keydown", tryResume, { once: true });
                window.addEventListener("touchstart", tryResume, {
                    once: true,
                });
            });
    });
}
