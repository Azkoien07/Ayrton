import { gql } from '@apollo/client';

export const GET_ALL_PQRS = gql`
  query GetAllPqrs($page: Int!, $size: Int!) {
    allPqrs(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        typePqr
        title
        description
        argument
        answer
        state
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_PQR_BY_ID = gql`
  query GetPqrById($id: ID!) {
    pqrById(id: $id) {
      code
      date
      message
      data {
        id
        typePqr
        title
        description
        argument
        answer
        state
      }
    }
  }
`;

export const ADD_PQR = gql`
  mutation AddPqr($input: PqrInput!) {
    addPqr(input: $input) {
      code
      message
      id
      data {
        id
        typePqr
        title
        description
        argument
        answer
        state
      }
    }
  }
`;

export const UPDATE_PQR = gql`
  mutation UpdatePqr($id: ID!, $input: PqrUpdateInput!) {
    updatePqr(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        typePqr
        title
        description
        argument
        answer
        state
      }
    }
  }
`;

export const DELETE_PQR = gql`
  mutation DeletePqr($id: ID!) {
    deletePqr(id: $id) {
      code
      message
      id
      data {
        id
        typePqr
        title
        description
        argument
        answer
        state
      }
    }
  }
`;
