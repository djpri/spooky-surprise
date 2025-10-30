import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const baseStyles =
  'flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60'

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={clsx(baseStyles, className)}
      {...props}
    />
  )
}

export default Input
