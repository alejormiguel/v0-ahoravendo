"use client"

import type React from "react"
import { useState } from "react"
import { Icon } from "@/components/icons/icon"

interface CartQuantityProps {
  product: {
    id: string
    name: string
    stock: number
  }
}

export function CartQuantity({ product }: CartQuantityProps) {
  const [quantity, setQuantity] = useState(1)

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

  return(
    <div className="flex items-center gap-2 bg-[#fbfbfb] border border-[#d8d8d8] rounded-lg px-4 py-2 max-w-[130px]">
      <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-white" onClick={decreaseQuantity}>
        <Icon icon="minimize-line" size={16} color="filter-blanco-svg" />
      </button>
      <span className="font-montserrat font-semibold text-[14px] text-black text-center w-8">{quantity}</span>
      <button className="flex items-center justify-center w-6 h-6 rounded-lg bg-white" onClick={increaseQuantity}>
        <Icon icon="add-line" size={16} color="filter-gris-medio-svg" />
      </button>
    </div>
  )
}