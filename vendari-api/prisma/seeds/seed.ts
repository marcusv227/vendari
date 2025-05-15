import { PrismaClient } from '@prisma/client'
import { initializeUser } from './user'
import { initializeProducts } from './product'

const prisma = new PrismaClient()

async function main() {
  const user = await initializeUser()

  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  })

  const products = await initializeProducts()

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
}

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
