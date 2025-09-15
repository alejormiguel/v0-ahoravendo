"use client"

import { useCart } from "@/components/cart-context"
import { Icon } from "@/components/icons/icon"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CartTotalsProps {
  cartItemsTotal: number, 
  cartItemsAmount: number, 
  taxesTotal: number
}

export default function CartTotals({cartItemsTotal, cartItemsAmount, taxesTotal}: CartTotalsProps) {
  const { shippingTotal, refreshShippingTotal } = useCart();
  const cartTotal  =  cartItemsTotal + shippingTotal;

  return(
    <div className="flex flex-col gap-8">
      <div className="rounded-xl p-6 shadow-md">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold">Dirección de entrega</h2>
          <Icon icon="editar" size={32} color="filter-fucsia-svg" className="ml-4" />
        </div>
        <div className="mt-4 flex flex-col">
          <span className="font-bold">Casa CABA</span>
          <span className="">Franco 2641, CP 1431, Ciudad de Buenos Aires, Buenos Aires, Argentina</span>
        </div>
      </div>
      <div className="rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold">Resumen de compra</h2>
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between">
              <span>Productos ({cartItemsAmount} un.)</span>
              <span>{cartItemsTotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            </div>
            <div className="flex justify-between text-xs text-grismediumdark">
              <span>Precio sin impuestos nacionales</span>
              <span>{taxesTotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>{shippingTotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
          </div>
          {/* <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{cartTotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            </div>
          </div> */}
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{cartTotal.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-black">*Texto legal (débito / crédito)</div>
      </div>
      <Button className="w-full bg-fucsia rounded-xl" disabled={cartItemsAmount === 0}>
        <Link href="/checkout">Continuar compra</Link>
      </Button>
      {/* {JSON.stringify(sellersWithItems)} */}
    </div>
  )
}