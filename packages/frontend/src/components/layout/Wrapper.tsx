import tw, { styled } from 'twin.macro'

export const Wrapper = styled.div({
  ...tw`relative mx-auto w-full max-w-[1600px] px-4 py-4 sm:(px-8 py-6) lg:py-8`,
  variants: {
    noVerticalPadding: {
      true: tw`py-0!`,
    },
  },
})

export const NegativeWrapper = tw.div`relative -mx-4 -my-4 sm:(-mx-6) lg:(-mx-8 -my-6)`
