import { createYoga } from "graphql-yoga"
import { makeExecutableSchema } from "@graphql-tools/schema"
import prisma from "@/lib/prisma"
import { auth0 } from "@/lib/auth0"
import webpush from "web-push";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

webpush.setVapidDetails(
  process.env.VAPID_CONTACT_EMAIL || "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

/**
 * @description Retrieves Current DBUser from Auth0 Session 
 */

async function getCurrentUserFromSession() {
  try {
    const session = await auth0.getSession()
    if (!session?.user) return null

    // Find or create user in database based on Auth0 user
    let user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
    })

    if (!user) {
      // Create user if doesn't exist (first time login)
      user = await prisma.user.create({
        data: {
          auth0Id: session.user.sub,
          email: session.user.email!,
          name: session.user.name || session.user.email!,
        },
      })
    }

    return user
  } catch (error) {
    console.error("Error getting user from session:", error)
    return null
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const { handleRequest } = createYoga({
  schema,
  maskedErrors: false,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  context: async ({ request }) => {
    const currentUser = await getCurrentUserFromSession();
    return { request, currentUser };
  }
})

export const GET = (req: Request) => handleRequest(req, {});
export const POST = (req: Request) => handleRequest(req, {});
export const OPTIONS = (req: Request) => handleRequest(req, {});