"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function getCart() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

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

  return cart
}

export async function addToCart(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in" }
  }

  const productId = formData.get("productId") as string
  const quantityStr = formData.get("quantity") as string
  const quantity = Number.parseInt(quantityStr, 10)

  if (!productId || isNaN(quantity) || quantity < 1) {
    return { error: "Invalid product or quantity" }
  }

  // Check if product exists and has enough stock
  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product) {
    return { error: "Product not found" }
  }

  if (product.stock < quantity) {
    return { error: "Not enough stock" }
  }

  // Get or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.user.id },
    })
  }

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  })

  if (existingItem) {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    // Add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    })
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function updateCartItem(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in" }
  }

  const itemId = formData.get("itemId") as string
  const quantityStr = formData.get("quantity") as string
  const quantity = Number.parseInt(quantityStr, 10)

  if (!itemId || isNaN(quantity)) {
    return { error: "Invalid item or quantity" }
  }

  if (quantity < 1) {
    // Remove item if quantity is less than 1
    await prisma.cartItem.delete({
      where: { id: itemId },
    })
  } else {
    // Update quantity
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
  }

  revalidatePath("/cart")
  return { success: true }
}

export async function removeCartItem(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in" }
  }

  const itemId = formData.get("itemId") as string

  if (!itemId) {
    return { error: "Invalid item" }
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  })

  revalidatePath("/cart")
  return { success: true }
}

export async function clearCart() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "You must be logged in" }
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  })

  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  }

  revalidatePath("/cart")
  return { success: true }
}
