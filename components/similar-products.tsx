"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { fetchSimilarProducts, type Product } from "@/lib/products"

interface SimilarProductsProps {
    categoryId: number
    currentProductId: number
    title?: string
    limit?: number
}

export function SimilarProducts({
    categoryId,
    currentProductId,
    title = "Similar Products",
    limit = 6
}: SimilarProductsProps) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const loadSimilarProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const similarProducts = await fetchSimilarProducts(categoryId, currentProductId, limit)
                setProducts(similarProducts)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load similar products")
            } finally {
                setLoading(false)
            }
        }

        if (categoryId && currentProductId) {
            loadSimilarProducts()
        }
    }, [categoryId, currentProductId, limit])

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 2))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2))
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="flex-shrink-0 w-64">
                            <CardContent className="p-4">
                                <div className="animate-pulse">
                                    <div className="bg-muted h-48 rounded-md mb-4" />
                                    <div className="bg-muted h-4 rounded mb-2" />
                                    <div className="bg-muted h-4 w-3/4 rounded" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="text-center py-8 text-muted-foreground">
                    <p>Unable to load similar products</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        )
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
                {products.length > 4 && (
                    <div className="hidden md:flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevSlide}
                            disabled={products.length <= 4}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={nextSlide}
                            disabled={products.length <= 4}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Mobile Grid View */}
            <div className="md:hidden grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                        <Link href={`/products/${product.id}`}>
                            <CardContent className="p-0">
                                <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary">
                                            ${product.price}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${product.inStock
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}>
                                            {product.inStock ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>

            {/* Desktop Carousel View */}
            <div className="hidden md:block relative overflow-hidden">
                <div
                    className="flex gap-4 transition-transform duration-300 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (256 + 16)}px)`,
                        width: `${products.length * (256 + 16)}px`
                    }}
                >
                    {products.map((product) => (
                        <Card key={product.id} className="flex-shrink-0 w-64 group hover:shadow-lg transition-shadow">
                            <Link href={`/products/${product.id}`}>
                                <CardContent className="p-0">
                                    <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-primary">
                                                ${product.price}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${product.inStock
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}>
                                                {product.inStock ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
