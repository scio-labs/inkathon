import { cva } from "class-variance-authority"
import { BookIcon, ExternalLinkIcon, GithubIcon, MessagesSquareIcon } from "lucide-react"
import { buttonVariants } from "../ui/button-extended"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Logo } from "./logo"
import { Wrapper } from "./wrapper"

const headerLinkVariants = cva([
  "group flex cursor-pointer items-center gap-1.5",
  "*:last:underline-offset-2 *:last:group-hover:underline [&_svg]:size-4 [&_svg]:shrink-0",
])

export function Header() {
  return (
    <Wrapper className="flex flex-col items-center justify-center gap-4">
      <Logo />

      <p className="max-w-lg text-center text-muted-foreground">
        Next generation full-stack boilerplate for ink! smart contracts running on PolkaVM. Powered
        by Papi, ReactiveDOT, Pop CLI, and more.
      </p>

      <div className="flex items-center gap-6">
        <DocsDialog>
          <button type="button" className={headerLinkVariants()}>
            <BookIcon />
            <span>Docs</span>
          </button>
        </DocsDialog>

        <a
          href="https://github.com/scio-labs/inkathon"
          target="_blank"
          rel="noopener noreferrer"
          className={headerLinkVariants()}
        >
          <GithubIcon />
          <span>GitHub</span>
        </a>

        <a
          href="https://t.me/inkathon"
          target="_blank"
          rel="noopener noreferrer"
          className={headerLinkVariants()}
        >
          <MessagesSquareIcon />
          <span>Telegram</span>
        </a>
      </div>
    </Wrapper>
  )
}

const docsTableLinks = [
  {
    library: "ink!",
    link: "https://use.ink/",
  },
  {
    library: "Polkadot API (PAPI)",
    link: "https://papi.how",
  },
  {
    library: "ReactiveDOT",
    link: "https://reactivedot.dev",
  },
  {
    library: "Pop CLI",
    link: "https://learn.onpop.io/contracts",
  },
  {
    library: "ink-node",
    link: "https://github.com/use-ink/ink-node",
  },
  {
    library: "cargo-contract",
    link: "https://github.com/use-ink/cargo-contract",
  },
] as const

function DocsDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Documentation</DialogTitle>
          <DialogDescription>Standalone inkathon docs are coming soon!</DialogDescription>
        </DialogHeader>

        <div className="prose prose-sm dark:prose-invert prose-neutral">
          <h4>Getting Started</h4>
          <p>
            Deploying your first ink! contract and interacting with it is easy! Just follow the
            steps in our repository's <code>README.md</code> on GitHub.
          </p>

          <a
            href="https://github.com/scio-labs/inkathon/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "default",
              className: "no-underline",
            })}
          >
            <GithubIcon /> scio-labs/inkathon
          </a>

          <h4>Ecosystem</h4>
          <p>
            The foundation of this boilerplate leverages various ink! ecosystem projects, including:
          </p>
        </div>

        {/* Third-Party Docs */}
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-foreground">Library</TableHead>
                <TableHead className="text-right text-muted-foreground">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docsTableLinks.map(({ library, link }) => (
                <TableRow key={library}>
                  <TableCell className="font-medium">{library}</TableCell>
                  <TableCell className="text-right">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"inline-flex items-center justify-end gap-1 hover:underline"}
                    >
                      {link.replace("https://", "")}{" "}
                      <ExternalLinkIcon className="mb-px size-3 shrink-0" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
