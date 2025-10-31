import { useEffect, useRef, useState } from 'react'
import bsodImg from '../assets/images/bsod.jpg'
import crashAudio from '../assets/audio/pc_crash.mp3'

type BSODOverlayProps = {
  onClose?: () => void
}

export default function BSODOverlay({ onClose }: BSODOverlayProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showBSOD, setShowBSOD] = useState(false)
  const [showFlash, setShowFlash] = useState(true)
  const [flashOpacity, setFlashOpacity] = useState(1)
  const [pulseOpacity, setPulseOpacity] = useState(0)

  useEffect(() => {
    const el = document.documentElement

    // Prevent page scroll and hide cursor while active
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Try entering fullscreen (allowed on user gesture path)
    if (!document.fullscreenElement && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {})
    }

    // Play crash audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.volume = 1
      audioRef.current.play().catch(() => {})
    }

    // Quick white flash on mount
    const raf = requestAnimationFrame(() => setFlashOpacity(0))
    const flashTimer = setTimeout(() => setShowFlash(false), 220)

    // Subtle pulses before BSOD reveal
    const pulse = (delay: number) => {
      setTimeout(() => {
        setPulseOpacity(0.22)
        setTimeout(() => setPulseOpacity(0), 80)
      }, delay)
    }
    pulse(380)
    pulse(1150)

    // Reveal the BSOD image after 3 seconds of audio
    const bsodTimer = setTimeout(() => setShowBSOD(true), 3000)

    const onKey = (e: KeyboardEvent) => {
      // Allow escape to exit if desired
      if (e.key === 'Escape') {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {})
        }
        onClose?.()
      }
    }

    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
      clearTimeout(flashTimer)
      clearTimeout(bsodTimer)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] select-none"
      style={{
        backgroundColor: '#000',
        backgroundImage: showBSOD ? `url(${bsodImg})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'none',
      }}
      onClick={() => onClose?.()}
      aria-hidden
    >
      {/* Initial flash overlay */}
      {showFlash && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            opacity: flashOpacity,
            transition: 'opacity 180ms ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Subtle pulse overlay for realism */}
      {pulseOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#fff',
            opacity: pulseOpacity,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Hidden but controlled audio element */}
      <audio ref={audioRef} src={crashAudio} />
    </div>
  )
}
