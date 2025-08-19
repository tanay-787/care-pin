import { createYoga } from "graphql-yoga"
import { makeExecutableSchema } from "@graphql-tools/schema"
import prisma from "@/lib/prisma"
import { auth0 } from "@/lib/auth0"
import type { NextRequest } from "next/server"

const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
    role: Role
    createdAt: String!
    auth0Id: String!
  }

  type Shift {
    id: String!
    clockInTime: String!
    clockOutTime: String
    clockInLatitude: Float
    clockInLongitude: Float
    clockOutLatitude: Float
    clockOutLongitude: Float
    duration: Int
    notes: String
    status: ShiftStatus!
    user: User!
  }

  type LocationPerimeter {
    id: String!
    centerLatitude: Float!
    centerLongitude: Float!
    radiusKm: Float!
    address: String!
    isActive: Boolean!
    updatedAt: String!
    updatedBy: User
  }

  enum Role {
    MANAGER
    CARE_WORKER
  }

  enum ShiftStatus {
    CLOCKED_IN
    CLOCKED_OUT
  }

  type Query {
    getCurrentUser: User
    getAllUsers: [User!]!
    getUserShifts(userId: String!): [Shift!]!
    getAllShifts: [Shift!]!
    getLocationPerimeter: LocationPerimeter
  }

  type Mutation {
    createOrUpdateUser(email: String!, name: String!, role: Role!): User!
    clockIn(latitude: Float!, longitude: Float!, notes: String): Shift!
    clockOut(shiftId: String!, latitude: Float!, longitude: Float!, notes: String): Shift!
    updateLocationPerimeter(
      centerLatitude: Float!
      centerLongitude: Float!
      radiusKm: Float!
      address: String!
      isActive: Boolean!
    ): LocationPerimeter!
  }
`
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

const resolvers = {
  Query: {
    getCurrentUser: async (_: unknown, __: unknown, context: any) => {
      return context.currentUser
    },


    getAllUsers: async (_: unknown, __: unknown, context: any) => {
      const currentUser = context.currentUser
      if (!currentUser || currentUser.role !== "MANAGER") {
        throw new Error("Manager access required")
      }

      return await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      })
    },

    getUserShifts: async (_: unknown, { userId }: { userId: string }, context: any) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new Error("Authentication required")
      
      // Users can only see their own shifts unless they're a manager
      if (currentUser.role !== "MANAGER" && currentUser.id !== userId) {
        throw new Error("Access denied")
      }

      return await prisma.shift.findMany({
        where: { userId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      })
    },

    getAllShifts: async (_: unknown, __: unknown, context: any) => {
      const currentUser = context.currentUser
      if (!currentUser || currentUser.role !== "MANAGER") {
        throw new Error("Manager access required")
      }

      return await prisma.shift.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      })
    },

    getLocationPerimeter: async () => {
      return await prisma.locationPerimeter.findFirst({
        where: { isActive: true },
        include: { updatedBy: true },
      })
    },
  },

  Mutation: {
    createOrUpdateUser: async (
      _: unknown,
      { name, role }: { name: string | null | undefined; role: "MANAGER" | "CARE_WORKER" | undefined },
      context: any,
    ) => {
      const user = context.currentUser
      if (!user) throw new Error("Authentication required")
    
      // Prepare data for update
      const updateData: { name?: string | null; role?: "MANAGER" | "CARE_WORKER" } = {};
    
          updateData.name = name;
    
      if (role !== undefined && user.role === null) { // Check if role input is provided AND user has no role in DB
          updateData.role = role; // Set the role
      } else if (role !== undefined && user.role !== null && user.role !== role) {
           throw new Error("Role cannot be changed after it has been set.");
      }
    
    
      // If no update data is provided (e.g., called the mutation with no name or role input),
      // return the existing user without performing an update.
       if (Object.keys(updateData).length === 0) {
           return user;
       }
    
      // Update the user's profile
      return await prisma.user.update({
        where: { email: user.email },
        data: updateData,
        include: { shifts: true, locationPerimetersUpdated: true }
      });
    },
    

    clockIn: async (
      _: unknown,
      { latitude, longitude, notes }: { latitude: number; longitude: number; notes?: string },
      context: any,
    ) => {
      const user = context.currentUser
      if (!user) throw new Error("Authentication required")

      return await prisma.shift.create({
        data: {
          userId: user.id,
          clockInTime: new Date(),
          clockInLatitude: latitude,
          clockInLongitude: longitude,
          notes,
          status: "CLOCKED_IN",
        },
        include: { user: true },
      })
    },

    clockOut: async (
      _: unknown,
      { shiftId, latitude, longitude, notes }: { shiftId: string; latitude: number; longitude: number; notes?: string },
      context: any,
    ) => {
      const user = context.currentUser
      if (!user) throw new Error("Authentication required")

      const shift = await prisma.shift.findUnique({
        where: { id: shiftId },
        include: { user: true },
      })

      if (!shift) throw new Error("Shift not found")

      // Users can only clock out their own shifts unless they're a manager
      if (user.role !== "MANAGER" && shift.userId !== user.id) {
        throw new Error("Access denied")
      }

      const clockOutTime = new Date()
      const duration = Math.floor((clockOutTime.getTime() - shift.clockInTime.getTime()) / (1000 * 60))

      return await prisma.shift.update({
        where: { id: shiftId },
        data: {
          clockOutTime,
          clockOutLatitude: latitude,
          clockOutLongitude: longitude,
          notes,
          status: "CLOCKED_OUT",
          duration,
        },
        include: { user: true },
      })
    },

    updateLocationPerimeter: async (
      _: unknown,
      {
        centerLatitude,
        centerLongitude,
        radiusKm,
        address,
        isActive,
      }: {
        centerLatitude: number
        centerLongitude: number
        radiusKm: number
        address: string
        isActive: boolean
      },
      context: any,
    ) => {
      const user = context.currentUser
      if (!user || user.role !== "MANAGER") {
        throw new Error("Manager access required")
      }

      // Deactivate existing perimeters
      await prisma.locationPerimeter.updateMany({
        where: { isActive: true },
        data: { isActive: false },
      })

      return await prisma.locationPerimeter.create({
        data: {
          centerLatitude,
          centerLongitude,
          radiusKm,
          address,
          isActive,
          updatedById: user.id,
        },
        include: { updatedBy: true },
      })
    },
  },
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


