import { gql } from '@apollo/client';

export const GET_ALL_CHALLENGES = gql`
  query GetAllChallenges($page: Int!, $size: Int!) {
    allChallenges(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        name
        description
        category
        state
        dificulty
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_CHALLENGE_BY_ID = gql`
  query GetChallengeById($id: ID!) {
    challengeById(id: $id) {
      code
      date
      message
      data {
        id
        name
        description
        category
        state
        dificulty
      }
    }
  }
`;

export const ADD_CHALLENGE = gql`
  mutation AddChallenge($input: ChallengeInput!) {
    addChallenge(input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        category
        state
        dificulty
      }
    }
  }
`;

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge($id: ID!, $input: ChallengeUpdateInput!) {
    updateChallenge(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        category
        state
        dificulty
      }
    }
  }
`;

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge($id: ID!) {
    deleteChallenge(id: $id) {
      code
      message
      id
      data {
        id
        name
        description
        category
        state
        dificulty
      }
    }
  }
`;
