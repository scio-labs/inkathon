import {
  Button,
  CheckboxIcon,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { formatBalance } from '@polkadot/util'
import { supportedChains } from '@shared/chains'
import { truncateHash } from '@shared/truncateHash'
import { FC, useEffect, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineDisconnect } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export interface ConnectButtonProps {}
export const ConnectButton: FC<ConnectButtonProps> = () => {
  const {
    activeChain,
    setActiveChain,
    api,
    connect,
    disconnect,
    isLoading,
    account,
    accounts,
    setAccount,
  } = usePolkadotProviderContext()

  // Fetch & update Account Balance
  const [balanceFormatted, setBalanceFormatted] = useState<string>()
  const fetchBalance = async () => {
    if (!api || !account?.address) {
      setBalanceFormatted(undefined)
      return
    }

    const properties = ((await api.rpc.system.properties())?.toHuman() as any) || {}
    const tokenSymbol = properties?.tokenSymbol?.[0] || 'UNIT'
    const result: any = await api.query.system.account(account.address)
    const fullBalance = result?.data?.reserved?.add(result?.data?.free) || 0
    const balance = formatBalance(fullBalance, {
      decimals: 12,
      forceUnit: '-',
      withUnit: false,
    }).split('.')[0]
    setBalanceFormatted(`${balance} ${tokenSymbol}`)
  }
  useEffect(() => {
    fetchBalance()
  }, [api, account])

  // Connect Button
  if (!account)
    return (
      <Button
        onClick={connect}
        isLoading={isLoading}
        size="lg"
        py={7}
        colorScheme="purple"
        rounded="3xl"
      >
        Connect Wallet
      </Button>
    )

  // Account Menu & Disconnect Button
  return (
    <>
      <Menu>
        <HStack>
          {balanceFormatted !== undefined && (
            <Button py={7} pl={5} rounded="3xl" pointerEvents={'none'}>
              {balanceFormatted}
            </Button>
          )}
          <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            hidden={false}
            py={7}
            pl={5}
            rounded="3xl"
          >
            <VStack spacing={0.5} mr={0.5}>
              <Text>{account.meta?.name}</Text>
              <Text fontSize="xs" fontWeight="normal" opacity={0.75}>
                {truncateHash(account.address, 8)}
              </Text>
            </VStack>
          </MenuButton>
        </HStack>

        <MenuList>
          <MenuItem onClick={disconnect} icon={<AiOutlineDisconnect tw="h-4 w-4" />}>
            Disconnect
          </MenuItem>

          {/* Supported Chains */}
          <MenuDivider />
          {(supportedChains || []).map((chain) => (
            <MenuItem
              key={chain.network}
              isDisabled={chain.network === activeChain?.network}
              onClick={() => {
                setActiveChain?.(chain)
              }}
            >
              <CheckboxIcon />
              <VStack align="start" spacing={0}>
                <HStack>
                  <Text>{chain.name}</Text>
                  {chain.network === activeChain?.network && <AiOutlineCheckCircle tw="h-4 w-4" />}
                </HStack>
              </VStack>
            </MenuItem>
          ))}

          {/* Available Accounts/Wallets */}
          <MenuDivider />
          {(accounts || []).map((acc) => (
            <MenuItem
              key={acc.address}
              isDisabled={acc.address === account.address}
              onClick={() => {
                setAccount?.(acc)
              }}
            >
              <CheckboxIcon />
              <VStack align="start" spacing={0}>
                <HStack>
                  <Text>{acc.meta?.name}</Text>
                  {acc.address === account.address && <AiOutlineCheckCircle tw="h-4 w-4" />}
                </HStack>
                <Text fontSize="xs">{truncateHash(acc.address, 10)}</Text>
              </VStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}
