import { gql } from "@apollo/client"

// User Authentication
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      email
      name
      role
      token
    }
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $name: String!, $role: Role!) {
    registerUser(email: $email, password: $password, name: $name, role: $role) {
      id
      email
      name
      role
      token
    }
  }
`

// User Queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      name
      role
      createdAt
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      name
      role
      createdAt
    }
  }
`

// Shift Operations
export const CLOCK_IN = gql`
  mutation ClockIn($latitude: Float!, $longitude: Float!, $notes: String) {
    clockIn(latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      clockInTime
      clockInLatitude
      clockInLongitude
      notes
      status
    }
  }
`

export const CLOCK_OUT = gql`
  mutation ClockOut($shiftId: String!, $latitude: Float!, $longitude: Float!, $notes: String) {
    clockOut(shiftId: $shiftId, latitude: $latitude, longitude: $longitude, notes: $notes) {
      id
      clockOutTime
      clockOutLatitude
      clockOutLongitude
      duration
      status
    }
  }
`

export const GET_USER_SHIFTS = gql`
  query GetUserShifts($userId: String!) {
    getUserShifts(userId: $userId) {
      id
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      user {
        name
        email
      }
    }
  }
`

export const GET_ALL_SHIFTS = gql`
  query GetAllShifts {
    getAllShifts {
      id
      clockInTime
      clockOutTime
      clockInLatitude
      clockInLongitude
      clockOutLatitude
      clockOutLongitude
      duration
      notes
      status
      user {
        id
        name
        email
      }
    }
  }
`

// Location Perimeter
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
        name
        email
      }
    }
  }
`

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
        name
        email
      }
    }
  }
`
