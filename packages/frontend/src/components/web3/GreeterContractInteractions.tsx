import { Button, Card, FormControl, FormLabel, Input, Spinner, Stack, Wrap } from '@chakra-ui/react'
import { deployments } from '@deployments/deployments'
import { ContractPromise } from '@polkadot/api-contract'
import { env } from '@shared/environment'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export const GreeterContractInteractions: FC = () => {
  const { account, signer, api } = usePolkadotProviderContext()
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const form = useForm<{ newMessage: string }>()

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!api) return
    setFetchIsLoading(true)
    try {
      const contract = new ContractPromise(
        api,
        await deployments.greeter.abi,
        deployments.greeter.address,
      )
      const { result, output } = await contract.query.greet('', {})
      const message = output?.toString()
      if (!result?.isOk) throw new Error()
      setGreeterMessage(message)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching greeting. Try again…')
      setGreeterMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGreeting()
  }, [api])

  // Update Greeting
  const updateGreeting = async () => {
    if (!account || !api || !signer) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    setUpdateIsLoading(true)
    try {
      const contract = new ContractPromise(
        api,
        await deployments.greeter.abi,
        deployments.greeter.address,
      )
      const newMessage = form.getValues('newMessage')

      // Estimate gas
      const { gasRequired } = await contract.query.setMessage(
        account.address,
        { storageDepositLimit: null, gasLimit: -1 },
        newMessage,
      )
      const gasLimit = gasRequired.toNumber() * 1.5

      // Execute transaction
      const a = await contract.tx.setMessage({ gasLimit }, newMessage).signAndSend(account.address)

      toast.success(`Successfully updated metadata`)
      fetchGreeting()
    } catch (e) {
      console.error(e)
      toast.error('Error while updating greeting. Try again.')
    } finally {
      setUpdateIsLoading(false)
    }
  }

  // Fetch & update Account Balance

  const fetchBalance = async () => {
    if (!api || !account?.address) return
    const chainMetadata = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      api.rpc.system.localPeerId(),
      api.rpc.system.properties(),
    ])
    console.log(chainMetadata)

    const result: any = await api.query.system.account(account.address)
    const balance = result?.data?.free

    console.log('a', a)
  }
  useEffect(() => {
    fetchBalance()
  }, [api, account])

  // RPC Connection Message
  if (!api)
    return (
      <div tw="mt-8 mb-4 flex items-center space-x-3 text-gray-400">
        <Spinner size="sm" />
        <div tw="font-mono">Connecting to RPC ({env.rpcEndpoint})</div>
      </div>
    )

  return (
    <>
      <div tw="mt-8 mb-4 font-mono text-gray-400">Greeter Smart Contract</div>
      <Wrap>
        <Card variant="outline" p={4}>
          <FormControl>
            <FormLabel>Fetched Greeting</FormLabel>
            <Input placeholder={fetchIsLoading ? 'Loading…' : greeterMessage} disabled={true} />
          </FormControl>
        </Card>
        {!!signer && (
          <Card variant="outline" p={4}>
            <form>
              <Stack direction="row" spacing={2} align="end">
                <FormControl>
                  <FormLabel>Update Greeting</FormLabel>
                  <Input disabled={updateIsLoading} {...form.register('newMessage')} />
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="purple"
                  isLoading={updateIsLoading}
                  type="button"
                  onClick={updateGreeting}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Card>
        )}
      </Wrap>
    </>
  )
}
