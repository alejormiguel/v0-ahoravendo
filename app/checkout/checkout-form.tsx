"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createOrder } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function CheckoutForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("paymentMethod", paymentMethod)

    const result = await createOrder(formData)

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: typeof result.error === "string" ? result.error : "Please check your information and try again.",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Order placed",
      description: "Your order has been placed successfully.",
    })

    router.push(`/orders/${result.orderId}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg font-medium">Shipping Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="shippingAddress" rows={3} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" name="zip" required />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-6 shadow-sm">
        <h2 className="text-lg font-medium">Payment Method</h2>
        <div className="grid gap-2">
          <Label htmlFor="paymentMethod">Select Payment Method</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="apple_pay">Apple Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {paymentMethod === "credit_card" && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="expiryMonth">Expiry Month</Label>
                <Input id="expiryMonth" name="expiryMonth" placeholder="MM" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryYear">Expiry Year</Label>
                <Input id="expiryYear" name="expiryYear" placeholder="YY" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" name="cvc" placeholder="123" required />
              </div>
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </form>
  )
}
