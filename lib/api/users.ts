export interface Address {
    id: number
    userId: number
    street: string
    city: string
    postal: string
}

export interface OrderItem {
    id: number
    productId: number
    quantity: number
    price: number
    product: {
        id: number
        name: string
    }
}

export interface Order {
    id: number
    userId: number
    status: string
    total: number
    createdAt: string
    items: OrderItem[]
}

export interface BackendUser {
    id: number
    email: string
    createdAt: string
    addresses: Address[]
    orders: Order[]
}

export interface CreateUserInput {
    email: string
    Address: {
        street: string
        city: string
        postal: string
    }[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchAllUsers(): Promise<BackendUser[]> {
    const res = await fetch(`${API_BASE_URL}/users`, {
        next: { revalidate: 60 },
        credentials: 'include'
    })
    if (!res.ok) throw new Error("Failed to fetch users")
    const data: BackendUser[] = await res.json()
    return data
}

export async function createUser(input: CreateUserInput): Promise<BackendUser> {
    const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        credentials: 'include',
    })
    if (!res.ok) throw new Error("Failed to create user")
    const data: BackendUser = await res.json()
    return data
}