import ProductRecommendationsCard from "./product-recommendations-card";

export function ProductRecommendations() {
  // Figma sample data for 4 cards
  const products = [
    {
      id: "calzados-lubi",
      name: "Zapatillas Moda Mujer Urbana Plataforma",
      image: "images/products/zapatilla-moda-mujer-urbana.png",
      discount: "13% OFF",
      seller: "Calzados Lubi",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      variants: 3,
      currentPrice: "$98.000,00",
      originalPrice: "$112.700,00",
      sellerThumb: "images/products/calzados-lubi.png",
    },
    {
      id: "vans-old-skool",
      name: "Zapatillas Vans Old Skool Clasicas",
      image: "images/products/zapatillas-vans-old-school.png",
      discount: "13% OFF",
      seller: "VANS Tienda Oficial",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      variants: 4,
      currentPrice: "$98.000,00",
      originalPrice: "$112.700,00",
      sellerThumb: "images/products/vans-tienda-oficial.png",
    },
    {
      id: "timothea-tienda-oficial",
      name: "Zapatillas Mujer Taco Chino Impermeable Lluvia Moda...",
      image: "images/products/zapatillas-mujer-taco-chino.png",
      discount: "8% OFF",
      seller: "TIMOTHEA Tienda Oficial",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      variants: 10,
      currentPrice: "$34.454,00",
      originalPrice: "$37.599,00",
      sellerThumb: "images/products/timothea-tienda-oficial.png",
    },
    {
      id: "havaianas",
      name: "Minibolsas Havaianas, color gris, plomo metalizado",
      image: "images/products/minibolsa-havaianas.png",
      discount: "32% OFF",
      seller: "Havaianas",
      location: "Villa Urquiza, CABA",
      rating: 4,
      opinions: 183,
      variants: 1,
      currentPrice: "$31.959,32",
      originalPrice: "$46.999",
      sellerThumb: "images/products/havaianas-tienda-oficial.png",
    },
  ];

  return (
  <section className="main-container">
    <div className="mx-auto p-0 pb-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-bold text-[28px] text-[#323232]">También te puede interesar</h2>
        <a href="/ofertas" className="flex items-center justify-center px-8 py-2 rounded-2xl border border-fucsia text-fucsia font-medium text-[16px] hover:bg-[#f9e6fa] transition">
          Ver más ofertas
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductRecommendationsCard
            key={product.id}
            title={product.name}
            image={product.image}
            discount={product.discount}
            seller={product.seller}
            location={product.location}
            rating={product.rating}
            opinions={product.opinions}
            variants={product.variants}
            price={product.currentPrice}
            oldPrice={product.originalPrice}
            sellerImage={product.sellerThumb}
          />))}
      </div>
    </div>
  </section>
  );
}
