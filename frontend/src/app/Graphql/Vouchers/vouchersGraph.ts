// voucherQueries.ts
import { gql } from '@apollo/client';

export const GET_ALL_VOUCHERS = gql`
  query GetAllVouchers($page: Int!, $size: Int!) {
    allVouchers(page: $page, size: $size) {
      code
      date
      message
      data {
        id
        code
        payment {
          id
          purchaseAmount
          paymentMethod
        }
      }
      currentPage
      totalPages
      totalItems
    }
  }
`;

export const GET_VOUCHER_BY_ID = gql`
  query GetVoucherById($id: ID!) {
    voucherById(id: $id) {
      code
      date
      message
      data {
        id
        code
        payment {
          id
          purchaseAmount
          paymentMethod
        }
      }
    }
  }
`;

// Mutations 
export const ADD_VOUCHER = gql`
  mutation AddVoucher($input: VoucherInput!) {
    addVoucher(input: $input) {
      id
      code
      message
    }
  }
`;


export const UPDATE_VOUCHER = gql`
  mutation UpdateVoucher($id: ID!, $input: VoucherUpdateInput!) {
    updateVoucher(id: $id, input: $input) {
      id
      code
      message
    }
  }
`;


export const DELETE_VOUCHER = gql`
  mutation DeleteVoucher($id: ID!) {
    deleteVoucher(id: $id) {
      code
      message
      id
    }
  }
`;
