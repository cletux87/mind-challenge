import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/modules/auth';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      fistName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: await hashPassword('password'),
      startDate: new Date(),
      role: 'ADMIN',
    },
  });
  await prisma.user.create({
    data: {
      fistName: 'user',
      lastName: 'user',
      email: 'user@user.com',
      password: await hashPassword('password'),
      startDate: new Date(),
      role: 'USER',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
