// challengeService.ts
import { ApolloClient, NormalizedCache } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { ChallengeInput, ChallengeUpdateInput } from "@/generated/graphql";
import {
    GET_ALL_CHALLENGES,
    GET_CHALLENGE_BY_ID,
    ADD_CHALLENGE,
    UPDATE_CHALLENGE,
    DELETE_CHALLENGE
} from '@graphql/Challenges/challengeGraph';
import {
    GetChallengesQuery,
    GetChallengeByIdQuery,
    AddChallengeMutation,
    UpdateChallengeMutation,
    DeleteChallengeMutation
} from '@/generated/graphql';
export class ChallengeService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllChallenges({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetChallengesQuery>({
            query: GET_ALL_CHALLENGES,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allChallenges;
    }

    async getChallengeById(id: string) {
        const { data } = await this.client.query<GetChallengeByIdQuery>({
            query: GET_CHALLENGE_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.challengeById;
    }

    async addChallenge(input: ChallengeInput) {
        const { data } = await this.client.mutate<AddChallengeMutation>({
            mutation: ADD_CHALLENGE,
            variables: { input }
        });

        if (!data || !data.addChallenge) {
            throw new Error("Failed to add challenge");
        }
        return data.addChallenge;
    }

    async updateChallenge(id: string, input: ChallengeUpdateInput) {
        const { data } = await this.client.mutate<UpdateChallengeMutation>({
            mutation: UPDATE_CHALLENGE,
            variables: { id, input }
        });

        if (!data || !data.updateChallenge) {
            throw new Error("Failed to update challenge");
        }
        return data.updateChallenge;
    }

    async deleteChallenge(id: string) {
        const { data } = await this.client.mutate<DeleteChallengeMutation>({
            mutation: DELETE_CHALLENGE,
            variables: { id }
        });

        if (!data || !data.deleteChallenge) {
            throw new Error("Failed to delete challenge");
        }
        return data.deleteChallenge;
    }
}