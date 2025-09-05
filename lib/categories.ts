export interface Category {
  id: number
  name: string
  image: string
  count: number
  slug: string
  productCategory: string
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "/modern-electronics.png",
    count: 245,
    slug: "electronics",
    productCategory: "Electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/stylish-clothing-and-accessories.png",
    count: 189,
    slug: "fashion",
    productCategory: "Clothing",
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "/home-decor-and-garden-items.png",
    count: 156,
    slug: "home-garden",
    productCategory: "Home",
  },
  {
    id: 4,
    name: "Sports & Fitness",
    image: "/sports-equipment-and-fitness-gear.jpg",
    count: 98,
    slug: "sports-fitness",
    productCategory: "Fitness",
  },
  {
    id: 5,
    name: "Books & Media",
    image: "/books-and-media-collection.png",
    count: 234,
    slug: "books-media",
    productCategory: "Lifestyle",
  },
  {
    id: 6,
    name: "Beauty & Health",
    image: "/beauty-and-health-products.png",
    count: 167,
    slug: "beauty-health",
    productCategory: "Lifestyle",
  },
]

export function getCategoryById(id: number): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

// Backend integration
export interface BackendCategory {
  id: number
  name: string
  slug: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchCategories(): Promise<BackendCategory[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 300 } })

  if (!res.ok) throw new Error("Failed to fetch categories")

  const data: BackendCategory[] = await res.json()
  return data
}
