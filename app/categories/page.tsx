import Link from "next/link"
import { ArrowRight, Package, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest gadgets and tech accessories",
    image: "/modern-electronics.png",
    productCount: 156,
    featured: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "/fashion-clothing-accessories.png",
    productCount: 243,
    featured: true,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "home-garden",
    name: "Home & Garden",
    description: "Everything for your home and outdoor space",
    image: "/home-garden-furniture-decor.jpg",
    productCount: 189,
    featured: false,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    description: "Gear for active lifestyles",
    image: "/sports-outdoor-equipment.jpg",
    productCount: 127,
    featured: false,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "books-media",
    name: "Books & Media",
    description: "Books, movies, and entertainment",
    image: "/books-media-entertainment.jpg",
    productCount: 98,
    featured: false,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    description: "Personal care and wellness products",
    image: "/health-beauty-wellness-products.jpg",
    productCount: 134,
    featured: true,
    color: "from-teal-500 to-cyan-500",
  },
]

export default function CategoriesPage() {
  const featuredCategories = categories.filter((cat) => cat.featured)
  const allCategories = categories

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
            {featuredCategories.map((category) => (
              <Card
                key={category.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                    />
                    <Badge className="absolute top-4 left-4 bg-background/90 text-foreground">
                      {category.productCount} Products
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                    <Link href={`/category/${category.id}`}>
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
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Categories</h2>
            <p className="text-muted-foreground">Explore our complete range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allCategories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer border-0 bg-background/80 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <div className="relative mb-3">
                      <div
                        className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{category.productCount} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
