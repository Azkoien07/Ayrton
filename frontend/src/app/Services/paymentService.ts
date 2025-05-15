import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { PaymentInput, PaymentUpdateInput } from "@/generated/graphql";
import {
    GET_ALL_PAYMENTS,
    GET_PAYMENT_BY_ID,
    ADD_PAYMENT,
    UPDATE_PAYMENT,
    DELETE_PAYMENT
} from '@graphql/Payments/paymentGraph';

export class PaymentService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllPayments({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_PAYMENTS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allPayments;
    }

    async getPaymentById(id: string) {
        const { data } = await this.client.query({
            query: GET_PAYMENT_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.paymentById;
    }

    async addPayment(input: PaymentInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_PAYMENT,
            variables: { input }
        });
        return data.addPayment;
    }

    async updatePayment(id: string, input: PaymentUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_PAYMENT,
            variables: { id, input }
        });
        return data.updatePayment;
    }

    async deletePayment(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_PAYMENT,
            variables: { id }
        });
        return data.deletePayment;
    }
}