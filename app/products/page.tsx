import ProductGrid from "@/components/products/product-grid";
import { Icon } from "@/components/icons/icon";
import ProductFilters from "@/components/products/product-filters";
import { searchProducts } from "../actions/products";
import OrdenarDropdown from "@/components/products/ordenar-dropdown";

interface FilterProp {
  label: string;
  checked: boolean;
  minimum?: number;
  maximum?: number;
}

interface FiltersProp {
  category: string;
  type: string;
  expanded: boolean;
  filters: Array<FilterProp>;
}

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

export default async function ProductsPage({ searchParams }: { searchParams?: { q?: string } }) {
  // Get query from search params (Next.js app router)
  const query = searchParams?.q ?? "";
  const filtersArray: Array<FiltersProp> = [
    {
      category: "Tipo de envío",
      type: "checkbox",
      expanded: true,
      filters: [
        { label: "Llega hoy", checked: false },
        { label: "Llega mañana", checked: false },
        { label: "Retiro en tienda", checked: false },
        { label: "Envío por correo", checked: false },
      ],
    },
    {
      category: "Subcategoría",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Runing", checked: false },
        { label: "Urbano", checked: false },
        { label: "Casual", checked: false },
        { label: "Training", checked: false },
        { label: "Skate", checked: false },
        { label: "Train runing", checked: false },
        { label: "Tenis", checked: false },
        { label: "Trekking", checked: false },
        { label: "Caminar", checked: false },
        { label: "Entrenamiento", checked: false },
        { label: "Pádel", checked: false },
        { label: "Moda", checked: false },
        { label: "Deportivo", checked: false },
        { label: "Básquet", checked: false },
        { label: "Outdoor", checked: false },
      ],
    },
    {
      category: "Género",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Mujer", checked: false },
        { label: "Hombre", checked: false },
        { label: "Niños", checked: false },
        { label: "Niñas", checked: false },
        { label: "Unisex", checked: false },
      ],
    },
    {
      category: "Talle",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "XS", checked: false },
        { label: "S", checked: false },
        { label: "M", checked: false },
        { label: "L", checked: false },
        { label: "XL", checked: false },
        { label: "XXL", checked: false },
        { label: "XXXL", checked: false },
        { label: "4XL", checked: false },
      ],
    },
    {
      category: "Marca",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Nike", checked: false },
        { label: "Adidas", checked: false },
        { label: "Topper", checked: false },
        { label: "Puma", checked: false },
      ],
    },
    {
      category: "Color principal",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Blanco", checked: false },
        { label: "Negro", checked: false },
        { label: "Gris / plata", checked: false },
        { label: "Rojo", checked: false },
      ],
    },
    {
      category: "Estilo",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Formal", checked: false },
        { label: "Informal", checked: false },
      ],
    },
    {
      category: "Costo de envío",
      type: "range",
      expanded: false,
      filters: [
        { label: "Desde", checked:false, minimum: 0, maximum: 0 },
      ],
    },
    {
      category: "Tipo de entrega",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Domicilio", checked: false },
        { label: "Pick up", checked: false },
        { label: "Sucursal", checked: false },
        { label: "Dirección del vendedor", checked: false },
      ],
    },
    {
      category: "Precio",
      type: "range",
      expanded: false,
      filters: [
        { label: "Desde", checked:false, minimum: 10, maximum: 0 },
      ],
    },
    {
      category: "Ubicación",
      type: "checkbox",
      expanded: false,
      filters: [
        { label: "Capital Federal", checked: false },
        { label: "GBA Zona Norte", checked: false },
        { label: "GBA Zona Oeste", checked: false },
        { label: "GBA Zona Sur", checked: false },
        { label: "Mar del Plata", checked: false },
        { label: "Bahía Blanca", checked: false },
        { label: "Formosa", checked: false },
        { label: "Córdoba", checked: false },
        { label: "Santa Fe", checked: false },
        { label: "Corrientes", checked: false },
      ],
    },
  ]

  const productsFromDB = await searchProducts(query);

  const products: ProductProp[] = productsFromDB.map((product) => ({
    id: product.id,
    image: product.images[0] || "/images/products/zapatilla-moda-mujer-urbana-2.png",
    store: product.seller?.logo || "/images/products/calzados-lubi.png",
    discount: Number(product.discount) > 0 ? `${product.discount}% OFF` : "",
    seller: product.seller?.name || "Calzados Lubi",
    location: "Villa Urquiza, CABA",
    title: product.name,
    variants: product.variations?.length == 1 ? "1 variante" : product.variations.length + " variantes",
    price: Number(product.finalPrice),
    oldPrice: Number(product.originalPrice),
    opinions: product.reviews?.length || 0,
    rating: product.reviews && product.reviews.length > 0 ? Math.round(product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length) : 0,
    favorite: false,
  }));
  
  return (
    <div className="main-container">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-6 md:gap-6 lg:grid-cols-12 lg:gap-6 xl:grid-cols-12 xl:gap-12">
        <div className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-3 bg-grisxlight">
          <ProductFilters filtersArray={filtersArray} />
        </div>
        {/* Products List */}
        <div id="products-list" className="col-span-2 md:col-span-4 lg:col-span-9 xl:col-span-9 py-4 md:py-6 lg:py-6 xl:py-12">
          <div className="flex justify-end items-center gap-2 mb-4 md:mb-6 lg:mb-6 xl:mb-12">
            <p className="font-bold">Ordenar por:</p>
            <OrdenarDropdown />
          </div>
          {/* Modularized Product Grid */}
          <ProductGrid products={products} query={query} />
        </div>
      </div>
    </div>
  )
}