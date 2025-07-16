import { Geist_Mono as FontMono, Geist as FontSans } from "next/font/google"
import { cn } from "../lib/utils"

export const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  style: ["normal"],
})

export const fontMono = FontMono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const fontStyles = cn(fontSans.variable, fontMono.variable)
