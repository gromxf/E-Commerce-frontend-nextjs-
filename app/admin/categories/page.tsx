"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Filter, Tag as TagIcon } from "lucide-react"
import { fetchAllCategories, createCategory, updateCategory, deleteCategory, type BackendCategory, type CreateCategoryInput } from "@/lib/api/category"
import { AddCategoryModal } from "@/components/add-category-modal"
import { EditCategoryModal } from "@/components/edit-category-modal"

export default function CategoriesPage() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [categories, setCategories] = React.useState<BackendCategory[]>([])
    const [showAdd, setShowAdd] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [editing, setEditing] = React.useState<BackendCategory | null>(null)

    const load = React.useCallback(async () => {
        const data = await fetchAllCategories()
        setCategories(data)
    }, [])

    React.useEffect(() => {
        void load()
    }, [load])

    const handleAdd = async (input: CreateCategoryInput) => {
        await createCategory(input)
        await load()
        setShowAdd(false)
    }

    const handleUpdate = async (id: number, input: CreateCategoryInput) => {
        await updateCategory(id, input)
        await load()
        setShowEdit(false)
    }

    const handleDelete = async (id: number) => {
        await deleteCategory(id)
        await load()
    }

    const filtered = categories.filter(
        (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600" onClick={() => setShowAdd(true)}>
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
                                {filtered.map((category, index) => (
                                    <tr key={category.id} className={`border-b hover:bg-muted/20 transition-colors ${index % 2 === 0 ? "bg-muted/5" : ""}`}>
                                        <td className="p-4 font-medium">{category.id}</td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                                                    <TagIcon className="w-4 h-4 text-white" />
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
                                            <Badge variant="secondary">{category.products?.length || 0} products</Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => {
                                                        setEditing(category)
                                                        setShowEdit(true)
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(category.id)}>
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

            <AddCategoryModal open={showAdd} onOpenChange={setShowAdd} onCategoryAdd={handleAdd} />
            <EditCategoryModal open={showEdit} onOpenChange={setShowEdit} onCategoryUpdate={handleUpdate} category={editing} />
        </div>
    )
}


