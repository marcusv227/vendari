import { PrismaClient } from '@prisma/client';
import { initializeUser } from './user';

const prisma = new PrismaClient();

async function main() {
  const initializedUsers = await initializeUser();
    await prisma.user.upsert({
      where: {
        email: initializedUsers.email,
      },
      update: {},
      create: initializedUsers,
    });
  }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
