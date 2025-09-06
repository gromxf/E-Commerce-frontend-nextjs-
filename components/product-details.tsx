"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Star, Heart, Truck, Shield, RotateCcw } from "lucide-react"
import type { Product } from "@/lib/api/products"
import Link from "next/link"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Get all images from the product, fallback to single image if no images array
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image]

  const features: string[] = ((product as any).features ?? []) as string[]
  const specifications: Record<string, string> = ((product as any).specifications ?? {}) as Record<string, string>

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (galleryImages.length <= 1) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, galleryImages.length])

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image Display */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted group">
            <img
              src={galleryImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />

            {/* Image Counter */}
            {galleryImages.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            )}

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : galleryImages.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage < galleryImages.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {galleryImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${selectedImage === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(5) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {product.inStock ? (
                <span className="text-green-600">✓ In stock ({product.stockCount} available)</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-border">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                  disabled={quantity >= product.stockCount}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <AddToCartButton product={product} quantity={quantity} className="flex-1" />
            </div>
          </div>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>2-year warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
