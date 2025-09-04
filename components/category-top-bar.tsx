import Link from "next/link"
import { ChevronRight, Home, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CategoryTopBarProps {
  categoryName: string
  categorySlug: string
}

export function CategoryTopBar({ categoryName, categorySlug }: CategoryTopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </nav>

          {/* Category Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/categories">
                <Grid3X3 className="h-4 w-4 mr-2" />
                All Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
