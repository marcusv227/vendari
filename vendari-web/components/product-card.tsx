"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "../lib/types"
import { formatCurrency } from "../lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="flex items-center justify-center h-40 bg-muted rounded-md mb-4">
        <span className="text-6xl">{product.emoji}</span>
      </div>
      <h3 className="font-medium text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-2 flex-grow">{product.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold">{formatCurrency(product.price)}</span>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  )
}
