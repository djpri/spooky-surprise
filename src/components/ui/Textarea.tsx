import type { TextareaHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const baseStyles =
  'flex min-h-[120px] w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-surface-foreground placeholder:text-foreground/60 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60'

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(baseStyles, className)}
      {...props}
    />
  )
}

export default Textarea
