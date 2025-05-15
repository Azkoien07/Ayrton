// userService.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import {
    GET_ALL_USERS,
    GET_USER_BY_ID,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER
} from '@graphql/Users/usersGraph';


interface UserInput {
    name: string;
    email: string;
    password: string;
    username: string;
}

interface UserUpdateInput extends Partial<UserInput> { }

export class UserService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllUsers({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_USERS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allUsers;
    }

    async getUserById(id: string) {
        const { data } = await this.client.query({
            query: GET_USER_BY_ID,
            variables: { id }
        });
        return data.userById;
    }

    async addUser(input: UserInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_USER,
            variables: { input }
        });
        return data.addUser;
    }

    async updateUser(id: string, input: UserUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_USER,
            variables: { id, input }
        });
        return data.updateUser;
    }

    async deleteUser(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_USER,
            variables: { id }
        });
        return data.deleteUser;
    }
}