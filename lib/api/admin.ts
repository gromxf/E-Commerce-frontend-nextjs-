import { fetchWithAuth, getApiUrl } from '@/lib/auth'

export async function adminLogin(user: string, password: string): Promise<string> {
    const res = await fetch(`${getApiUrl()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
        credentials: 'include',
    })
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Login failed')
    }
    const data = await res.json()
    return data.access_token
}

export async function fetchAdminData<T = any>(): Promise<T> {
    const res = await fetchWithAuth(`${getApiUrl()}/admin/data`, { credentials: 'include' } as RequestInit)
    if (res.status === 401 || res.status === 403) {
        throw new Error('Unauthorized')
    }
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to fetch admin data')
    }
    return res.json()
}


