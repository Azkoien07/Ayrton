import { gql } from '@apollo/client';

export const GET_ALL_RANKINGS = gql`
  query GetAllRankings($page: Int!, $size: Int!) {
    allRankings(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        level
        position
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_RANKING_BY_ID = gql`
  query GetRankingById($id: ID!) {
    rankingById(id: $id) {
      code
      date
      message
      data {
        id
        level
        position
      }
    }
  }
`;

export const ADD_RANKING = gql`
  mutation AddRanking($input: RankingInput!) {
    addRanking(input: $input) {
      code
      message
      id
      data {
        id
        level
        position
      }
    }
  }
`;

export const UPDATE_RANKING = gql`
  mutation UpdateRanking($id: ID!, $input: RankingUpdateInput!) {
    updateRanking(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        level
        position
      }
    }
  }
`;

export const DELETE_RANKING = gql`
  mutation DeleteRanking($id: ID!) {
    deleteRanking(id: $id) {
      code
      message
      id
      data {
        id
        level
        position
      }
    }
  }
`;
