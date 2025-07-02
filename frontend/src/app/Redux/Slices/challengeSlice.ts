import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChallengeItem } from '@Types/slices/challenge';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_CHALLENGES, GET_CHALLENGE_BY_ID, ADD_CHALLENGE, UPDATE_CHALLENGE, DELETE_CHALLENGE } from '@graphql/Challenges/challengeGraph';
import {
    GetAllChallengesQuery,
    GetAllChallengesQueryVariables,
    GetChallengeByIdQuery,
    GetChallengeByIdQueryVariables,
    AddChallengeMutation,
    AddChallengeMutationVariables,
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables,
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables,
    Challenge as GraphQLChallengeType
} from "@/generated/graphql";

const transformGraphQLToChallengeItem = (graphqlData: GraphQLChallengeType): ChallengeItem => {
    return {
        id: graphqlData.id,
        name: graphqlData.name,
        description: graphqlData.description,
        category: graphqlData.category,
        state: graphqlData.state,
        dificulty: graphqlData.dificulty,
        points: graphqlData.points
    };
};

interface ChallengeState extends GenericPaginatedState<ChallengeItem> {
    selectedItem: ChallengeItem | null;
}

export const fetchChallenges = createAsyncThunk<NonNullable<GetAllChallengesQuery['allChallenges']>, GetAllChallengesQueryVariables
>(
    'challenge/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllChallengesQuery, GetAllChallengesQueryVariables>({
            query: GET_ALL_CHALLENGES,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allChallenges) {
            throw new Error('No challenges data received');
        }
        return data.allChallenges;
    }
);

export const fetchChallengeById = createAsyncThunk<NonNullable<GetChallengeByIdQuery['challengeById']>, GetChallengeByIdQueryVariables
>(
    'challenge/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>({
            query: GET_CHALLENGE_BY_ID,
            variables: { id },
        });
        if (!data.challengeById) {
            throw new Error(`Challenge with ID ${id} not found`);
        }
        return data.challengeById;
    }
);

export const addChallenge = createAsyncThunk<NonNullable<AddChallengeMutation['addChallenge']>, AddChallengeMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'challenge/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddChallengeMutation, AddChallengeMutationVariables>({
                mutation: ADD_CHALLENGE,
                variables: { input }
            });
            const res = data?.addChallenge;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add challenge';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateChallenge = createAsyncThunk<
    NonNullable<UpdateChallengeMutation['updateChallenge']>,
    UpdateChallengeMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'challenge/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateChallengeMutation, UpdateChallengeMutationVariables>({
                mutation: UPDATE_CHALLENGE,
                variables: { id, input },
            });
            const res = data?.updateChallenge;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update challenge';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteChallenge = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'challenge/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteChallengeMutation, DeleteChallengeMutationVariables>({
                mutation: DELETE_CHALLENGE,
                variables: { id },
            });
            const res = data?.deleteChallenge;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete challenge';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: ChallengeState = {
    ...createInitialPaginatedState<ChallengeItem>(),
    selectedItem: null,
};

const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        clearChallengeError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallenges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChallenges.fulfilled, (state, action: PayloadAction<NonNullable<GetAllChallengesQuery['allChallenges']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToChallengeItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchChallenges.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching challenges' };
                state.data = [];
            })

            .addCase(fetchChallengeById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchChallengeById.fulfilled, (state, action: PayloadAction<NonNullable<GetChallengeByIdQuery['challengeById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToChallengeItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchChallengeById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching challenge by ID' };
                state.selectedItem = null;
            })

            .addCase(addChallenge.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addChallenge.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addChallenge.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding challenge' };
            })

            .addCase(updateChallenge.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChallenge.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateChallenge.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating challenge' };
            })

            .addCase(deleteChallenge.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteChallenge.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteChallenge.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting challenge' };
            });
    }
});


export const { } = challengeSlice.actions;
export default challengeSlice.reducer;