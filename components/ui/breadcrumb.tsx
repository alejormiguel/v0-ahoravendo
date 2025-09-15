import Link from "next/link"

interface BreadcrumbSection {
  label: string
  href: string
}

interface BreadcrumbProps {
  sections: BreadcrumbSection[]
}

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"


export function Breadcrumb({ sections }: { sections: { label: string; href: string }[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 py-2 mb-4">
      {sections.map((section, idx) => (
        <div key={section.href} className="flex items-center">
          <Link
            href={section.href}
            className={
              [
                "font-montserrat",
                idx === sections.length - 1
                  ? "font-bold text-[#646464] underline underline-offset-2 decoration-solid decoration-1"
                  : "font-bold text-[#d8d8d8]",
                "text-[14px] leading-[20px] whitespace-pre"
              ].join(" ")
            }
            aria-current={idx === sections.length - 1 ? "page" : undefined}
          >
            {section.label}
          </Link>
          {idx < sections.length - 1 && (
            <span className="mx-2 font-bold text-[#d8d8d8] text-[14px] leading-[20px]">/</span>
          )}
        </div>
      ))}
    </nav>
  )
}

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

