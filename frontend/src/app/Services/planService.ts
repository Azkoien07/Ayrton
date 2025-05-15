import { ApolloClient, NormalizedCache } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { PlanInput, PlanUpdateInput } from "@/generated/graphql";
import {
    GET_ALL_PLANS,
    GET_PLAN_BY_ID,
    ADD_PLAN,
    UPDATE_PLAN,
    DELETE_PLAN
} from '@graphql/Plans/plansGraph';

export class PlanService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllPlans({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_PLANS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allPlans;
    }

    async getPlanById(id: string) {
        const { data } = await this.client.query({
            query: GET_PLAN_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.planById;
    }

    async addPlan(input: PlanInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_PLAN,
            variables: { input }
        });
        return data.addPlan;
    }

    async updatePlan(id: string, input: PlanUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_PLAN,
            variables: { id, input }
        });
        return data.updatePlan;
    }

    async deletePlan(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_PLAN,
            variables: { id }
        });
        return data.deletePlan;
    }
}