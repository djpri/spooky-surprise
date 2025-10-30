import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>


const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60'

/**
 * Base button component with default styles
 */
export function Button({ className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(baseStyles, className)}
      {...props}
    />
  )
}

export default Button
