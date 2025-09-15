import React from "react";
import ProductCard from "./product-card";

interface ProductProp {
  id: string,
  image: string;
  store: string;
  discount: string;
  seller: string;
  location: string;
  title: string;
  variants: string;
  price: number;
  oldPrice: number;
  opinions: number;
  rating: number;
  favorite: boolean;
}

export default function ProductGrid({ products, query }: { products: ProductProp[], query: string }) {
    // const products = [
    //     {
    //         image: "/images/products/zapatilla-moda-mujer-urbana-2.png",
    //         store: "/images/products/calzados-lubi.png",
    //         discount: "13% OFF",
    //         seller: "Calzados Lubi",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Moda Mujer Urbana Plataforma",
    //         variants: "3 variantes",
    //         price: "$81.000,00",
    //         oldPrice: "$105.000,00",
    //         opinions: "151",
    //         rating: 3,
    //         favorite: true,
    //     },
    //     {
    //         image: "/images/products/zapatillas-vans-old-school.png",
    //         store: "/images/products/vans-tienda-oficial.png",
    //         discount: "13% OFF",
    //         seller: "VANS Tienda Oficial",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Vans Old Skool Clasicas",
    //         variants: "4 variantes",
    //         price: "$98.000,00",
    //         oldPrice: "$112.700,00",
    //         opinions: "183",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-mujer-taco-chino.png",
    //         store: "/images/products/timothea-tienda-oficial.png",
    //         discount: "8% OFF",
    //         seller: "Timothea Tienda Oficial",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Mujer Taco Chino Impermeable Lluvia Moda...",
    //         variants: "10 variantes",
    //         price: "$34.454,00",
    //         oldPrice: "$37.599,00",
    //         opinions: "17",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-topper-gondor-li-pave.png",
    //         store: "/images/products/topper.png",
    //         discount: "30% OFF",
    //         seller: "TOPPER",
    //         location: "Villa Urquiza, CABA",
    //         title: "Topper Zapatillas - Gondor Li Pave",
    //         variants: "2 variantes",
    //         price: "$60.819,00",
    //         oldPrice: "$87.899,00",
    //         opinions: "416",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-skater-oversize-negras.png",
    //         store: "/images/products/ozono.png",
    //         discount: "14% OFF",
    //         seller: "Ozono",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Skater Oversize Negras",
    //         variants: "2 variantes",
    //         price: "$57.018,99",
    //         oldPrice: "$66.300,00",
    //         opinions: "846",
    //         rating: 2,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-topper-terre-blanco-choco-wood-rosa-sepia.png",
    //         store: "/images/products/topper.png",
    //         discount: "8% OFF",
    //         seller: "TOPPER",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Topper Terre Blanco/choco Wood/rosa Sepia",
    //         variants: "2 variantes",
    //         price: "$58.500,00",
    //         oldPrice: "$78.000,00",
    //         opinions: "46",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-47-street-rock.png",
    //         store: "/images/products/47-street.png",
    //         discount: "",
    //         seller: "47 Street",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas 47 Street Rock",
    //         variants: "8 variantes",
    //         price: "$119.999,00",
    //         oldPrice: "",
    //         opinions: "873",
    //         rating: 5,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-becca-deportivas.png",
    //         store: "/images/products/becca-shoes.png",
    //         discount: "60% OFF",
    //         seller: "Becca shoes",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas Becca Deportivas Pierre Art.5761 - 36-43 Full",
    //         variants: "2 variantes",
    //         price: "$59.999,00",
    //         oldPrice: "$149.999,00",
    //         opinions: "846",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-dc-court-graffik-ss.png",
    //         store: "/images/products/potenza-shop.png",
    //         discount: "",
    //         seller: "Potenza Shop",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas DC Court Graffik Ss Original - Potenza shop",
    //         variants: "2 variantes",
    //         price: "$152.774,03",
    //         oldPrice: "",
    //         opinions: "51",
    //         rating: 3,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/zapatillas-mujer-livianas-comodas-moda-city-full.png",
    //         store: "/images/products/nike-tienda-oficial.png",
    //         discount: "13% OFF",
    //         seller: "Nike Tienda Oficial",
    //         location: "Villa Urquiza, CABA",
    //         title: "Zapatillas de Mujer Livianas Comodas Moda City Full",
    //         variants: "3 variantes",
    //         price: "$125.279,04",
    //         oldPrice: "149.999,99",
    //         opinions: "416",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/calzado-hombre-nike-revolution-7-negro.png",
    //         store: "/images/products/nike-tienda-oficial.png",
    //         discount: "",
    //         seller: "Nike Tienda Oficial",
    //         location: "Villa Urquiza, CABA",
    //         title: "Calzado para Hombre Nike Revolution 7 Negro",
    //         variants: "2 variantes",
    //         price: "$109.999,99",
    //         oldPrice: "",
    //         opinions: "846",
    //         rating: 4,
    //         favorite: false,
    //     },
    //     {
    //         image: "/images/products/calzado-mujer-nike-air-max-1-gris-png.png",
    //         store: "/images/products/todo-botines.png",
    //         discount: "",
    //         seller: "BUMA6149206",
    //         location: "Villa Urquiza, CABA",
    //         title: "Calzado para Mujer Nike Air Max 1 Gris",
    //         variants: "10 variantes",
    //         price: "$167.999,99",
    //         oldPrice: "",
    //         opinions: "17",
    //         rating: 3,
    //         favorite: false,
    //     },
    // ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 xl:gap-12">
      {products.map((product, idx) => (
        <ProductCard key={idx} product={product} query={query} />
      ))}
    </div>
  )
}
