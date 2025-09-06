"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AddProductModal } from "@/components/add-product-modal"
import { AddCategoryModal } from "@/components/add-category-modal"
import { EditProductModal } from "@/components/edit-product-modal"
import { EditCategoryModal } from "@/components/edit-category-modal"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { fetchAllOrders } from "@/lib/orders"
import { fetchAllUsers, type BackendUser } from "@/lib/api/users"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  TrendingUp,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Tag,
} from "lucide-react"
import type { Product } from "@/lib/products"
import { fetchAllProducts, createProduct, updateProduct, deleteProduct, type CreateProductInput } from "@/lib/products"
import { BackendOrder } from "@/lib/orders"
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  type BackendCategory,
  type CreateCategoryInput
} from "@/lib/api/category"

// Using Product type from lib/products



const salesData = [
  { month: "Jan", sales: 12000, orders: 145 },
  { month: "Feb", sales: 15000, orders: 178 },
  { month: "Mar", sales: 18000, orders: 203 },
  { month: "Apr", sales: 22000, orders: 234 },
  { month: "May", sales: 19000, orders: 198 },
  { month: "Jun", sales: 25000, orders: 267 },
]

export default function AdminDashboard() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [productList, setProductList] = useState<Product[]>([])
  const [orderList, setOrderList] = useState<BackendOrder[]>([])
  const [categoryList, setCategoryList] = useState<BackendCategory[]>([])
  const [userList, setUserList] = useState<BackendUser[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BackendCategory | null>(null)
  const [categorySearchTerm, setCategorySearchTerm] = useState("")
  const [showEditProduct, setShowEditProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showEditCategory, setShowEditCategory] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials. Use admin/admin123")
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const productsData = await fetchAllProducts()
      const ordersData = await fetchAllOrders()
      const categoriesData = await fetchAllCategories()
      const usersData = await fetchAllUsers()
      setProductList(productsData)
      setOrderList(ordersData)
      setCategoryList(categoriesData)
      setUserList(usersData)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleAddProduct = async (newProduct: CreateProductInput) => {
    try {
      await createProduct(newProduct)
      await loadData()
      toast({
        title: "Success",
        description: "Product created successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProduct = async (id: number, updatedProduct: CreateProductInput) => {
    try {
      await updateProduct(id, updatedProduct)
      await loadData()
      toast({
        title: "Success",
        description: "Product updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id)
      await loadData()
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async (newCategory: CreateCategoryInput) => {
    try {
      await createCategory(newCategory)
      await loadData()
      setShowAddCategory(false)
      toast({
        title: "Success",
        description: "Category created successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create category",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCategory = async (id: number, updatedCategory: CreateCategoryInput) => {
    try {
      await updateCategory(id, updatedCategory)
      await loadData()
      setEditingCategory(null)
      setShowEditCategory(false)
      toast({
        title: "Success",
        description: "Category updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
        await loadData()
        toast({
          title: "Success",
          description: "Category deleted successfully!",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete category",
          variant: "destructive",
        })
      }
    }
  }

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCategories = categoryList.filter(
    (category) =>
      category.name.toLowerCase().includes(categorySearchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(categorySearchTerm.toLowerCase()),
  )

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Tag },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  if (!isAuthenticated) {
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
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
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
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white border-0 shadow-lg"
              >
                Sign In
              </Button>
              <div className="text-center">
                <p className="text-xs text-muted-foreground bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-cyan-950/50 dark:to-orange-950/50 rounded-md p-2">
                  Demo: admin / admin123
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100 dark:from-slate-950 dark:via-background dark:to-slate-900 ${darkMode ? "dark" : ""}`}
    >
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeTab === item.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-white border border-cyan-500/30 shadow-lg"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold capitalize bg-gradient-to-r from-cyan-600 to-orange-600 bg-clip-text text-transparent">
                {activeTab}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
                className="border-2 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-orange-50 dark:hover:from-cyan-950/20 dark:hover:to-orange-950/20"
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-cyan-100">Total Revenue</p>
                        <p className="text-3xl font-bold text-white">$45,231</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-100">Orders</p>
                        <p className="text-3xl font-bold text-white">{orderList.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-100">Products</p>
                        <p className="text-3xl font-bold text-white">{productList.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-100">Customers</p>
                        <p className="text-3xl font-bold text-white">{userList.length}</p>
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
                      {salesData.map((data, index) => (
                        <div
                          key={data.month}
                          className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-12 bg-gradient-to-b from-cyan-500 to-orange-500 rounded-full shadow-sm"></div>
                            <div>
                              <p className="font-semibold text-lg">{data.month}</p>
                              <p className="text-sm text-muted-foreground">{data.orders} orders</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl">${data.sales.toLocaleString()}</p>
                            <p className="text-sm text-green-500 font-medium">+{Math.floor(Math.random() * 20 + 5)}%</p>
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
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-md"></div>
                        Recent Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {orderList.slice(0, 4).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-orange-50 dark:hover:from-cyan-950/20 dark:hover:to-orange-950/20 transition-all duration-200 cursor-pointer"
                          >
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

                  <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                      <CardTitle className="flex items-center gap-2 text-orange-600">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-md"></div>
                        Low Stock Alert
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {productList
                          .filter((p) => p.stockCount < 10)
                          .slice(0, 3)
                          .map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/50 dark:border-orange-800/50"
                            >
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.category}</p>
                              </div>
                              <Badge variant="destructive" className="text-xs font-semibold">
                                {product.stockCount} left
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600"
                  onClick={() => setShowAddProduct(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/30">
                        <tr>
                          <th className="text-left p-4 font-medium">Product</th>
                          <th className="text-left p-4 font-medium">Category</th>
                          <th className="text-left p-4 font-medium">Price</th>
                          <th className="text-left p-4 font-medium">Stock</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product, index) => (
                          <tr
                            key={product.id}
                            className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}
                          >
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-12 w-12 object-cover rounded-lg"
                                />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{product.category}</Badge>
                            </td>
                            <td className="p-4 font-medium">${product.price}</td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  product.stockCount < 10
                                    ? "destructive"
                                    : product.stockCount < 20
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {product.stockCount}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant={product.inStock ? "default" : "secondary"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setEditingProduct(product)
                                    setShowEditProduct(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search categories..."
                      value={categorySearchTerm}
                      onChange={(e) => setCategorySearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600"
                  onClick={() => setShowAddCategory(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b bg-muted/30">
                        <tr>
                          <th className="text-left p-4 font-medium">ID</th>
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Slug</th>
                          <th className="text-left p-4 font-medium">Products</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategories.map((category, index) => (
                          <tr
                            key={category.id}
                            className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}
                          >
                            <td className="p-4 font-medium">{category.id}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                                  <Tag className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium">{category.name}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{category.slug}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant="secondary">
                                {category.products?.length || 0} products
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setEditingCategory(category)
                                    setShowEditCategory(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
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
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList.map((order, index) => (
                          <tr
                            key={order.id}
                            className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}
                          >
                            <td className="p-4 font-medium">{order.id}</td>
                            <td className="p-4 font-medium">{order.user.email}</td>
                            <td className="p-4 font-medium">{order.items.map((item) => item.product.name).join(", ")}</td>
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
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
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
                        {userList.map((user, index) => {
                          const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0)
                          const lastOrder = user.orders.length > 0
                            ? new Date(user.orders[user.orders.length - 1].createdAt).toLocaleDateString()
                            : 'No orders'

                          return (
                            <tr
                              key={user.id}
                              className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}
                            >
                              <td className="p-4 font-medium">{user.id}</td>
                              <td className="p-4 text-muted-foreground">{user.email}</td>
                              <td className="p-4">{user.orders.length}</td>
                              <td className="p-4 font-medium">${totalSpent.toFixed(2)}</td>
                              <td className="p-4">
                                <Badge variant="outline">
                                  {user.addresses.length} address{user.addresses.length !== 1 ? 'es' : ''}
                                </Badge>
                              </td>
                              <td className="p-4 text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Sales Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5">
                        <span className="font-medium">This Month</span>
                        <span className="font-bold text-primary">$25,347</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                        <span className="font-medium">Last Month</span>
                        <span className="font-bold">$21,234</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <span className="font-medium text-green-700 dark:text-green-400">Growth</span>
                        <span className="font-bold text-green-700 dark:text-green-400">+19.4%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Electronics", percentage: 35, color: "bg-primary" },
                        { name: "Clothing", percentage: 25, color: "bg-secondary" },
                        { name: "Home & Garden", percentage: 20, color: "bg-chart-3" },
                        { name: "Sports & Fitness", percentage: 20, color: "bg-chart-5" },
                      ].map((category) => (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className="font-bold">{category.percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`${category.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
                      </div>
                      <Button variant="outline" onClick={toggleDarkMode}>
                        {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">Notifications</h3>
                        <p className="text-sm text-muted-foreground">Manage notification preferences</p>
                      </div>
                      <Button variant="outline">
                        <Bell className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AddProductModal open={showAddProduct} onOpenChange={setShowAddProduct} onProductAdd={handleAddProduct} />
      <AddCategoryModal
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onCategoryAdd={handleAddCategory}
      />
      <EditProductModal
        open={showEditProduct}
        onOpenChange={setShowEditProduct}
        onProductUpdate={handleUpdateProduct}
        product={editingProduct}
      />
      <EditCategoryModal
        open={showEditCategory}
        onOpenChange={setShowEditCategory}
        onCategoryUpdate={handleUpdateCategory}
        category={editingCategory}
      />
      <Toaster />
    </div>
  )
}
