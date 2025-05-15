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

export class RoleService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllRoles({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_ROLES,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allRoles;
    }

    async getRoleById(id: string) {
        const { data } = await this.client.query({
            query: GET_ROLE_BY_ID,
            variables: { id }
        });
        return data.roleById;
    }

    async addRole(input: RoleInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_ROLE,
            variables: { input }
        });
        return data.addRole;
    }

    async updateRole(id: string, input: RoleUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_ROLE,
            variables: { id, input }
        });
        return data.updateRole;
    }

    async deleteRole(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_ROLE,
            variables: { id }
        });
        return data.deleteRole;
    }
}