import { gql } from '@apollo/client';

const USER_FRAGMENT = gql`
  fragment UserFields on User {
    id
    email
    name
    role
    createdAt
    auth0Id
    autoGeoAlerts
    isInPerimeter
  }
`;

// User Queries
export const GET_CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query GetCurrentUser {
    getCurrentUser {
      ...UserFields
    }
  }
`;

export const GET_ALL_USERS = gql`
  ${USER_FRAGMENT}
  query GetAllUsers {
    getAllUsers {
      ...UserFields
    }
  }
`;

// User Mutations
export const CREATE_OR_UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation CreateOrUpdateUser($email: String!, $name: String!, $role: Role!) {
    createOrUpdateUser(email: $email, name: $name, role: $role) {
      ...UserFields
    }
  }
`;

export const UPDATE_AUTO_GEO = gql`
  ${USER_FRAGMENT}
  mutation UpdateAutoGeo($enabled: Boolean!) {
    updateAutoGeo(enabled: $enabled) {
      ...UserFields
    }
  }
`;


// Shift Mutations
export const CLOCK_IN = gql`
  mutation ClockIn($latitude: Float!, $longitude: Float!, $notes: String) {
    clockIn(latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

export const CLOCK_OUT = gql`
  mutation ClockOut($shiftId: String!, $latitude: Float!, $longitude: Float!, $notes: String) {
    clockOut(shiftId: $shiftId, latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt
      updatedAt
    }
  }
`;

// Shift Queries
export const GET_USER_SHIFTS = gql`
  ${USER_FRAGMENT}
  query GetUserShifts($userId: String!) {
    getUserShifts(userId: $userId) {
      id
      userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt
      updatedAt
      user {
        ...UserFields
      }
    }
  }
`;

export const GET_ALL_SHIFTS = gql`
  ${USER_FRAGMENT}
  query GetAllShifts {
    getAllShifts {
      id
      userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt
      updatedAt
      user {
        ...UserFields
      }
    }
  }
`;

// Location Perimeter Queries
export const GET_LOCATION_PERIMETER = gql`
  ${USER_FRAGMENT}
  query GetLocationPerimeter {
    getLocationPerimeter {
      id
      centerLatitude
      centerLongitude
      radiusKm
      address
      isActive
      updatedAt
      updatedBy {
        ...UserFields
      }
    }
  }
`;

// Location Perimeter Mutations
export const UPDATE_LOCATION_PERIMETER = gql`
  ${USER_FRAGMENT}
  mutation UpdateLocationPerimeter(
    $centerLatitude: Float!
    $centerLongitude: Float!
    $radiusKm: Float!
    $address: String!
    $isActive: Boolean!
  ) {
    updateLocationPerimeter(
      centerLatitude: $centerLatitude
      centerLongitude: $centerLongitude
      radiusKm: $radiusKm
      address: $address
      isActive: $isActive
    ) {
      id
      centerLatitude
      centerLongitude
      radiusKm
      address
      isActive
      updatedAt
      updatedBy {
        ...UserFields
      }
    }
  }
`;

// Push Subscription Mutations
export const SUBSCRIBE_PUSH = gql`
  mutation SubscribePush($endpoint: String!, $p256dh: String!, $auth: String!) {
    subscribePush(endpoint: $endpoint, p256dh: $p256dh, auth: $auth)
  }
`;

export const UNSUBSCRIBE_PUSH = gql`
  mutation UnsubscribePush($endpoint: String!) {
    unsubscribePush(endpoint: $endpoint)
  }
`;

export const TRIGGER_GEO = gql`
  mutation TriggerGeo($latitude: Float!, $longitude: Float!) {
    triggerGeo(latitude: $latitude, longitude: $longitude)
  }
`;

// Greet User Mutation (Assuming this is still needed)
export const GREET_USER = gql`
  mutation GreetUser {
    greetUser
  }
`;