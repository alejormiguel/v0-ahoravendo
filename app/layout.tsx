import type React from "react"
import { Inter } from "next/font/google"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer"
import "./globals.css"

import { CartProvider } from "@/components/cart-context";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ahora Vendo - Tu Tienda Online",
  description: "Plataforma de comercio electrónico para comprar y vender productos"
}

import { getCart } from "@/app/actions/cart";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  let cartItemCount = 0;
  if (session?.user?.id) {
    const cart = await getCart();
    cartItemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  }
  const sessionWithCart = { ...session, cartItemCount };

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider session={sessionWithCart}>
          <CartProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <div className="flex min-h-screen flex-col">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
