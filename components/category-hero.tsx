import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/categories"

interface CategoryHeroProps {
  category: Category
  productCount: number
}

export function CategoryHero({ category, productCount }: CategoryHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Category
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">{category.name}</h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                Discover our curated collection of {category.name.toLowerCase()} products, carefully selected for
                quality and value.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{productCount} Products Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Shipping Available</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">{productCount}</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
