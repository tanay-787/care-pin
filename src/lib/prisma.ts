// file: lib/prisma.ts

import { PrismaClient } from '@prisma/client'; // <-- Your working import is correct.
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({ connectionString });

// This is the Prisma Client instance, initialized with the Neon adapter.
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

// This line prevents TypeScript errors by defining the type of 'globalThis.prisma'.
// It tells TypeScript: "There might be a global variable named 'prisma' of this type."
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// If 'globalForPrisma.prisma' already exists, use it. Otherwise, create a new instance.
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Export the single, shared instance of the Prisma Client.
export default prisma;

// In non-production environments, set the global variable. This prevents
// creating new connections on every hot reload.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}