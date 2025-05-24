// userService.ts
import { ApolloClient, from, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { UserInput, UserUpdateInput } from '@/generated/graphql';
import {
    GET_ALL_USERS,
    GET_USER_BY_ID,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER
} from '@graphql/Users/usersGraph';
import {
    GetUsersQuery,
    GetUserByIdQuery,
    AddUserMutation,
    UpdateUserMutation,
    DeleteUserMutation
} from '@/generated/graphql';
export class UserService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllUsers({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetUsersQuery>({
            query: GET_ALL_USERS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allUsers;
    }

    async getUserById(id: string) {
        const { data } = await this.client.query<GetUserByIdQuery>({
            query: GET_USER_BY_ID,
            variables: { id }
        });
        return data.userById;
    }

    async addUser(input: UserInput) {
        const { data } = await this.client.mutate<AddUserMutation>({
            mutation: ADD_USER,
            variables: { input }
        });

        if (!data || !data.addUser) {
            throw new Error("Failed to add user");
        }
        return data.addUser;
    }

    async updateUser(id: string, input: UserUpdateInput) {
        const { data } = await this.client.mutate<UpdateUserMutation>({
            mutation: UPDATE_USER,
            variables: { id, input }
        });

        if (!data || !data.updateUser) {
            throw new Error("Failed to update user");
        }
        return data.updateUser;
    }

    async deleteUser(id: string) {
        const { data } = await this.client.mutate<DeleteUserMutation>({
            mutation: DELETE_USER,
            variables: { id }
        });

        if (!data || !data.deleteUser) {
            throw new Error("Failed to delete user");
        }
        return data.deleteUser;
    }
}