import { cva, type VariantProps } from "class-variance-authority"
import type { FC } from "react"

export const wrapperVariants = cva("relative mx-auto w-full px-4 py-8 sm:px-8", {
  variants: {
    size: {
      sm: "max-w-(--breakpoint-sm)",
      md: "max-w-(--breakpoint-md)",
      lg: "max-w-(--breakpoint-lg)",
      xl: "max-w-(--breakpoint-xl)",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {}
export const Wrapper: FC<WrapperProps> = ({ size, className, ...rest }) => (
  <div className={wrapperVariants({ size, className })} {...rest} />
)
