"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductActionsProps {
  productId: string
  isInStock: boolean
  onAddToCart: (productId: string, quantity: number) => void
  onBuyNow: (productId: string, quantity: number) => void
  onAddToWishlist: (productId: string) => void
  quantity: number
}

export function ProductActions({
  productId,
  isInStock,
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
  quantity,
}: ProductActionsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await onAddToCart(productId, quantity)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    onBuyNow(productId, quantity)
  }

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true)
    try {
      await onAddToWishlist(productId)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
      <Button onClick={handleAddToCart} disabled={!isInStock || isAddingToCart} className="flex-1" variant="outline">
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </Button>
      <Button onClick={handleBuyNow} disabled={!isInStock} className="flex-1">
        Buy Now
      </Button>
      <Button
        onClick={handleAddToWishlist}
        disabled={isAddingToWishlist}
        variant="ghost"
        className="h-10 w-10 p-0"
        aria-label="Add to wishlist"
      >
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  )
}
