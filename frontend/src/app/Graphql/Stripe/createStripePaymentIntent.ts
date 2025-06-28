import { gql } from '@apollo/client';

export const CREATE_STRIPE_PAYMENT_INTENT = gql`
  mutation CreateIntent($input: PaymentInput!) {
    createStripePaymentIntent(input: $input) {
      clientSecret
      code
      message
    }
  }
`;
