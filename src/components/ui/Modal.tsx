import { type HTMLAttributes, useEffect } from 'react'
import { clsx } from 'clsx'

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export function Modal({ isOpen, onClose, title, children, className, ...props }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full max-w-md rounded-sm border border-border bg-surface p-6 shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-heading font-semibold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-sm p-1 text-foreground/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
