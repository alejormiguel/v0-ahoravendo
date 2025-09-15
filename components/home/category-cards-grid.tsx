import { CategoryCard } from "./category-card"

export function CategoryCardsGrid() {
  return (
  <section className="main-container">
    <div className="mx-auto p-0 flex flex-col xl:flex-row gap-4">
      {/* Top row - 2 cards */}
      <div className="flex flex-col xl:w-1/2 gap-4">
        <CategoryCard
          imageUrl="/images/home/products-trendy.png"
          variant="medium"
          buttonPosition="bottom-right"
          divClassName="w-full xl:h-[382px]"
        />
        <div className="flex flex-row gap-4">
          <CategoryCard
            imageUrl="/images/home/vacuum-cleaner.png"
            variant="small"
            buttonPosition="bottom-center"
            buttonText="Ver productos"
            divClassName="w-full xl:h-[382px]"
          />
          <CategoryCard
            imageUrl="/images/home/air-fryer.png"
            variant="small"
            buttonPosition="bottom-center"
            buttonText="Ver productos"
            divClassName="w-full xl:h-[382px]"
          />
        </div>
      </div>

      {/* Bottom row - 3 cards */}
      <div className="flex flex-col xl:w-1/2 gap-4">
        <CategoryCard
          imageUrl="/images/home/lamps.png"
          variant="medium"
          buttonPosition="bottom-right"
          buttonText="Ver productos"
          divClassName="w-full xl:h-[382px]"
        />
        <CategoryCard
          imageUrl="/images/home/smartphones.png"
          variant="medium"
          buttonPosition="bottom-right"
          buttonText="Ver productos"
          divClassName="w-full xl:h-[382px]"
        />
      </div>
    </div>
  </section>
  )
}
