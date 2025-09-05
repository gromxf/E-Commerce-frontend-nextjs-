import { notFound, redirect } from "next/navigation"
import { getCategoryBySlug } from "@/lib/categories"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  // Redirect to products page with category filter
  redirect(`/products?category=${category.id}`)
}

export async function generateStaticParams() {
  return [
    { slug: "electronics" },
    { slug: "fashion" },
    { slug: "home-garden" },
    { slug: "sports-fitness" },
    { slug: "books-media" },
    { slug: "beauty-health" },
  ]
}
