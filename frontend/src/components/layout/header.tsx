import { cva } from "class-variance-authority"
import { BookIcon, GithubIcon, MessagesSquareIcon } from "lucide-react"
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
          href="https://docs.inkathon.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className={headerLinkVariants()}
        >
          <BookIcon />
          <span>Docs</span>
        </a>

        <a
          href="https://t.me/inkathon"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className={headerLinkVariants()}
        >
          <MessagesSquareIcon />
          <span>Telegram</span>
        </a>
      </div>
    </Wrapper>
  )
}
