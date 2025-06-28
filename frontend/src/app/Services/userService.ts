/*
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_USERS, GET_USER_BY_ID, ADD_USER, UPDATE_USER, DELETE_USER } from '@graphql/Users/usersGraph';
import {
    UserInput,
    UserUpdateInput,
    GetAllUsersQuery,
    GetAllUsersQueryVariables,
    GetUserByIdQuery,
    GetUserByIdQueryVariables,
    AddUserMutation,
    AddUserMutationVariables,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    DeleteUserMutation,
    DeleteUserMutationVariables
} from '@/generated/graphql';


export const getAllUsers = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllUsersQuery, GetAllUsersQueryVariables>({
        query: GET_ALL_USERS,
        variables: { page, size },
        fetchPolicy: 'network-only'
    });

    return data.allUsers;
};

export const getUserById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetUserByIdQuery, GetUserByIdQueryVariables>({
        query: GET_USER_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only'
    });

    return data.userById;
};

export const addUser = async (client: ApolloClient<NormalizedCacheObject>, input: UserInput) => {
    const { data } = await client.mutate<AddUserMutation, AddUserMutationVariables>({
        mutation: ADD_USER,
        variables: { input }
    });

    if (!data?.addUser) {
        throw new Error('Failed to add user');
    }

    return data.addUser;
};

export const updateUser = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: UserUpdateInput) => {
    const { data } = await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
        mutation: UPDATE_USER,
        variables: { id, input }
    });

    if (!data?.updateUser) {
        throw new Error('Failed to update user');
    }

    return data.updateUser;
};

export const deleteUser = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeleteUserMutation, DeleteUserMutationVariables>({
        mutation: DELETE_USER,
        variables: { id }
    });

    if (!data?.deleteUser) {
        throw new Error('Failed to delete user');
    }

    return data.deleteUser;
};
*/