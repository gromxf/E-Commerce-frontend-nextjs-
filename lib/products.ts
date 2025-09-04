// lib/products.ts

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
}
export interface CreateProductInput {
  name: string
  description?: string
  price: number
  stock: number
  images: string[]
  categoryId: number
}

// Lista de produse demo
export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    image: "/premium-wireless-headphones.png",
    description: "Experience premium sound quality with these headphones.",
    category: "Electronics",
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 249.99,
    image: "/modern-smartwatch-fitness-tracker.jpg",
    description: "Track your fitness goals with this advanced smartwatch.",
    category: "Wearables",
    inStock: true,
    stockCount: 8,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image: "/organic-cotton-t-shirt.jpg",
    description: "Comfortable and sustainable organic cotton t-shirt.",
    category: "Clothing",
    inStock: true,
    stockCount: 25,
  },
]

// Funcții utile
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

// Backend types & mapping
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Transformă backend product în frontend product
function mapBackendToFrontendProduct(p: BackendProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0]?.url || "/placeholder.svg",
    description: p.description || "",
    category: p.category?.name || "General",
    categoryId: p.categoryId,
    inStock: (p.stock ?? 0) > 0,
    stockCount: p.stock ?? 0,
  }
}

// API calls
export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`)
  if (!res.ok) throw new Error("Failed to fetch products")
  const data: BackendProduct[] = await res.json()
  return data.map(mapBackendToFrontendProduct)
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch product")
  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function createProduct(input: {
  name: string
  description?: string
  price: number
  stock: number
  images: string[]
  categoryId: number
}): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error("Failed to create product")
  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function updateProduct(
  id: number,
  input: Partial<{
    name: string
    description?: string
    price: number
    stock: number
    images: string[]
    categoryId: number
  }>
): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error("Failed to update product")
  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Failed to delete product")
}
