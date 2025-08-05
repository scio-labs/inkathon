import Image from "next/image"
import logoSrc from "@/public/inkathon-logo-with-version--white.svg"

export function Logo() {
  return (
    <Image
      src={logoSrc}
      alt="inkathon Logo"
      className="ml-[25px] select-none"
      width={200}
      height={50}
      priority
    />
  )
}
