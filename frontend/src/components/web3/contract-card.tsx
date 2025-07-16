import { createReviveSdk, type ReviveSdkTypedApi } from "@polkadot-api/sdk-ink"
import { useChainId, useTypedApi } from "@reactive-dot/react"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { useSignerAndAddress } from "@/hooks/use-signer-and-address"
import { flipper } from "@/lib/inkathon/deployments"
import { CardSkeleton } from "../layout/skeletons"
import { Button } from "../ui/button-extended"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export function ContractCard() {
  const [queryIsLoading, setQueryIsLoading] = useState(true)

  const api = useTypedApi()
  const chain = useChainId()
  const { signer, signerAddress } = useSignerAndAddress()

  /**
   * Contract Read (Query)
   */
  const [flipperState, setFlipperState] = useState<boolean>()

  const queryContract = useCallback(async () => {
    setQueryIsLoading(true)
    try {
      if (!api || !chain) return

      // Create SDK & contract instance
      const sdk = createReviveSdk(api as ReviveSdkTypedApi, flipper.contract)
      const contract = sdk.getContract(flipper.evmAddresses[chain])

      // Option 1: Query storage directly
      const storageResult = await contract.getStorage().getRoot()
      const newState = storageResult.success ? storageResult.value : undefined
      setFlipperState(newState)

      // Option 2: Query contract
      // NOTE: Unfortunately, as `origin` is mandatory, every passed accounts needs
      //       to be mapped in an extra transaction first before it can be used for querying.
      // WORKAROUNDS: Use pre-mapped `//Alice` or use `getStorage` directly as shown above.
      //
      // const isMapped = await sdk.addressIsMapped(ALICE)
      // if (!isMapped) throw new Error(`Account '${ALICE}' (//Alice) not mapped`)
      //
      // const result = await contract.query("get", { origin: ALICE })
      // const newState = result.success ? result.value.response : undefined
      // setFlipperState(newState)
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
    if (!api || !chain || !signer) return

    const sdk = createReviveSdk(api as ReviveSdkTypedApi, flipper.contract)
    const contract = sdk.getContract(flipper.evmAddresses[chain])

    // Map account if not mapped
    const isMapped = await sdk.addressIsMapped(signerAddress)
    if (!isMapped) {
      toast.error("Account not mapped. Please map your account first.")
      return
    }

    // Send transaction
    const tx = contract
      .send("flip", { origin: signerAddress })
      .signAndSubmit(signer)
      .then((tx) => {
        queryContract()
        if (!tx.ok) throw new Error("Failed to send transaction", { cause: tx.dispatchError })
      })

    toast.promise(tx, {
      loading: "Sending transaction...",
      success: "Successfully flipped",
      error: "Failed to send transaction",
    })
  }, [signer, api, chain])

  if (queryIsLoading) return <CardSkeleton />

  return (
    <Card className="inkathon-card">
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

      <Table className="inkathon-card-table">
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
