import { useEffect, useRef } from "react";
import { useSceneAudio, useStoryStore } from "../store/storyStore";

export default function SceneAudioPlayer() {
  const { soundEnabled, volume } = useStoryStore();
  const sceneAudio = useSceneAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // If no scene audio or sound is disabled, stop and clear
    if (!sceneAudio || !soundEnabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    // Create or reuse audio element
    if (!audioRef.current) {
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audio.loop = false; // Don't loop scene audio
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    // Only restart if the audio path changed
    if (audio.src !== sceneAudio) {
      audio.src = sceneAudio;
      audio.currentTime = 0;
      audio.volume = Math.min(volume * 2, 1); // Boost volume for scene audio, cap at 1

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug("Scene audio playback failed:", err);
        });
      }
    } else if (audio.paused && audio.src) {
      // Resume if it was paused
      audio.volume = Math.min(volume * 2, 1);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug("Scene audio resume failed:", err);
        });
      }
    }
  }, [sceneAudio, soundEnabled, volume]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
}
