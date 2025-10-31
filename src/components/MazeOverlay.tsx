import { useEffect, useRef, useState } from 'react'
import { levels, LEVEL_SIZE } from '../game/mazeLevels'
import { MazeGameEngine } from '../game/mazeEngine'

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

  useEffect(() => {
    document.body.classList.add('maze-active')
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
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

    return () => {
      document.body.classList.remove('maze-active')
      window.removeEventListener('keydown', handleKey)
      if (startTimerRef.current) window.clearTimeout(startTimerRef.current)
    }
  }, [])

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
              className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                phase === 'failed'
                  ? 'bg-red-500/30'
                  : phase === 'starting'
                  ? 'bg-emerald-500/25'
                  : 'bg-secondary/30'
              }`}
            >
              {phase === 'starting' && (
                <div className="rounded-xl bg-black/60 px-6 py-3 text-3xl font-semibold text-white shadow-lg">GO!</div>
              )}
              {phase === 'failed' && (
                <div className="rounded-xl bg-black/70 px-6 py-3 text-xl font-semibold text-white shadow-lg">
                  You hit a wall — click to retry
                </div>
              )}
              {phase === 'game-complete' && (
                <div className="rounded-xl bg-black/70 px-6 py-3 text-xl font-semibold text-white shadow-lg">
                  All levels complete! Use Exit to return
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
