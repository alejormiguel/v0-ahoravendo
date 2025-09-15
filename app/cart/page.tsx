import { CartItems } from "./cart-items";
import CartTotals from "./cart-totals";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCart } from "../actions/cart";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function CartPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/cart")
  }

  const cart = await getCart()

  // Const sellersWithItems that holds a list of sellers with their respective items
  const sellersWithItems = cart?.items.reduce((sellers: any, item: any) => {
    if (item.product && item.product.seller) {
      const sellerId = item.product.seller.id;
      let seller = sellers.find((s: any) => s.id === sellerId);
      if (!seller) {
        seller = { 
          id: sellerId, 
          name: item.product.seller.name, 
          verified: item.product.seller.verified, 
          items: [], 
          matchingShippingOptions: [] 
        };
        sellers.push(seller);
      }
      seller.items.push(item);
    }
    return sellers;
  }, [] as any[]);
  sellersWithItems.sort((a: any, b: any) => a.name.localeCompare(b.name));

  // Compute matchingShippingOptions for each seller (inner join of shipping options)
  sellersWithItems.forEach((seller: any) => {
    if (seller.items.length > 0) {
      // Start with the shipping options of the first item
      let matchingOptions = seller.items[0].product.shippingOptions.map((opt: any) => ({
        id: opt.id,
        name: opt.name,
        cost: opt.cost,
      }));

      // For each subsequent item, keep only options that exist in both
      // Por ahora hago el match por nombre, pero debería ser por ID
      for (let i = 1; i < seller.items.length; i++) {
        const itemOptions = seller.items[i].product.shippingOptions.map((opt: any) => opt.name);
        matchingOptions = matchingOptions.filter((opt: any) => itemOptions.includes(opt.name));
      }

      // Optionally, get full option objects from the first item
      seller.matchingShippingOptions = matchingOptions;
    } else {
      seller.matchingShippingOptions = [];
    }
  });

  // Clean and ensure types
  const cleanedCart = {
    id: cart?.id || '',
    items: cart?.items.map((item: any) => ({
      id: item?.id,
      quantity: item?.quantity,
      product: {
        id: item?.product?.id,
        name: item?.product?.name,
        description: item?.product?.description,
        faq: item?.product?.faq,
        rating: Number(item?.product?.rating),
        ratingCount: Number(item?.product?.ratingCount),
        originalPrice: Number(item?.product?.originalPrice),
        discount: Number(item?.product?.discount),
        finalPrice: Number(item?.product?.finalPrice),
        noTaxesPrice: Number(item?.product?.noTaxesPrice),
        taxes: Number(item?.product?.taxes),
        images: item?.product?.images,
        stock: item?.product?.stock,
        categoryId: item?.product?.categoryId,
        seller: {
          id: item?.product?.seller?.id || '',
          name: item?.product?.seller?.name || '',
          verified: item?.product?.seller?.verified || false,
        },
        shippingOptions: item?.product?.shippingOptions.map((option: any) => ({
          id: option.id,
          name: option.name,
          cost: Number(option.cost)
        })) || []
      }
    })) || [],
    sellersWithItems,
    createdAt: cart?.createdAt,
    updatedAt: cart?.updatedAt,
    userId: cart?.userId
  }

  const cartItemsTotal = cleanedCart.items.reduce((total, item) => total + Number(item.product.finalPrice) * item.quantity, 0)
  const taxesTotal = cartItemsTotal / 1.21 // Assuming a flat 21% tax rate
  let cartItemCount = cleanedCart.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="main-container">
      <div className="py-4 md:py-6 lg:py-6 xl:py-12">
        <h1 className="text-3xl font-bold">Carrito de compras ({cartItemCount} productos)</h1>
        <div className="mt-8 grid gap-4 md:gap-6 lg:gap-6 xl:gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {!cart || cart.items.length === 0 ? (
              <div className="rounded-lg border p-8 text-center">
                <h2 className="text-lg font-medium">Su carrito está vacío</h2>
                <p className="mt-2 text-sm text-muted-foreground">Agregue items a su carrito para verlos aquí.</p>
                <Button asChild className="mt-4">
                  <Link href="/products">Continuar comprando</Link>
                </Button>
              </div>
            ) : (
              // <CartItems sellersWithItems={sellersWithItems} updateShippingOption={handleUpdateShippingOptionInCartItem} />
              <CartItems sellersWithItems={sellersWithItems} cartId={cart.id} />
            )}
          </div>
          <CartTotals cartItemsTotal={cartItemsTotal} cartItemsAmount={cart?.items.length || 0} taxesTotal={taxesTotal} />
        </div>
      </div>
    </div>
  )
}
