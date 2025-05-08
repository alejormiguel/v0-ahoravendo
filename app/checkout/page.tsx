import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { getCart } from "@/app/actions/cart"
import { formatPrice } from "@/lib/utils"
import { CheckoutForm } from "./checkout-form"

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/checkout")
  }

  const cart = await getCart()

  if (!cart || cart.items.length === 0) {
    redirect("/cart")
  }

  const cartTotal = cart.items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(Number(item.product.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
