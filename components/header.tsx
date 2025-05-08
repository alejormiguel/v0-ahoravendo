"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"

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
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">AmazonClone</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className={`text-sm font-medium ${
                pathname === "/products" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium ${
                pathname === "/categories" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className={`text-sm font-medium ${
                pathname === "/deals" ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Deals
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="flex w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="rounded-r-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="default" className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-1">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline-block text-sm font-medium">Cart</span>
          </Link>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                  {session.user?.image ? (
                    <img
                      src={session.user.image || "/placeholder.svg"}
                      alt={session.user.name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                    {session.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault()
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">AmazonClone</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="container grid gap-6 py-6">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="default" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <Link href="/products" className="text-lg font-medium" onClick={toggleMenu}>
              All Products
            </Link>
            <Link href="/categories" className="text-lg font-medium" onClick={toggleMenu}>
              Categories
            </Link>
            <Link href="/deals" className="text-lg font-medium" onClick={toggleMenu}>
              Deals
            </Link>
            {session ? (
              <>
                <Link href="/account" className="text-lg font-medium" onClick={toggleMenu}>
                  Account
                </Link>
                <Link href="/orders" className="text-lg font-medium" onClick={toggleMenu}>
                  Orders
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start px-0 text-lg font-medium"
                  onClick={() => {
                    signOut({ callbackUrl: "/" })
                    toggleMenu()
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Link href="/login" className="text-lg font-medium" onClick={toggleMenu}>
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
