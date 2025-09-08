"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    images: string[]
    onImagesChange: (images: string[]) => void
    maxImages?: number
    className?: string
    label?: string
    description?: string
}

export function ImageUpload({
    images,
    onImagesChange,
    maxImages = 10,
    className,
    label = "Upload Images",
    description = "Click to upload or drag and drop images"
}: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const MAX_SIZE_BYTES = 5 * 1024 * 1024

    const handleFileSelect = async (files: FileList | null) => {
        if (!files) return

        const fileArray = Array.from(files)
        const imageFiles = fileArray.filter(file => file.type.startsWith('image/'))

        const tooLarge = imageFiles.filter(file => file.size > MAX_SIZE_BYTES)
        if (tooLarge.length > 0) {
            alert(`Each image must be 5MB or smaller. ${tooLarge.length} file(s) exceeded the limit.`)
        }
        const validSizeImages = imageFiles.filter(file => file.size <= MAX_SIZE_BYTES)

        if (validSizeImages.length === 0) {
            alert('Please select only image files')
            return
        }

        if (images.length + validSizeImages.length > maxImages) {
            alert(`You can only upload up to ${maxImages} images`)
            return
        }

        setIsUploading(true)

        try {
            const newImageUrls: string[] = []

            for (const file of validSizeImages) {
                // Convert file to base64 data URL
                const dataUrl = await fileToDataUrl(file)
                newImageUrls.push(dataUrl)
            }

            onImagesChange([...images, ...newImageUrls])
        } catch (error) {
            console.error('Error processing images:', error)
            alert('Error processing images. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    const fileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        handleFileSelect(e.dataTransfer.files)
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        onImagesChange(newImages)
    }

    const addUrlImage = () => {
        const url = prompt('Enter image URL:')
        if (url && url.trim()) {
            if (images.length >= maxImages) {
                alert(`You can only have up to ${maxImages} images`)
                return
            }
            onImagesChange([...images, url.trim()])
        }
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="space-y-2">
                <Label>{label}</Label>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>

            {/* Upload Area */}
            <div
                className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                    isDragOver
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                    isUploading && "opacity-50 pointer-events-none"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                />

                <div className="flex flex-col items-center space-y-2">
                    {isUploading ? (
                        <>
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-muted-foreground">Processing images...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    {isDragOver ? "Drop images here" : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to 5MB each
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                            Images ({images.length}/{maxImages})
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addUrlImage}
                            disabled={images.length >= maxImages}
                        >
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Add URL
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative group aspect-square rounded-lg overflow-hidden border border-muted"
                            >
                                <img
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.src = "/placeholder.svg"
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeImage(index)
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="absolute top-2 left-2 text-xs"
                                >
                                    {index + 1}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
