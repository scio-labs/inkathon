'use client'

import { PropsWithChildren } from 'react'

import { getDeployments } from '@/deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'

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
