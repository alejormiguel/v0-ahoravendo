"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useCart } from "@/components/cart-context"

import { addToCart } from "@/app/actions/cart"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Icon } from "@/components/icons/icon"

interface VariationOption {
  id: string
  name: string
  displayPosition: number
}

interface Variation {
  id: string
  name: string
  displayPosition: number
  options: VariationOption[]
}

interface Product {
  id: string
  name: string
  stock: number
  variations: Variation[]
  shippingOptions: {
    type: string
    location: string
    price: number
    icon: string
    color: string
  }[]
  costSummary: {
    products: number
    shipping: number
    subtotal: number
    taxes: number
    total: number
  }
}

interface ProductDetailsFormProps {
  product: Product
}

export function ProductDetailsForm({ product }: ProductDetailsFormProps) {
  const { data: session } = useSession()
  const { refreshCartCount } = useCart();
  const router = useRouter()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVariations, setSelectedVariations] = useState([] as string[])

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

    await refreshCartCount();

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
          {/* Variaciones */}
          {product.variations.map((variation) => (
          <div key={variation.id}>
            <div>
              <span className="font-montserrat font-bold text-[16px] leading-6 text-black">{variation.name}:</span>
            </div>
            <div className="flex flex-wrap gap-2.5 items-center justify-start mt-2">
              {variation.options.map((option) => (
              <button key={option.id} className="box-border flex flex-row items-center justify-center h-[46px] min-w-[60px] px-2.5 py-1 rounded-lg border border-[#d8d8d8] bg-white font-montserrat font-semibold text-[14px] text-black text-center hover:border-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-400">
                {/* <span className="relative shrink-0 w-4 h-4 mr-2">
                  <Icon icon="selector-blanco" size={16} />
                </span> */}
                {option.name}
              </button>
              ))}
            </div>
          </div>
          ))}
          {/* Cantidad */}
          <div>
            <span className="font-montserrat font-bold text-[16px] leading-6 text-black">Cantidad:</span>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex items-center gap-2 bg-[#fbfbfb] border border-[#d8d8d8] rounded-lg px-4 py-2 max-w-[130px]">
              <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-white" onClick={decreaseQuantity}>
                <Icon icon="minimize-line" size={16} color="filter-blanco-svg" />
              </button>
              <span className="font-montserrat font-semibold text-[14px] text-black text-center w-8">{quantity}</span>
              <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-white" onClick={increaseQuantity}>
                <Icon icon="add-line" size={16} color="filter-gris-medio-svg" />
              </button>
            </div>
            <span className="font-montserrat text-[14px] text-black">Disponible: {product.stock ?? 0} unidades</span>
          </div>
          {/* Tipo de envio  */}
          <div className="relative bg-[#fbfbfb] rounded-[22px] border border-[#d8d8d8] pt-4 pb-8 mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#d8d8d8] px-4 pb-4">
              <span className="font-montserrat font-bold text-[16px] text-black">Tipo de envío</span>
            </div>
            <div className="flex flex-col gap-2 mt-2 px-4">
              {product.shippingOptions.map((option, index) => (
                <div key={index} className="flex flex-row gap-2 items-center bg-[#f4f4f4] rounded-lg border border-[#d8d8d8] px-2 py-2 relative">
                  <button className="ml-2">
                    <Icon icon={option.icon} size={16} />
                  </button>
                  <span className={option.color + " text-center text-white text-[12px] font-montserrat rounded-md py-0.5 w-[160px]"}>{option.type}</span>
                  <span className="font-montserrat text-[12px] text-[#323232]">{option.location}</span>
                  <span className="ml-auto font-montserrat font-bold text-[12px] text-[#323232]">{option.price == 0 ? "Gratis" : `+$${option.price.toLocaleString("es-AR")}`}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Resumen de costos */}
          <div className="relative bg-[#fbfbfb] rounded-[22px] border border-[#d8d8d8] p-4 mt-8 mb-8 flex flex-col gap-2">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between font-montserrat text-[14px]">
                <span>Productos (1 un.)</span>
                <span>{product.costSummary.products.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              </div>
              <div className="flex justify-between font-montserrat text-[14px] border-b border-[#d8d8d8] pb-4">
                <span>Envío</span>
                <span>{product.costSummary.shipping.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              </div>
              {/* <div className="flex justify-between font-montserrat font-bold text-[14px]">
                <span>Subtotal</span>
                <span>{Product.costSummary.subtotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              </div>
              <div className="flex justify-between font-montserrat text-[14px]">
                <span>Impuestos *</span>
                <span>{Product.costSummary.taxes.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              </div> */}
              <div className="flex justify-between font-montserrat font-bold text-[16px] mt-2">
                <span>Total</span>
                <span>{product.costSummary.total.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              </div>
              <div className="font-montserrat text-[12px] text-black mt-1">*Texto legal (débito / crédito)</div>
            </div>
          </div>
          {/* {product.stock && product.stock > 0 && <AddToCartForm product={product} />} */}
          {/* Agregar al carrito button */}
          <Button id="addToCartButton" type="submit" className="bg-[#bc00b8] flex flex-row gap-2 items-center justify-center px-8 py-3 rounded-2xl mt-6 cursor-pointer" disabled={isLoading}>
            <span className="font-montserrat font-medium text-[18px] text-white leading-6">{isLoading ? "Agregando..." : "Agregar al carrito"}</span>
          </Button>
          {/* Comprar ahora button */}
          <div className="bg-[#bc00b8] flex flex-row gap-2 items-center justify-center px-8 py-3 rounded-2xl mt-6 cursor-pointer">
            <span className="font-montserrat font-medium text-[18px] text-white leading-6">Comprar ahora</span>
          </div>


      {/* <div className="flex items-center space-x-4">
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
      </div> */}
    </form>
  )
}
