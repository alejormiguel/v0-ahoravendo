"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { updateCartItem, removeCartItem } from "@/app/actions/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface CartItemsProps {
  cart: {
    id: string
    items: {
      id: string
      quantity: number
      product: {
        id: string
        name: string
        price: number | string
        images: string[]
        stock: number
      }
    }[]
  }
}

export function CartItems({ cart }: CartItemsProps) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    setIsUpdating(itemId)

    const formData = new FormData()
    formData.append("itemId", itemId)
    formData.append("quantity", quantity.toString())

    const result = await updateCartItem(formData)

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      })
    }

    setIsUpdating(null)
  }

  const handleRemoveItem = async (itemId: string) => {
    setIsRemoving(itemId)

    const formData = new FormData()
    formData.append("itemId", itemId)

    const result = await removeCartItem(formData)

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      })
    } else {
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
    }

    setIsRemoving(null)
  }

  return (
    <div className="space-y-4">
      {cart.items.map((item) => (
        <div key={item.id} className="rounded-lg border p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                alt={item.product.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                {item.product.name}
              </Link>
              <div className="text-sm text-muted-foreground">{formatPrice(item.product.price)} each</div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1 || isUpdating === item.id}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock || isUpdating === item.id}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-medium">{formatPrice(Number(item.product.price) * item.quantity)}</div>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleRemoveItem(item.id)}
                disabled={isRemoving === item.id}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
