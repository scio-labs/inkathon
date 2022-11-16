import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import { truncateHash } from '@shared/truncateHash'
import { FC } from 'react'
import { AiOutlineDisconnect } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export interface ConnectButtonProps {}
export const ConnectButton: FC<ConnectButtonProps> = () => {
  const { connect, disconnect, isLoading, account, accounts, setAccount } =
    usePolkadotProviderContext()

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
    <Menu>
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
      <MenuList>
        <MenuItem onClick={disconnect} icon={<AiOutlineDisconnect />}>
          Disconnect
        </MenuItem>
        <MenuDivider />
        {(accounts || []).map((acc) => (
          <MenuItem
            key={acc.address}
            isDisabled={acc.address === account.address}
            onClick={() => {
              setAccount?.(acc)
            }}
          >
            <VStack align="start" spacing={0}>
              <Text>{acc.meta?.name}</Text>
              <Text fontSize="xs">{truncateHash(acc.address, 10)}</Text>
            </VStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
  // return (
  //   <>
  //     <Button onClick={account ? disconnect : connect} isLoading={isLoading} size="lg">
  //       {!!account ? (
  //         <div tw="flex flex-col space-y-0.5">
  //           <div tw="text-sm">{account.meta?.name}</div>
  //           <div tw="font-normal text-xs opacity-75">{truncateHash(account.address, 42)}</div>
  //         </div>
  //       ) : (
  //         <>Connect Wallet</>
  //       )}
  //     </Button>
  //   </>
  // )
}
