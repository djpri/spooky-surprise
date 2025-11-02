import { useEffect, useRef, useState } from 'react'
import { levels, LEVEL_SIZE } from '../game/mazeLevels'
import { MazeGameEngine } from '../game/mazeEngine'
import { Button } from './ui/Button'

type Props = {
  onClose: () => void
}

export default function MazeOverlay({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<MazeGameEngine | null>(null)
  const [status, setStatus] = useState<string>('Move mouse to green START, reach red GOAL.')
  const [levelIdx, setLevelIdx] = useState(0)
  const [phase, setPhase] = useState<'ready' | 'starting' | 'playing' | 'failed' | 'game-complete'>('ready')
  const startTimerRef = useRef<number | null>(null)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  // Detect if environment is supported (desktop-like width and mouse pointer)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mqDesktop = window.matchMedia('(min-width: 1024px)')
    const mqFinePointer = window.matchMedia('(pointer: fine)')
    const evaluate = () => setIsSupported(mqDesktop.matches && mqFinePointer.matches)
    evaluate()
    // Update on resize or pointer changes
    mqDesktop.addEventListener?.('change', evaluate)
    mqFinePointer.addEventListener?.('change', evaluate)
    return () => {
      mqDesktop.removeEventListener?.('change', evaluate)
      mqFinePointer.removeEventListener?.('change', evaluate)
    }
  }, [])

  // Base overlay lifecycle (cursor/escape handling) — only when supported
  useEffect(() => {
    if (isSupported !== true) return
    document.body.classList.add('maze-active')
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.classList.remove('maze-active')
      window.removeEventListener('keydown', handleKey)
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current)
    }
  }, [isSupported, onClose])

  // Initialize engine only when supported
  useEffect(() => {
    if (isSupported !== true) return
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = LEVEL_SIZE.width
    canvas.height = LEVEL_SIZE.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    engineRef.current = new MazeGameEngine(ctx, levels, (ev) => {
      if (ev.type === 'start') {
        setPhase('starting')
        setStatus('Level started — stay on the path!')
        if (startTimerRef.current) window.clearTimeout(startTimerRef.current)
        startTimerRef.current = window.setTimeout(() => {
          setPhase('playing')
        }, 800)
      } else if (ev.type === 'fail') {
        setPhase('failed')
        setStatus('You touched a wall! Click canvas to retry level.')
      } else if (ev.type === 'level-complete') {
        setLevelIdx((prev) => prev + 1)
        setPhase('ready')
        setStatus('Level cleared! Move to START to begin next level.')
      } else if (ev.type === 'game-complete') {
        setPhase('game-complete')
        setStatus('You escaped all mazes! Click Exit to return.')
      }
    })
  }, [isSupported])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY
    engineRef.current?.handleMouseMove(x, y)
  }

  const handleClick = () => {
    // Reset level on click if failed
    if (phase === 'failed') {
      engineRef.current?.resetLevel()
      setPhase('ready')
      setStatus('Move mouse to green START, reach red GOAL.')
    }
  }

  // If unsupported, close (if possible) and render nothing — no user alteration
  useEffect(() => {
    if (isSupported === false) onClose()
  }, [isSupported, onClose])
  if (isSupported !== true) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4">
      <div className="relative flex max-w-full flex-col items-center gap-3 rounded-xl border border-border bg-surface p-4 text-surface-foreground shadow-2xl">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="text-sm opacity-70">Level {levelIdx + 1} / {levels.length}</div>
          <button className="rounded border border-border bg-background px-3 py-1 text-sm hover:bg-background/70" onClick={onClose}>Exit</button>
        </div>
        {/* Dev: Level select */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {levels.map((_, i) => (
            <button
              key={i}
              className={`rounded border px-2 py-1 text-xs ${i === levelIdx ? 'bg-primary text-primary-foreground border-transparent' : 'bg-background hover:bg-background/70 border-border'}`}
              onClick={() => {
                engineRef.current?.setLevel(i)
                setLevelIdx(i)
                setPhase('ready')
                setStatus('Jumped to level ' + (i + 1) + ' — move to START')
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className={`h-[60vh] w-[85vw] max-h-[600px] max-w-[1000px] border border-border bg-white transition-opacity duration-300 ${
              phase === 'failed' ? 'opacity-40' : phase === 'starting' ? 'opacity-80' : 'opacity-100'
            }`}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          />
          {(phase === 'starting' || phase === 'failed' || phase === 'game-complete') && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                phase === 'game-complete' ? 'pointer-events-auto' : 'pointer-events-none'
              } ${
                phase === 'failed'
                  ? 'bg-red-500/30'
                  : phase === 'starting'
                  ? 'bg-emerald-500/25'
                  : 'bg-secondary/30'
              }`}
            >
              {phase === 'starting' && (
                <div className="pointer-events-none rounded-xl bg-black/60 px-6 py-3 text-3xl font-semibold text-white shadow-lg">GO!</div>
              )}
              {phase === 'failed' && (
                <div className="pointer-events-none rounded-xl bg-black/70 px-6 py-3 text-xl font-semibold text-white shadow-lg">
                  You hit a wall — click to retry
                </div>
              )}
              {phase === 'game-complete' && (
                <div className="flex flex-col items-center gap-4 rounded-xl bg-black/70 px-8 py-6 text-white shadow-lg">
                  <div className="text-3xl font-extrabold">🎉 Congratulations!</div>
                  <div className="text-center text-sm opacity-90">You escaped all mazes.</div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        engineRef.current?.setLevel(0)
                        setLevelIdx(0)
                        setPhase('ready')
                        setStatus('Start again! Move to START to begin level 1.')
                      }}
                    >
                      Play Again
                    </Button>
                    <Button onClick={onClose} className="bg-background text-foreground hover:bg-background/80 border border-border">
                      Exit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-sm text-foreground/80">
          {status} <span className="opacity-60">(Esc to exit)</span>
        </div>
      </div>
    </div>
  )
}
