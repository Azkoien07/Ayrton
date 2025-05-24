// rankingService.ts
import { ApolloClient, NormalizedCache } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { RankingInput, RankingUpdateInput } from '@/generated/graphql';
import {
    GET_ALL_RANKINGS,
    GET_RANKING_BY_ID,
    ADD_RANKING,
    UPDATE_RANKING,
    DELETE_RANKING
} from '@graphql/Rankings/rankingsGraph';
import {
    GetRankingsQuery,
    GetRankingByIdQuery,
    AddRankingMutation,
    UpdateRankingMutation,
    DeleteRankingMutation
} from '@/generated/graphql';

export class RankingService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllRankings({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetRankingsQuery>({
            query: GET_ALL_RANKINGS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allRankings;
    }

    async getRankingById(id: string) {
        const { data } = await this.client.query<GetRankingByIdQuery>({
            query: GET_RANKING_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.rankingById;
    }

    async addRanking(input: RankingInput) {
        const { data } = await this.client.mutate<AddRankingMutation>({
            mutation: ADD_RANKING,
            variables: { input }
        });

        if (!data || !data.addRanking) {
            throw new Error("Failed to add ranking");
        }
        return data.addRanking;
    }

    async updateRanking(id: string, input: RankingUpdateInput) {
        const { data } = await this.client.mutate<UpdateRankingMutation>({
            mutation: UPDATE_RANKING,
            variables: { id, input }
        });

        if (!data || !data.updateRanking) {
            throw new Error("Failed to update ranking");
        }
        return data.updateRanking;
    }

    async deleteRanking(id: string) {
        const { data } = await this.client.mutate<DeleteRankingMutation>({
            mutation: DELETE_RANKING,
            variables: { id }
        });

        if (!data || !data.deleteRanking) {
            throw new Error("Failed to delete ranking");
        }
        return data.deleteRanking;
    }
}