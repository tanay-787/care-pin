// file: app/api/graphql/route.ts
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@/generated/prisma/client';

// Edge Case Best Practice:
// Instantiate Prisma Client outside the request handler. This prevents
// creating a new database connection on every single API call, which is
// crucial for performance and avoiding connection limits.
const prisma = new PrismaClient();

// 1. Define your GraphQL Schema (the 'what')
// This is the contract for your API. It tells clients what queries they can make.
const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
    role: String!
  }

  type Query {
    """
    Retrieves all users from the database.
    """
    users: [User!]!
  }
`;

// 2. Define your Resolvers (the 'how')
// These are the functions that fetch the data for your schema.
// The 'context' parameter will give us access to our Prisma instance.
const resolvers = {
  Query: {
    users: (parent: unknown, args: {}, context: { prisma: PrismaClient }) => {
      return context.prisma.user.findMany();
    },
  },
};

// 3. Create the Executable Schema
// This combines your type definitions and resolvers into a single, usable schema.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// 4. Create the Yoga server instance
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql', // The endpoint path
  fetchAPI: { Response }, // Use the native Response object
  // The context is a value passed to all resolvers. We use it to
  // inject our Prisma Client, making it available for database operations.
  context: () => ({ prisma }),
});

// 5. Export the request handler for Next.js App Router
// This connects Yoga to Next.js, allowing it to handle GET (for the GraphiQL IDE)
// and POST (for actual GraphQL queries) requests.
export { handleRequest as GET, handleRequest as POST };