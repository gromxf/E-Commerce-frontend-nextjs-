export interface Category {
  id: number
  name: string
  image: string
  count: number
  slug: string
  productCategory: string
}

// Backend integration
export interface BackendCategory {
  id: number
  name: string
  slug: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchCategories(): Promise<BackendCategory[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 300 }, credentials: 'include' })

  if (!res.ok) throw new Error("Failed to fetch categories")

  const data: BackendCategory[] = await res.json()
  return data
}
