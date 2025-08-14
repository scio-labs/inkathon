import { GithubInfo } from "fumadocs-ui/components/github-info"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { GlobeIcon, MessagesSquareIcon } from "lucide-react"
import Image from "next/image"

/**
 * Shared layout configurations
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="https://inkathon.xyz/inkathon-icon.png"
          className="-mb-px h-[18px] w-[18px] select-none"
          alt="inkathon"
          width={18}
          height={18}
          priority
        />
        <Image
          src="https://inkathon.xyz/inkathon-logo--white.svg"
          className="h-[16px] w-[85px] select-none invert dark:invert-0"
          alt="inkathon"
          width={85}
          height={16}
          priority
        />
      </>
    ),
  },
  githubUrl: "https://github.com/scio-labs/inkathon",
  links: [
    {
      type: "custom",
      children: (
        <GithubInfo
          owner="scio-labs"
          repo="inkathon"
          className="flex-row items-center [&>p:first-child>svg]:size-[16px]"
        />
      ),
    },
    {
      icon: <GlobeIcon />,
      text: "Live Demo",
      url: "https://inkathon.xyz",
      secondary: false,
      external: true,
    },
    {
      icon: <MessagesSquareIcon />,
      text: "Telegram",
      url: "https://t.me/inkathon",
      secondary: false,
      external: true,
    },
  ],
}
