import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentItem } from '@Types/slices/payment';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_PAYMENTS, GET_PAYMENT_BY_ID, ADD_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT } from '@graphql/Payments/paymentGraph';
import {
    GetAllPaymentsQuery,
    GetAllPaymentsQueryVariables,
    GetPaymentByIdQuery,
    GetPaymentByIdQueryVariables,
    AddPaymentMutation,
    AddPaymentMutationVariables,
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables,
    DeletePaymentMutation,
    DeletePaymentMutationVariables,
    Payment as GraphQLPaymentType
} from "@/generated/graphql";

const transformGraphQLToPaymentItem = (graphqlData: GraphQLPaymentType): PaymentItem => {
    return {
        id: graphqlData.id,
        purchaseAmount: graphqlData.purchaseAmount,
        paymentMethod: graphqlData.paymentMethod,
    };
};

interface PaymentState extends GenericPaginatedState<PaymentItem> {
    selectedItem: PaymentItem | null;
}

export const fetchPayments = createAsyncThunk<NonNullable<GetAllPaymentsQuery['allPayments']>, GetAllPaymentsQueryVariables
>(
    'payment/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>({
            query: GET_ALL_PAYMENTS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allPayments) {
            throw new Error('No payments data received');
        }
        return data.allPayments;
    }
);

export const fetchPaymentById = createAsyncThunk<NonNullable<GetPaymentByIdQuery['paymentById']>, GetPaymentByIdQueryVariables
>(
    'payment/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>({
            query: GET_PAYMENT_BY_ID,
            variables: { id },
        });
        if (!data.paymentById) {
            throw new Error(`Payment with ID ${id} not found`);
        }
        return data.paymentById;
    }
);

export const addPayment = createAsyncThunk<NonNullable<AddPaymentMutation['addPayment']>, AddPaymentMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'payment/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddPaymentMutation, AddPaymentMutationVariables>({
                mutation: ADD_PAYMENT,
                variables: { input }
            });
            const res = data?.addPayment;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add payment';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updatePayment = createAsyncThunk<NonNullable<UpdatePaymentMutation['updatePayment']>, UpdatePaymentMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'payment/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdatePaymentMutation, UpdatePaymentMutationVariables>({
                mutation: UPDATE_PAYMENT,
                variables: { id, input },
            });
            const res = data?.updatePayment;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update payment';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deletePayment = createAsyncThunk<string, string,
    { rejectValue: RejectedPayload }
>(
    'payment/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeletePaymentMutation, DeletePaymentMutationVariables>({
                mutation: DELETE_PAYMENT,
                variables: { id },
            });
            const res = data?.deletePayment;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete payment';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: PaymentState = {
    ...createInitialPaginatedState<PaymentItem>(),
    selectedItem: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearPaymentError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<NonNullable<GetAllPaymentsQuery['allPayments']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToPaymentItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching payments' };
                state.data = [];
            })

            .addCase(fetchPaymentById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchPaymentById.fulfilled, (state, action: PayloadAction<NonNullable<GetPaymentByIdQuery['paymentById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToPaymentItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchPaymentById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching payment by ID' };
                state.selectedItem = null;
            })

            .addCase(addPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPayment.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addPayment.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding payment' };
            })

            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePayment.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating payment' };
            })

            .addCase(deletePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePayment.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting payment' };
            });
    }
});


export const { } = paymentSlice.actions;
export default paymentSlice.reducer;