import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="https://inkathon.xyz/inkathon-icon.png"
          alt="inkathon Logo"
          width={20}
          height={20}
          priority
        />
        inkathon
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
}
