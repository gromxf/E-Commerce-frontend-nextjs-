export interface BackendCategory {
    id: number
    name: string
    slug: string
    products?: Array<{ id: number }>
}

export interface CreateCategoryInput {
    name: string
    slug: string
}

export interface UpdateCategoryInput {
    name?: string
    slug?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function fetchAllCategories(): Promise<BackendCategory[]> {
    const res = await fetch(`${API_BASE_URL}/categories`)
    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to fetch categories: ${errorText}`)
    }
    return res.json()
}

export async function fetchCategoryById(id: number): Promise<BackendCategory> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`)
    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to fetch category: ${errorText}`)
    }
    return res.json()
}

export async function createCategory(category: CreateCategoryInput): Promise<BackendCategory> {
    const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to create category: ${errorText}`)
    }

    return res.json()
}

export async function updateCategory(id: number, category: UpdateCategoryInput): Promise<BackendCategory> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to update category: ${errorText}`)
    }

    return res.json()
}

export async function deleteCategory(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
        method: 'DELETE',
    })

    if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Failed to delete category: ${errorText}`)
    }
}
