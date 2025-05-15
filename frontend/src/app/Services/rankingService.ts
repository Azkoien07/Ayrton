import { ApolloClient, NormalizedCache } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import {
    GET_ALL_RANKINGS,
    GET_RANKING_BY_ID,
    ADD_RANKING,
    UPDATE_RANKING,
    DELETE_RANKING
} from '@graphql/Rankings/rankingsGraph';

import { RankingInput, RankingUpdateInput } from '@/generated/graphql';

export class RankingService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllRankings({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_RANKINGS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allRankings;
    }

    async getRankingById(id: string) {
        const { data } = await this.client.query({
            query: GET_RANKING_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.rankingById;
    }

    async addRanking(input: RankingInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_RANKING,
            variables: { input }
        });
        return data.addRanking;
    }

    async updateRanking(id: string, input: RankingUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_RANKING,
            variables: { id, input }
        });
        return data.updateRanking;
    }

    async deleteRanking(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_RANKING,
            variables: { id }
        });
        return data.deleteRanking;
    }
}