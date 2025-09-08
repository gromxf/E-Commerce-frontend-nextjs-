"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchAllOrders, type BackendOrder } from "@/lib/api/orders"

export default function OrdersPage() {
    const [orders, setOrders] = React.useState<BackendOrder[]>([])

    React.useEffect(() => {
        ; (async () => {
            const data = await fetchAllOrders()
            setOrders(data)
        })()
    }, [])

    return (
        <div className="space-y-6">
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-muted/30">
                                <tr>
                                    <th className="text-left p-4 font-medium">Order ID</th>
                                    <th className="text-left p-4 font-medium">User</th>
                                    <th className="text-left p-4 font-medium">Items</th>
                                    <th className="text-left p-4 font-medium">Total</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order.id} className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}>
                                        <td className="p-4 font-medium">{order.id}</td>
                                        <td className="p-4 font-medium">{order.user.email}</td>
                                        <td className="p-4 font-medium">{order.items.map((item) => item.product.name).join(", ") || "Deleted item"}</td>
                                        <td className="p-4 font-medium">${order.total}</td>
                                        <td className="p-4">
                                            <Badge
                                                variant={
                                                    order.status === "Delivered"
                                                        ? "default"
                                                        : order.status === "Shipped"
                                                            ? "secondary"
                                                            : order.status === "Cancelled"
                                                                ? "destructive"
                                                                : "outline"
                                                }
                                            >
                                                {order.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


