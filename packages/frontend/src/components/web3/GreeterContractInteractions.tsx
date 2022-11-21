import { Button, Card, FormControl, FormLabel, Input, Stack, Wrap } from '@chakra-ui/react'
import { ContractKeys, useDeployment } from '@deployments/deployments'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'
import { usePolkadotProviderContext } from './PolkadotProvider'

export const GreeterContractInteractions: FC = () => {
  const { activeChain, account, signer } = usePolkadotProviderContext()
  const { contract } = useDeployment(ContractKeys.greeter)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const form = useForm<{ newMessage: string }>()

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!contract) return
    setFetchIsLoading(true)
    try {
      const { result, output } = await contract.query.greet('', {})
      const message = output?.toString()
      if (!result?.isOk) throw new Error(result.toString())
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
    if (!account || !contract || !signer) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    setUpdateIsLoading(true)
    try {
      // Gather form value
      const newMessage = form.getValues('newMessage')

      // Estimate gas
      const { gasRequired } = await contract.query.setMessage(
        account.address,
        { storageDepositLimit: null, gasLimit: -1 },
        newMessage,
      )
      const gasLimit = gasRequired.toNumber() * 1.5

      // Execute transaction
      await contract.tx
        .setMessage({ gasLimit }, newMessage)
        .signAndSend(account.address, (result) => {
          if (result?.status?.isInBlock) fetchGreeting()
        })
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
      <h2 tw="mt-10 mb-4 font-mono text-gray-400">Greeter Smart Contract</h2>
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
