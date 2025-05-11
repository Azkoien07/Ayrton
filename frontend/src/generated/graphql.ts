import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addPayment?: Maybe<Response>;
  deletePayment?: Maybe<Response>;
  updatePayment?: Maybe<Response>;
};


export type MutationAddPaymentArgs = {
  input?: InputMaybe<PaymentInput>;
};


export type MutationDeletePaymentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdatePaymentArgs = {
  id: Scalars['ID']['input'];
  input?: InputMaybe<PaymentUpdateInput>;
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID']['output'];
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['output'];
};

export type PaymentInput = {
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['input'];
};

export enum PaymentMethod {
  Paypal = 'Paypal',
  TarjetaCredito = 'TarjetaCredito',
  TarjetaDebito = 'TarjetaDebito'
}

export type PaymentPage = {
  __typename?: 'PaymentPage';
  code?: Maybe<Scalars['String']['output']>;
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Maybe<Payment>>>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type PaymentPageId = {
  __typename?: 'PaymentPageId';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Payment>;
  date?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type PaymentUpdateInput = {
  paymentMethod: PaymentMethod;
  purchaseAmount: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  allPayments?: Maybe<PaymentPage>;
  paymentById?: Maybe<PaymentPageId>;
};


export type QueryAllPaymentsArgs = {
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryPaymentByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  code?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type GetPaymentsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetPaymentsQuery = { __typename?: 'Query', allPayments?: { __typename?: 'PaymentPage', code?: string | null, totalPages?: number | null, totalItems?: number | null, currentPage?: number | null, message?: string | null, data?: Array<{ __typename?: 'Payment', id: string, purchaseAmount: number, paymentMethod: PaymentMethod } | null> | null } | null };


export const GetPaymentsDocument = gql`
    query GetPayments($page: Int!, $size: Int!) {
  allPayments(page: $page, size: $size) {
    code
    data {
      id
      purchaseAmount
      paymentMethod
    }
    totalPages
    totalItems
    currentPage
    message
  }
}
    `;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables> & ({ variables: GetPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
      }
export function useGetPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export function useGetPaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;