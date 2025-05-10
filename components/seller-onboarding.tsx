import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function SellerOnboarding() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Main heading */}
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-10">¿Cómo comienzo a ganar?</h2>

        {/* Steps image */}
        <div className="max-w-5xl mx-auto mb-16">
          <Image
            src="/images/como-comienzo-ganar.png"
            alt="Pasos para comenzar: Registrate, Configurá tu cuenta, Vendé tus productos"
            width={1200}
            height={350}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Text content */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Gana a lo grande con Ahora Vendo:
            <br />
            La plataforma donde todos salimos beneficiados.
          </h3>

          <p className="text-gray-600 mb-6">
            Hemos creado un espacio donde las oportunidades son para todos: Empresas, distribuidores, emprendedores y
            clientes finales se benefician de nuestra plataforma de compra y venta.
          </p>

          <p className="text-gray-600 mb-8">
            Conectamos a proveedores confiables con una amplia base de clientes, brindando acceso a productos de
            calidad, crecimiento de negocios y experiencias de compra excepcionales.
          </p>

          <p className="text-lg font-semibold text-gray-700 italic">¡Regístrate ahora y descubrí cómo ganamos todos!</p>
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-fuchsia-500 to-blue-400 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h4 className="text-3xl font-bold mb-2">¡Empezá hoy mismo a vender!</h4>
              <Link
                href="/register-seller"
                className="inline-flex items-center bg-white text-fuchsia-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors mt-4"
              >
                ¡Quiero registrarme! <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="relative w-64 h-32">
              <Image
                src="/images/empeza-hoy-mismo.png"
                alt="Empezá a vender"
                width={300}
                height={150}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
