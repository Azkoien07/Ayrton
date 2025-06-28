/*
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_ROLES, GET_ROLE_BY_ID, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE } from '@graphql/Roles/rolesGraph';
import {
    RoleInput,
    RoleUpdateInput,
    GetAllRolesQuery,
    GetAllRolesQueryVariables,
    GetRoleByIdQuery,
    GetRoleByIdQueryVariables,
    AddRoleMutation,
    AddRoleMutationVariables,
    UpdateRoleMutation,
    UpdateRoleMutationVariables,
    DeleteRoleMutation,
    DeleteRoleMutationVariables
} from '@/generated/graphql';


export const getAllRoles = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllRolesQuery, GetAllRolesQueryVariables>({
        query: GET_ALL_ROLES,
        variables: { page, size },
        fetchPolicy: 'network-only'
    });

    return data.allRoles;
};

export const getRoleById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetRoleByIdQuery, GetRoleByIdQueryVariables>({
        query: GET_ROLE_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only'
    });

    return data.roleById;
};

export const addRole = async (client: ApolloClient<NormalizedCacheObject>, input: RoleInput) => {
    const { data } = await client.mutate<AddRoleMutation, AddRoleMutationVariables>({
        mutation: ADD_ROLE,
        variables: { input }
    });

    if (!data?.addRole) {
        throw new Error('Failed to add role');
    }

    return data.addRole;
};

export const updateRole = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: RoleUpdateInput) => {
    const { data } = await client.mutate<UpdateRoleMutation, UpdateRoleMutationVariables>({
        mutation: UPDATE_ROLE,
        variables: { id, input }
    });

    if (!data?.updateRole) {
        throw new Error('Failed to update role');
    }

    return data.updateRole;
};

export const deleteRole = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeleteRoleMutation, DeleteRoleMutationVariables>({
        mutation: DELETE_ROLE,
        variables: { id }
    });

    if (!data?.deleteRole) {
        throw new Error('Failed to delete role');
    }

    return data.deleteRole;
};
*/