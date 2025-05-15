import { gql } from '@apollo/client';

export const GET_ALL_ROLES = gql`
  query GetAllRoles($page: Int!, $size: Int!) {
    allRoles(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        name
        accessLevel
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query GetRoleById($id: ID!) {
    roleById(id: $id) {
      code
      date
      message
      data {
        id
        name
        accessLevel
      }
    }
  }
`;

export const ADD_ROLE = gql`
  mutation AddRole($input: RoleInput!) {
    addRole(input: $input) {
      code
      message
      id
      data {
        id
        name
        accessLevel
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $input: RoleUpdateInput!) {
    updateRole(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        name
        accessLevel
      }
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: ID!) {
    deleteRole(id: $id) {
      code
      message
      id
      data {
        id
        name
        accessLevel
      }
    }
  }
`;
