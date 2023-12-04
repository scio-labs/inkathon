import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

export interface SpinnerProps {
  className?: string
}
export const Spinner: FC<SpinnerProps> = ({ className, ...rest }) => (
  <Loader2 className={cn('h-4 w-4 animate-spin-fast', className)} {...rest} />
)
