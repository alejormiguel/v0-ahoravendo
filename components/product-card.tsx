import Link from "next/link"
import Image from "next/image"

import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number | string
    images: string[]
    category: {
      name: string
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group rounded-lg border p-3 hover:shadow-md transition-all">
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.images[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.category.name}</p>
        <p className="font-medium text-primary">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
