/*
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { GET_ALL_TASKS, GET_TASK_BY_ID, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '@graphql/Tasks/tasksGraph';
import {
    TaskInput,
    TaskUpdateInput,
    GetAllTasksQuery,
    GetAllTasksQueryVariables,
    GetTaskByIdQuery,
    GetTaskByIdQueryVariables,
    AddTaskMutation,
    AddTaskMutationVariables,
    UpdateTaskMutation,
    UpdateTaskMutationVariables,
    DeleteTaskMutation,
    DeleteTaskMutationVariables
} from '@/generated/graphql';

export const getAllTasks = async (client: ApolloClient<NormalizedCacheObject>, { page, size }: PaginationParams) => {
    const { data } = await client.query<GetAllTasksQuery, GetAllTasksQueryVariables>({
        query: GET_ALL_TASKS,
        variables: { page, size },
        fetchPolicy: 'network-only'
    });

    return data.allTasks;
};

export const getTaskById = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.query<GetTaskByIdQuery, GetTaskByIdQueryVariables>({
        query: GET_TASK_BY_ID,
        variables: { id },
        fetchPolicy: 'network-only'
    });

    return data.taskById;
};

export const addTask = async (client: ApolloClient<NormalizedCacheObject>, input: TaskInput) => {
    const { data } = await client.mutate<AddTaskMutation, AddTaskMutationVariables>({
        mutation: ADD_TASK,
        variables: { input }
    });

    if (!data?.addTask) {
        throw new Error('Failed to add task');
    }

    return data.addTask;
};

export const updateTask = async (client: ApolloClient<NormalizedCacheObject>, id: string, input: TaskUpdateInput) => {
    const { data } = await client.mutate<UpdateTaskMutation, UpdateTaskMutationVariables>({
        mutation: UPDATE_TASK,
        variables: { id, input }
    });

    if (!data?.updateTask) {
        throw new Error('Failed to update task');
    }

    return data.updateTask;
};

export const deleteTask = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
    const { data } = await client.mutate<DeleteTaskMutation, DeleteTaskMutationVariables>({
        mutation: DELETE_TASK,
        variables: { id }
    });

    if (!data?.deleteTask) {
        throw new Error('Failed to delete task');
    }

    return data.deleteTask;
};
*/