import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { getCart } from "@/app/actions/cart"
import { formatPrice } from "@/lib/utils"
import { CartItems } from "./cart-items"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/cart")
  }

  const cart = await getCart()

  const cartTotal = cart?.items.reduce((total, item) => total + Number(item.product.price) * item.quantity, 0) || 0

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {!cart || cart.items.length === 0 ? (
            <div className="rounded-lg border p-8 text-center">
              <h2 className="text-lg font-medium">Your cart is empty</h2>
              <p className="mt-2 text-sm text-muted-foreground">Add items to your cart to see them here.</p>
              <Button asChild className="mt-4">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <CartItems cart={cart} />
          )}
        </div>
        <div>
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <Button asChild className="w-full" disabled={!cart || cart.items.length === 0}>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
