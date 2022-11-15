import { ApiPromise, WsProvider } from '@polkadot/api'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { env } from '@shared/environment'
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

export type PolkadotProviderContextType = {
  api?: ApiPromise
  connect?: () => Promise<void>
  disconnect?: () => void
  isLoading?: boolean
  accounts?: InjectedAccountWithMeta[]
  account?: InjectedAccountWithMeta
  setAccount?: Dispatch<SetStateAction<InjectedAccountWithMeta | undefined>>
}
export const PolkadotProviderContext = createContext<PolkadotProviderContextType>({})

export const usePolkadotProviderContext = () => {
  return useContext(PolkadotProviderContext)
}

export const PolkadotProvider: FC<PropsWithChildren> = ({ children }) => {
  const [api, setApi] = useState<any>()
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [account, setAccount] = useState<InjectedAccountWithMeta>()
  const [isLoading, setIsLoading] = useState(true)

  const connect = async () => {
    setIsLoading(true)
    try {
      // Initialize polkadot-js/api
      const wsProvider = new WsProvider(env.rpcEndpoint)
      const api = await ApiPromise.create({ provider: wsProvider })
      setApi(api)

      // Initialize polkadot/extension-dapp
      const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
      const extensions = await web3Enable('Azero Domains')
      if (!extensions?.length) {
        toast.error('No Substrate-compatible extension detected.')
      }

      // Query & set connected web3 accounts
      const _accounts = await web3Accounts()
      setAccounts(_accounts || [])
      setAccount(!!_accounts?.length ? _accounts[0] : undefined)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setApi(undefined)
    setAccounts([])
    setAccount(undefined)
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <PolkadotProviderContext.Provider
      value={{ api, connect, disconnect, isLoading, accounts, account, setAccount }}
    >
      {children}
    </PolkadotProviderContext.Provider>
  )
}
