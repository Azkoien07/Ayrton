import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pqr } from '@/app/Types/Pqr'; // Importar Pqr en lugar de PqrItem
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_PQRS, GET_PQR_BY_ID, ADD_PQR, UPDATE_PQR, DELETE_PQR } from '@graphql/Pqrs/pqrsGraph';
import {
    GetAllPqrsQuery,
    GetAllPqrsQueryVariables,
    GetPqrByIdQuery,
    GetPqrByIdQueryVariables,
    AddPqrMutation,
    AddPqrMutationVariables,
    UpdatePqrMutation,
    UpdatePqrMutationVariables,
    DeletePqrMutation,
    DeletePqrMutationVariables,
    Pqr as GraphQLPqrType // Renombrar para evitar conflicto con la interfaz Pqr local
} from "@/generated/graphql";

// Función de transformación actualizada para mapear a la interfaz Pqr
const transformGraphQLToPqr = (graphqlData: GraphQLPqrType): Pqr => {
    return {
        id: graphqlData.id,
        typePqr: graphqlData.typePqr,
        title: graphqlData.title,
        description: graphqlData.description,
        argument: graphqlData.argument,
        answer: graphqlData.answer,
        state: graphqlData.state,
        userEmail: '', 
        userName: '',  
    };
};


interface PqrState extends GenericPaginatedState<Pqr> { 
    selectedItem: Pqr | null;
}

export const fetchPqrs = createAsyncThunk<NonNullable<GetAllPqrsQuery['allPqrs']>, GetAllPqrsQueryVariables
>(
    'pqr/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllPqrsQuery, GetAllPqrsQueryVariables>({
            query: GET_ALL_PQRS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allPqrs) {
            throw new Error('No PQRs data received');
        }
        return data.allPqrs;
    }
);

export const fetchPqrById = createAsyncThunk<NonNullable<GetPqrByIdQuery['pqrById']>, GetPqrByIdQueryVariables
>(
    'pqr/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetPqrByIdQuery, GetPqrByIdQueryVariables>({
            query: GET_PQR_BY_ID,
            variables: { id },
        });
        if (!data.pqrById) {
            throw new Error(`PQR with ID ${id} not found`);
        }
        return data.pqrById;
    }
);

export const addPqr = createAsyncThunk<NonNullable<AddPqrMutation['addPqr']>, AddPqrMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'pqr/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddPqrMutation, AddPqrMutationVariables>({
                mutation: ADD_PQR,
                variables: { input }
            });
            const res = data?.addPqr;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add PQR';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updatePqr = createAsyncThunk<
    NonNullable<UpdatePqrMutation['updatePqr']>,
    UpdatePqrMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'pqr/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdatePqrMutation, UpdatePqrMutationVariables>({
                mutation: UPDATE_PQR,
                variables: { id, input },
            });
            const res = data?.updatePqr;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update PQR';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deletePqr = createAsyncThunk<
    string, 
    string, 
    { rejectValue: RejectedPayload }
>(
    'pqr/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeletePqrMutation, DeletePqrMutationVariables>({
                mutation: DELETE_PQR,
                variables: { id },
            });
            const res = data?.deletePqr;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id; // Devolver el ID de la PQR eliminada
        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete PQR';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: PqrState = {
    ...createInitialPaginatedState<Pqr>(), // Usar Pqr en lugar de PqrItem
    selectedItem: null,
};

const pqrSlice = createSlice({
    name: 'pqr',
    initialState,
    reducers: {
        clearPqrError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPqrs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPqrs.fulfilled, (state, action: PayloadAction<NonNullable<GetAllPqrsQuery['allPqrs']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToPqr);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchPqrs.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching PQRs' };
                state.data = [];
            })

            .addCase(fetchPqrById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchPqrById.fulfilled, (state, action: PayloadAction<NonNullable<GetPqrByIdQuery['pqrById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToPqr(action.payload.data); // Usar la función de transformación actualizada
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchPqrById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching PQR by ID' };
                state.selectedItem = null;
            })

            .addCase(addPqr.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPqr.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addPqr.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding PQR' };
            })

            .addCase(updatePqr.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePqr.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePqr.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating PQR' };
            })

            .addCase(deletePqr.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePqr.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePqr.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting PQR' };
            });
    }
});


export const { clearPqrError, clearSelectedItem } = pqrSlice.actions;
export default pqrSlice.reducer;
