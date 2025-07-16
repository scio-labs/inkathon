/**
 * IMPORTANT: This file is modified from the original shadcn/ui file.
 *            DO NOT OVERWRITE IT WITH THE CLI.
 */

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderIcon } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

const buttonOuterVariants = cva(
  "relative inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium text-sm ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-foreground/5 text-foreground hover:bg-foreground/15 dark:bg-foreground/10 dark:hover:bg-foreground/15",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary decoration-inherit underline-offset-2 hover:underline",
        glass:
          "!bg-foreground/25 hover:!bg-foreground/30 border border-foreground/10 shadow-lg ring-1 ring-foreground/10 ring-offset-2 ring-offset-background hover:ring-2 hover:ring-foreground/20",
      },
      size: {
        sm: "h-8 rounded-lg px-3",
        default: "h-10 rounded-lg px-4 py-2",
        lg: "h-11 rounded-xl px-5",
        xl: "h-12 rounded-2xl px-9 text-base",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonInnerVariants = cva("inline-flex items-center justify-center gap-2", {
  variants: {
    isLoading: {
      true: "pointer-events-none opacity-0",
    },
  },
})

const buttonVariants = (props?: Parameters<typeof buttonOuterVariants>[0]) =>
  cn(buttonOuterVariants(props), buttonInnerVariants())

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonOuterVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonOuterVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        <React.Fragment>
          <div className={buttonInnerVariants({ isLoading })}>{children}</div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              <LoaderIcon className="animate-spin" />
              {!!loadingText && loadingText}
            </div>
          )}
        </React.Fragment>
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
