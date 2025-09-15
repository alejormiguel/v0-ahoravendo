
import { getFeaturedProducts } from "@/app/actions/products"
import { Carousel } from "@/components/home/carousel"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { PromoBanner } from "@/components/home/promo-banner"
import { CategoryCardsGrid } from "@/components/home/category-cards-grid"
import { ProductRecommendations } from "@/components/home/product-recommendations"
import { SellerOnboarding } from "@/components/home/seller-onboarding"
import { NewsletterSubscription } from "@/components/home/newsletter-subscription"
import WeeklyOpportunities from "@/components/home/weekly-opportunities"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  const carouselImages = [
    {
      src: "/images/home/carousel-img1.png",
      alt: "Transparencia Total - lo que ves es lo que pagas",
    },
    {
      src: "/images/home/carousel-img2.png",
      alt: "Galaxy S25 series - Galaxy AI",
    },
    {
      src: "/images/home/carousel-img3.png",
      alt: "Cyber Monday",
    },
  ]

  const categories = [
    {
      id: "electronics",
      name: "Electrónica",
      image: "/images/home/categoria-electronica-primario.png",
      imageAlternative: "/images/home/categoria-electronica-alternativo.png",
      href: "/categories/electronics",
    },
    {
      id: "clothing",
      name: "Indumentaria",
      image: "/images/home/categoria-indumentaria-primario.png",
      imageAlternative: "/images/home/categoria-indumentaria-alternativo.png",
      href: "/categories/clothing",
    },
    {
      id: "furniture",
      name: "Interior",
      image: "/images/home/categoria-interior-primario.png",
      imageAlternative: "/images/home/categoria-interior-alternativo.png",
      href: "/categories/furniture",
    },
    {
      id: "audio",
      name: "Sonido",
      image: "/images/home/categoria-sonido-primario.png",
      imageAlternative: "/images/home/categoria-sonido-alternativo.png",
      href: "/categories/audio",
    },
    {
      id: "beauty",
      name: "Cosmética",
      image: "/images/home/categoria-cosmetica-primario.png",
      imageAlternative: "/images/home/categoria-cosmetica-alternativo.png",
      href: "/categories/beauty",
    },
    {
      id: "sports",
      name: "Deportes",
      image: "/images/home/categoria-deportes-primario.png",
      imageAlternative: "/images/home/categoria-deportes-alternativo.png",
      href: "/categories/sports",
    },
  ]

  return (
    <div className="flex flex-col gap-8 lg:grid-cols-4 lg:gap-12">
      <Carousel images={carouselImages} />

      {/* Weekly Opportunities Section */}
      <WeeklyOpportunities/>

      {/* Category Showcase Section */}
      <CategoryShowcase categories={categories} />

      {/* Promotional Banner */}
      {/* <PromoBanner
        text="Obtené un voucher de 10% OFF en tu primer compra registrándote en la plataforma"
        linkText="Suscríbite"
        linkHref="/register"
      /> */}

      {/* Category Cards Grid */}
      <CategoryCardsGrid />

      {/* Product Recommendations */}
      <ProductRecommendations />

      {/* Putting both of them into a div to avoid the gap-8 between them from the parent container */}
      {/* <div> */}
        {/* Seller Onboarding */}
        {/* <SellerOnboarding /> */}

        {/* Newsletter subscription */}
        {/* <NewsletterSubscription /> */}
      {/* </div> */}
    </div>
  )
}
