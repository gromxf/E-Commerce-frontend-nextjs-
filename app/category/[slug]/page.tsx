import { notFound } from "next/navigation"
import { CategoryHero } from "@/components/category-hero"
import { CategoryProductGrid } from "@/components/category-product-grid"
import { ProductFilters } from "@/components/product-filters"
import { CategoryTopBar } from "@/components/category-top-bar"
import { getCategoryBySlug } from "@/lib/categories"
import { products } from "@/lib/products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = products.filter((product) => product.category === category.productCategory)

  return (
    <div className="min-h-screen bg-background">
      <CategoryTopBar categoryName={category.name} categorySlug={params.slug} />

      <main>
        <CategoryHero category={category} productCount={categoryProducts.length} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <ProductFilters currentCategory={category.productCategory} />
            </aside>
            <div className="lg:col-span-3">
              <CategoryProductGrid products={categoryProducts} category={category} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { slug: "electronics" },
    { slug: "fashion" },
    { slug: "home-garden" },
    { slug: "sports-fitness" },
    { slug: "books-media" },
    { slug: "beauty-health" },
  ]
}
