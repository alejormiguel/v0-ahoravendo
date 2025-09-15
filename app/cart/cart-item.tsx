"use client"

import { useState, useRef, useEffect } from "react"
import { useCart } from "@/components/cart-context"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Icon } from "@/components/icons/icon";
import { updateCartItem, removeCartItem } from "@/app/actions/cart"
import { useToast } from "@/hooks/use-toast"

interface CartItemProps {
  sellerWithItems: {
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
  }
  updateShippingOption: (sellerId: string, itemId: string, name: string, cost: number) => void;
}

export function CartItem({ sellerWithItems, updateShippingOption }: CartItemProps) {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)
  const { refreshCartCount, refreshShippingTotal } = useCart();
  const [openShippingDropdown, setOpenShippingDropdown] = useState(false);
  const shippingRef = useRef<HTMLDivElement>(null);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    setIsUpdating(itemId)

    const formData = new FormData()
    formData.append("itemId", itemId)
    formData.append("quantity", quantity.toString())

    const result = await updateCartItem(formData)
    await refreshCartCount();

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
    await refreshCartCount();

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      })
    } else {
      toast({
        title: "Item removido",
        description: "El item ha sido removido de su carrito.",
      })
    }

    setIsRemoving(null)
  }

  const setSelectedShippingOption = async (option: { id: string, name: string, cost: number }) => {
    // Placeholder for setting selected shipping option
    sellerWithItems.selectedShippingOption = option;
  }

  const handleShippingOptionClick = (itemId: string, name: string, cost: number) => {
    setSelectedShippingOption({ id: itemId, name: name, cost: cost });
    setOpenShippingDropdown(false); // Close the dropdown after selection
    updateShippingOption(sellerWithItems.id, itemId, name, cost);
    // Optionally, update server-side cart shipping selection here
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shippingRef.current && !shippingRef.current.contains(e.target as Node)) {
        setOpenShippingDropdown(false);
      }
    }
    if (openShippingDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openShippingDropdown]);

  return (
    <div key={sellerWithItems.id} className="flex flex-col bg-grislight rounded-xl w-full shadow-md border border-grislightmedium py-4">
      <div className="flex flex-row justify-between px-6 pb-4">
        <p>
          {sellerWithItems.verified && (
          <span>Tienda oficial </span>
          )}
          {sellerWithItems.name}
        </p>
        <a href={`/sellers/${sellerWithItems.id}`} className="text-fucsia underline font-semibold">Ver más productos del vendedor</a>
      </div>

      <div className="bg-white rounded-b-xl w-full shadow-md mb-4">
      {sellerWithItems.items.map((item, index) => (
      <div key={item.id}>
      <div id="cartItem" className="flex items-top justify-between py-5 px-6">
        <div className="flex flex-row">
          {/* Product Image */}
          <Image
            src={item.product.images[0] || "/images/common/placeholder.svg?height=110&width=110"}
            alt={item.product.name}
            width={110}
            height={110}
            className="bg-white rounded-xl w-[10rem] h-auto object-contain"
          />
          {/* Product Info */}
          <div className="flex flex-col justify-center ml-8 w-full">
            <p className="font-bold text-xl">
              {item.product.name}
            </p>
            <div className="flex flex-col mt-2">
              {item.product.originalPrice > 0  && (
              <span className="text-sm line-through">{item.product.originalPrice.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
              )}
              <span className="font-bold text-lg">{item.product.finalPrice.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            </div>
            <div className="text-sm mt-1">Color: Negro / Talle US: 8.5 | 41 ARG</div>
            <div className="py-2"><a className="text-fucsia underline font-semibold">Editar</a></div>
            <div className="flex items-center mt-2 border border-grislightmedium w-fit rounded-lg">
              <button
                className="flex items-center justify-center w-8 h-8"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating === item.id}
              >
                <Minus className="h-4 w-4 text-black" />
              </button>
              <span className="font-semibold text-sm text-center w-[8rem]">{item.quantity}</span>
              <button
                className="flex items-center justify-center w-8 h-8"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock || isUpdating === item.id}
              >
                <Plus className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        </div>
        {/* Delete button */}
        <div className="">
          <button
            className="bg-white border border-fucsia rounded-xl px-8 py-3 flex items-center justify-center"
            onClick={() => handleRemoveItem(item.id)}
            disabled={isRemoving === item.id}
          >
            <Trash2 className="h-6 w-6 text-fucsia" />
          </button>
        </div>
      </div>
      {index !== (sellerWithItems.items.length - 1) && (
      <hr className="border-t border-grislightmedium mx-6" />
      )}
      </div>
      ))}
      </div>


      {/* Shipping badge */}
      { sellerWithItems.matchingShippingOptions.length > 0 && (
      <div className="flex flex-row rounded-sm px-6">
        <div className="flex flex-col justify-center mr-8">
          <span className="w-[10rem]">Envío:</span>
        </div>
        <div ref={shippingRef} className="relative w-full">
          <div id="shipmentSelection" className="p-2 bg-white border border-grislightmedium rounded-lg flex flex-row justify-between w-full" onClick={() => { setOpenShippingDropdown(!openShippingDropdown); }}>
            <div className="bg-fucsia text-white text-xs rounded-sm px-3 py-1">
              {sellerWithItems.selectedShippingOption?.id ? sellerWithItems.matchingShippingOptions.find(option => option.id === sellerWithItems.selectedShippingOption?.id)?.name : sellerWithItems.matchingShippingOptions[0].name}
            </div>
            <div id="shipmentCost" className="flex flex-row items-center ml-4">
              <span className="font-bold">
                + {sellerWithItems.selectedShippingOption?.id ? sellerWithItems.matchingShippingOptions.find(option => option.id === sellerWithItems.selectedShippingOption?.id)?.cost.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' }) : sellerWithItems.matchingShippingOptions[0].cost.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}
              </span>
              <Icon icon="expandir" size={16} color="black" className="ml-4" />
            </div>
          </div>

          {openShippingDropdown && (
          <div className="absolute left-0 top-full bg-white shadow-[0px_8px_16px_0px_rgba(171,190,209,0.2)] w-full flex flex-col gap-2 py-5 pl-[15px] pr-2 z-20">
            {sellerWithItems.matchingShippingOptions.map((option) => (
            <button key={option.id} className="flex flex-row gap-2 items-center bg-[#f4f4f4] rounded-lg border border-[#d8d8d8] px-2 py-2 relative"
              onClick={(e) => handleShippingOptionClick(option.id, option.name, option.cost)}>
              <span className="text-center text-white text-[12px] bg-fucsia rounded-md py-1 px-3 w-[160px]">{option.name}</span>
              <span className="ml-auto font-montserrat font-bold text-[12px] text-[#323232]">{option.cost == 0 ? "Gratis" : `+$${option.cost.toLocaleString("es-AR")}`}</span>
            </button>
            ))}
          </div>)}
        </div>
      </div>
      )}
      {/* {JSON.stringify(sellerWithItems)} */}
    </div>
  )
}
