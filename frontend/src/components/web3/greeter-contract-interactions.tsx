'use client'

import { FC, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ContractIds } from '@/deployments/deployments'
import { contractTxWithToast } from '@/utils/contract-tx-with-toast'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
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
      <div className="flex max-w-[22rem] grow flex-col gap-4">
        <h2 className="text-center font-mono text-gray-400">Greeter Smart Contract</h2>

        <Form {...form}>
          {/* Fetched Greeting */}
          <Card>
            <CardContent className="pt-6">
              <FormItem>
                <FormLabel className="text-base">Fetched Greeting</FormLabel>
                <FormControl>
                  <Input
                    placeholder={fetchIsLoading || !contract ? 'Loading…' : greeterMessage}
                    disabled={true}
                  />
                </FormControl>
              </FormItem>
            </CardContent>
          </Card>

          {/* Update Greeting */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(updateGreeting)}>
                <div className="flex flex-col justify-end gap-2">
                  <FormItem>
                    <FormLabel className="text-base">Update Greeting</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input disabled={updateIsLoading} {...register('newMessage')} />
                        <Button
                          className="bg-primary font-bold"
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
            </CardContent>
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
