import { Wrapper } from "./wrapper"

export function Footer() {
  return (
    <Wrapper>
      <footer className="text-center text-foreground/30 text-xs [&_a]:underline [&_a]:decoration-foreground/15 [&_a]:underline-offset-2 [&_a]:hover:decoration-foreground/30">
        Built by{" "}
        <a href="https://scio.xyz" target="_blank" rel="noopener noreferrer">
          Scio Labs
        </a>{" "}
        &{" "}
        <a href="https://zoma.dev" target="_blank" rel="noopener noreferrer">
          Dennis Zoma
        </a>
        . Supported by the{" "}
        <a href="https://use.ink/inkubator" target="_blank" rel="noopener noreferrer">
          ink!ubator
        </a>{" "}
        initative.
      </footer>
    </Wrapper>
  )
}
