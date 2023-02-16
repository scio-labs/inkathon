import { Button, Card, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { ContractIds } from '@deployments/deployments'
import { ContractPromise } from '@polkadot/api-contract'
import { ContractCallOutcome } from '@polkadot/api-contract/types'
import {
  contractQuery,
  unwrapResultOrError,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'

export const GreeterContractInteractions: FC = () => {
  const { api, account, isConnected, signer } = useInkathon()
  const { contract } = useRegisteredContract(ContractIds.greeter)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const form = useForm<{ newMessage: string }>()

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!contract || !api) return
    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'greet')
      const message = unwrapResultOrError<string>(result)
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
  }, [contract])

  // Update Greeting
  const updateGreeting = async () => {
    if (!account || !signer || !api) {
      toast.error('API not initialized or wallet not connected.')
      return
    }

    setUpdateIsLoading(true)
    try {
      const { web3FromSource } = await import('@polkadot/extension-dapp')
      const injector = await web3FromSource(account.meta.source)
      if (!injector?.signer) throw new Error('No signer')
      api.setSigner(injector.signer)

      // Gather form value
      const newMessage = form.getValues('newMessage')

      // Construct contract object
      const contract = new ContractPromise(
        api,
        await deployments.greeter.abi,
        deployments.greeter.address,
      )
      const abiMessage = contract.abi.messages.find((m) => m.method === 'set_message')
      if (!abiMessage) throw new Error(`Couldn't construct ABI message`)

      // Estimate Gas
      const { gasRequired } = await api.call.contractsApi.call<ContractCallOutcome>(
        account.address,
        deployments.greeter.address,
        new BN(0),
        null,
        null,
        abiMessage.toU8a([newMessage]),
      )

      // Send transaction
      await contract.tx
        .setMessage({ gasLimit: gasRequired }, newMessage)
        .signAndSend(account.address)

      toast.success(`Successfully updated metadata`)
    } catch (e) {
      console.error(e)
      toast.error('Error while updating greeting. Try again.')
    } finally {
      setUpdateIsLoading(false)
    }
  }

  if (!contract) return null

  return (
    <>
      <div tw="flex grow flex-col space-y-4 max-w-[20rem]">
        <h2 tw="text-center font-mono text-gray-400">Greeter Smart Contract</h2>

        {/* Fetched Greeting */}
        <Card variant="outline" p={4} bgColor="whiteAlpha.100">
          <FormControl>
            <FormLabel>Fetched Greeting</FormLabel>
            <Input placeholder={fetchIsLoading ? 'Loading…' : greeterMessage} disabled={true} />
          </FormControl>
        </Card>

        {/* Update Greeting */}
        {!!isConnected && (
          <Card variant="outline" p={4} bgColor="whiteAlpha.100">
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
                  disabled={updateIsLoading}
                  type="button"
                  onClick={updateGreeting}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Card>
        )}
      </div>
    </>
  )
}
