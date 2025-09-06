"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Badge } from "@/components/ui/badge"
import { fetchAllProducts } from "@/lib/api/products"
import { fetchCategories } from "@/lib/api/categories"
import type { Product } from "@/lib/api/products"
import type { BackendCategory } from "@/lib/api/categories"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [maxPrice, setMaxPrice] = useState(1000)
  const [categories, setCategories] = useState<BackendCategory[]>([])

  const loadProducts = async (categoryIds?: number[]) => {
    try {
      setLoading(true)
      const data = await fetchAllProducts(categoryIds)
      setAllProducts(data)
      setFilteredProducts(data)

      // Update price range based on actual product prices
      if (data.length > 0) {
        const prices = data.map(p => p.price)
        const minPrice = Math.floor(Math.min(...prices))
        const maxPrice = Math.ceil(Math.max(...prices))
        setMaxPrice(maxPrice)
        setPriceRange([minPrice, maxPrice])
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setAllProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Filter products based on price range
  const applyPriceFilter = (products: Product[], priceRange: [number, number]) => {
    return products.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
  }

  useEffect(() => {
    // Load categories first
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setCategories([])
      }
    }
    loadCategories()

    // Check for category parameter in URL
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      const categoryId = parseInt(categoryParam, 10)
      if (!isNaN(categoryId)) {
        setSelectedCategories([categoryId])
        loadProducts([categoryId])
        return
      }
    }

    // Load all products if no category filter
    loadProducts()
  }, [searchParams])

  const handleCategoryChange = (categoryIds: number[]) => {
    setSelectedCategories(categoryIds)
    loadProducts(categoryIds.length > 0 ? categoryIds : undefined)
  }

  const handlePriceRangeChange = (newPriceRange: [number, number]) => {
    setPriceRange(newPriceRange)
    const priceFiltered = applyPriceFilter(allProducts, newPriceRange)
    setFilteredProducts(priceFiltered)
  }

  // Update filtered products when allProducts or priceRange changes
  useEffect(() => {
    const priceFiltered = applyPriceFilter(allProducts, priceRange)
    setFilteredProducts(priceFiltered)
  }, [allProducts, priceRange])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {selectedCategories.length > 0 ? 'Filtered Products' : 'All Products'}
          </h1>
          <p className="text-muted-foreground text-lg text-pretty">
            {selectedCategories.length > 0
              ? `Showing products in selected categories`
              : 'Discover our complete collection of quality products'
            }
          </p>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategories.map((categoryId) => {
                const category = categories.find(c => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="text-sm">
                    {category?.name || `Category ${categoryId}`}
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              maxPrice={maxPrice}
            />
          </aside>
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
