import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"

interface ProductRecommendationCardProps {
  id: string
  name: string
  image: string
  originalPrice: number
  currentPrice: number
  discount?: string | null
  seller: string
  location: string
  rating: number
  opinions: number
  availability: number
  shipping: {
    available: boolean
    sameDay: boolean
    count: number
  }
  badge?: string
}

export function ProductRecommendationCard({
  id,
  name,
  image,
  originalPrice,
  currentPrice,
  discount,
  seller,
  location,
  rating,
  opinions,
  availability,
  shipping,
  badge,
}: ProductRecommendationCardProps) {
  // Format price with dots as thousand separators
  const formatPrice = (price: number) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
  }

  return (
    <div className="border rounded-lg bg-white overflow-hidden flex flex-col h-full relative">
      {/* Wishlist button */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10">
        <Heart className="h-5 w-5" />
      </button>

      {/* Discount or badge */}
      {(discount || badge) && (
        <div
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded z-10 ${badge === "MÁS VENDIDO" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
        >
          {discount || badge}
        </div>
      )}

      {/* Product image */}
      <Link href={`/products/${id}`} className="relative pt-4 px-4 flex-shrink-0">
        <div className="aspect-square relative">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain" />
        </div>
      </Link>

      {/* Product details */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-600 mb-1">
          Vendido por: <span className="font-medium">{seller}</span>
        </div>
        <div className="text-xs text-gray-600 mb-2">{location}</div>

        <Link href={`/products/${id}`} className="mb-2 hover:text-purple-700">
          <h3 className="font-medium text-sm line-clamp-2">{name}</h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < rating ? "text-purple-500 fill-purple-500" : "text-gray-300 fill-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({opinions} opiniones)</span>
        </div>

        {/* Prices */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 line-through">{formatPrice(originalPrice)}</div>
          <div className="text-lg font-bold text-black">{formatPrice(currentPrice)}</div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center border rounded">
            <button className="px-2 py-1 text-gray-500 hover:text-gray-700">
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 py-1 border-x">1</span>
            <button className="px-2 py-1 text-gray-500 hover:text-gray-700">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Availability */}
        <div className="text-xs text-gray-600 mb-1">Hasta {availability} unidades</div>
        <div className="text-xs text-gray-600 mb-3">ENVÍOS DISPONIBLES ({shipping.count}) :</div>

        {/* Shipping */}
        {shipping.sameDay && (
          <div className="mb-3">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">ENVÍO EN EL DÍA</span>
          </div>
        )}

        {/* Buy buttons */}
        <div className="flex items-center gap-2 mt-auto">
          <button className="p-2 border rounded hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
          </button>
          <button className="flex-grow py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  )
}
