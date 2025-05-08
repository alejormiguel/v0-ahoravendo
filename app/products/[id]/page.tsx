import { notFound } from "next/navigation"
import Image from "next/image"

import { getProductById } from "@/app/actions/products"
import { formatPrice } from "@/lib/utils"
import { AddToCartForm } from "./add-to-cart-form"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-muted">
            <Image
              src={product.images[0] || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">Category: {product.category.name}</p>
          </div>
          <div className="text-2xl font-bold text-primary">{formatPrice(product.price)}</div>
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          <div>
            <p className="text-sm">
              Availability:{" "}
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </p>
          </div>
          {product.stock > 0 && <AddToCartForm product={product} />}
        </div>
      </div>
    </div>
  )
}
