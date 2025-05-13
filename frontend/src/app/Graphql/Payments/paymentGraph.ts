import { gql } from "@apollo/client";

export const GET_ALL_PAYMENTS = gql`
  query GetAllPayments($page: Int!, $size: Int!) {
    allPayments(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        purchaseAmount
        paymentMethod
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_PAYMENT_BY_ID = gql`
  query GetPaymentById($id: ID!) {
    paymentById(id: $id) {
      code
      date
      message
      data {
        id
        purchaseAmount
        paymentMethod
      }
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation AddPayment($input: PaymentInput!) {
    addPayment(input: $input) {
      code
      message
      id
      data {
        id
        purchaseAmount
        paymentMethod
      }
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: ID!, $input: PaymentUpdateInput!) {
    updatePayment(id: $id, input: $input) {
      code
      message
      id
      data {
        id
        purchaseAmount
        paymentMethod
      }
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation DeletePayment($id: ID!) {
    deletePayment(id: $id) {
      code
      message
      id
      data {
        id
        purchaseAmount
        paymentMethod
      }
    }
  }
`;
