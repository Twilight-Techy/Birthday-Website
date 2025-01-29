import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Birthday Countdown",
  description: "Countdown to the 19th birthday celebration",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

