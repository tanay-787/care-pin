import { createYoga } from "graphql-yoga"
import { makeExecutableSchema } from "@graphql-tools/schema"
import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserRole  } from "@prisma/client"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
    role: Role!
    createdAt: String!
    token: String
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
    loginUser(email: String!, password: String!): User!
    registerUser(email: String!, password: String!, name: String!, role: Role!): User!
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

const getUser = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return await prisma.user.findUnique({ where: { id: decoded.userId } })
  } catch {
    return null
  }
}

const resolvers = {
  Query: {
    getCurrentUser: async (_: unknown, __: unknown, context: any) => {
      const token = context.request.headers.get("authorization")?.replace("Bearer ", "")
      if (!token) return null
      return await getUser(token)
    },

    getAllUsers: async () => {
      return await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      })
    },

    getUserShifts: async (_: unknown, { userId }: { userId: string }) => {
      return await prisma.shift.findMany({
        where: { userId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      })
    },

    getAllShifts: async () => {
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
    loginUser: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) throw new Error("Invalid credentials")

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) throw new Error("Invalid credentials")

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })
      return { ...user, token }
    },

    registerUser: async (
      _: unknown,
      {
        email,
        password,
        name,
        role,
      }: { email: string; password: string; name: string; role: UserRole },
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data: { email, name, role, password: hashedPassword },
      })
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" })
      return { ...user, token }
    },

    clockIn: async (
      _: unknown,
      { latitude, longitude, notes }: { latitude: number; longitude: number; notes?: string },
      context: any,
    ) => {
      const token = context.request.headers.get("authorization")?.replace("Bearer ", "")
      if (!token) throw new Error("Authentication required")

      const user = await getUser(token)
      if (!user) throw new Error("Invalid token")

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
    ) => {
      const shift = await prisma.shift.findUnique({ where: { id: shiftId } })
      if (!shift) throw new Error("Shift not found")

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
      const token = context.request.headers.get("authorization")?.replace("Bearer ", "")
      if (!token) throw new Error("Authentication required")

      const user = await getUser(token)
      if (!user || user.role !== "MANAGER") throw new Error("Manager access required")

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
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  context: (request) => ({ request }),
})

export { handleRequest as GET, handleRequest as POST }
