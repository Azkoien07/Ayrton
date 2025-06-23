import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RankingItem } from '@Types/slices/ranking';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_RANKINGS, GET_RANKING_BY_ID, ADD_RANKING, UPDATE_RANKING, DELETE_RANKING } from '@graphql/Rankings/rankingsGraph';
import {
    GetAllRankingsQuery,
    GetAllRankingsQueryVariables,
    GetRankingByIdQuery,
    GetRankingByIdQueryVariables,
    AddRankingMutation,
    AddRankingMutationVariables,
    UpdateRankingMutation,
    UpdateRankingMutationVariables,
    DeleteRankingMutation,
    DeleteRankingMutationVariables,
    Ranking as GraphQLRankingType
} from "@/generated/graphql";

const transformGraphQLToRankingItem = (graphqlData: GraphQLRankingType): RankingItem => {
    return {
        id: graphqlData.id,
        level: graphqlData.level,
        position: graphqlData.position
    };
};

interface RankingState extends GenericPaginatedState<RankingItem> {
    selectedItem: RankingItem | null;
}

export const fetchRankings = createAsyncThunk<NonNullable<GetAllRankingsQuery['allRankings']>, GetAllRankingsQueryVariables
>(
    'ranking/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllRankingsQuery, GetAllRankingsQueryVariables>({
            query: GET_ALL_RANKINGS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allRankings) {
            throw new Error('No rankings data received');
        }
        return data.allRankings;
    }
);

export const fetchRankingById = createAsyncThunk<NonNullable<GetRankingByIdQuery['rankingById']>, GetRankingByIdQueryVariables
>(
    'ranking/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetRankingByIdQuery, GetRankingByIdQueryVariables>({
            query: GET_RANKING_BY_ID,
            variables: { id },
        });
        if (!data.rankingById) {
            throw new Error(`Ranking with ID ${id} not found`);
        }
        return data.rankingById;
    }
);

export const addRanking = createAsyncThunk<NonNullable<AddRankingMutation['addRanking']>, AddRankingMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'ranking/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddRankingMutation, AddRankingMutationVariables>({
                mutation: ADD_RANKING,
                variables: { input }
            });
            const res = data?.addRanking;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add ranking';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateRanking = createAsyncThunk<
    NonNullable<UpdateRankingMutation['updateRanking']>,
    UpdateRankingMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'ranking/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateRankingMutation, UpdateRankingMutationVariables>({
                mutation: UPDATE_RANKING,
                variables: { id, input },
            });
            const res = data?.updateRanking;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update ranking';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteRanking = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'ranking/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteRankingMutation, DeleteRankingMutationVariables>({
                mutation: DELETE_RANKING,
                variables: { id },
            });
            const res = data?.deleteRanking;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete ranking';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: RankingState = {
    ...createInitialPaginatedState<RankingItem>(),
    selectedItem: null,
};

const rankingSlice = createSlice({
    name: 'ranking',
    initialState,
    reducers: {
        clearRankingError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRankings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRankings.fulfilled, (state, action: PayloadAction<NonNullable<GetAllRankingsQuery['allRankings']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToRankingItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchRankings.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching rankings' };
                state.data = [];
            })

            .addCase(fetchRankingById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchRankingById.fulfilled, (state, action: PayloadAction<NonNullable<GetRankingByIdQuery['rankingById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToRankingItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchRankingById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching ranking by ID' };
                state.selectedItem = null;
            })

            .addCase(addRanking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRanking.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addRanking.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding ranking' };
            })

            .addCase(updateRanking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRanking.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateRanking.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating ranking' };
            })

            .addCase(deleteRanking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRanking.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteRanking.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting ranking' };
            });
    }
});


export const { clearRankingError, clearSelectedItem } = rankingSlice.actions;
export default rankingSlice.reducer;
