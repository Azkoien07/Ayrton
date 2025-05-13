import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($page: Int!, $size: Int!) {
    allUsers(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        name
        email
        password
        username
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      code
      date
      message
      data {
        id
        name
        email
        password
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      code
      message
      id
      data {
        id
        name
        email
        password
        username
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        name
        email
        password
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      code
      message
      id
      data {
        id
        name
        email
        password
        username
      }
    }
  }
`;
