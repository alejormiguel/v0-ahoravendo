"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    // Reset form
    setEmail("")
    // Show success message or toast
  }

  return (
    <footer className="w-full">
      {/* Newsletter subscription */}
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-white text-xl md:text-2xl font-bold max-w-md">
            Registrate en la plataforma y recibí antes que nadie las novedades
          </h3>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="flex-grow px-4 py-3 rounded-l-full focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white p-3 rounded-r-full flex items-center justify-center"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer links */}
      <div className="bg-fuchsia-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Login/Register link */}
            <div className="md:col-span-4 mb-6">
              <Link href="/login" className="text-white hover:underline font-medium">
                Ingresa o creá tu cuenta
              </Link>
            </div>

            {/* Column 1: New Users */}
            <div>
              <h4 className="text-xl font-bold mb-4">Nuevos usuarios</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/nuevo" className="text-white/90 hover:text-white hover:underline">
                    Nuevo en la plataforma
                  </Link>
                </li>
                <li>
                  <Link href="/como-usar" className="text-white/90 hover:text-white hover:underline">
                    Cómo usar Mi cuenta
                  </Link>
                </li>
                <li>
                  <Link href="/como-comprar" className="text-white/90 hover:text-white hover:underline">
                    Cómo hacer una compra
                  </Link>
                </li>
                <li>
                  <Link href="/metodos-pago" className="text-white/90 hover:text-white hover:underline">
                    Métodos de pago
                  </Link>
                </li>
                <li>
                  <Link href="/formas-entrega" className="text-white/90 hover:text-white hover:underline">
                    Formas de entrega
                  </Link>
                </li>
                <li>
                  <Link href="/problemas-orden" className="text-white/90 hover:text-white hover:underline">
                    Problemas con una órden
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: My Account */}
            <div>
              <h4 className="text-xl font-bold mb-4">Mi cuenta</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/soporte" className="text-white/90 hover:text-white hover:underline">
                    Soporte de producto
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" className="text-white/90 hover:text-white hover:underline">
                    Check-out
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-white/90 hover:text-white hover:underline">
                    Carrito de compras
                  </Link>
                </li>
                <li>
                  <Link href="/lista-productos" className="text-white/90 hover:text-white hover:underline">
                    Mi lista de productos
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="text-white/90 hover:text-white hover:underline">
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Service */}
            <div>
              <h4 className="text-xl font-bold mb-4">Atención al cliente</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/ayuda" className="text-white/90 hover:text-white hover:underline">
                    Centro de ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-white/90 hover:text-white hover:underline">
                    Contáctanos
                  </Link>
                </li>
                <li>
                  <Link href="/reportar" className="text-white/90 hover:text-white hover:underline">
                    Reportar un problema
                  </Link>
                </li>
                <li>
                  <Link href="/devoluciones" className="text-white/90 hover:text-white hover:underline">
                    Políticas de devolución
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Access */}
            <div>
              <h4 className="text-xl font-bold mb-4">Acceso rápido</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/account" className="text-white/90 hover:text-white hover:underline">
                    Mi cuenta
                  </Link>
                </li>
                <li>
                  <Link href="/seguimiento" className="text-white/90 hover:text-white hover:underline">
                    Seguimiento de envío
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/90 hover:text-white hover:underline">
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="bg-purple-900 text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link href="/terminos" className="text-white/80 text-sm hover:text-white">
              Términos y condiciones
            </Link>
            <Link href="/privacidad" className="text-white/80 text-sm hover:text-white">
              Política de privacidad
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/certificaciones" className="block">
              <Image
                src="/images/certification-badge-1.png"
                alt="Certificación"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <Link href="/defensa-consumidor" className="block">
              <Image
                src="/images/certification-badge-2.png"
                alt="Defensa del consumidor"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="text-white/80 text-sm">Copyright 2023. Ahora Vendo S.A.</div>
        </div>
      </div>
    </footer>
  )
}
