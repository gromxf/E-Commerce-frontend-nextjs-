import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Categories } from "@/components/categories"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  )
}
