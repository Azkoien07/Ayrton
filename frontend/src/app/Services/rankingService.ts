/*
import { ApolloClient, NormalizedCache } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_RANKINGS, GET_RANKING_BY_ID, ADD_RANKING, UPDATE_RANKING, DELETE_RANKING } from '@graphql/Rankings/rankingsGraph';
import {
    RankingInput,
    RankingUpdateInput,
    GetAllRankingsQuery,
    GetAllRankingsQueryVariables,
    GetRankingByIdQuery,
    GetRankingByIdQueryVariables,
    AddRankingMutation,
    AddRankingMutationVariables,
    UpdateRankingMutation,
    UpdateRankingMutationVariables,
    DeleteRankingMutation,
    DeleteRankingMutationVariables
} from '@/generated/graphql';


export const getAllRankings = async (client: ApolloClient<NormalizedCache>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllRankingsQuery, GetAllRankingsQueryVariables>({
        query: GET_ALL_RANKINGS,
        variables: { page, size },
        fetchPolicy: 'network-only'
    });

    return data.allRankings;
};

export const getRankingById = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.query<GetRankingByIdQuery, GetRankingByIdQueryVariables>({
        query: GET_RANKING_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only'
    });

    return data.rankingById;
};

export const addRanking = async (client: ApolloClient<NormalizedCache>, input: RankingInput) => {
    const { data } = await client.mutate<AddRankingMutation, AddRankingMutationVariables>({
        mutation: ADD_RANKING,
        variables: { input }
    });

    if (!data?.addRanking) {
        throw new Error('Failed to add ranking');
    }

    return data.addRanking;
};

export const updateRanking = async (client: ApolloClient<NormalizedCache>, id: string, input: RankingUpdateInput) => {
    const { data } = await client.mutate<UpdateRankingMutation, UpdateRankingMutationVariables>({
        mutation: UPDATE_RANKING,
        variables: { id, input }
    });

    if (!data?.updateRanking) {
        throw new Error('Failed to update ranking');
    }

    return data.updateRanking;
};

export const deleteRanking = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.mutate<DeleteRankingMutation, DeleteRankingMutationVariables>({
        mutation: DELETE_RANKING,
        variables: { id }
    });

    if (!data?.deleteRanking) {
        throw new Error('Failed to delete ranking');
    }

    return data.deleteRanking;
};
*/