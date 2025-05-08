import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "My Store",
  description: "A simple e-commerce store",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
