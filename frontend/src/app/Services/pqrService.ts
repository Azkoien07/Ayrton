// pqrService.ts
import { ApolloClient, NormalizedCache } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { PqrInput, PqrUpdateInput } from "@/generated/graphql";
import {
    GET_ALL_PQRS,
    GET_PQR_BY_ID,
    ADD_PQR,
    UPDATE_PQR,
    DELETE_PQR
} from '@graphql/Pqrs/pqrsGraph';
import {
    GetPqrsQuery,
    GetPqrByIdQuery,
    AddPqrMutation,
    UpdatePqrMutation,
    DeletePqrMutation
} from '@/generated/graphql';

export class PqrService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllPqrs({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetPqrsQuery>({
            query: GET_ALL_PQRS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allPqrs;
    }

    async getPqrById(id: string) {
        const { data } = await this.client.query<GetPqrByIdQuery>({
            query: GET_PQR_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.pqrById;
    }

    async addRanking(input: PqrInput) {
        const { data } = await this.client.mutate<AddPqrMutation>({
            mutation: ADD_PQR,
            variables: { input }
        });

        if (!data || !data.addPqr) {
            throw new Error("Failed to add PQR");
        }
        return data.addPqr;
    }

    async updatePqr(id: string, input: PqrUpdateInput) {
        const { data } = await this.client.mutate<UpdatePqrMutation>({
            mutation: UPDATE_PQR,
            variables: { id, input }
        });

        if (!data || !data.updatePqr) {
            throw new Error("Failed to update PQR");
        }
        return data.updatePqr;
    }

    async deletePqr(id: string) {
        const { data } = await this.client.mutate<DeletePqrMutation>({
            mutation: DELETE_PQR,
            variables: { id }
        });

        if (!data || !data.deletePqr) {
            throw new Error("Failed to delete PQR");
        }
        return data.deletePqr;
    }
}