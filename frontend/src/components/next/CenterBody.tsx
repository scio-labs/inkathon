import { cn } from '@/lib/utils/cn'
import { PropsWithChildren } from 'react'

interface CenterBodyProps extends PropsWithChildren {
  className?: string
}
export function CenterBody({ className, children }: CenterBodyProps) {
  return (
    <>
      <div className={cn('relative flex h-full flex-col items-center justify-center', className)}>
        {children}
      </div>
    </>
  )
}
