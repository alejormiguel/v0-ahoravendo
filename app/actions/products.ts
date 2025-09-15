"use server"

import prisma from "@/lib/prisma"

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 8,
  })
}

export async function getProductsByCategory(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
    include: { category: true },
  })
}

export async function getProductById(id: string) {
  const data = await prisma.product.findUnique({
    where: { id },
    include: { 
      category: true, 
      questions: {
        orderBy: {
          createdAt: 'desc',
        },
      }, 
      reviews: {
        orderBy: {
          createdAt: 'desc',
        },
      }, 
      seller: true, 
      variations: { 
        orderBy: {
          displayPosition: 'asc',
        },
        include: { 
          options: {
            orderBy: {
              displayPosition: 'asc',
            } 
          } 
        } 
      },
      specifications: { 
        orderBy: {
          displayPosition: 'asc',
        }
      }
  },});
  const serializedData = {
    ...data,
    // originalPrice: data?.originalPrice ? data.originalPrice.toString() : "0.00",
    // price: data?.price ? data.price.toString() : "0.00",
    images: data?.images || [],
  };
  return serializedData;
}

export async function getAllCategories() {
  return prisma.category.findMany()
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { 
      category: true,
      questions: {
        orderBy: {
          createdAt: 'desc',
        },
      }, 
      reviews: {
        orderBy: {
          createdAt: 'desc',
        },
      }, 
      seller: true, 
      variations: { 
        orderBy: {
          displayPosition: 'asc',
        },
        include: { 
          options: {
            orderBy: {
              displayPosition: 'asc',
            } 
          } 
        } 
      },
      specifications: { 
        orderBy: {
          displayPosition: 'asc',
        }
      }
    },
  })
}
