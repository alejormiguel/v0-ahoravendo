"use client"

import React from "react";
import Link from "next/link"
import Image from "next/image"
import { Button } from "../ui/button"

interface CategoryItem {
  id: string
  name: string
  image: string
  imageAlternative?: string
  href: string
}

interface CategoryShowcaseProps {
  categories: CategoryItem[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-12 bg-[#663399] text-white">
      <div className="main-container">
        <div className="flex flex-row justify-between mb-8">
          <h2 className="text-2xl font-bold">Categorías destacadas</h2>
          <Link href="/categories">
            <Button variant="outline" className="text-white rounded-xl px-8 text-wrap">
              Ver todas las categorías
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => {
            const [imgSrc, setImgSrc] = React.useState(category.image || "/images/common/placeholder.svg");
            return (
              <Link key={category.id} href={category.href} className="group">
                <div className="flex flex-col items-center">
                  <Image
                    src={imgSrc}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-full h-auto transition-transform"
                    onMouseEnter={() => category.imageAlternative && setImgSrc(category.imageAlternative)}
                    onMouseLeave={() => setImgSrc(category.image || "/images/common/placeholder.svg")}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}
