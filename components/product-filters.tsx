"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchCategories, type BackendCategory } from "@/lib/api/categories"

const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "Canon"]

interface ProductFiltersProps {
  currentCategory?: string
  selectedCategories: number[]
  onCategoryChange: (categoryIds: number[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (priceRange: [number, number]) => void
  maxPrice?: number
}

export function ProductFilters({
  currentCategory,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  maxPrice = 10000
}: ProductFiltersProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [categories, setCategories] = useState<BackendCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setCategories([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
  }, [])

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, categoryId])
    } else {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const clearFilters = () => {
    onPriceRangeChange([0, maxPrice])
    onCategoryChange([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0 || (priceRange[0] > 0 || priceRange[1] < maxPrice)) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find(c => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="cursor-pointer">
                    {category?.name || `Category ${categoryId}`}
                  </Badge>
                )
              })}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="cursor-pointer">
                  ${priceRange[0]} - ${priceRange[1]}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={onPriceRangeChange} max={maxPrice} step={10} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories - hide if we're on a specific category page */}
      {!currentCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading categories...</div>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.name}
                  </label>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
