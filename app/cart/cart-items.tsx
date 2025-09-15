"use client"

import { useCart } from "@/components/cart-context"
import { CartItem } from "./cart-item"
import { updateShippingTotal } from "@/app/actions/cart"

interface CartItemsProps {
  sellersWithItems: {
    id: string
    name: string
    verified: boolean
    items: {
      id: string
      quantity: number
      product: {
        id: string
        name: string
        description: string
        faq: string
        rating: number
        ratingCount: number
        originalPrice: number
        discount: number
        finalPrice: number
        noTaxesPrice: number
        taxes: number
        images: string[]
        stock: number
        categoryId: string
        seller: {
          id: string
          name: string
          verified: boolean
        }
        shippingOptions: {
          id:   string
          name: string
          cost: number
        }[]
      }
    }[]
    matchingShippingOptions: {
      id:   string
      name: string
      cost: number
    }[]
    selectedShippingOption?: {
      id:   string
      name: string
      cost: number
    }
  }[]
  cartId: string
}

export function CartItems({ sellersWithItems, cartId }: CartItemsProps) {
  const { shippingTotal, refreshShippingTotal } = useCart();

  const handleUpdateShippingOption = async (sellerId: string, itemId: string, name: string, cost: number) => {
    // Find seller with id equal to sellerId and update the selectedShippingOption property with the itemId, name and cost
    let seller = sellersWithItems.find(seller => seller.id === sellerId);
    if (seller) {
      seller.selectedShippingOption = { id: itemId, name, cost }
      // console.log(seller);
    }

    // Calculate the shippingTotal and update it in DB
    let shippingTotal = 0;
    sellersWithItems.forEach((seller: any) => {
      shippingTotal = shippingTotal + (seller.selectedShippingOption?.cost || 0);
    });
    const result = await updateShippingTotal(cartId, shippingTotal)
    // Refresh the shippingTotal in the cart context
    await refreshShippingTotal();
  };

  return (
    <div className="space-y-4">
      {sellersWithItems.map((sellerWithItems, cartId) => (
        <CartItem key={sellerWithItems.id} sellerWithItems={sellerWithItems} updateShippingOption={handleUpdateShippingOption} />
      ))}
    </div>
  )
}
