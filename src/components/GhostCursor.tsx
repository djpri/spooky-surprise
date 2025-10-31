import { useEffect, useRef, useState } from 'react'

export function GhostCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const updateCursor = () => {
      if (!cursorRef.current) return

      // Smooth follow with easing
      const speed = 0.15
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * speed
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * speed

      // Update cursor position using transform for better performance
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`

      // Create trail effect periodically
      if (trailsRef.current && Math.random() > 0.85) {
        createTrail(cursorPos.current.x, cursorPos.current.y)
      }

      animationFrameId.current = requestAnimationFrame(updateCursor)
    }

    const createTrail = (x: number, y: number) => {
      if (!trailsRef.current) return

      const trail = document.createElement('div')
      trail.className = 'ghost-trail'
      trail.style.left = `${x}px`
      trail.style.top = `${y}px`
      trailsRef.current.appendChild(trail)

      // Remove trail after animation
      setTimeout(() => {
        trail.remove()
      }, 1000)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    animationFrameId.current = requestAnimationFrame(updateCursor)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isVisible])

  return (
    <>
      {/* Trail container */}
      <div ref={trailsRef} className="pointer-events-none fixed inset-0 z-[9998]" />

      {/* Ghost cursor */}
      <div
        ref={cursorRef}
        className={`ghost-cursor ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Ghost body */}
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* Main ghost shape */}
          <div className="ghost-body">
            {/* Eyes */}
            <div className="ghost-eyes">
              <div className="ghost-eye" />
              <div className="ghost-eye" />
            </div>

            {/* Wavy bottom */}
            <div className="ghost-wave" />
          </div>
        </div>
      </div>
    </>
  )
}
