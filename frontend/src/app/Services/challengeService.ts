/*
import { ApolloClient, NormalizedCache } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_CHALLENGES, GET_CHALLENGE_BY_ID, ADD_CHALLENGE, UPDATE_CHALLENGE, DELETE_CHALLENGE } from '@graphql/Challenges/challengeGraph';
import {
    ChallengeInput,
    ChallengeUpdateInput,
    GetAllChallengesQuery,
    GetAllChallengesQueryVariables,
    GetChallengeByIdQuery,
    GetChallengeByIdQueryVariables,
    AddChallengeMutation,
    AddChallengeMutationVariables,
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables,
    DeleteChallengeMutation,
    DeleteChallengeMutationVariables
} from "@/generated/graphql";


export const getAllChallenges = async (client: ApolloClient<NormalizedCache>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllChallengesQuery, GetAllChallengesQueryVariables>({
        query: GET_ALL_CHALLENGES,
        variables: { page, size },
        fetchPolicy: "network-only"
    });
    return data.allChallenges;
};

export const getChallengeById = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.query<GetChallengeByIdQuery, GetChallengeByIdQueryVariables>({
        query: GET_CHALLENGE_BY_ID,
        variables: { id },
        fetchPolicy: "network-only"
    });
    return data.challengeById;
};

export const addChallenge = async (client: ApolloClient<NormalizedCache>, input: ChallengeInput) => {
    const { data } = await client.mutate<AddChallengeMutation, AddChallengeMutationVariables>({
        mutation: ADD_CHALLENGE,
        variables: { input }
    });

    if (!data?.addChallenge) {
        throw new Error("Failed to add challenge");
    }

    return data.addChallenge;
};

export const updateChallenge = async (client: ApolloClient<NormalizedCache>, id: string, input: ChallengeUpdateInput) => {
    const { data } = await client.mutate<UpdateChallengeMutation, UpdateChallengeMutationVariables>({
        mutation: UPDATE_CHALLENGE,
        variables: { id, input }
    });

    if (!data?.updateChallenge) {
        throw new Error("Failed to update challenge");
    }

    return data.updateChallenge;
};

export const deleteChallenge = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.mutate<DeleteChallengeMutation, DeleteChallengeMutationVariables>({
        mutation: DELETE_CHALLENGE,
        variables: { id }
    });

    if (!data?.deleteChallenge) {
        throw new Error("Failed to delete challenge");
    }

    return data.deleteChallenge;
};
*/