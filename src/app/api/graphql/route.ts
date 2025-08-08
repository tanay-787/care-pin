// file: app/api/graphql/route.ts

import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';

// --- CHANGE HERE ---
// 1. Remove the old Prisma Client import
// import { PrismaClient } from '@prisma/client';

// 2. Import your new singleton Prisma Client instance
import prisma from '@/lib/prisma';
// --------------------

// No changes needed here
const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
    role: String!
  }

  type Query {
    users: [User!]!
  }
`;

// No changes needed here
const resolvers = {
  Query: {
    // The context will now automatically be typed correctly if you've set up your project well
    users: (parent: unknown, args: {}, context: { prisma: typeof prisma }) => {
      return context.prisma.user.findMany();
    },
  },
};

// --- REMOVED LINE ---
// We no longer instantiate Prisma here.
// const prisma = new PrismaClient();
// --------------------

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  // The context now simply passes the imported prisma instance.
  context: () => ({ prisma }),
});

export { handleRequest as GET, handleRequest as POST };