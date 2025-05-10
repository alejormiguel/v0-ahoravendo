import Image from "next/image"
import { CategoryCard } from "./category-card"
import Link from "next/link"

export function CategoryCardsGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top row - 2 cards */}
        <div className="rounded-lg overflow-hidden aspect-[3/2] relative">
          <Link href="/products/trendy">
            <Image
              src="/images/products-trendy.png"
              alt="Nuevos productos TRENDY"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        <CategoryCard
          title="LÁMPARAS"
          image="/jellyfish-lamp.png"
          backgroundColor="bg-indigo-900"
          href="/products/lamps"
          imagePosition="center"
        />

        {/* Bottom row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
          <CategoryCard
            title="ASPIRADORAS"
            subtitle="INALÁMBRICAS"
            image="/vacuum-cleaner.png"
            backgroundColor="bg-gray-800"
            href="/products/vacuum-cleaners"
            aspectRatio="portrait"
            imagePosition="bottom"
          />
          <CategoryCard
            title="FRYER"
            image="/air-fryer.png"
            backgroundColor="bg-purple-700"
            href="/products/air-fryers"
            aspectRatio="portrait"
            imagePosition="center"
          />
          <CategoryCard
            title="Galaxy S25 Ultra"
            subtitle="Galaxy AI ✨"
            image="/galaxy-s25.png"
            backgroundColor="bg-blue-900"
            href="/products/smartphones"
            aspectRatio="portrait"
            imagePosition="bottom"
          />
        </div>
      </div>
    </div>
  )
}
