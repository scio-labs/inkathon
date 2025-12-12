import { useChainSpecData, useLazyLoadQuery } from "@reactive-dot/react"
import { Card, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"

export function ChainInfoCard() {
  const chainSpec = useChainSpecData()
  const [chainId, ss58Prefix, version] = useLazyLoadQuery((query) =>
    query
      .constant("Revive", "ChainId")
      .constant("System", "SS58Prefix")
      .constant("System", "Version"),
  )

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
              {chainSpec.name} ({version.impl_name})
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Version</TableCell>
            <TableCell>{version.system_version}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>SS58 Prefix</TableCell>
            <TableCell>{ss58Prefix}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Pallet Revive</TableCell>
            <TableCell>{chainId ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
