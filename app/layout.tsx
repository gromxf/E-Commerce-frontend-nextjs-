import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"
import { Header } from "@/components/header"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoStore - Your Trusted Online Marketplace",
  description: "Quality products at competitive prices with exceptional service",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <CartProvider>
            <Header />
            <main>{children}</main>
          </CartProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
