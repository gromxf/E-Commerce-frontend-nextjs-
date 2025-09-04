import { notFound } from "next/navigation"
import { fetchProductById, fetchProductsByCategoryId } from "@/lib/products"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = await fetchProductById(productId)

  if (!product) {
    notFound()
  }

  const relatedProductsAll = product.categoryId
    ? await fetchProductsByCategoryId(product.categoryId).catch(() => [])
    : []
  const relatedProducts = relatedProductsAll.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
      </div>
    </div>
  )
}
