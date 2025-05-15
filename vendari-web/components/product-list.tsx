'use client'

import { useEffect, useState } from 'react'
import ProductCard from './product-card'

export default function ProductList() {
  interface Product {
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
  }

  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('http://localhost:3100/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products')
        return res.json()
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
      <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
