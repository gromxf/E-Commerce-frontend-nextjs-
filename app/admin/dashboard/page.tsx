"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { fetchAllOrders, type BackendOrder } from "@/lib/api/orders"
import { fetchAllProducts, type Product } from "@/lib/api/products"
import { fetchAllCategories, type BackendCategory } from "@/lib/api/category"
import { fetchAllUsers, type BackendUser } from "@/lib/api/users"

export default function DashboardPage() {
    const [orders, setOrders] = React.useState<BackendOrder[]>([])
    const [products, setProducts] = React.useState<Product[]>([])
    const [categories, setCategories] = React.useState<BackendCategory[]>([])
    const [users, setUsers] = React.useState<BackendUser[]>([])

    React.useEffect(() => {
        ; (async () => {
            const [o, p, c, u] = await Promise.all([
                fetchAllOrders(),
                fetchAllProducts(),
                fetchAllCategories(),
                fetchAllUsers(),
            ])
            setOrders(o)
            setProducts(p)
            setCategories(c)
            setUsers(u)
        })()
    }, [])

    const generateSalesData = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const currentDate = new Date()
        return months.slice(0, 12).map((month, index) => {
            const monthOrders = orders.filter((order) => {
                const orderDate = new Date(order.createdAt)
                return orderDate.getMonth() === index && orderDate.getFullYear() === currentDate.getFullYear()
            })
            const sales = monthOrders.reduce((sum, order) => sum + order.total, 0)
            return { month, sales, orders: monthOrders.length }
        })
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-cyan-100">Total Revenue</p>
                                <p className="text-3xl font-bold text-white">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-100">Orders</p>
                                <p className="text-3xl font-bold text-white">{orders.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-100">Products</p>
                                <p className="text-3xl font-bold text-white">{products.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <CardContent className="p-6 relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-emerald-100">Customers</p>
                                <p className="text-3xl font-bold text-white">{users.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            Sales Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {generateSalesData().map((data) => (
                                <div key={data.month} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-3 h-12 bg-gradient-to-b from-cyan-500 to-orange-500 rounded-full shadow-sm" />
                                        <div>
                                            <p className="font-semibold text-lg">{data.month}</p>
                                            <p className="text-sm text-muted-foreground">{data.orders} orders</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl">${data.sales.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                        <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-md" />
                                Recent Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {orders.slice(0, 4).map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-orange-50 dark:hover:from-cyan-950/20 dark:hover:to-orange-950/20 transition-all duration-200 cursor-pointer">
                                        <div>
                                            <p className="font-medium text-sm">{order.id}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">${order.total}</p>
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
                                                className="text-xs"
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


