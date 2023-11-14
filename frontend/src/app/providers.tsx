'use client'

import { env } from '@/config/environment'
import { getDeployments } from '@/deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'
import { PropsWithChildren } from 'react'

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <UseInkathonProvider
      appName="ink!athon" // TODO
      connectOnInit={true}
      defaultChain={env.defaultChain}
      deployments={getDeployments()}
    >
      {children}
    </UseInkathonProvider>
  )
}
