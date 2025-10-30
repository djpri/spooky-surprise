import type { LabelHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const baseStyles = 'block text-sm font-medium text-slate-200'

export function Label({ className, ...props }: LabelProps) {
  return <label className={clsx(baseStyles, className)} {...props} />
}

export default Label
