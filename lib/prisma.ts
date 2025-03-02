// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prismaClient: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaClient = global.prisma;
}

export const prismaClient;
