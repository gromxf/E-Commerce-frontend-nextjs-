"use client"

import React, { useState, useEffect } from "react"
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
import { CreateCategoryInput } from "@/lib/api/category"

interface AddCategoryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCategoryAdd: (category: CreateCategoryInput) => void
}

export function AddCategoryModal({
    open,
    onOpenChange,
    onCategoryAdd,
}: AddCategoryModalProps) {
    const [formData, setFormData] = useState<CreateCategoryInput>({
        name: "",
        slug: "",
    })
    const [errors, setErrors] = useState<Partial<CreateCategoryInput>>({})

    useEffect(() => {
        setFormData({
            name: "",
            slug: "",
        })
        setErrors({})
    }, [open])

    const validateForm = (): boolean => {
        const newErrors: Partial<CreateCategoryInput> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required"
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        onCategoryAdd(formData)
    }

    const handleClose = () => {
        setFormData({ name: "", slug: "" })
        setErrors({})
        onOpenChange(false)
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }))
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                        Create a new category for your products. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Category Name *
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleNameChange}
                            placeholder="e.g., Electronics"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug" className="text-sm font-medium">
                            Slug *
                        </Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="e.g., electronics"
                            className={errors.slug ? "border-red-500" : ""}
                        />
                        {errors.slug && (
                            <p className="text-sm text-red-500">{errors.slug}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            URL-friendly version of the name (lowercase, numbers, and hyphens only)
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600">
                            Create Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
