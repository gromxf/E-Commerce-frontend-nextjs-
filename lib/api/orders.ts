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
    paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED'
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

export async function createOrder(input: CreateOrderInput): Promise<BackendOrder> {
    const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: 'include',
    })
    if (!res.ok) throw new Error("Failed to create order")
    const data: BackendOrder = await res.json()
    return data
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

export async function createDraftOrder(item: OrderItem): Promise<BackendOrder> {
    const res = await fetch(`${API_BASE_URL}/orders/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
        credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to create draft order')
    return res.json()
}

export async function finalizeOrder(
    id: number,
    body: { userId: number; total: number; items: OrderItem[]; paymentInfo: any }
): Promise<BackendOrder> {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/finalize`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
    })
    if (!res.ok) throw new Error('Failed to finalize order')
    return res.json()
}

