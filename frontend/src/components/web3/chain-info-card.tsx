import { useChainMeta } from "@/hooks/use-chain-meta"
import { CardSkeleton } from "../layout/skeletons"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export function ChainInfoCard() {
  const { chainMeta, isLoading } = useChainMeta()

  if (isLoading) return <CardSkeleton />

  return (
    <Card className="inkathon-card">
      <CardHeader>
        <CardTitle>Chain Metadata</CardTitle>
      </CardHeader>

      <Table className="inkathon-card-table">
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              {chainMeta?.name} ({chainMeta?.implName})
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Version</TableCell>
            <TableCell>{chainMeta?.systemVersion}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>SS58 Prefix</TableCell>
            <TableCell>{chainMeta?.ss58Prefix}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Pallet Revive</TableCell>
            <TableCell>{chainMeta?.hasPalletRevive ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
