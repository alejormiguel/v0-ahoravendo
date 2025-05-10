import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function SellerOnboarding() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Main heading */}
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-16">¿Cómo comienzo a ganar?</h2>

        {/* Three steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-fuchsia-500 text-white rounded-full p-6 w-64 h-64 flex flex-col items-center justify-center mb-4 relative">
              <span className="text-xl font-bold mb-2">Registrate</span>
              <div className="relative w-48 h-48">
                <Image
                  src="/images/register-illustration.png"
                  alt="Registrate"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-fuchsia-500"></div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-fuchsia-500 text-white rounded-full p-6 w-64 h-64 flex flex-col items-center justify-center mb-4 relative">
              <span className="text-xl font-bold mb-2">Configurá tu cuenta</span>
              <div className="relative w-48 h-48">
                <Image
                  src="/images/configure-account-illustration.png"
                  alt="Configurá tu cuenta"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 to-fuchsia-500"></div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-fuchsia-500 text-white rounded-full p-6 w-64 h-64 flex flex-col items-center justify-center mb-4 relative">
              <span className="text-xl font-bold mb-2">Vendé tus productos</span>
              <div className="relative w-48 h-48">
                <Image
                  src="/images/sell-products-illustration.png"
                  alt="Vendé tus productos"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
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
                src="/images/start-selling-illustration.png"
                alt="Empezá a vender"
                width={250}
                height={125}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
