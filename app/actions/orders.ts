"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { clearCart } from "./cart"

const checkoutSchema = z.object({
  shippingAddress: z.string().min(10, "Please enter a valid address"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
})

export async function createOrder(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in" }
  }

  const shippingAddress = formData.get("shippingAddress") as string
  const paymentMethod = formData.get("paymentMethod") as string

  const validatedFields = checkoutSchema.safeParse({
    shippingAddress,
    paymentMethod,
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  // Get cart
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart || cart.items.length === 0) {
    return { error: "Your cart is empty" }
  }

  // Calculate total
  let total = 0
  for (const item of cart.items) {
    total += Number(item.product.price) * item.quantity
  }

  // Create order
  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      shippingAddress,
      paymentMethod,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  })

  // Update product stock
  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    })
  }

  // Clear cart
  await clearCart()

  revalidatePath("/orders")
  return { success: true, orderId: order.id }
}

export async function getUserOrders() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return []
  }

  return prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getOrderById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  return prisma.order.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })
}
