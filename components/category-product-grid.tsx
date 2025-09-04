"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddToCartButton } from "@/components/add-to-cart-button"
import type { Product } from "@/lib/products"
import type { Category } from "@/lib/categories"
import { Star, Grid, List } from "lucide-react"

interface CategoryProductGridProps {
  products: Product[]
  category: Category
}

type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest"
type ViewMode = "grid" | "list"

export function CategoryProductGrid({ products, category }: CategoryProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("name")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="space-y-6">
      {/* Header with sorting and view options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{category.name} Products</h2>
          <p className="text-muted-foreground">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products grid/list */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  viewMode: ViewMode
}

function ProductCard({ product, viewMode }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex gap-6 p-6">
            <Link href={`/products/${product.id}`} className="flex-shrink-0">
              <div className="w-32 h-32 relative overflow-hidden rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="flex-1 space-y-3">
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{product.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                  {product.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <Badge className="absolute top-3 left-3" variant="secondary">
                {product.badge}
              </Badge>
            )}
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
          </Link>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
