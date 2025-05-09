"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Search, MapPin, User, ShoppingCart, Heart, Menu, X, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full bg-black text-white">
      {/* Top header section */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/av-ahora-vendo-logo.png" alt="Ahora Vendo" width={120} height={40} className="h-10" />
          </Link>

          {/* Location selector */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Enviar a</span>
            <button className="flex items-center font-medium">Seleccionar CP</button>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="flex w-full relative">
              <Input
                type="search"
                placeholder="Buscar"
                className="rounded-full pr-10 bg-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-0 rounded-full bg-teal-400 hover:bg-teal-500">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* User account */}
          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold">{session?.user?.name || "AQUAHOME S.A."}</span>
                    <span className="text-xs">{session ? "Mi cuenta" : "Perfil Empresa"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white text-black">
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account">Mi cuenta</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Mis pedidos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault()
                        signOut({ callbackUrl: "/" })
                      }}
                    >
                      Cerrar sesión
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Iniciar sesión</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Registrarse</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart and wishlist */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  3
                </span>
              </Link>
              <Link href="/wishlist" className="relative">
                <Heart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  2
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center gap-6 py-2">
            <Link href="/categories" className="flex items-center gap-1 text-sm">
              Categorías <ChevronDown className="h-4 w-4" />
            </Link>
            <Link href="/offers" className="text-sm">
              Ofertas
            </Link>
            <Link href="/new" className="text-sm">
              Novedades
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/av-ahora-vendo-logo.png" alt="Ahora Vendo" width={120} height={40} className="h-10" />
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="container py-4">
            <form onSubmit={handleSearch} className="flex w-full relative mb-6">
              <Input
                type="search"
                placeholder="Buscar"
                className="rounded-full pr-10 bg-white text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" className="absolute right-0 rounded-full bg-teal-400 hover:bg-teal-500">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Enviar a</span>
                <button className="flex items-center font-medium">Seleccionar CP</button>
              </div>
              <div className="space-y-4">
                <Link href="/categories" className="block text-lg">
                  Categorías
                </Link>
                <Link href="/offers" className="block text-lg">
                  Ofertas
                </Link>
                <Link href="/new" className="block text-lg">
                  Novedades
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-800">
                {session ? (
                  <div className="space-y-4">
                    <Link href="/account" className="block text-lg">
                      Mi cuenta
                    </Link>
                    <Link href="/orders" className="block text-lg">
                      Mis pedidos
                    </Link>
                    <button className="block text-lg" onClick={() => signOut({ callbackUrl: "/" })}>
                      Cerrar sesión
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link href="/login" className="block text-lg">
                      Iniciar sesión
                    </Link>
                    <Link href="/register" className="block text-lg">
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
