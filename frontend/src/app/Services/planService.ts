import { ApolloClient, NormalizedCache } from "@apollo/client";
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_PLANS, GET_PLAN_BY_ID, ADD_PLAN, UPDATE_PLAN, DELETE_PLAN } from '@graphql/Plans/plansGraph';
import {
    GetAllPlansQuery,
    GetAllPlansQueryVariables,
    GetPlanByIdQuery,
    GetPlanByIdQueryVariables,
    AddPlanMutation,
    AddPlanMutationVariables,
    UpdatePlanMutation,
    UpdatePlanMutationVariables,
    DeletePlanMutation,
    DeletePlanMutationVariables,
    PlanInput,
    PlanUpdateInput
} from '@/generated/graphql';



export const getAllPlans = async (client: ApolloClient<NormalizedCache>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllPlansQuery, GetAllPlansQueryVariables>({
        query: GET_ALL_PLANS,
        variables: { page, size },
        fetchPolicy: "network-only"
    });
    return data.allPlans;
};

export const getPlanById = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.query<GetPlanByIdQuery, GetPlanByIdQueryVariables>({
        query: GET_PLAN_BY_ID,
        variables: { id },
        fetchPolicy: "network-only"
    });
    return data.planById;
};

export const addPlan = async (client: ApolloClient<NormalizedCache>, input: PlanInput) => {
    const { data } = await client.mutate<AddPlanMutation, AddPlanMutationVariables>({
        mutation: ADD_PLAN,
        variables: { input }
    });

    if (!data?.addPlan) {
        throw new Error("Failed to add plan");
    }

    return data.addPlan;
};

export const updatePlan = async (client: ApolloClient<NormalizedCache>, id: string, input: PlanUpdateInput) => {
    const { data } = await client.mutate<UpdatePlanMutation, UpdatePlanMutationVariables>({
        mutation: UPDATE_PLAN,
        variables: { id, input }
    });

    if (!data?.updatePlan) {
        throw new Error("Failed to update plan");
    }

    return data.updatePlan;
};

export const deletePlan = async (client: ApolloClient<NormalizedCache>, id: string) => {
    const { data } = await client.mutate<DeletePlanMutation, DeletePlanMutationVariables>({
        mutation: DELETE_PLAN,
        variables: { id }
    });

    if (!data?.deletePlan) {
        throw new Error("Failed to delete plan");
    }

    return data.deletePlan;
};