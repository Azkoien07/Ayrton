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

export class PqrService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllPqrs({ page, size }: PaginationParams) {
            const { data } = await this.client.query({
                query: GET_ALL_PQRS,
                variables: { page, size },
                fetchPolicy: "network-only"
            });
            return data.allPqrs;
        }
    
        async getRankingById(id: string) {
            const { data } = await this.client.query({
                query: GET_PQR_BY_ID,
                variables: { id },
                fetchPolicy: "network-only"
            });
            return data.PqrById;
        }
    
        async addRanking(input: PqrInput) {
            const { data } = await this.client.mutate({
                mutation: ADD_PQR,
                variables: { input }
            });
            return data.addPqr;
        }
    
        async updateRanking(id: string, input: PqrUpdateInput) {
            const { data } = await this.client.mutate({
                mutation: UPDATE_PQR,
                variables: { id, input }
            });
            return data.updatePqr;
        }
    
        async deleteRanking(id: string) {
            const { data } = await this.client.mutate({
                mutation: DELETE_PQR,
                variables: { id }
            });
            return data.deletePqr;
        }
}