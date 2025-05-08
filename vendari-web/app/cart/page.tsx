"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { formatCurrency } from "../../lib/utils"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link href="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => alert("Checkout functionality would go here!")}>
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
