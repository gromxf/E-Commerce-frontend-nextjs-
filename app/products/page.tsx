import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { fetchAllProducts } from "@/lib/products"

export default async function ProductsPage() {
  const products = await fetchAllProducts()
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">All Products</h1>
          <p className="text-muted-foreground text-lg text-pretty">
            Discover our complete collection of quality products
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>
          <div className="lg:col-span-3">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}
