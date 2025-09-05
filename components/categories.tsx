"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { fetchCategories, type BackendCategory } from "@/lib/categories"

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

export function Categories() {
  const [categories, setCategories] = React.useState<BackendCategory[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted animate-pulse rounded-t-lg" />
                  <div className="p-6">
                    <div className="h-6 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            categories.map((category, index) => {
              const image = defaultImages[index % defaultImages.length]

              return (
                <Link key={category.id} href={`/category/${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                    <CardContent className="p-0">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground">Browse products</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
