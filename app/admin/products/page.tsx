"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { fetchAllProducts, createProduct, updateProduct, deleteProduct, type Product, type CreateProductInput } from "@/lib/api/products"
import { AddProductModal } from "@/components/add-product-modal"
import { EditProductModal } from "@/components/edit-product-modal"

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [products, setProducts] = React.useState<Product[]>([])
    const [showAdd, setShowAdd] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [editing, setEditing] = React.useState<Product | null>(null)

    const load = React.useCallback(async () => {
        const data = await fetchAllProducts()
        setProducts(data)
    }, [])

    React.useEffect(() => {
        void load()
    }, [load])

    const handleAdd = async (input: CreateProductInput) => {
        await createProduct(input)
        await load()
        setShowAdd(false)
    }

    const handleUpdate = async (id: number, input: CreateProductInput) => {
        await updateProduct(id, input)
        await load()
        setShowEdit(false)
    }

    const handleDelete = async (id: number) => {
        await deleteProduct(id)
        await load()
    }

    const filtered = products.filter(
        (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600" onClick={() => setShowAdd(true)}>
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
                                {filtered.map((product, index) => (
                                    <tr key={product.id} className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-12 w-12 object-cover rounded-lg" />
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
                                            <Badge variant={product.stockCount < 10 ? "destructive" : product.stockCount < 20 ? "secondary" : "default"}>{product.stockCount}</Badge>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={product.inStock ? "default" : "secondary"}>{product.inStock ? "In Stock" : "Out of Stock"}</Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => {
                                                        setEditing(product)
                                                        setShowEdit(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(product.id)}>
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

            <AddProductModal open={showAdd} onOpenChange={setShowAdd} onProductAdd={handleAdd} />
            <EditProductModal open={showEdit} onOpenChange={setShowEdit} onProductUpdate={handleUpdate} product={editing} />
        </div>
    )
}


