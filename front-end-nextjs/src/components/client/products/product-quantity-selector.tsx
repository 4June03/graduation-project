"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

interface ProductQuantitySelectorProps {
  initialQuantity?: number
  maxQuantity?: number
  onChange?: (quantity: number) => void
}

export function ProductQuantitySelector({
  initialQuantity = 1,
  maxQuantity = 10,
  onChange,
}: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      if (onChange) {
        onChange(newQuantity)
      }
    }
  }

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      if (onChange) {
        onChange(newQuantity)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value)
      if (onChange) {
        onChange(value)
      }
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium">Quantity</span>
      <div className="flex h-10 w-32">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="flex h-full w-10 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={handleChange}
          className="h-full w-12 border border-gray-300 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
          className="flex h-full w-10 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {quantity >= maxQuantity && <p className="text-xs text-amber-600">Maximum quantity available: {maxQuantity}</p>}
    </div>
  )
}
