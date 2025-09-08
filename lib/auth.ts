const TOKEN_KEY = 'admin_jwt_token'

export function setToken(token: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
}

export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
    const token = getToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return fetch(input, { ...init, headers })
}

export function getApiUrl() {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
}


