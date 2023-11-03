'use client'

import { Button } from '@/app/components/ui/button'
import { Card } from '@/app/components/ui/card'
import { Form, FormControl, FormItem, FormLabel } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { ContractIds } from '@/deployments/deployments'
import { contractTxWithToast } from '@/lib/utils/contract-tx-with-toast'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type UpdateGreetingValues = { newMessage: string }

export const GreeterContractInteractions: FC = () => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const form = useForm<UpdateGreetingValues>()

  const { register, reset, handleSubmit } = form

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
  const updateGreeting = async ({ newMessage }: UpdateGreetingValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // Send transaction
    setUpdateIsLoading(true)
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateIsLoading(false)
      fetchGreeting()
    }
  }

  if (!api) return null

  return (
    <>
      <div className="flex max-w-[20rem] grow flex-col space-y-4">
        <h2 className="text-center font-mono text-gray-400">Greeter Smart Contract</h2>

        <Form {...form}>
          {/* Fetched Greeting */}
          <Card>
            <FormItem>
              <FormLabel className="text-base">Fetched Greeting</FormLabel>
              <FormControl>
                <Input
                  className="border-white/[.16]"
                  placeholder={fetchIsLoading || !contract ? 'Loading…' : greeterMessage}
                  disabled={true}
                />
              </FormControl>
            </FormItem>
          </Card>

          {/* Update Greeting */}
          <Card>
            <form onSubmit={handleSubmit(updateGreeting)}>
              <div className="flex flex-col justify-end gap-2">
                <FormItem>
                  <FormLabel className="text-base">Update Greeting</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        className="border-white bg-inherit"
                        disabled={updateIsLoading}
                        {...register('newMessage')}
                      />
                      <Button
                        className="bg-purple-200 font-bold hover:bg-purple-300"
                        disabled={fetchIsLoading || updateIsLoading}
                        isLoading={updateIsLoading}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              </div>
            </form>
          </Card>
        </Form>

        {/* Contract Address */}
        <p className="text-center font-mono text-xs text-gray-600">
          {contract ? contractAddress : 'Loading…'}
        </p>
      </div>
    </>
  )
}
