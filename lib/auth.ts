const TOKEN_KEY = 'admin_jwt_token'

function setCookie(name: string, value: string, days = 7) {
    if (typeof document === 'undefined') return
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    const secure = location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const cookies = document.cookie ? document.cookie.split('; ') : []
    for (const c of cookies) {
        const [k, v] = c.split('=')
        if (k === name) return decodeURIComponent(v || '')
    }
    return null
}

function deleteCookie(name: string) {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`
}

export function setToken(token: string) {
    setCookie(TOKEN_KEY, token)
}

export function getToken(): string | null {
    return getCookie(TOKEN_KEY)
}

export function clearToken() {
    deleteCookie(TOKEN_KEY)
    // Best-effort cleanup if previously stored in localStorage
    if (typeof window !== 'undefined') {
        try { localStorage.removeItem(TOKEN_KEY) } catch { }
    }
}

export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
    const token = getToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    return fetch(input, { credentials: 'include', ...init, headers })
}

export function getApiUrl() {
    return process.env.NEXT_PUBLIC_API_URL
}

