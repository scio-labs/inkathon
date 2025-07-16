import { Button, type ButtonProps } from "../ui/button-extended"
import { Wrapper } from "./wrapper"

export function AppSkeleton() {
  return (
    <Wrapper size="md" className="flex flex-col items-center gap-8">
      <ButtonSkeleton />

      <div className="flex w-full flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </Wrapper>
  )
}

export function CardSkeleton() {
  return <div className="inkathon-card h-[250px] animate-pulse" />
}

export function ButtonSkeleton(props: ButtonProps) {
  return <Button size="lg" variant="glass" className="w-[200px]" isLoading {...props} />
}
