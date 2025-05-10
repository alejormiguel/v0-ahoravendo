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
                  {/* Gradient border with platform */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-teal-400 rounded-full p-1">
                    <div className="h-full w-full rounded-full bg-white overflow-hidden flex items-end justify-center">
                      {/* Gray platform */}
                      <div className="w-full h-1/4 bg-gray-300 absolute bottom-0"></div>

                      {/* Category image */}
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={150}
                        height={150}
                        className="relative z-10 w-3/4 h-3/4 object-contain mb-4 transition-transform group-hover:scale-110"
                      />
                    </div>
                  </div>
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
