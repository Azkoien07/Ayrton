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

export class ChallengeService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllChallenges({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_CHALLENGES,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allChallenges;
    }

    async getChallengeById(id: string) {
        const { data } = await this.client.query({
            query: GET_CHALLENGE_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.challengeById;
    }

    async addChallenge(input: ChallengeInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_CHALLENGE,
            variables: { input }
        });
        return data.addChallenge;
    }

    async updateChallenge(id: string, input: ChallengeUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_CHALLENGE,
            variables: { id, input }
        });
        return data.updateChallenge;
    }

    async deleteChallenge(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_CHALLENGE,
            variables: { id }
        });
        return data.deleteChallenge;
    }
}