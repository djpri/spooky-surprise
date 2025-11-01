import { useEffect, useRef, useState } from 'react'
import bsodImg from '../assets/images/bsod.jpg'
import scaryFaceImg from '../assets/images/scary-face.png'
import crashAudio from '../assets/audio/pc_crash.mp3'

declare global {
  interface Window {
    __BSOD_PAUSE_ON_FACE__?: boolean
    resumeBSODEasterEgg?: () => void
  }
}

type BSODOverlayProps = {
  onClose?: () => void
}

export default function BSODOverlay({ onClose }: BSODOverlayProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showBSOD, setShowBSOD] = useState(false)
  const [showFlash, setShowFlash] = useState(true)
  const [flashOpacity, setFlashOpacity] = useState(1)
  const [pulseOpacity, setPulseOpacity] = useState(0)
  const [preGlitch, setPreGlitch] = useState(true)
  const [showScaryFace, setShowScaryFace] = useState(false)
  const inputLockedRef = useRef(false)

  // Lock all user input immediately while the overlay sequence runs
  useEffect(() => {
    const lockMs = 7500 // length of input lock while BSOD sequence is active
    inputLockedRef.current = true

    const blocker = (e: Event) => {
      e.preventDefault()
      // @ts-ignore - available at runtime
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation()
      e.stopPropagation()
    }

    const types = [
      'keydown',
      'keypress',
      'keyup',
      'mousedown',
      'mouseup',
      'mousemove',
      'click',
      'dblclick',
      'pointerdown',
      'pointerup',
      'pointermove',
      'contextmenu',
      'wheel',
      'touchstart',
      'touchmove',
      'touchend',
    ] as const

    const opts: AddEventListenerOptions = { capture: true, passive: false }
    const removeFns: Array<() => void> = []
    types.forEach((t) => {
      window.addEventListener(t, blocker, opts)
      document.addEventListener(t, blocker, opts)
      removeFns.push(() => {
        window.removeEventListener(t, blocker, opts)
        document.removeEventListener(t, blocker, opts)
      })
    })

    // If user exits fullscreen via Escape, immediately re-enter while locked
    const onFsChange = () => {
      if (inputLockedRef.current) {
        const el = document.documentElement as HTMLElement & { requestFullscreen?: () => Promise<void> }
        if (!document.fullscreenElement && el.requestFullscreen) {
          el.requestFullscreen().catch(() => {})
        }
      }
    }
    document.addEventListener('fullscreenchange', onFsChange)

    const unlockTimer = setTimeout(() => {
      removeFns.forEach((fn) => fn())
      document.removeEventListener('fullscreenchange', onFsChange)
      inputLockedRef.current = false
    }, lockMs)

    return () => {
      clearTimeout(unlockTimer)
      removeFns.forEach((fn) => fn())
      document.removeEventListener('fullscreenchange', onFsChange)
      inputLockedRef.current = false
    }
  }, [])

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

    // Reveal the BSOD image after 3 seconds of audio
    const bsodTimer = setTimeout(() => setShowBSOD(true), 3000)

    // Pre-glitch: global RGB split before any flash so user sees it
    const preMs = 220
    const startPostGlitchSequence = () => {
      // Quick white flash after pre-glitch
      const raf = requestAnimationFrame(() => setFlashOpacity(0))
      const flashTimer = setTimeout(() => setShowFlash(false), 220)

      // Subtle pulses before BSOD reveal
      const pulse = (delay: number, revealFace = false) => {
        const pulseTimer = window.setTimeout(() => {
          if (revealFace) setShowScaryFace(true)
          setPulseOpacity(0.22)
          if (revealFace && window.__BSOD_PAUSE_ON_FACE__) {
            clearTimeout(bsodTimer)
            window.resumeBSODEasterEgg = () => {
              window.resumeBSODEasterEgg = undefined
              setPulseOpacity(0)
              setShowScaryFace(false)
              setTimeout(() => setShowBSOD(true), 0)
            }
            return
          }

          const faceHideTimer = revealFace
            ? window.setTimeout(() => setShowScaryFace(false), 45)
            : undefined
          if (faceHideTimer) cleanupFns.push(() => clearTimeout(faceHideTimer))

          const fadeTimer = window.setTimeout(() => {
            setPulseOpacity(0)
            if (revealFace) setShowScaryFace(false)
          }, 90)
          cleanupFns.push(() => clearTimeout(fadeTimer))
        }, delay)
        cleanupFns.push(() => clearTimeout(pulseTimer))
      }
      pulse(380)
      pulse(1150, true)

      cleanupFns.push(() => {
        cancelAnimationFrame(raf)
        clearTimeout(flashTimer)
        if (window.resumeBSODEasterEgg) {
          window.resumeBSODEasterEgg = undefined
        }
      })
    }

    // Inject temporary RGB split via CSS filter and inline SVG
    const prevRootFilter = (document.documentElement as HTMLElement).style.filter
    ;(document.documentElement as HTMLElement).style.filter = 'url(#rgb-split-filter)'
    const preTimer = setTimeout(() => {
      ;(document.documentElement as HTMLElement).style.filter = prevRootFilter
      setPreGlitch(false)
      startPostGlitchSequence()
    }, preMs)
    const cleanupFns: Array<() => void> = []

    const onKey = (e: KeyboardEvent) => {
      // Allow escape to exit if desired
      if (!inputLockedRef.current && e.key === 'Escape') {
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
      clearTimeout(preTimer)
      ;(document.documentElement as HTMLElement).style.filter = prevRootFilter
      cleanupFns.forEach((fn) => fn())
      clearTimeout(bsodTimer)
      setShowScaryFace(false)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] select-none"
      style={{
        backgroundColor: preGlitch ? 'transparent' : '#000',
        backgroundImage: showBSOD ? `url(${bsodImg})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'none',
      }}
      onClick={() => {
        if (!inputLockedRef.current) onClose?.()
      }}
      aria-hidden
    >
      {/* Inline SVG filter for RGB split applied to <html> during pre-glitch */}
      <svg width="0" height="0" style={{ position: 'fixed' }} aria-hidden>
        <filter id="rgb-split-filter">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
          <feOffset in="red" dx="-1" dy="0" result="r" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
          <feOffset in="green" dx="0" dy="0" result="g" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
          <feOffset in="blue" dx="1" dy="0" result="b" />
          <feBlend mode="screen" in="r" in2="g" result="rg" />
          <feBlend mode="screen" in="rg" in2="b" />
        </filter>
      </svg>

      {/* Initial flash overlay */}
      {!preGlitch && showFlash && (
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
      {!preGlitch && pulseOpacity > 0 && (
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

      {/* Quick scare frame during black flicker */}
      {showScaryFace && !showBSOD && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.92) 100%)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 'min(38vmin, 360px)',
              aspectRatio: '1',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 0 120px 60px rgba(0, 0, 0, 0.85)',
            }}
          >
            <img
              src={scaryFaceImg}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit',
                opacity: 0.28,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.8) 100%)',
              }}
            />
          </div>
        </div>
      )}

      {/* Hidden but controlled audio element */}
      <audio ref={audioRef} src={crashAudio} />
    </div>
  )
}
