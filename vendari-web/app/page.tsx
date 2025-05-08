import { Suspense } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductList from "@/components/product-list"
import ProductListSkeleton from "@/components/product-list-skeleton"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Store</h1>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Signup</Button>
          </Link>
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
