import "@/styles/index.scss"
import { Navbar } from "@/components"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Quality chords",
  description: "Quality guitar chord shapes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className="">
          <Navbar />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
