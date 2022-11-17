import { ApiPromise, HttpProvider, WsProvider } from '@polkadot/api'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Signer } from '@polkadot/types/types'
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
  activeChain?: PolkadotProviderChain
  setActiveChain?: Dispatch<SetStateAction<PolkadotProviderChain>>
  api?: ApiPromise
  provider?: WsProvider | HttpProvider
  connect?: () => Promise<void>
  disconnect?: () => void
  isLoading?: boolean
  accounts?: InjectedAccountWithMeta[]
  account?: InjectedAccountWithMeta
  signer?: Signer
  setAccount?: Dispatch<SetStateAction<InjectedAccountWithMeta | undefined>>
}
export const PolkadotProviderContext = createContext<PolkadotProviderContextType>({})

export const usePolkadotProviderContext = () => {
  return useContext(PolkadotProviderContext)
}

export interface PolkadotProviderChain {
  network: string
  name: string
  testnet?: boolean
  rpcUrls: [string, ...string[]]
}
export interface PolkadotProviderProps extends PropsWithChildren {
  connectOnInit?: boolean
  defaultChain: PolkadotProviderChain
}
export const PolkadotProvider: FC<PolkadotProviderProps> = ({
  children,
  connectOnInit,
  defaultChain,
}) => {
  const [activeChain, setActiveChain] = useState<PolkadotProviderChain>(defaultChain)
  const [api, setApi] = useState<ApiPromise>()
  const [provider, setProvider] = useState<WsProvider | HttpProvider>()
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [account, setAccount] = useState<InjectedAccountWithMeta>()
  const [signer, setSigner] = useState<Signer>()
  const [isLoading, setIsLoading] = useState<boolean>()

  const initialize = async () => {
    // Initialize polkadot-js/api
    try {
      const provider = new WsProvider(activeChain.rpcUrls[0])
      setProvider(provider)
      const api = await ApiPromise.create({ provider })
      setApi(api)
    } catch (e) {
      console.error('Error while initializing polkadot-js/api:', e)
      setApi(undefined)
      setProvider(undefined)
    }

    // Optionally Connect
    if (connectOnInit) await connect()
  }

  const connect = async () => {
    setIsLoading(true)
    try {
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
    } catch (e) {
      console.error('Error while fetching accounts with polkadot/extension-dapp:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setAccounts([])
    setAccount(undefined)
  }

  // Initialze
  useEffect(() => {
    initialize()
  }, [activeChain?.network])

  // Update signer
  const udpateSigner = async () => {
    if (!account) {
      setSigner(undefined)
      ;(api as any)?.setSigner(undefined)
      return
    }
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp')
      const injector = await web3FromSource(account.meta.source)
      setSigner(injector?.signer)
      api?.setSigner(injector?.signer)
    } catch (e) {
      console.error('Error while getting signer:', e)
      setSigner(undefined)
      ;(api as any)?.setSigner(undefined)
    }
  }
  useEffect(() => {
    udpateSigner()
  }, [account])

  return (
    <PolkadotProviderContext.Provider
      value={{
        activeChain,
        setActiveChain,
        api,
        provider,
        connect,
        disconnect,
        isLoading,
        accounts,
        account,
        signer,
        setAccount,
      }}
    >
      {children}
    </PolkadotProviderContext.Provider>
  )
}
