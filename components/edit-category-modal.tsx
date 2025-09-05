"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import type { BackendCategory, CreateCategoryInput } from "@/lib/api/category"

interface EditCategoryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCategoryUpdate: (id: number, category: CreateCategoryInput) => void
    category: BackendCategory | null
}

export function EditCategoryModal({ open, onOpenChange, onCategoryUpdate, category }: EditCategoryModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
    })

    // Reset form when category changes
    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                slug: category.slug,
            })
        }
    }, [category])

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!category) return

        const payload: CreateCategoryInput = {
            name: formData.name,
            slug: formData.slug,
        }

        onCategoryUpdate(category.id, payload)
        resetForm()
        onOpenChange(false)
    }

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
        })
    }

    if (!category) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <Edit className="w-4 h-4 text-white" />
                        </div>
                        Edit Category
                    </DialogTitle>
                    <DialogDescription>Update the category details below.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Category Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => handleInputChange("slug", e.target.value)}
                                placeholder="Enter category slug"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                URL-friendly version of the name (e.g., "electronics", "home-garden")
                            </p>
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
                            Update Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
