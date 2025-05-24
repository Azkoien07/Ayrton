// roleService.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { RoleInput, RoleUpdateInput } from '@/generated/graphql';
import {
    GET_ALL_ROLES,
    GET_ROLE_BY_ID,
    ADD_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE
} from '@graphql/Roles/rolesGraph';
import {
    GetRolesQuery,
    GetRoleByIdQuery,
    AddRoleMutation,
    UpdateRoleMutation,
    DeleteRoleMutation
} from '@/generated/graphql';
export class RoleService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllRoles({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetRolesQuery>({
            query: GET_ALL_ROLES,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allRoles;
    }

    async getRoleById(id: string) {
        const { data } = await this.client.query<GetRoleByIdQuery>({
            query: GET_ROLE_BY_ID,
            variables: { id }
        });
        return data.roleById;
    }

    async addRole(input: RoleInput) {
        const { data } = await this.client.mutate<AddRoleMutation>({
            mutation: ADD_ROLE,
            variables: { input }
        });

        if (!data || !data.addRole) {
            throw new Error("Failed to add role");
        }
        return data.addRole;
    }

    async updateRole(id: string, input: RoleUpdateInput) {
        const { data } = await this.client.mutate<UpdateRoleMutation>({
            mutation: UPDATE_ROLE,
            variables: { id, input }
        });

        if (!data || !data.updateRole) {
            throw new Error("Failed to update role");
        }
        return data.updateRole;
    }

    async deleteRole(id: string) {
        const { data } = await this.client.mutate<DeleteRoleMutation>({
            mutation: DELETE_ROLE,
            variables: { id }
        });

        if (!data || !data.deleteRole) {
            throw new Error("Failed to delete role");
        }
        return data.deleteRole;
    }
}