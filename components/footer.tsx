import type React from "react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full">
      {/* Main footer links */}
      <div id="footer-links" className="text-white py-12" style={{ backgroundColor: '#969696' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
          {/* Logo and Login */}
          <div className="flex flex-col gap-2 md:w-1/4 items-center md:items-start">
            <Image src="/images/common/logo-fucsia-aguamarina-liso.png" alt="Ahora Vendo Logo" width={270} height={72} className="" />
            <Link href="/login" className="underline ml-4 text-sm">Ingresá o creá tu cuenta</Link>
          </div>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <div>
                <h4 className="text-xl mb-2">Nuevos usuarios</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/nuevo" className="hover:underline">Nuevo en la plataforma</Link></li>
                  <li><Link href="/como-usar" className="hover:underline">Cómo usar Mi cuenta</Link></li>
                  <li><Link href="/como-comprar" className="hover:underline">Cómo hacer una compra</Link></li>
                  <li><Link href="/metodos-pago" className="hover:underline">Métodos de pago</Link></li>
                  <li><Link href="/formas-entrega" className="hover:underline">Formas de entrega</Link></li>
                  <li><Link href="/problemas-orden" className="hover:underline">Problemas con una órden</Link></li>
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-xl mb-2">Acceso rápido</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/mi-cuenta" className="hover:underline">Mi cuenta</Link></li>
                  <li><Link href="/seguimiento-envio" className="hover:underline">Seguimiento de envío</Link></li>
                  <li><Link href="/preguntas-frecuentes" className="hover:underline">Preguntas frecuentes</Link></li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-xl mb-2">Mi cuenta</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/soporte" className="hover:underline">Soporte de producto</Link></li>
                <li><Link href="/checkout" className="hover:underline">Check-out</Link></li>
                <li><Link href="/cart" className="hover:underline">Carrito de compras</Link></li>
                <li><Link href="/lista-productos" className="hover:underline">Mi lista de productos</Link></li>
                <li><Link href="/terminos" className="hover:underline">Términos y condiciones</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl mb-2">Atención al cliente</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/ayuda" className="hover:underline">Centro de ayuda</Link></li>
                <li><Link href="/contacto" className="hover:underline">Contáctanos</Link></li>
                <li><Link href="/reportar" className="hover:underline">Reportar un problema</Link></li>
                <li><Link href="/devoluciones" className="hover:underline">Políticas de devolución</Link></li>
              </ul>
              <div className="flex flex-col gap-3 mt-12">
                <div><p>Seguinos en nuestras redes</p></div>
                <div className="flex flex-row gap-2">
                  <a href="#" aria-label="Facebook">
                    <Image src="/images/common/facebook-violeta.png" alt="Facebook" width={30} height={30} />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Image src="/images/common/instagram-violeta.png" alt="Instagram" width={30} height={30} />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <Image src="/images/common/twitter-violeta.png" alt="Twitter" width={30} height={30} />
                  </a>
                  <a href="#" aria-label="Whatsapp">
                    <Image src="/images/common/whatsapp-violeta.png" alt="Whatsapp" width={30} height={30} />
                  </a>
                  <a href="#" aria-label="YouTube">
                    <Image src="/images/common/youtube-violeta.png" alt="YouTube" width={30} height={30} />
                  </a>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legales */}
      <div className="text-white py-4" style={{ backgroundColor: '#646464' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link href="/terminos" className="text-purple-800/50 text-xs hover:text-black">
              Términos y condiciones
            </Link>
            <Link href="/privacidad" className="text-purple-800/50 text-xs hover:text-black">
              Política de privacidad
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/https://www.usuariosfinancieros.gob.ar" className="block">
              <Image
                src="/images/footer/usuarios-financieros.png"
                alt="Usuarios financieros"
                width={144}
                height={53}
                className="h-10 w-auto"
              />
            </Link>
            <Link href="https://www.argentina.gob.ar/defensadelconsumidor" className="block">
              <Image
                src="/images/footer/realizar-reclamo.png"
                alt="Defensa del consumidor"
                width={159}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <Link href="https://www.afip.gob.ar" className="block">
              <Image
                src="/images/footer/data-fiscal.png"
                alt="Usuarios financieros"
                width={39}
                height={53}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="text-purple-800/50 text-xs hover:text-black">Copyright 2025. Ahora Vendo S.A.</div>
        </div>
      </div>
    </footer>
  )
}
