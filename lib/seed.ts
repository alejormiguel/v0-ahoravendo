"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function seedDatabase() {
  try {
    // Create categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { name: "Electronics" },
        update: {},
        create: { name: "Electronics" },
      }),
      prisma.category.upsert({
        where: { name: "Clothing" },
        update: {},
        create: { name: "Clothing" },
      }),
      prisma.category.upsert({
        where: { name: "Books" },
        update: {},
        create: { name: "Books" },
      }),
      prisma.category.upsert({
        where: { name: "Home & Kitchen" },
        update: {},
        create: { name: "Home & Kitchen" },
      }),
    ])

    // Create products
    await Promise.all([
      // Electronics
      prisma.product.upsert({
        where: { id: "prod_electronics_1" },
        update: {},
        create: {
          id: "prod_electronics_1",
          name: "Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation.",
          price: 129.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 50,
          categoryId: categories[0].id,
          featured: true,
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_electronics_2" },
        update: {},
        create: {
          id: "prod_electronics_2",
          name: "Smartphone",
          description: "Latest smartphone with advanced camera and long battery life.",
          price: 799.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 30,
          categoryId: categories[0].id,
          featured: true,
        },
      }),

      // Clothing
      prisma.product.upsert({
        where: { id: "prod_clothing_1" },
        update: {},
        create: {
          id: "prod_clothing_1",
          name: "Cotton T-Shirt",
          description: "Comfortable cotton t-shirt available in various colors.",
          price: 19.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 100,
          categoryId: categories[1].id,
          featured: true,
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_clothing_2" },
        update: {},
        create: {
          id: "prod_clothing_2",
          name: "Denim Jeans",
          description: "Classic denim jeans with a modern fit.",
          price: 49.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 75,
          categoryId: categories[1].id,
          featured: false,
        },
      }),

      // Books
      prisma.product.upsert({
        where: { id: "prod_books_1" },
        update: {},
        create: {
          id: "prod_books_1",
          name: "The Great Novel",
          description: "A bestselling novel that has captivated readers worldwide.",
          price: 14.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 200,
          categoryId: categories[2].id,
          featured: true,
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_books_2" },
        update: {},
        create: {
          id: "prod_books_2",
          name: "Cookbook",
          description: "A collection of delicious recipes from around the world.",
          price: 24.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 150,
          categoryId: categories[2].id,
          featured: false,
        },
      }),

      // Home & Kitchen
      prisma.product.upsert({
        where: { id: "prod_home_1" },
        update: {},
        create: {
          id: "prod_home_1",
          name: "Coffee Maker",
          description: "Automatic coffee maker that brews the perfect cup every time.",
          price: 89.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 40,
          categoryId: categories[3].id,
          featured: true,
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_home_2" },
        update: {},
        create: {
          id: "prod_home_2",
          name: "Blender",
          description: "Powerful blender for smoothies and food preparation.",
          price: 69.99,
          images: ["/placeholder.svg?height=400&width=400"],
          stock: 60,
          categoryId: categories[3].id,
          featured: false,
        },
      }),
    ])

    // Create admin user
    const hashedPassword = await bcrypt.hash("password123", 10)
    await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        emailVerified: new Date(),
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { error: "Failed to seed database" }
  }
}
