"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Package, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchCategories, type BackendCategory } from "@/lib/categories"

const colorGradients = [
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-purple-500 to-indigo-500",
  "from-teal-500 to-cyan-500",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-pink-500",
]

const defaultImages = [
  "/modern-electronics.png",
  "/fashion-clothing-accessories.png",
  "/home-garden-furniture-decor.jpg",
  "/sports-outdoor-equipment.jpg",
  "/books-media-entertainment.jpg",
  "/health-beauty-wellness-products.jpg",
  "/placeholder.svg",
  "/placeholder.svg",
]

export default function CategoriesPage() {
  const [categories, setCategories] = React.useState<BackendCategory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  const featuredCategories = categories.slice(0, 6) // Show first 6 as featured

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Shop by Category
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Discover Your Perfect
              <span className="text-primary"> Category</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Browse through our carefully curated categories to find exactly what you're looking for. From electronics
              to fashion, we have everything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular categories with the latest products and best deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30">
                  <CardContent className="p-0">
                    <div className="h-48 bg-muted animate-pulse" />
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                      <div className="h-4 bg-muted rounded animate-pulse mb-4" />
                      <div className="h-10 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredCategories.map((category, index) => {
                const color = colorGradients[index % colorGradients.length]
                const image = defaultImages[index % defaultImages.length]

                return (
                  <Card
                    key={category.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={image}
                          alt={category.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${color} opacity-20 group-hover:opacity-30 transition-opacity`}
                        />
                        <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                          <Package className="w-3 h-3 mr-1" />
                          Category
                        </Badge>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          Explore our {category.name.toLowerCase()} collection
                        </p>
                        <Link href={`/products?category=${category.id}`}>
                          <Button
                            variant="ghost"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            Browse Category
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

