import tw, { styled } from 'twin.macro'

export interface WrapperProps {
  noVerticalPadding?: boolean
  noHorizontalPadding?: boolean
}
export const Wrapper = styled.div(({ noVerticalPadding, noHorizontalPadding }: WrapperProps) => [
  tw`relative mx-auto w-full max-w-[1200px]`,
  noVerticalPadding ? tw`py-0` : tw`py-4 sm:py-6 lg:py-8`,
  noHorizontalPadding ? tw`px-4` : tw`sm:px-8`,
])

export const NegativeWrapper = styled.div(() => [
  tw`relative -mx-4 -my-4 sm:-mx-6 lg:(-mx-8 -my-6)`,
])
