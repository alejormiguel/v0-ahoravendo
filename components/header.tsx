"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { MapPin, Search, ChevronDown, ShoppingBag, Heart, Bell } from "lucide-react"

import { Input } from "@/components/ui/input"
import { PostalCodeModal } from "@/components/postal-code-modal"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isPostalCodeModalOpen, setIsPostalCodeModalOpen] = useState(false)
  const [selectedPostalCode, setSelectedPostalCode] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSelectPostalCode = (postalCode: string) => {
    setSelectedPostalCode(postalCode)
  }

  return (
    <header className="w-full">
      {/* Location banner */}
      <div className="w-full bg-fuchsia-600 text-white py-2 relative overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <p className="text-sm md:text-base">
            ¡Seleccioná tu ubicación y conocé los productos, promociones y oportunidades más cercanas a vos!
          </p>
          <button
            className="bg-white text-fuchsia-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100"
            onClick={() => setIsPostalCodeModalOpen(true)}
          >
            Seleccionar ubicación
          </button>
        </div>
        {/* Background decorative elements */}
        <div className="absolute left-0 top-0 w-24 h-24 rounded-full bg-fuchsia-500 opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main header */}
      <div className="w-full bg-fuchsia-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/ahora-vendo-logo.png" alt="Ahora Vendo" className="h-12 w-auto" />
            </Link>

            {/* Location selector */}
            <button
              className="flex items-center gap-2 mx-4 text-white hover:text-white/90"
              onClick={() => setIsPostalCodeModalOpen(true)}
            >
              <MapPin className="h-5 w-5" />
              <div className="flex flex-col items-start text-sm">
                <span>Enviar a</span>
                <span className="font-medium">{selectedPostalCode || "Seleccionar CP"}</span>
              </div>
            </button>

            {/* Search bar */}
            <div className="flex-1 max-w-xl mx-4">
              <form onSubmit={handleSearch} className="flex w-full relative">
                <Input
                  type="search"
                  placeholder="¿Qué productos y marcas querés explorar?"
                  className="rounded-full pr-10 bg-white text-black border-0 pl-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-3 rounded-r-full text-white bg-teal-400 hover:bg-teal-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* User account */}
            <div className="flex items-center gap-2 mx-4">
              <div className="flex items-center gap-1">
                <div className="flex flex-col items-start">
                  <span className="font-medium">{session?.user?.name || "Juan Perez"}</span>
                  <span className="text-xs">Perfil Personal</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Icons: Notifications, Cart and Wishlist */}
            <div className="flex items-center gap-4">
              {/* Shopping Bag - with white border and rounded corners */}
              <Link href="/cart" className="relative">
                <div className="p-1.5 text-white border border-white rounded-lg">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  3
                </span>
              </Link>

              {/* Wishlist Heart - with white border and rounded corners */}
              <Link href="/wishlist" className="relative">
                <div className="p-1.5 text-white border border-white rounded-lg">
                  <Heart className="h-6 w-6" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  5
                </span>
              </Link>

              {/* Notifications Bell - with white border and rounded corners */}
              <Link href="/avisos" className="relative">
                <div className="p-1.5 text-white border border-white rounded-lg">
                  <Bell className="h-6 w-6" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Postal Code Modal */}
      <PostalCodeModal
        open={isPostalCodeModalOpen}
        onOpenChange={setIsPostalCodeModalOpen}
        onSelectPostalCode={handleSelectPostalCode}
      />
    </header>
  )
}
