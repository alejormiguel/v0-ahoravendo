import Link from "next/link"

import { getFeaturedProducts } from "@/app/actions/products"
import { Carousel } from "@/components/carousel"
import { ProductCard } from "@/components/product-card"
import { CategoryShowcase } from "@/components/category-showcase"
import { PromoBanner } from "@/components/promo-banner"
import { CategoryCardsGrid } from "@/components/category-cards-grid"
import { ProductRecommendations } from "@/components/product-recommendations"
import { SellerOnboarding } from "@/components/seller-onboarding"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  const carouselImages = [
    {
      src: "/images/carousel-img1.png",
      alt: "Transparencia Total - lo que ves es lo que pagas",
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
      image: "/images/category-electronics.png",
      href: "/categories/electronics",
    },
    {
      id: "clothing",
      name: "Ropa",
      image: "/images/category-clothing.png",
      href: "/categories/clothing",
    },
    {
      id: "furniture",
      name: "Muebles",
      image: "/images/category-furniture.png",
      href: "/categories/furniture",
    },
    {
      id: "audio",
      name: "Audio",
      image: "/images/category-audio.png",
      href: "/categories/audio",
    },
    {
      id: "beauty",
      name: "Belleza",
      image: "/images/category-beauty.png",
      href: "/categories/beauty",
    },
  ]

  return (
    <div className="flex flex-col gap-8 pb-8 mt-4">
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

      {/* Seller Onboarding */}
      <SellerOnboarding />
    </div>
  )
}
