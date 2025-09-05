"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartDrawer } from "@/components/cart-drawer"
import { fetchCategories, type BackendCategory } from "@/lib/categories"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<BackendCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl">EcoStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            {loading ? (
              <span className="text-muted-foreground text-sm">Loading categories...</span>
            ) : (
              categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="text-foreground hover:text-primary transition-colors text-sm whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))
            )}
          </nav>
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <CartDrawer />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10 bg-muted/50 border-border" />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link href="/products" className="text-foreground hover:text-primary transition-colors py-2">
                  Products
                </Link>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground px-2 py-1">
                    Categories
                  </div>
                  {loading ? (
                    <div className="text-sm text-muted-foreground px-2 py-1">
                      Loading categories...
                    </div>
                  ) : (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="text-foreground hover:text-primary transition-colors py-1 px-2 block text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                </div>
                <Link href="/account" className="text-foreground hover:text-primary transition-colors py-2">
                  My Account
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
