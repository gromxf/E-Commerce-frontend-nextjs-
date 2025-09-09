
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
// Interfața produsului simplificată
export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  categoryId?: number
  inStock: boolean
  stockCount: number
  images?: string[]
}

export interface CreateProductInput {
  name: string
  description?: string
  price: number
  stock: number
  images: string[]
  categoryId: number
}

// backend types
export interface BackendProduct {
  id: number
  name: string
  description?: string | null
  price: number
  stock: number
  categoryId: number
  category?: { id: number; name: string }
  images: { id: number; url: string }[]
}

// transforma backend product in frontend product
function mapBackendToFrontendProduct(p: BackendProduct): Product {
  const imageUrls = p.images?.map(img => img.url) || []
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    image: imageUrls[0] || "/placeholder.svg",
    description: p.description || "",
    category: p.category?.name || "General",
    categoryId: p.categoryId,
    inStock: (p.stock ?? 0) > 0,
    stockCount: p.stock ?? 0,
    images: imageUrls,
  }
}

export async function fetchAllProducts(categoryIds?: number[]): Promise<Product[]> {
  let url = `${API_BASE_URL}/products`

  // add category
  if (categoryIds && categoryIds.length > 0) {
    const categoryParams = categoryIds.map(id => `categoryId=${id}`).join('&')
    url += `?${categoryParams}`
  }

  const res = await fetch(url, { credentials: 'include' })

  if (!res.ok) throw new Error("Failed to fetch products")

  const data: BackendProduct[] = await res.json()
  return data.map(mapBackendToFrontendProduct)
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store", credentials: 'include' })
  //guard
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch product")

  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function createProduct(input: CreateProductInput): Promise<Product> {

  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    credentials: 'include',
  })

  if (!res.ok) throw new Error("Failed to create product")

  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function updateProduct(
  id: number,
  input: Partial<CreateProductInput>
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    credentials: 'include',
  })

  if (!res.ok) throw new Error("Failed to update product")

  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE", credentials: 'include' })

  if (!res.ok) throw new Error("Failed to delete product")
}

export async function fetchSimilarProducts(categoryId: number, excludeProductId: number, limit: number = 6): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?categoryId=${categoryId}`, { credentials: 'include' })

  if (!res.ok) throw new Error("Failed to fetch similar products")

  const data: BackendProduct[] = await res.json()
  const allProducts = data.map(mapBackendToFrontendProduct)

  // filter 
  return allProducts
    .filter(product => product.id !== excludeProductId)
    .slice(0, limit)
}
