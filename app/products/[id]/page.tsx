import { notFound } from "next/navigation"
import { fetchProductById } from "@/lib/products"
import { ProductDetails } from "@/components/product-details"
import { SimilarProducts } from "@/components/similar-products"

interface ProductPageProps {
  params: {
    id: string
  }
}
export default async function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.id)
  const product = await fetchProductById(productId)

  // Dacă produsul nu există, redirecționează la 404
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />

        {/* Similar Products Section */}
        {product.categoryId && (
          <div className="mt-16">
            <SimilarProducts
              categoryId={product.categoryId}
              currentProductId={product.id}
              title="You might also like"
            />
          </div>
        )}
      </div>
    </div>
  )
}
