import Link, { LinkProps } from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
  RefAttributes,
} from 'react'
import { SpinnerCircular } from 'spinners-react'
import 'twin.macro'
import tw, { styled, theme } from 'twin.macro'

const BaseButtonWrapper = styled.button(({ variant, disabled }: Partial<BaseButtonProps>) => [
  tw`relative flex items-center justify-center rounded-lg py-4 px-5 font-semibold text-sm uppercase leading-none`,
  variant === 'outline'
    ? tw`border border-white bg-transparent text-white backdrop-blur-md`
    : tw`border border-transparent bg-white text-black`,
  disabled && tw`cursor-not-allowed opacity-50`,
  disabled && (variant === 'outline' ? tw`text-white/75` : tw`text-black/75`),
])
const BaseButtonLinkWrapper = BaseButtonWrapper.withComponent(Link)

type ButtonAndAnchorProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps &
  RefAttributes<HTMLAnchorElement>
export interface BaseButtonProps extends Partial<ButtonAndAnchorProps> {
  variant?: 'solid' | 'outline'
  isLoading?: boolean
  asLink?: boolean
}
export const BaseButton: FC<PropsWithChildren<BaseButtonProps>> = ({
  children,
  variant,
  isLoading,
  asLink,
  ...props
}) => {
  const wrapperProps = { variant, isLoading }
  return asLink ? (
    <BaseButtonLinkWrapper {...(props as any)}>{children}</BaseButtonLinkWrapper>
  ) : (
    <BaseButtonWrapper {...wrapperProps} {...(props as any)}>
      <div css={[isLoading && tw`opacity-0`]}>{children}</div>

      {/* Loading Animation Overlay */}
      {isLoading && (
        <div tw="absolute inset-0 flex items-center justify-center">
          <SpinnerCircular
            size={24}
            thickness={150}
            color={variant === 'outline' ? theme('colors.gray.800') : theme('colors.gray.200')}
            secondaryColor={
              variant === 'outline' ? theme('colors.gray.300') : theme('colors.gray.700')
            }
          />
        </div>
      )}
    </BaseButtonWrapper>
  )
}

export const BaseButtonGroup = styled.div`
  ${tw`-mx-1 -my-1 flex flex-wrap`}
  button, a {
    ${tw`mx-1 my-1`}
  }
`
