import { gql } from '@apollo/client';

// User Queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      name
      role
      createdAt
      auth0Id
      autoGeoAlerts
      isInPerimeter
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      name
      role
      createdAt
      auth0Id
      autoGeoAlerts
      isInPerimeter
    }
  }
`;

// User Mutations
export const CREATE_OR_UPDATE_USER = gql`
  mutation CreateOrUpdateUser($email: String!, $name: String!, $role: Role!) {
    createOrUpdateUser(email: $email, name: $name, role: $role) {
      id
      email
      name
      role
      createdAt
      auth0Id
      autoGeoAlerts
      isInPerimeter
    }
  }
`;

export const UPDATE_AUTO_GEO = gql`
  mutation UpdateAutoGeo($enabled: Boolean!) {
    updateAutoGeo(enabled: $enabled) {
      id
      email
      name
      role
      createdAt
      auth0Id
      autoGeoAlerts
      isInPerimeter
    }
  }
`;


// Shift Mutations
export const CLOCK_IN = gql`
  mutation ClockIn($latitude: Float!, $longitude: Float!, $notes: String) {
    clockIn(latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      userId # Added userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt # Added createdAt
      updatedAt # Added updatedAt
    }
  }
`;

export const CLOCK_OUT = gql`
  mutation ClockOut($shiftId: String!, $latitude: Float!, $longitude: Float!, $notes: String) {
    clockOut(shiftId: $shiftId, latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      userId # Added userId
      clockInTime # Added clockInTime
      clockOutTime
      clockInLatitude # Added clockInLatitude
      clockInLongitude # Added clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes # Added notes
      status
      createdAt # Added createdAt
      updatedAt # Added updatedAt
    }
  }
`;

// Shift Queries
export const GET_USER_SHIFTS = gql`
  query GetUserShifts($userId: String!) {
    getUserShifts(userId: $userId) {
      id
      userId # Added userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt # Added createdAt
      updatedAt # Added updatedAt
      user {
        id # Added user ID to match schema
        name
        email
        role # Added role to match schema
        createdAt # Added createdAt to match schema
        auth0Id # Added auth0Id to match schema
        autoGeoAlerts # Added autoGeoAlerts
        isInPerimeter # Added isInPerimeter
      }
    }
  }
`;

export const GET_ALL_SHIFTS = gql`
  query GetAllShifts {
    getAllShifts {
      id
      userId # Added userId
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      createdAt # Added createdAt
      updatedAt # Added updatedAt
      user {
        id
        name
        email
        role 
        createdAt # Added createdAt to match schema
        auth0Id # Added auth0Id to match schema
        autoGeoAlerts # Added autoGeoAlerts
        isInPerimeter # Added isInPerimeter
      }
    }
  }
`;

// Location Perimeter Queries
export const GET_LOCATION_PERIMETER = gql`
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
        id # Added user ID to match schema
        name
        email
        role # Added role to match schema
        createdAt # Added createdAt to match schema
        auth0Id # Added auth0Id to match schema
        autoGeoAlerts # Added autoGeoAlerts
        isInPerimeter # Added isInPerimeter
      }
    }
  }
`;

// Location Perimeter Mutations
export const UPDATE_LOCATION_PERIMETER = gql`
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
        id # Added user ID to match schema
        name
        email
        role # Added role to match schema
        createdAt # Added createdAt to match schema
        auth0Id # Added auth0Id to match schema
        autoGeoAlerts # Added autoGeoAlerts
        isInPerimeter # Added isInPerimeter
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
