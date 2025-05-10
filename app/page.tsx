import Link from "next/link"

import { getFeaturedProducts } from "@/app/actions/products"
import { Carousel } from "@/components/carousel"
import { ProductCard } from "@/components/product-card"
import { CategoryShowcase } from "@/components/category-showcase"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryCardsGrid } from "@/components/category-cards-grid"
import { ProductRecommendations } from "@/components/product-recommendations"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  const carouselImages = [
    {
      src: "/placeholder.svg?height=600&width=1400",
      alt: "Special offers on electronics",
    },
    {
      src: "/placeholder.svg?height=600&width=1400",
      alt: "New arrivals in fashion",
    },
    {
      src: "/placeholder.svg?height=600&width=1400",
      alt: "Exclusive deals for members",
    },
  ]

  const categories = [
    {
      id: "electronics",
      name: "Electrónicos",
      image: "/purple-smartphone.png",
      href: "/categories/electronics",
    },
    {
      id: "clothing",
      name: "Ropa",
      image: "/purple-shirt.png",
      href: "/categories/clothing",
    },
    {
      id: "furniture",
      name: "Muebles",
      image: "/pink-armchair.png",
      href: "/categories/furniture",
    },
    {
      id: "audio",
      name: "Audio",
      image: "/purple-speaker.png",
      href: "/categories/audio",
    },
    {
      id: "beauty",
      name: "Belleza",
      image: "/makeup-compact.png",
      href: "/categories/beauty",
    },
  ]

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Carousel images={carouselImages} />

      <section className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Top Selling Products</h2>
          <Link href="/products">
            <Button variant="link">View all</Button>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Showcase Section */}
      <CategoryShowcase categories={categories} />

      {/* Promotional Banner */}
      <PromoBanner
        text="Obtené un voucher de 10% OFF en tu primer compra registrándote en la plataforma"
        linkText="Suscríbite"
        linkHref="/register"
      />

      {/* Category Cards Grid */}
      <CategoryCardsGrid />

      {/* Product Recommendations */}
      <ProductRecommendations />

      <section className="container">
        <div className="rounded-lg bg-muted p-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Join Our Community</h2>
            <p className="max-w-[600px] text-muted-foreground">
              Subscribe to our newsletter to receive updates on new products, special offers, and exclusive deals.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
