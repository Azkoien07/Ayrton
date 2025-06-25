import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleItem } from '@Types/slices/role';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_ROLES, GET_ROLE_BY_ID, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE } from '@graphql/Roles/rolesGraph';
import {
    GetAllRolesQuery,
    GetAllRolesQueryVariables,
    GetRoleByIdQuery,
    GetRoleByIdQueryVariables,
    AddRoleMutation,
    AddRoleMutationVariables,
    UpdateRoleMutation,
    UpdateRoleMutationVariables,
    DeleteRoleMutation,
    DeleteRoleMutationVariables,
    Role as GraphQLRoleType
} from "@/generated/graphql";

const transformGraphQLToRoleItem = (graphqlData: GraphQLRoleType): RoleItem => {
    return {
        id: graphqlData.id,
        name: graphqlData.name,
        accessLevel: graphqlData.accessLevel
    };
};

interface RoleState extends GenericPaginatedState<RoleItem> {
    selectedItem: RoleItem | null;
}

export const fetchRoles = createAsyncThunk<NonNullable<GetAllRolesQuery['allRoles']>, GetAllRolesQueryVariables
>(
    'role/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllRolesQuery, GetAllRolesQueryVariables>({
            query: GET_ALL_ROLES,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allRoles) {
            throw new Error('No roles data received');
        }
        return data.allRoles;
    }
);

export const fetchRoleById = createAsyncThunk<NonNullable<GetRoleByIdQuery['roleById']>, GetRoleByIdQueryVariables
>(
    'role/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetRoleByIdQuery, GetRoleByIdQueryVariables>({
            query: GET_ROLE_BY_ID,
            variables: { id },
        });
        if (!data.roleById) {
            throw new Error(`Role with ID ${id} not found`);
        }
        return data.roleById;
    }
);

export const addRole = createAsyncThunk<NonNullable<AddRoleMutation['addRole']>, AddRoleMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'role/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddRoleMutation, AddRoleMutationVariables>({
                mutation: ADD_ROLE,
                variables: { input }
            });
            const res = data?.addRole;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add role';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateRole = createAsyncThunk<
    NonNullable<UpdateRoleMutation['updateRole']>,
    UpdateRoleMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'role/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateRoleMutation, UpdateRoleMutationVariables>({
                mutation: UPDATE_ROLE,
                variables: { id, input },
            });
            const res = data?.updateRole;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update role';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteRole = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'role/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteRoleMutation, DeleteRoleMutationVariables>({
                mutation: DELETE_ROLE,
                variables: { id },
            });
            const res = data?.deleteRole;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete role';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: RoleState = {
    ...createInitialPaginatedState<RoleItem>(),
    selectedItem: null,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        clearRoleError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<NonNullable<GetAllRolesQuery['allRoles']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToRoleItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching roles' };
                state.data = [];
            })

            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchRoleById.fulfilled, (state, action: PayloadAction<NonNullable<GetRoleByIdQuery['roleById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToRoleItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching role by ID' };
                state.selectedItem = null;
            })

            .addCase(addRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRole.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addRole.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding role' };
            })

            .addCase(updateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating role' };
            })

            .addCase(deleteRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRole.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting role' };
            });
    }
});


export const { } = roleSlice.actions;
export default roleSlice.reducer;
