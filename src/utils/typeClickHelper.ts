export async function loadAudioBuffer(
    ctx: AudioContext,
    url: string
): Promise<AudioBuffer> {
    const res = await fetch(url);
    const data = await res.arrayBuffer();
    return await ctx.decodeAudioData(data);
}
