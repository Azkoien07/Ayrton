// paymentService.ts
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
import {
    GetPaymentsQuery,
    PaymentByIdQuery,
    AddPaymentMutation,
    UpdatePaymentMutation,
    DeletePaymentMutation
} from '@/generated/graphql';

export class PaymentService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllPayments({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetPaymentsQuery>({
            query: GET_ALL_PAYMENTS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allPayments;
    }

    async getPaymentById(id: string) {
        const { data } = await this.client.query<PaymentByIdQuery>({
            query: GET_PAYMENT_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.paymentById;
    }

    async addPayment(input: PaymentInput) {
        const { data } = await this.client.mutate<AddPaymentMutation>({
            mutation: ADD_PAYMENT,
            variables: { input }
        });

        if (!data || !data.addPayment) {
            throw new Error("Failed to add payment");
        }
        return data.addPayment;
    }

    async updatePayment(id: string, input: PaymentUpdateInput) {
        const { data } = await this.client.mutate<UpdatePaymentMutation>({
            mutation: UPDATE_PAYMENT,
            variables: { id, input }
        });

        if (!data || !data.updatePayment) {
            throw new Error("Failed to update payment");
        }
        return data.updatePayment;
    }

    async deletePayment(id: string) {
        const { data } = await this.client.mutate<DeletePaymentMutation>({
            mutation: DELETE_PAYMENT,
            variables: { id }
        });

        if (!data || !data.deletePayment) {
            throw new Error("Failed to delete payment");
        }
        return data.deletePayment;
    }
}