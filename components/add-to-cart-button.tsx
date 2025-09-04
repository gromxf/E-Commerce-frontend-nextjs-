"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    price: number
    image: string
  }
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      })
    }
  }

  return (
    <Button onClick={addToCart} className={className}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {quantity > 1 ? `Add ${quantity} to Cart` : "Add to Cart"}
    </Button>
  )
}
