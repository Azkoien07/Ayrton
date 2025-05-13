import { gql } from "@apollo/client";

export const GET_ALL_PLANS = gql`
  query GetAllPlans($page: Int!, $size: Int!) {
    allPlans(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        name
        description
        price
        state
        duration
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_PLAN_BY_ID = gql`
  query GetPlanById($id: ID!) {
    planById(id: $id) {
      code
      date
      message
      data {
        id
        name
        description
        price
        state
        duration
      }
    }
  }
`;

export const ADD_PLAN = gql`
  mutation AddPlan($input: PlanInput!) {
    addPlan(input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        price
        state
        duration
      }
    }
  }
`;

export const UPDATE_PLAN = gql`
  mutation UpdatePlan($id: ID!, $input: PlanUpdateInput!) {
    updatePlan(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        price
        state
        duration
      }
    }
  }
`;

export const DELETE_PLAN = gql`
  mutation DeletePlan($id: ID!) {
    deletePlan(id: $id) {
      code
      message
      id
      data {
        id
        name
        description
        price
        state
        duration
      }
    }
  }
`;
