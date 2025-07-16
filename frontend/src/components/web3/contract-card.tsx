import { createReviveSdk } from "@polkadot-api/sdk-ink"
import { useAccounts, useChainId, useTypedApi } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { ALICE } from "@/lib/inkathon/constants"
import { flipper } from "@/lib/inkathon/deployments"
import { CardSkeleton } from "../layout/skeletons"
import { Button } from "../ui/button-extended"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export function ContractCard() {
  const [queryIsLoading, setQueryIsLoading] = useState(true)

  const api = useTypedApi()
  const chain = useChainId()
  const accounts = useAccounts()

  /**
   * Contract Read (Query)
   */
  const [flipperState, setFlipperState] = useState<boolean>()

  const queryContract = useCallback(async () => {
    setQueryIsLoading(true)
    try {
      if (!api || !chain) return

      // Create SDK & contract instance
      const sdk = createReviveSdk(api, flipper.contract)
      const contract = sdk.getContract(flipper.evmAddresses[chain])

      // Ensure account is mapped (it most likely is)
      const isMapped = await sdk.addressIsMapped(ALICE)
      if (!isMapped) throw new Error(`Account '${ALICE}' (//Alice) not mapped`)

      // Query contract
      const result = await contract.query("get", { origin: ALICE })
      const newState = result.success ? result.value.response : undefined
      setFlipperState(newState)
    } catch (error) {
      console.error(error)
    } finally {
      setQueryIsLoading(false)
    }
  }, [api, chain])

  useEffect(() => {
    queryContract()
  }, [queryContract])

  /**
   * Contract Write (Transaction)
   */
  const handleFlip = useCallback(async () => {
    if (!api || !chain || !accounts?.length) return

    const account = accounts[0]
    const sdk = createReviveSdk(api, flipper.contract)
    const contract = sdk.getContract(flipper.evmAddresses[chain])

    // Map account if not mapped
    const isMapped = await sdk.addressIsMapped(account.address)
    if (!isMapped) {
      try {
        const txResult = await api.tx.Revive.map_account().signAndSubmit(account.polkadotSigner)
        if (!txResult.ok) {
          throw txResult.dispatchError
        }
      } catch (error) {
        toast.error("Failed to map account. Do you have enough funds?")
        console.error(error)
        return
      }
    }

    // Send transaction
    const tx = contract
      .send("flip", { origin: account.address })
      .signAndSubmit(account.polkadotSigner)
      .then((tx) => {
        queryContract()
        if (!tx.ok) throw new Error("Failed to send transaction", { cause: tx.dispatchError })
      })

    toast.promise(tx, {
      loading: "Sending transaction...",
      success: "Successfully flipped",
      error: "Failed to send transaction",
    })
  }, [accounts, api, chain])

  if (queryIsLoading) return <CardSkeleton />

  return (
    <Card className="glass-card">
      <CardHeader className="relative">
        <CardTitle>Flipper Contract</CardTitle>

        <Button
          variant="default"
          size="sm"
          className="-top-2 absolute right-6"
          onClick={() => handleFlip()}
        >
          Call Flip
        </Button>
      </CardHeader>

      <Table className="glass-card-table">
        <TableBody>
          <TableRow>
            <TableCell>Flip State</TableCell>
            <TableCell>
              {flipperState === true ? "True" : flipperState === false ? "False" : "Unknown"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{flipper.evmAddresses[chain]}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Language</TableCell>
            <TableCell>{flipper.contract.metadata.source.language}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Compiler</TableCell>
            <TableCell>{flipper.contract.metadata.source.compiler}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
