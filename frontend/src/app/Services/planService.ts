// planService.ts
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
import {
    GetPlansQuery,
    GetPlanByIdQuery,
    AddPlanMutation,
    UpdatePlanMutation,
    DeletePlanMutation
} from '@/generated/graphql'

export class PlanService {
    constructor(private client: ApolloClient<NormalizedCache>) { }

    async getAllPlans({ page, size }: PaginationParams) {
        const { data } = await this.client.query<GetPlansQuery>({
            query: GET_ALL_PLANS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allPlans;
    }

    async getPlanById(id: string) {
        const { data } = await this.client.query<GetPlanByIdQuery>({
            query: GET_PLAN_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.planById;
    }

    async addPlan(input: PlanInput) {
        const { data } = await this.client.mutate<AddPlanMutation>({
            mutation: ADD_PLAN,
            variables: { input }
        });

        if (!data || !data.addPlan) {
            throw new Error("Failed to add plan");
        }
        return data.addPlan;
    }

    async updatePlan(id: string, input: PlanUpdateInput) {
        const { data } = await this.client.mutate<UpdatePlanMutation>({
            mutation: UPDATE_PLAN,
            variables: { id, input }
        });

        if (!data || !data.updatePlan) {
            throw new Error("Failed to update plan");
        }
        return data.updatePlan;
    }

    async deletePlan(id: string) {
        const { data } = await this.client.mutate<DeletePlanMutation>({
            mutation: DELETE_PLAN,
            variables: { id }
        });

        if (!data || !data.deletePlan) {
            throw new Error("Failed to delete plan");
        }
        return data.deletePlan;
    }
}