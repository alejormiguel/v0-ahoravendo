import Link from "next/link"
import { ProductRecommendationCard } from "./product-recommendation-card"

export function ProductRecommendations() {
  const products = [
    {
      id: "vans-old-skool",
      name: "Zapatillas Vans Old Skool Clasicas",
      image: "/products/vans-old-skool.png",
      originalPrice: 112700,
      currentPrice: 98000,
      discount: "13% OFF",
      seller: "VANS Tienda Oficial",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      availability: 19,
      shipping: {
        available: true,
        sameDay: true,
        count: 2,
      },
    },
    {
      id: "pc-gamer-amd",
      name: "Pc Gamer Armada Amd Ryzen 7 5700g | 32 Gb | Ssd",
      image: "/products/pc-gamer.png",
      originalPrice: 899999.99,
      currentPrice: 710999.21,
      badge: "MÁS VENDIDO",
      seller: "NOXISTORE",
      location: "Caballito, CABA",
      rating: 4,
      opinions: 68,
      availability: 3,
      shipping: {
        available: true,
        sameDay: true,
        count: 2,
      },
    },
    {
      id: "hidrolavadora-trent",
      name: "Hidrolavadora Eléctrica Trent HL1203 1400W",
      image: "/products/hidrolavadora.png",
      originalPrice: 120000,
      currentPrice: 79439,
      discount: "33% OFF",
      seller: "TRENT",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      availability: 1,
      shipping: {
        available: true,
        sameDay: true,
        count: 2,
      },
    },
    {
      id: "microondas-sansei",
      name: "Microondas Sansei Msarw20uap Rotativo 20L",
      image: "/products/microondas.png",
      originalPrice: 163199.99,
      currentPrice: 112999.99,
      discount: "33% OFF",
      seller: "Tienda Newsan",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 2111,
      availability: 5,
      shipping: {
        available: true,
        sameDay: true,
        count: 1,
      },
    },
    {
      id: "tablet-sansei-1",
      name: "Tablet Sansei Ts7a232 7 Pulgadas 32gb 2gb Android",
      image: "/products/tablet.png",
      originalPrice: 106799,
      currentPrice: 59599.99,
      discount: "44% OFF",
      seller: "Tienda Newsan",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      availability: 19,
      shipping: {
        available: true,
        sameDay: true,
        count: 2,
      },
    },
    {
      id: "tablet-sansei-2",
      name: "Tablet Sansei Ts7a232 7 Pulgadas 32gb 2gb Android",
      image: "/products/tablet.png",
      originalPrice: 106799,
      currentPrice: 59599.99,
      discount: "44% OFF",
      seller: "Tienda Newsan",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      availability: 19,
      shipping: {
        available: true,
        sameDay: true,
        count: 2,
      },
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">También te puede interesar</h2>
        <Link
          href="/ofertas"
          className="text-purple-600 font-medium border border-purple-600 rounded-full px-4 py-2 hover:bg-purple-50"
        >
          Ver más ofertas
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductRecommendationCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
