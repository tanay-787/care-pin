export const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    email: String!
    name: String
    role: Role
    createdAt: String!
    auth0Id: String
    autoGeoAlerts: Boolean!
    isInPerimeter: Boolean!
  }

  type Shift {
    id: String!
    userId: String!
    clockInTime: String!
    clockOutTime: String
    clockInLatitude: Float
    clockInLongitude: Float
    clockOutLatitude: Float
    clockOutLongitude: Float
    duration: Int
    notes: String
    status: ShiftStatus!
    createdAt: String!
    updatedAt: String!
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
    greetUser: Boolean!
    updateAutoGeo(enabled: Boolean!): User!
    createOrUpdateUser(email: String!, name: String!, role: Role!): User!
    clockIn(latitude: Float!, longitude: Float!, notes: String): Shift!
    clockOut(shiftId: String!, latitude: Float!, longitude: Float!, notes: String): Shift!
    updateLocationPerimeter(
      centerLatitude: Float!
      centerLongitude: Float!
      radiusKm: Float! = 0.7
      address: String!
      isActive: Boolean!
    ): LocationPerimeter!
    subscribePush(endpoint: String!, p256dh: String!, auth: String!): Boolean!
    unsubscribePush(endpoint: String!): Boolean!
    triggerGeo(latitude: Float!, longitude: Float!): Boolean!
  }
`;
