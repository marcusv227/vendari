"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "../lib/types"

interface CartItem {
  id: number
  cartId: number
  productId: number
  quantity: number
  product: {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
  }
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  fetchCart: () => Promise<void>
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  fetchCartCount: () => Promise<void>
  clearCart: () => Promise<void>
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  fetchCart: async () => {},
  addToCart: async () => {},
  fetchCartCount: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  getTotalItems: () => 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const fetchCart = async () => {
    if (!token) return

    try {
      const res = await fetch("http://localhost:3100/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Erro ao buscar carrinho")

      const data = await res.json()
      setCart(data.items) // ou `data.cartItems` dependendo da estrutura do backend
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err)
    }
  }

  const addToCart = async (product: Product) => {
    if (!token) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.")
      router.push("/login")
      return
    }

    try {
      const res = await fetch("http://localhost:3100/api/cart-item", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      })

      if (!res.ok) throw new Error("Erro ao adicionar item")

      fetchCartCount()
      await fetchCart() // atualiza carrinho do backend
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      await fetch(`http://localhost:3100/api/cart-item/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await fetchCart()
    } catch (err) {
      console.error("Erro ao remover item:", err)
    }
  }

  const clearCart = async () => {
    try {
      await fetch("http://localhost:3100/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCart([])
    } catch (err) {
      console.error("Erro ao limpar carrinho:", err)
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await fetch("http://localhost:3100/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await res.json()
      const totalQuantity = data.items.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      )

      setCartCount(totalQuantity)
    } catch (error) {
      console.error("Erro ao buscar o carrinho", error)
    }
  }

  useEffect(() => {
    fetchCart()
    fetchCartCount()
  }, [])

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, clearCart, getTotalItems, fetchCartCount, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
