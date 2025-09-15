import Link from "next/link"

interface PromoBannerProps {
  text: string
  linkText: string
  linkHref: string
}

export function PromoBanner({ text, linkText, linkHref }: PromoBannerProps) {
  return (
    <section className="main-container">
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left bg-gradient-to-r from-violeta to-celeste text-white py-6 rounded-xl">
        <p className="text-sm sm:text-base">{text}</p>
        <Link href={linkHref} className="font-medium underline hover:text-white/90">
          {linkText}
        </Link>
      </div>
    </section>
  )
}
