import type { Product } from "./types"

// Mock data - in a real app, this would come from an API or database
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      name: "Laptop Pro",
      description: "Powerful laptop for professionals",
      price: 1299.99,
      emoji: "💻",
    },
    {
      id: "2",
      name: "Smart Watch",
      description: "Track your fitness and stay connected",
      price: 249.99,
      emoji: "⌚",
    },
    {
      id: "3",
      name: "Wireless Headphones",
      description: "Premium sound quality with noise cancellation",
      price: 199.99,
      emoji: "🎧",
    },
    {
      id: "4",
      name: "Smartphone X",
      description: "Latest smartphone with advanced camera",
      price: 899.99,
      emoji: "📱",
    },
    {
      id: "5",
      name: "Tablet Ultra",
      description: "Thin and light tablet for productivity",
      price: 499.99,
      emoji: "📱",
    },
    {
      id: "6",
      name: "Wireless Charger",
      description: "Fast charging for all your devices",
      price: 39.99,
      emoji: "🔌",
    },
    {
      id: "7",
      name: "Smart Speaker",
      description: "Voice-controlled speaker with assistant",
      price: 129.99,
      emoji: "🔊",
    },
    {
      id: "8",
      name: "Digital Camera",
      description: "High-resolution camera for photography enthusiasts",
      price: 599.99,
      emoji: "📷",
    },
  ]
}
