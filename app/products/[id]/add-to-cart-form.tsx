"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"

import { addToCart } from "@/app/actions/cart"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface AddToCartFormProps {
  product: {
    id: string
    name: string
    stock: number
  }
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!session) {
      router.push(`/login?callbackUrl=/products/${product.id}`)
      return
    }

    const formData = new FormData()
    formData.append("productId", product.id)
    formData.append("quantity", quantity.toString())

    const result = await addToCart(formData)

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      })
    } else {
      toast({
        title: "Éxito",
        description: `${product.name} agregado a su carrito de compras.`,
      })
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-3 w-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </form>
  )
}
