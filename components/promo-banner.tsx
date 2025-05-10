import Link from "next/link"

interface PromoBannerProps {
  text: string
  linkText: string
  linkHref: string
}

export function PromoBanner({ text, linkText, linkHref }: PromoBannerProps) {
  return (
    <div className="w-full bg-gradient-to-r from-pink-400 to-purple-600 text-white py-4 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2">
        <p className="text-sm sm:text-base">{text}</p>
        <Link href={linkHref} className="font-medium underline hover:text-white/90">
          {linkText}
        </Link>
      </div>
    </div>
  )
}
