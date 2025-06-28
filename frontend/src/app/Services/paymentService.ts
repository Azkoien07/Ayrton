/*
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_PAYMENTS, GET_PAYMENT_BY_ID, ADD_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT } from '@graphql/Payments/paymentGraph';
import {
    PaymentInput,
    PaymentUpdateInput,
    GetAllPaymentsQuery,
    GetAllPaymentsQueryVariables,
    GetPaymentByIdQuery,
    GetPaymentByIdQueryVariables,
    AddPaymentMutation,
    AddPaymentMutationVariables,
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables,
    DeletePaymentMutation,
    DeletePaymentMutationVariables
} from '@/generated/graphql';


export const getAllPayments = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>({
        query: GET_ALL_PAYMENTS,
        variables: { page, size },
        fetchPolicy: "network-only"
    });
    return data.allPayments;
};

export const getPaymentById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>({
        query: GET_PAYMENT_BY_ID,
        variables: { id },
        fetchPolicy: "network-only"
    });
    return data.paymentById;
};

export const addPayment = async (client: ApolloClient<NormalizedCacheObject>, input: PaymentInput) => {
    const { data } = await client.mutate<AddPaymentMutation, AddPaymentMutationVariables>({
        mutation: ADD_PAYMENT,
        variables: { input }
    });

    if (!data?.addPayment) {
        throw new Error("Failed to add payment");
    }

    return data.addPayment;
};

export const updatePayment = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: PaymentUpdateInput) => {
    const { data } = await client.mutate<UpdatePaymentMutation, UpdatePaymentMutationVariables>({
        mutation: UPDATE_PAYMENT,
        variables: { id, input }
    });

    if (!data?.updatePayment) {
        throw new Error("Failed to update payment");
    }

    return data.updatePayment;
};

export const deletePayment = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeletePaymentMutation, DeletePaymentMutationVariables>({
        mutation: DELETE_PAYMENT,
        variables: { id }
    });

    if (!data?.deletePayment) {
        throw new Error("Failed to delete payment");
    }

    return data.deletePayment;
};
*/