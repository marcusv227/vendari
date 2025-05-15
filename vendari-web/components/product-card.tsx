"use client"

import { useCart } from '@/context/cart-context'
import { Product } from '@/lib/types'
import { Button } from './ui/button'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAddToCart = async () => {
    await addToCart(product)

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="flex items-center justify-center h-40 bg-muted rounded-md mb-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover h-full w-full rounded-md"
        />
      </div>
      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-2 flex-grow">{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold">{product.price}</span>
        <Button
          onClick={handleAddToCart}
          className={isAnimating ? "animate-ping-short" : ""}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
