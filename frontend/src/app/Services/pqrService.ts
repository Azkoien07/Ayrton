import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { PaginationParams } from '@/app/Types/pagination';
import { GET_ALL_PQRS, GET_PQR_BY_ID, ADD_PQR, UPDATE_PQR, DELETE_PQR } from '@/app/Graphql/Pqrs/pqrsGraph';
import {
    PqrInput,
    PqrUpdateInput,
    GetAllPqrsQuery,
    GetAllPqrsQueryVariables,
    GetPqrByIdQuery,
    GetPqrByIdQueryVariables,
    AddPqrMutation,
    AddPqrMutationVariables,
    UpdatePqrMutation,
    UpdatePqrMutationVariables,
    DeletePqrMutation,
    DeletePqrMutationVariables
} from '@/generated/graphql';


export const getAllPqrs = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllPqrsQuery, GetAllPqrsQueryVariables>({
        query: GET_ALL_PQRS,
        variables: { page, size },
        fetchPolicy: "network-only"
    });
    return data.allPqrs;
};

export const getPqrById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetPqrByIdQuery, GetPqrByIdQueryVariables>({
        query: GET_PQR_BY_ID,
        variables: { id },
        fetchPolicy: "network-only"
    });
    return data.pqrById;
};

export const addPqr = async (client: ApolloClient<NormalizedCacheObject>, input: PqrInput) => {
    const { data } = await client.mutate<AddPqrMutation, AddPqrMutationVariables>({
        mutation: ADD_PQR,
        variables: { input }
    });

    if (!data?.addPqr) {
        throw new Error("Failed to add PQR");
    }

    return data.addPqr;
};

export const updatePqr = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: PqrUpdateInput) => {
    const { data } = await client.mutate<UpdatePqrMutation, UpdatePqrMutationVariables>({
        mutation: UPDATE_PQR,
        variables: { id, input }
    });

    if (!data?.updatePqr) {
        throw new Error("Failed to update PQR");
    }

    return data.updatePqr;
};

export const deletePqr = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeletePqrMutation, DeletePqrMutationVariables>({
        mutation: DELETE_PQR,
        variables: { id }
    });

    if (!data?.deletePqr) {
        throw new Error("Failed to delete PQR");
    }

    return data.deletePqr;
};
