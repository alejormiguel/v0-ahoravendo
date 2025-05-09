import type React from "react"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ahora Vendo - Tu Tienda Online",
  description: "Plataforma de comercio electrónico para comprar y vender productos",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 bg-gray-50">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
