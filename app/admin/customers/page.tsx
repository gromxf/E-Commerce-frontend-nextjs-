"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchAllUsers, type BackendUser } from "@/lib/api/users"

export default function CustomersPage() {
    const [users, setUsers] = React.useState<BackendUser[]>([])

    React.useEffect(() => {
        ; (async () => {
            const data = await fetchAllUsers()
            setUsers(data)
        })()
    }, [])

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/30">
                                <tr>
                                    <th className="text-left p-4 font-medium">ID</th>
                                    <th className="text-left p-4 font-medium">Email</th>
                                    <th className="text-left p-4 font-medium">Orders</th>
                                    <th className="text-left p-4 font-medium">Total Spent</th>
                                    <th className="text-left p-4 font-medium">Addresses</th>
                                    <th className="text-left p-4 font-medium">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0)
                                    return (
                                        <tr key={user.id} className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}>
                                            <td className="p-4 font-medium">{user.id}</td>
                                            <td className="p-4 text-muted-foreground">{user.email}</td>
                                            <td className="p-4">{user.orders.length}</td>
                                            <td className="p-4 font-medium">${totalSpent.toFixed(2)}</td>
                                            <td className="p-4">
                                                <Badge variant="outline">
                                                    {user.addresses.length} address{user.addresses.length !== 1 ? "es" : ""}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


