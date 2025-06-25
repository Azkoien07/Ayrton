import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserItem } from '@Types/slices/user';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_USERS, GET_USER_BY_ID, ADD_USER, UPDATE_USER, DELETE_USER } from '@graphql/Users/usersGraph';
import {
    GetAllUsersQuery,
    GetAllUsersQueryVariables,
    GetUserByIdQuery,
    GetUserByIdQueryVariables,
    AddUserMutation,
    AddUserMutationVariables,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    DeleteUserMutation,
    DeleteUserMutationVariables,
    User as GraphQLUserType
} from "@/generated/graphql";

const transformGraphQLToUserItem = (graphqlData: GraphQLUserType): UserItem => {
    return {
        id: graphqlData.id,
        name: graphqlData.name,
        email: graphqlData.email,
        password: graphqlData.password,
        username: graphqlData.username
    };
};

interface UserState extends GenericPaginatedState<UserItem> {
    selectedItem: UserItem | null;
}

export const fetchUsers = createAsyncThunk<NonNullable<GetAllUsersQuery['allUsers']>, GetAllUsersQueryVariables
>(
    'user/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllUsersQuery, GetAllUsersQueryVariables>({
            query: GET_ALL_USERS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allUsers) {
            throw new Error('No users data received');
        }
        return data.allUsers;
    }
);

export const fetchUserById = createAsyncThunk<NonNullable<GetUserByIdQuery['userById']>, GetUserByIdQueryVariables
>(
    'user/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetUserByIdQuery, GetUserByIdQueryVariables>({
            query: GET_USER_BY_ID,
            variables: { id },
        });
        if (!data.userById) {
            throw new Error(`User with ID ${id} not found`);
        }
        return data.userById;
    }
);

export const addUser = createAsyncThunk<NonNullable<AddUserMutation['addUser']>, AddUserMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'user/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddUserMutation, AddUserMutationVariables>({
                mutation: ADD_USER,
                variables: { input }
            });
            const res = data?.addUser;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add user';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateUser = createAsyncThunk<
    NonNullable<UpdateUserMutation['updateUser']>,
    UpdateUserMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'user/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
                mutation: UPDATE_USER,
                variables: { id, input },
            });
            const res = data?.updateUser;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update user';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteUser = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'user/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteUserMutation, DeleteUserMutationVariables>({
                mutation: DELETE_USER,
                variables: { id },
            });
            const res = data?.deleteUser;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete user';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: UserState = {
    ...createInitialPaginatedState<UserItem>(),
    selectedItem: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<NonNullable<GetAllUsersQuery['allUsers']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToUserItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching users' };
                state.data = [];
            })

            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<NonNullable<GetUserByIdQuery['userById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToUserItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching user by ID' };
                state.selectedItem = null;
            })

            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding user' };
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating user' };
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting user' };
            });
    }
});


export const { clearUserError, clearSelectedItem } = userSlice.actions;
export default userSlice.reducer;