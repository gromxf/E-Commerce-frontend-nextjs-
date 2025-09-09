export interface OrderItem {
    productId: number
    quantity: number
    price: number
}

export interface CreateOrderInput {
    userId: number
    total: number
    items: OrderItem[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface BackendOrder {
    id: number
    userId: number
    total: number
    status: string
    createdAt: string
    items: {
        id: number
        productId: number
        quantity: number
        price: number
        product: {
            id: number
            name: string
        }
    }[]
    user: {
        id: number
        email: string
    }
}

export async function createOrder(input: CreateOrderInput): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: 'include',
    })
    if (!res.ok) throw new Error("Failed to create order")
}

export async function fetchAllOrders(): Promise<BackendOrder[]> {
    const res = await fetch(`${API_BASE_URL}/orders`, { next: { revalidate: 60 }, credentials: 'include' })
    if (!res.ok) throw new Error("Failed to fetch orders")
    const data: BackendOrder[] = await res.json()
    return data
}

export async function validateStock(items: OrderItem[]): Promise<{ valid: boolean; errors: string[] }> {
    const res = await fetch(`${API_BASE_URL}/orders/validate-stock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
        credentials: 'include',
    })
    if (!res.ok) throw new Error("Failed to validate stock")
    const data = await res.json()
    return data
}

