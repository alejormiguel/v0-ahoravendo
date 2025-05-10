import Link from "next/link"
import Image from "next/image"

interface CategoryItem {
  id: string
  name: string
  image: string
  href: string
}

interface CategoryShowcaseProps {
  categories: CategoryItem[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="py-12 bg-[#663399] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Explora por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                  {/* Category image without rounded divs */}
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="w-full h-auto transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-center font-medium">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
