import { Button, Card, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { ContractIds } from '@deployments/deployments'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { contractTxWithToast } from '@utils/contractTxWithToast'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'

export const GreeterContractInteractions: FC = () => {
  const { api, activeAccount, isConnected, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter)
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
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      if (isError) throw new Error(decodedOutput)
      setGreeterMessage(output)
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
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // Gather form value
    const newMessage = form.getValues('newMessage')

    // Send transaction
    setUpdateIsLoading(true)
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [
        newMessage,
      ])
      form.reset()
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateIsLoading(false)
      fetchGreeting()
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

        {/* Contract Address */}
        <p tw="text-center font-mono text-xs text-gray-600">{contractAddress}</p>
      </div>
    </>
  )
}
