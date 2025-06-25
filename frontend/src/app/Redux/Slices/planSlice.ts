import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanItem } from '@Types/slices/plan';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_PLANS, GET_PLAN_BY_ID, ADD_PLAN, UPDATE_PLAN, DELETE_PLAN } from '@graphql/Plans/plansGraph';
import {
    GetAllPlansQuery,
    GetAllPlansQueryVariables,
    GetPlanByIdQuery,
    GetPlanByIdQueryVariables,
    AddPlanMutation,
    AddPlanMutationVariables,
    UpdatePlanMutation,
    UpdatePlanMutationVariables,
    DeletePlanMutation,
    DeletePlanMutationVariables,
    Plan as GraphQLPlanType
} from "@/generated/graphql";

const transformGraphQLToPlanItem = (graphqlData: GraphQLPlanType): PlanItem => {
    return {
        id: graphqlData.id,
        name: graphqlData.name,
        description: graphqlData.description,
        price: graphqlData.price,
        state: graphqlData.state,
        duration: graphqlData.duration,
    };
};

interface PlanState extends GenericPaginatedState<PlanItem> {
    selectedItem: PlanItem | null;
}

export const fetchPlans = createAsyncThunk<NonNullable<GetAllPlansQuery['allPlans']>, GetAllPlansQueryVariables
>(
    'plan/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllPlansQuery, GetAllPlansQueryVariables>({
            query: GET_ALL_PLANS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allPlans) {
            throw new Error('No plans data received');
        }
        return data.allPlans;
    }
);

export const fetchPlanById = createAsyncThunk<NonNullable<GetPlanByIdQuery['planById']>, GetPlanByIdQueryVariables
>(
    'plan/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetPlanByIdQuery, GetPlanByIdQueryVariables>({
            query: GET_PLAN_BY_ID,
            variables: { id },
        });
        if (!data.planById) {
            throw new Error(`Plan with ID ${id} not found`);
        }
        return data.planById;
    }
);

export const addPlan = createAsyncThunk<NonNullable<AddPlanMutation['addPlan']>, AddPlanMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'plan/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddPlanMutation, AddPlanMutationVariables>({
                mutation: ADD_PLAN,
                variables: { input }
            });
            const res = data?.addPlan;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add plan';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updatePlan = createAsyncThunk<
    NonNullable<UpdatePlanMutation['updatePlan']>,
    UpdatePlanMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'plan/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdatePlanMutation, UpdatePlanMutationVariables>({
                mutation: UPDATE_PLAN,
                variables: { id, input },
            });
            const res = data?.updatePlan;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update plan';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deletePlan = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'plan/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeletePlanMutation, DeletePlanMutationVariables>({
                mutation: DELETE_PLAN,
                variables: { id },
            });
            const res = data?.deletePlan;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete plan';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: PlanState = {
    ...createInitialPaginatedState<PlanItem>(),
    selectedItem: null,
};

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        clearPlanError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlans.fulfilled, (state, action: PayloadAction<NonNullable<GetAllPlansQuery['allPlans']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToPlanItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchPlans.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching plans' };
                state.data = [];
            })

            .addCase(fetchPlanById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchPlanById.fulfilled, (state, action: PayloadAction<NonNullable<GetPlanByIdQuery['planById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToPlanItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchPlanById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching plan by ID' };
                state.selectedItem = null;
            })

            .addCase(addPlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPlan.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addPlan.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding plan' };
            })

            .addCase(updatePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePlan.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updatePlan.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating plan' };
            })

            .addCase(deletePlan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePlan.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deletePlan.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting plan' };
            });
    }
});


export const { clearPlanError, clearSelectedItem } = planSlice.actions;
export default planSlice.reducer;
