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
import { useBalance, useInkathon } from '@scio-labs/use-inkathon'
import { env } from '@shared/environment'
import { truncateHash } from '@shared/truncateHash'
import { FC } from 'react'
import { AiOutlineCheckCircle, AiOutlineDisconnect } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import 'twin.macro'

export interface ConnectButtonProps {}
export const ConnectButton: FC<ConnectButtonProps> = () => {
  const {
    activeChain,
    setActiveChain,
    connect,
    disconnect,
    isLoading,
    account,
    accounts,
    setAccount,
  } = useInkathon()
  const { tokenSymbol, balance, balanceFormatted } = useBalance(account?.address)

  // Connect Button
  if (!account)
    return (
      <Button
        onClick={connect}
        isLoading={isLoading}
        size="md"
        py={6}
        fontWeight="bold"
        rounded="2xl"
        colorScheme="purple"
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
            <Button
              py={6}
              pl={5}
              rounded="2xl"
              fontWeight="bold"
              fontSize="sm"
              pointerEvents="none"
            >
              {balanceFormatted}
            </Button>
          )}
          <MenuButton
            as={Button}
            rightIcon={<FiChevronDown size={22} />}
            hidden={false}
            py={6}
            pl={5}
            rounded="2xl"
            fontWeight="bold"
          >
            <VStack spacing={0.5}>
              <Text fontSize="sm">{account.meta?.name}</Text>
              <Text fontSize="xs" fontWeight="normal" opacity={0.75}>
                {truncateHash(account.address, 8)}
              </Text>
            </VStack>
          </MenuButton>
        </HStack>

        <MenuList>
          <MenuItem onClick={disconnect} icon={<AiOutlineDisconnect size={18} />}>
            Disconnect
          </MenuItem>

          {/* Supported Chains */}
          <MenuDivider />
          {(env.supportedChains || []).map((chain) => (
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
                  {chain.network === activeChain?.network && <AiOutlineCheckCircle size={16} />}
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
                  {acc.address === account.address && <AiOutlineCheckCircle size={16} />}
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
