"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/components/cart-context"

import Link from "next/link"
import { NotificationsMenu } from "./notifications-menu"
import Image from "next/image"

import { Input } from "@/components/ui/input"
import { PostalCodeModal } from "@/components/header/postal-code-modal"
import { Button } from "../ui/button"
import { Icon } from "../icons/icon"

import { MenuEmpresa } from "./menu-empresa"
import dynamic from "next/dynamic"
const UserAccountMenu = dynamic(() => import("./user-account-menu"), { ssr: false })

export function Header() {
  const { data: session } = useSession()
  const { cartItemCount, refreshCartCount } = useCart();
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const [isPostalCodeModalOpen, setIsPostalCodeModalOpen] = useState(false)
  const [selectedPostalCode, setSelectedPostalCode] = useState("")

  // User account dropdown state
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const accountMenuRef = React.useRef<HTMLDivElement>(null)

  // Notifications menu state
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const notificationsMenuRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!isAccountMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountMenuOpen]);

  // Close notifications menu on outside click or ESC
  React.useEffect(() => {
    if (!isNotificationsMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target as Node)) {
        setIsNotificationsMenuOpen(false);
      }
    }
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setIsNotificationsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isNotificationsMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSelectPostalCode = (postalCode: string) => {
    setSelectedPostalCode(postalCode)
  }

  return (
    <header className="shadow-md bg-black">
      {/* Main header bar */}
      <div className="py-2 relative main-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/common/logo-fucsia-aguamarina-degrade.png" alt="Ahora Vendo" width={60} height={36} className="h-16 w-auto" />
          </Link>

          {/* Location selector */}
          <div className="flex flex-row gap-2 items-center justify-between text-white px-6">
            <div>
              <Icon icon="ubicacion" size={40} color="filter-blanco-svg" />
            </div>
            <div className="flex flex-col items-start">
              <p>Enviar a</p>
              <a className="underline font-bold" onClick={() => setIsPostalCodeModalOpen(true)}>
                {selectedPostalCode === "" ? "Seleccionar CP" : "CP " + selectedPostalCode}
              </a>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex justify-center">
            <form onSubmit={handleSearch} className="flex w-full relative">
              <Input
                type="search"
                placeholder="Búsqueda"
                className="h-12 rounded-full pr-12 bg-white text-black border border-gray-200 pl-5 shadow-sm focus:ring-2 focus:ring-fuchsia-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-[10px] py-[10px] rounded-full text-white bg-aqua shadow"
              >
                <Icon icon="buscar" size={20} color="filter-blanco-svg" />
              </button>
            </form>
          </div>


          {/* User account */}
          <div id="user-account" className="flex items-center gap-2 mx-4 relative" ref={accountMenuRef}>
            <div
              className="flex gap-2 cursor-pointer text-white"
              onClick={() => setIsAccountMenuOpen((open) => !open)}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isAccountMenuOpen}
              role="button"
              onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setIsAccountMenuOpen((open) => !open) }}
            >
              <Icon icon="usuario" size={32} color="filter-blanco-svg" />
              <div className="sm:hidden md:flex flex-row items-center">
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm group-hover:text-fuchsia-100">{session?.user?.name}</span>
                <span className="text-xs text-gray-200">Perfil Personal</span>
              </div>
              <Icon icon="expandir" size={16} color="filter-blanco-svg" className="ml-1" />
              </div>
            </div>
            {isAccountMenuOpen && (
              <div className="absolute right-0 top-full mt-2 z-10">
                <UserAccountMenu />
              </div>
            )}
          </div>

          {/* Icons: Notifications, Cart and Wishlist */}
          <div className="flex items-center gap-4 px-2 sm:hidden md:flex">
            <div ref={notificationsMenuRef} className="relative">
              <a
                href="#"
                className="relative group"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={isNotificationsMenuOpen}
                onClick={e => {
                  e.preventDefault();
                  setIsNotificationsMenuOpen(open => !open);
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsNotificationsMenuOpen(open => !open);
                  }
                }}
              >
                <div className="p-2 text-white border rounded-xl">
                  <Icon icon="notificacion" size={24} color="filter-blanco-svg" />
                </div>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                  2
                </span>
              </a>
              <NotificationsMenu visible={isNotificationsMenuOpen} />
            </div>
            <Link id="cartLink" href="/cart" className="relative group">
              <div className="p-2 text-white border rounded-xl">
                <Icon icon="bolsa" size={24} color="filter-blanco-svg" />
              </div>
              {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                {cartItemCount}
              </span>
              )}
            </Link>
            <Link href="/favorites" className="relative group">
              <div className="p-2 text-white border rounded-xl">
                <Icon icon="corazon" size={24} color="filter-blanco-svg" />
              </div>
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      <MenuEmpresa />

      {/* Postal Code Modal */}
      <PostalCodeModal
        open={isPostalCodeModalOpen}
        onOpenChange={setIsPostalCodeModalOpen}
        onSelectPostalCode={handleSelectPostalCode}
      />
    </header>
  )
}
