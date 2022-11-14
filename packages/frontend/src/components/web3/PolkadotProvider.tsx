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

export type PolkadotProviderContextType = {
  api?: ApiPromise
  setup?: () => Promise<void>
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

  const setup = async () => {
    // Initialize polkadot-js/api
    const wsProvider = new WsProvider(env.rpcEndpoint)
    const api = await ApiPromise.create({ provider: wsProvider })
    setApi(api)

    // Initialize polkadot/extension-dapp
    const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
    await web3Enable('Azero Domains')

    // Query & set connected web3 accounts
    const _accounts = await web3Accounts()
    setAccounts(_accounts)
    setAccount(!!_accounts?.length ? _accounts[0] : undefined)
  }

  useEffect(() => {
    setup()
  }, [])

  return (
    <PolkadotProviderContext.Provider value={{ api, setup, accounts, account, setAccount }}>
      {children}
    </PolkadotProviderContext.Provider>
  )
}
