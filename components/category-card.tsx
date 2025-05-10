import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  title: string
  subtitle?: string
  image?: string
  backgroundColor?: string
  textColor?: string
  gradientText?: boolean
  href: string
  showButton?: boolean
  buttonText?: string
  imagePosition?: "left" | "right" | "center" | "bottom"
  aspectRatio?: "landscape" | "portrait" | "square"
}

export function CategoryCard({
  title,
  subtitle,
  image,
  backgroundColor = "bg-gray-900",
  textColor = "text-white",
  gradientText = false,
  href,
  showButton = true,
  buttonText = "Ver productos",
  imagePosition = "right",
  aspectRatio = "landscape",
}: CategoryCardProps) {
  const aspectRatioClass =
    aspectRatio === "portrait" ? "aspect-[2/3]" : aspectRatio === "square" ? "aspect-square" : "aspect-[3/2]"

  return (
    <Link href={href} className={`block rounded-lg overflow-hidden ${aspectRatioClass} relative`}>
      <div className={`absolute inset-0 ${backgroundColor}`}>
        {image && (
          <div className={`absolute ${getImagePositionClasses(imagePosition)} h-full w-full`}>
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div>
          {subtitle && <p className={`text-sm md:text-base ${textColor} mb-1`}>{subtitle}</p>}
          <h3
            className={`text-3xl md:text-5xl font-bold ${gradientText ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-orange-500" : textColor}`}
          >
            {title}
          </h3>
        </div>
        {showButton && (
          <div>
            <button className="border border-white text-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors">
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}

function getImagePositionClasses(position: string) {
  switch (position) {
    case "left":
      return "left-0 right-1/2"
    case "right":
      return "left-1/2 right-0"
    case "bottom":
      return "top-1/2 bottom-0 left-0 right-0"
    case "center":
    default:
      return "inset-0"
  }
}
