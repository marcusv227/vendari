"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { jwtDecode } from "jwt-decode"

import { Button } from "@/components/ui/button"
import ProductList from "@/components/product-list"
import ProductListSkeleton from "@/components/product-list-skeleton"

type DecodedToken = {
  userId: string
  username: string
  exp: number
  iat: number
}

type CartItem = {
  id: number
  productId: number
  quantity: number
}

export default function Home() {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token)
        setUser(decoded)
        fetchCartCount(token)
        console.log()
      } catch (error) {
        console.error("Invalid token")
        localStorage.removeItem("token")
      }
    }
  }, [])

  const fetchCartCount = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:3100/api/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }
      const data = await response.json()

      const items: CartItem[] = data.items || []
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalQuantity)
    } catch (error) {
      console.error("Erro ao buscar o carrinho", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
    window.location.reload()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Vendari</h1>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Olá, {user.username}</span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </header>
      <main>
        <h2 className="text-3xl font-bold mb-6">Products</h2>
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  )
}
