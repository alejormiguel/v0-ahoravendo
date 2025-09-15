import WeeklyOpportunitiesCard from "./weekly-opportunities-card";

export default async function WeeklyOpportunities() {
    return (
      <section className="main-container">
        <div className="flex justify-between mb-6">
          <h2 className="font-bold text-2xl">Oportunidades de la semana</h2>
          <a href="/ofertas" className="relative flex items-center justify-center px-8 py-2 rounded-2xl border border-fucsia text-fucsia font-medium hover:bg-[#f9e6fa] transition">
            Ver más ofertas
          </a>
        </div>
        <div className="grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Column 1 - Vertical Card */}
          <div className="flex flex-col gap-4">
            <WeeklyOpportunitiesCard layout="vertical" title='MacBook Air 13.3" Laptop - Apple M1 chip - 8GB Memory - 256GB SSD - Space Gray' discount="7,5% OFF" dailyOffer={true} favorite={true} image="images/home/01-macbook.png" price="$349.000,00" oldPrice="$436.250,00" opinions="(1026 opiniones)" rating={5} />
          </div>
          {/* Column 2 - Horizontal Cards */}
          <div className="flex flex-col gap-4">
            <WeeklyOpportunitiesCard layout="square" title="Apple - AirPods Pro<br/>(2da generación) - Blancos" discount="5% OFF" image="images/home/02-airpods.png" price="$79.399,00" oldPrice="$119.100,00" opinions="(183 opiniones)" rating={5} />
            <WeeklyOpportunitiesCard layout="square" title="Sandalias Crocs Classic Clasicas Infantil Unisex Original Niños Niñas" discount="10% OFF" dailyOffer={true} favorite={true} image="images/home/05-crocs.png" price="$5.899,00" oldPrice="$6.489,00" opinions="(74 opiniones)" rating={4} />
          </div>
          {/* Column 3 - Horizontal Cards */}
          <div className="flex flex-col gap-4 lg:flex-row lg:col-span-2 xl:flex-col xl:col-span-1">
            <WeeklyOpportunitiesCard layout="square" title="Silla de escritorio Home ejecutivo gerencial oficina premium..." discount="15% OFF" favorite={true} image="images/home/04-silla.png" price="$68.230,00" oldPrice="$71.641,00" opinions="(13 opiniones)" rating={4} />
            <WeeklyOpportunitiesCard layout="square" title="Pileta inflable rectangular 2.62m x 1.75m x 51 cm 778L" dailyOffer={true} image="images/home/06-pileta.png" price="$13.100,00" oldPrice="$13.755,00" opinions="(246 opiniones)" rating={3} />
          </div>
        </div>
      </section>
    )
};