"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Edit } from "lucide-react"
import { fetchCategories, type BackendCategory } from "@/lib/api/categories"
import type { Product, CreateProductInput } from "@/lib/api/products"
import { ImageUpload } from "@/components/image-upload"

interface EditProductModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onProductUpdate: (id: number, product: CreateProductInput) => void
    product: Product | null
}

export function EditProductModal({ open, onOpenChange, onProductUpdate, product }: EditProductModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
    })

    const [images, setImages] = useState<string[]>([])
    const [newImage, setNewImage] = useState("")
    const [backendCategories, setBackendCategories] = useState<BackendCategory[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")

    // Reset form when product changes
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price.toString(),
                description: product.description || "",
                stock: product.stockCount.toString(),
            })
            setSelectedCategoryId(product.categoryId?.toString() || "")
            // Note: We don't have access to all images in the Product interface
            // This would need to be enhanced if you want to edit multiple images
            setImages([])
        }
    }, [product])

    React.useEffect(() => {
        fetchCategories()
            .then((cats) => setBackendCategories(cats))
            .catch(() => setBackendCategories([]))
    }, [])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const addImage = () => {
        if (newImage.trim()) {
            setImages((prev) => [...prev, newImage.trim()])
            setNewImage("")
        }
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!product) return

        const payload: CreateProductInput = {
            name: formData.name,
            description: formData.description || undefined,
            price: Number.parseFloat(formData.price),
            stock: Number.parseInt(formData.stock || "0"),
            images,
            categoryId: Number.parseInt(selectedCategoryId || "0"),
        }

        onProductUpdate(product.id, payload)
        resetForm()
        onOpenChange(false)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            description: "",
            stock: "",
        })
        setImages([])
        setNewImage("")
        setSelectedCategoryId("")
    }

    if (!product) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <Edit className="w-4 h-4 text-white" />
                        </div>
                        Edit Product
                    </DialogTitle>
                    <DialogDescription>Update the product details below.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-primary">Basic Information</h3>

                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock">Stock *</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => handleInputChange("stock", e.target.value)}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="backendCategory">Backend Category *</Label>
                                <Select value={selectedCategoryId} onValueChange={(value) => setSelectedCategoryId(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select backend category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {backendCategories.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-primary">Images & Description</h3>

                                <ImageUpload
                                    images={images}
                                    onImagesChange={setImages}
                                    maxImages={5}
                                    label="Product Images"
                                    description="Upload images from your computer or add image URLs"
                                />

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Enter product description (optional)"
                                        rows={4}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600"
                        >
                            Update Product
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
