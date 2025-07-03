import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VoucherItem } from '@Types/slices/voucher';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_VOUCHERS, GET_VOUCHER_BY_ID, ADD_VOUCHER, UPDATE_VOUCHER, DELETE_VOUCHER } from '@graphql/Vouchers/vouchersGraph';
import {
    GetAllVouchersQuery,
    GetAllVouchersQueryVariables,
    GetVoucherByIdQuery,
    GetVoucherByIdQueryVariables,
    AddVoucherMutation,
    AddVoucherMutationVariables,
    UpdateVoucherMutation,
    UpdateVoucherMutationVariables,
    DeleteVoucherMutation,
    DeleteVoucherMutationVariables,
    Voucher as GraphQLVoucherType
} from "@/generated/graphql";

const transformGraphQLToVoucherItem = (graphqlData: GraphQLVoucherType): VoucherItem => {
    return {
        id: graphqlData.id,
        code: graphqlData.code,
        payment: graphqlData.payment
    };
};

interface VoucherState extends GenericPaginatedState<VoucherItem> {
    selectedItem: VoucherItem | null;
}

export const fetchVouchers = createAsyncThunk<NonNullable<GetAllVouchersQuery['allVouchers']>, GetAllVouchersQueryVariables
>(
    'voucher/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllVouchersQuery, GetAllVouchersQueryVariables>({
            query: GET_ALL_VOUCHERS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allVouchers) {
            throw new Error('No vouchers data received');
        }
        return data.allVouchers;
    }
);

export const fetchVoucherById = createAsyncThunk<NonNullable<GetVoucherByIdQuery['voucherById']>, GetVoucherByIdQueryVariables
>(
    'voucher/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>({
            query: GET_VOUCHER_BY_ID,
            variables: { id },
        });
        if (!data.voucherById) {
            throw new Error(`Voucher with ID ${id} not found`);
        }
        return data.voucherById;
    }
);

export const addVoucher = createAsyncThunk<NonNullable<AddVoucherMutation['addVoucher']>, AddVoucherMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'voucher/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddVoucherMutation, AddVoucherMutationVariables>({
                mutation: ADD_VOUCHER,
                variables: { input }
            });
            const res = data?.addVoucher;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add voucher';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateVoucher = createAsyncThunk<
    NonNullable<UpdateVoucherMutation['updateVoucher']>,
    UpdateVoucherMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'voucher/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateVoucherMutation, UpdateVoucherMutationVariables>({
                mutation: UPDATE_VOUCHER,
                variables: { id, input },
            });
            const res = data?.updateVoucher;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update voucher';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteVoucher = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'voucher/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteVoucherMutation, DeleteVoucherMutationVariables>({
                mutation: DELETE_VOUCHER,
                variables: { id },
            });
            const res = data?.deleteVoucher;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete voucher';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: VoucherState = {
    ...createInitialPaginatedState<VoucherItem>(),
    selectedItem: null,
};

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        clearVoucherError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVouchers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVouchers.fulfilled, (state, action: PayloadAction<NonNullable<GetAllVouchersQuery['allVouchers']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToVoucherItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchVouchers.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching vouchers' };
                state.data = [];
            })

            .addCase(fetchVoucherById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchVoucherById.fulfilled, (state, action: PayloadAction<NonNullable<GetVoucherByIdQuery['voucherById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToVoucherItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchVoucherById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching voucher by ID' };
                state.selectedItem = null;
            })

            .addCase(addVoucher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVoucher.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addVoucher.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding voucher' };
            })

            .addCase(updateVoucher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVoucher.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateVoucher.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating voucher' };
            })

            .addCase(deleteVoucher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVoucher.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteVoucher.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting voucher' };
            });
    }
});

export const { } = voucherSlice.actions;
export default voucherSlice.reducer;