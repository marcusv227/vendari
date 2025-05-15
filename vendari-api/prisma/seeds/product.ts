export async function initializeProducts() {
  const sampleProducts = [
    { name: 'Shoes', description: 'Stylish running shoes.' },
    { name: 'Backpack', description: 'Durable and water-resistant.' },
    { name: 'Watch', description: 'Luxury stainless steel watch.' },
    { name: 'Smartphone', description: 'Latest model with 5G support.' },
    { name: 'Laptop', description: 'Powerful machine for productivity.' },
    { name: 'Headphones', description: 'Noise-cancelling and wireless.' },
    { name: 'Camera', description: 'Capture high-quality photos.' },
    { name: 'Book', description: 'Engaging story for readers.' },
    { name: 'Tablet', description: 'Lightweight and fast tablet.' },
    { name: 'Sunglasses', description: 'Stylish with UV protection.' },
    { name: 'Mouse', description: 'Smooth and precise movements.' },
    { name: 'Keyboard', description: 'Mechanical keys and backlight.' },
    { name: 'Gaming Chair', description: 'Ergonomic comfort for gamers.' },
    { name: 'Jacket', description: 'Warm and waterproof.' },
    { name: 'T-shirt', description: 'Soft and breathable fabric.' },
    { name: 'Desk Lamp', description: 'Flexible and energy-saving.' },
    { name: 'Speaker', description: 'Loud and crystal clear.' },
    { name: 'Monitor', description: '4K display for professionals.' },
    { name: 'Sneakers', description: 'Casual and comfortable shoes.' },
    { name: 'Bag', description: 'Stylish and spacious for travel.' },
  ];

  return sampleProducts.map((item, index) => ({
    ...item,
    imageUrl: `https://picsum.photos/seed/${item.name.toLowerCase().replace(/\s/g, '-')}-${index}/500/300`,
    price: Number((Math.random() * 200 + 50).toFixed(2)),
  }));
}
