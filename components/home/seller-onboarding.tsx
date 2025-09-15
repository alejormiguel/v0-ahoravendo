import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function SellerOnboarding() {
  return (
    <section className="py-16 bg-gray-100">
      {/* Main heading */}
      <h2 className="text-4xl font-bold text-center text-purple-600 mb-10">¿Cómo comienzo a ganar?</h2>

      {/* Steps image */}
      <div className="max-w-5xl mx-auto mb-16">
        <Image
          src="/images/home/pasos-para-ganar.png"
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
      <div className="container mx-auto max-w-4xl relative p-0">
        <Image
          src="/images/home/banner-vende.png"
          alt="Empezá hoy mismo a vender"
          width={300}
          height={150}
          className="object-cover rounded-xl size-full"
        />
        <div className="text-white mb-6 md:mb-0">
          <h4 className="text-4xl font-bold mb-2 absolute top-6 left-12 max-w-sm">¡Empezá hoy mismo a vender!</h4>
          <Link
            href="/register-seller"
            className="inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground absolute whitespace-nowrap rounded-xl text-primary-foreground h-10 px-4 py-2 left-12 bottom-6"
          >
            ¡Quiero registrarme! <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
