import { notFound } from "next/navigation"
import { getProductById } from "@/app/actions/products"
import { Icon } from "@/components/icons/icon"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import Section from "@/components/products/section"
import { CartQuantity } from "./cart-quantity"
import ProductImagesGrid from "@/components/products/product-images-grid"
import ProductReviews from "@/components/products/product-reviews"
import { ProductDetailsForm } from "./product-details-form"

interface ProductPageProps {
  params: {
    id: string
  }
}

// Accept searchParams for query string
export default async function ProductPage({ params, searchParams }: { params: { id: string }, searchParams?: { q?: string } }) {

  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Extracted Product object with all info (static and dynamic)
  const Product = {
    id: product.id? product.id : '',
    name: product.name? product.name : '',
    description: product.description ? product.description : '',
    faq: product.faq ? product.faq : '',
    originalPrice: Number(product.originalPrice),
    discount: Number(product.discount),
    finalPrice: Number(product.finalPrice),
    noTaxesPrice: Number(product.noTaxesPrice),
    taxes: Number(product.taxes),
    stock: product.stock? product.stock : 0,
    category: product.category ? product.category.name : '',
    images: product.images ? product.images : [],
    // questions: product.questions ? product.questions : [],
    specifications: product.specifications ? product.specifications : [],
    variations: product.variations ? product.variations : [],
    reviews: product.reviews ? product.reviews : [],
    rating: product.reviews && product.reviews.length > 0 ? Math.round(product.reviews.reduce((accumulator: number, currentValue: { rating: number }) => accumulator + currentValue.rating, 0) / product.reviews.length) : 0,
    ratingCount: product.reviews ? product.reviews.length : 0,
    shippingOptions: [
      {
        type: "RETIRO EN DEPÓSITO",
        location: "Villa Urquiza, CABA",
        price: 0,
        icon: "selector-blanco",
        color: "bg-azul"//"#008bf5"
      },
      {
        type: "ENVÍO POR CORREO",
        location: "Correo Argentino",
        price: 3800,
        icon: "selector-fucsia",
        color: "bg-fucsia"
      }
    ],
    costSummary: {
      products: Number(product.noTaxesPrice),
      shipping: 3800,
      subtotal: Number(product.noTaxesPrice) + 0,
      taxes: Number(product.taxes),
      total: Number(product.finalPrice) + 3800
    },
    seller: {
      ...product.seller,
      reviews: 1001,
      stars: 4
    }
  };

  function renderStars(rating: number) {
    const listItems = [];
    for (let i = 0; i < rating; i++) {
      listItems.push(<Icon key={i} icon="star-on" size={24} color="filter-fucsia-svg" />);
      ;
    }
    for (let i = 0; i < (5-rating); i++) {
      listItems.push(<Icon key={i+5} icon="star-on" size={24} color="filter-gris-light-medium-svg" />);
      ;
    }
    return listItems;
  }

  // Splitting the description into lines to render with <br/>
  const descriptionLines = Product.description.split('\\n');
  const faqLines = Product.faq.split('\\n');

  // Get search query from searchParams
  const searchQuery = searchParams?.q ?? "";
  const goBackHref = searchQuery ? `/products?q=${encodeURIComponent(searchQuery)}` : "/products";

  return (
    <div className="container py-4">
      <div className="flex flex-row gap-2 py-2">
        <Icon icon="volver" size={16} color="filter-fucsia-svg" />
        <a id="go-back-link" href={goBackHref} className="text-[#bc00b8]">
          Volver
        </a>
      </div>
      <Breadcrumb
        sections={[
          { label: product.category ? product.category.name : "", href: `/productos?cat=${product.category ? product.category.name : ""}` },
          { label: product.name ? product.name : "", href: `/products/${product.id}` }
        ]}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <ProductImagesGrid images={Product.images} />
          <div className="my-8">
            <div className="flex-1 mt-4">
              <hr className="my-6 border-[#d8d8d8]" />
              {/* ***** Preguntas del producto ***** */}
              {/* <Section title={`Preguntas del producto (${Product.questions.length})`} expanded={true}>
                {Product.questions.map((question: { question: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; answer: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }, index: Key | null | undefined) => (
                  <div key={index} className="mb-8">
                    <p className="font-montserrat text-[16px] text-[#222222] mb-1">
                      P: {question.question}
                    </p>
                    <p className="font-montserrat text-[14px] text-[#969696]">
                      R: {question.answer}
                    </p>
                  </div>
                ))}
                <div>
                  <a href="#" className="font-montserrat font-medium text-[18px] leading-[22px] text-[#bc00b8] underline underline-offset-2 block mt-4">
                    Cargar más preguntas
                  </a>
                </div>
              </Section>
              <hr className="my-6 border-[#d8d8d8]" /> */}
              {/* ***** Descripción del producto ***** */}
              <Section title="Descripción del producto" expanded={true}>
                <div className="mt-4">
                  <p className="font-montserrat text-[14px] text-[#969696]">
                    {descriptionLines.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </Section>
              <hr className="my-6 border-[#d8d8d8]" />
              {/* ***** FAQs ***** */}
              {Product.faq !== "" && (
              <Section title="Preguntas frecuentes" expanded={true}>
                <div className="mt-4">
                  <p className="font-montserrat text-[14px] text-[#969696]">
                    {faqLines.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </Section>)}
              {Product.faq !== "" && (
              <hr className="my-6 border-[#d8d8d8]" />)}
              {/* ***** Descripción técnica ***** */}
              <Section title="Descripción técnica" expanded={true}>
                <div className="pt-4">
                  {Product.specifications.map((detail, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 py-1">
                      <p className="font-montserrat text-[14px] text-[#969696]">{detail.name}:</p>
                      <p className="font-montserrat text-[14px] text-[#969696]">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </Section>
              <hr className="my-6 border-[#d8d8d8]" />
              <ProductReviews reviews={Product.reviews} />
              <hr className="my-6 border-[#d8d8d8]" />
              <div className="flex flex-row gap-6 items-start mt-4">
                <span className="font-montserrat text-[16px] text-[#969696]">
                  ID de publicación: {Product.id}
                </span>
                <a href="#" className="font-montserrat font-medium text-[16px] leading-[22px] text-[#bc00b8] underline underline-offset-2">
                  Denunciar publicación
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Product details */}
        <div className="space-y-4 mb-8">
          {Product.discount > 0 && (<span className="bg-[#e6f3fe] text-[#008bf5] font-medium text-[14px] rounded px-2 py-0.5">{Product.discount}% OFF</span>)}
          <div>
            <h1 className="text-3xl font-bold">{Product.name}</h1>
          </div>
          <div className="flex flex-col">
            {Product.originalPrice > 0 &&
            <span className="text-[18px] font-normal text-[#323232] line-through">{Product.originalPrice.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
            }
            <span className="text-[28px] font-bold text-[#323232]">{Product.finalPrice.toLocaleString("es-AR", { style: 'currency', currency: 'ARS' })}</span>
          </div>
          <div className="flex items-center mt-0">
            {renderStars(Product.rating)}
            <span className="mx-2 text-[14px] font-normal text-black">({Product.ratingCount} opiniones del producto)</span>
          </div>

          <ProductDetailsForm product={Product} />

          {/* Información de la tienda */}
          <div id="info" className="relative bg-[#fbfbfb] rounded-[22px] border border-[#d8d8d8] py-4 mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#d8d8d8] px-4 pb-4">
              <span className="font-montserrat font-bold text-[16px] text-black">Información de la tienda</span>
            </div>
            <div className="flex flex-row gap-2 mt-2 px-4">
              <img src={Product.seller.logo ? Product.seller.logo : '/images/common/placeholder.svg'} alt="Logo tienda" className="max-w-11 max-h-11 w-full h-full rounded-full object-cover" />
              <div className="flex flex-col gap-1">
                <span className="font-montserrat font-bold text-[20px] text-[#323232] flex items-center gap-2">
                  {Product.seller.verified &&
                    <Icon icon="verificado" size={32} color="filter-aguamarina-svg" />
                  }
                  {Product.seller.name}
                </span>
                <span className="font-montserrat text-[14px] text-[#969696]">{Product.seller.salesAmount}</span>
                <div className="flex items-center gap-2 mt-1">
                  <img src={`/images/common/${Product.seller.stars}-stars.png`} alt="star" className="h-4" />
                  <span className="font-montserrat font-medium text-[14px] text-[#646464] underline">({Product.seller.reviews.toLocaleString("es-AR")} opiniones de la empresa)</span>
                </div>
                <span className="font-montserrat text-[14px] text-[#969696] mt-1">Tipo de facturas: {Product.seller.invoiceTypes}</span>
              </div>
            </div>
          </div>
          {/* Ver más publicaciones del vendedor button */}
          <div className="border border-[#bc00b8] flex flex-row gap-2 items-center justify-center px-8 py-3 rounded-2xl mt-6 cursor-pointer">
            <span className="font-montserrat font-medium text-[18px] text-[#bc00b8] leading-6">Ver más publicaciones del vendedor</span>
          </div>
        </div>
      </div>
    </div>
  )
}
