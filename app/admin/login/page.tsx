"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { adminLogin } from "@/lib/api/admin"
import { setToken } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { LayoutDashboard } from "lucide-react"

export default function AdminLoginPage() {
    const router = useRouter()
    const [credentials, setCredentials] = useState({ user: "", password: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const token = await adminLogin(credentials.user, credentials.password)
            setToken(token)
            router.replace("/admin/dashboard")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-background to-orange-50 dark:from-cyan-950/20 dark:via-background dark:to-orange-950/20 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-card/90 backdrop-blur-xl">
                <CardHeader className="text-center pb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <LayoutDashboard className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-orange-600 bg-clip-text text-transparent">
                        Admin Portal
                    </CardTitle>
                    <p className="text-muted-foreground">Sign in to access your dashboard</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="user" className="text-sm font-medium">
                                User
                            </Label>
                            <Input
                                id="user"
                                value={credentials.user}
                                onChange={(e) => setCredentials((prev) => ({ ...prev, user: e.target.value }))}
                                placeholder="Enter user"
                                className="h-11 border-2 focus:border-cyan-500 transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter password"
                                className="h-11 border-2 focus:border-cyan-500 transition-colors"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full h-11 text-base font-medium bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white border-0 shadow-lg" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                        {error && <p className="text-sm text-destructive text-center">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


