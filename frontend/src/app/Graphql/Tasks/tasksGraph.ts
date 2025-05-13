import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetAllTasks($page: Int!, $size: Int!) {
    allTasks(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        name
        description
        priority
        typeTask
        state
        fCreation
        fExpiration
        reminder
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: ID!) {
    taskById(id: $id) {
      code
      date
      message
      data {
        id
        name
        description
        priority
        typeTask
        state
        fCreation
        fExpiration
        reminder
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    addTask(input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        priority
        typeTask
        state
        fCreation
        fExpiration
        reminder
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: TaskUpdateInput!) {
    updateTask(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        name
        description
        priority
        typeTask
        state
        fCreation
        fExpiration
        reminder
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      code
      message
      id
      data {
        id
        name
        description
        priority
        typeTask
        state
        fCreation
        fExpiration
        reminder
      }
    }
  }
`;
