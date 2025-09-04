export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  rating: number
  reviews: number
  image: string
  badge: string | null
  description: string
  features: string[]
  specifications: { [key: string]: string }
  images: string[]
  category: string
  categoryId?: number
  brand: string
  inStock: boolean
  stockCount: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 324,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones featuring active noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 5 min = 3 hours",
      "Premium leather comfort",
      "Hi-Res Audio certified",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 40kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0",
    },
    images: ["/premium-wireless-headphones.png", "/headphones-side-view.png", "/headphones-folded.png"],
    category: "Electronics",
    brand: "AudioTech",
    inStock: true,
    stockCount: 15,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 249.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: "/modern-smartwatch-fitness-tracker.jpg",
    badge: "New",
    description:
      "Track your fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, and 7-day battery life.",
    features: [
      "Built-in GPS",
      "Heart rate monitoring",
      "7-day battery life",
      "Water resistant (50m)",
      "Sleep tracking",
      "100+ workout modes",
    ],
    specifications: {
      Display: '1.4" AMOLED',
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      Sensors: "GPS, Heart Rate, SpO2",
      Compatibility: "iOS & Android",
      Weight: "45g",
    },
    images: ["/modern-smartwatch-fitness-tracker.jpg", "/smartwatch-display.jpg", "/smartwatch-bands.jpg"],
    category: "Wearables",
    brand: "FitTech",
    inStock: true,
    stockCount: 8,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 89,
    image: "/organic-cotton-t-shirt.jpg",
    badge: "Sale",
    description:
      "Comfortable and sustainable organic cotton t-shirt made from 100% certified organic cotton with a relaxed fit.",
    features: ["100% organic cotton", "GOTS certified", "Pre-shrunk fabric", "Relaxed fit", "Machine washable"],
    specifications: {
      Material: "100% Organic Cotton",
      Weight: "180 GSM",
      Fit: "Relaxed",
      Care: "Machine wash cold",
      Certification: "GOTS",
      Origin: "Made in USA",
    },
    images: ["/organic-cotton-t-shirt.jpg", "/t-shirt-back-view.png", "/t-shirt-fabric-detail.jpg"],
    category: "Clothing",
    brand: "EcoWear",
    inStock: true,
    stockCount: 25,
  },
  {
    id: 4,
    name: "Portable Coffee Maker",
    price: 89.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 203,
    image: "/portable-coffee-maker-machine.jpg",
    badge: null,
    description:
      "Brew perfect coffee anywhere with this compact, battery-powered coffee maker. Compatible with ground coffee and pods.",
    features: [
      "Battery powered",
      "Compatible with pods & ground coffee",
      "15-bar pressure pump",
      "Compact design",
      "Auto shut-off",
    ],
    specifications: {
      Pressure: "15 bar",
      "Water Tank": "200ml",
      "Battery Life": "5-7 cups per charge",
      Dimensions: "18 x 8 x 15 cm",
      Weight: "1.2kg",
      Power: "Rechargeable battery",
    },
    images: ["/portable-coffee-maker-machine.jpg", "/coffee-maker-brewing.jpg", "/coffee-maker-parts.jpg"],
    category: "Kitchen",
    brand: "BrewMaster",
    inStock: true,
    stockCount: 12,
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 67,
    image: "/modern-lamp.png",
    badge: "Sale",
    description:
      "Sleek and modern desk lamp with adjustable brightness and color temperature. Perfect for work and study.",
    features: [
      "Adjustable brightness",
      "Color temperature control",
      "Touch controls",
      "USB charging port",
      "Memory function",
    ],
    specifications: {
      "Light Source": "LED",
      Power: "12W",
      Brightness: "10-100%",
      "Color Temperature": "3000K-6500K",
      "USB Output": "5V/1A",
      Dimensions: "45 x 20 x 8 cm",
    },
    images: ["/modern-lamp.png", "/desk-lamp-adjustable.jpg", "/desk-lamp-controls.jpg"],
    category: "Home",
    brand: "LightCraft",
    inStock: true,
    stockCount: 18,
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    price: 49.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 142,
    image: "/premium-yoga-exercise-mat.jpg",
    badge: "Eco-Friendly",
    description:
      "Premium eco-friendly yoga mat made from natural rubber with superior grip and cushioning for all yoga practices.",
    features: ["Natural rubber material", "Superior grip", "6mm thickness", "Eco-friendly", "Alignment lines"],
    specifications: {
      Material: "Natural Rubber",
      Thickness: "6mm",
      Dimensions: "183 x 61 cm",
      Weight: "2.5kg",
      Grip: "Wet & Dry",
      Certification: "Eco-certified",
    },
    images: ["/premium-yoga-exercise-mat.jpg", "/rolled-yoga-mat.png", "/yoga-mat-texture.jpg"],
    category: "Fitness",
    brand: "ZenMat",
    inStock: true,
    stockCount: 22,
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviews: 78,
    image: "/wireless-charging-pad.png",
    badge: "Sale",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Features LED indicator and foreign object detection.",
    features: [
      "Fast wireless charging",
      "Qi-certified",
      "LED charging indicator",
      "Foreign object detection",
      "Non-slip surface",
    ],
    specifications: {
      Input: "9V/2A, 5V/3A",
      Output: "15W/10W/7.5W/5W",
      Efficiency: ">75%",
      Dimensions: "10 x 10 x 0.8 cm",
      Weight: "150g",
      Compatibility: "Qi-enabled devices",
    },
    images: ["/wireless-charging-pad.png", "/wireless-charger-with-phone.jpg", "/wireless-charger-led-indicator.jpg"],
    category: "Electronics",
    brand: "ChargeTech",
    inStock: true,
    stockCount: 30,
  },
  {
    id: 8,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 234,
    image: "/stainless-steel-bottle.png",
    badge: "Eco-Friendly",
    description:
      "Double-wall insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["Double-wall insulation", "24h cold / 12h hot", "BPA-free", "Leak-proof cap", "Wide mouth opening"],
    specifications: {
      Material: "304 Stainless Steel",
      Capacity: "750ml",
      Insulation: "Double-wall vacuum",
      Dimensions: "26 x 7.5 cm",
      Weight: "350g",
      "Cap Type": "Leak-proof twist",
    },
    images: ["/stainless-steel-bottle.png", "/water-bottle-cap-detail.png", "/water-bottle-size-comparison.png"],
    category: "Lifestyle",
    brand: "HydroSteel",
    inStock: true,
    stockCount: 45,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(productId: number, category: string, limit = 4): Product[] {
  return products.filter((product) => product.id !== productId && product.category === category).slice(0, limit)
}

// Backend models and mappers
export interface BackendProductImage {
  id: number
  url: string
}

export interface BackendCategory {
  id: number
  name: string
  slug: string
}

export interface BackendProduct {
  id: number
  name: string
  description?: string | null
  price: number
  stock: number
  categoryId: number
  category?: BackendCategory
  images: BackendProductImage[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function mapBackendToFrontendProduct(p: BackendProduct): Product {
  const mainImage = p.images && p.images.length > 0 ? p.images[0].url : "/placeholder.svg"
  const categoryName = p.category?.name || "General"
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: null,
    rating: 4.5,
    reviews: 0,
    image: mainImage,
    badge: null,
    description: p.description || "",
    features: [],
    specifications: {},
    images: (p.images || []).map((img) => img.url),
    category: categoryName,
    categoryId: p.categoryId,
    brand: "",
    inStock: (p.stock ?? 0) > 0,
    stockCount: p.stock ?? 0,
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error("Failed to fetch products")
  const data: BackendProduct[] = await res.json()
  return data.map(mapBackendToFrontendProduct)
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" })
  if (res.status === 404) return null
  if (!res.ok) throw new Error("Failed to fetch product")
  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function fetchProductsByCategoryId(categoryId: number): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/category/${categoryId}`, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error("Failed to fetch category products")
  const data: BackendProduct[] = await res.json()
  return data.map(mapBackendToFrontendProduct)
}

// Create/Update/Delete API
export type CreateProductInput = {
  name: string
  description?: string
  price: number
  stock: number
  images: string[]
  categoryId: number
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error("Failed to create product")
  const data: BackendProduct = await res.json()
  return mapBackendToFrontendProduct(data)
}

export async function updateProduct(id: number, input: Partial<CreateProductInput>): Promise<Product> {
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
