// taskService.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { TaskInput, TaskUpdateInput } from '@/generated/graphql';
import {
    GET_ALL_TASKS,
    GET_TASK_BY_ID,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from '@graphql/Tasks/tasksGraph';

export class TaskService {
    constructor(private client: ApolloClient<NormalizedCacheObject>) { }

    async getAllTasks({ page, size }: PaginationParams) {
        const { data } = await this.client.query({
            query: GET_ALL_TASKS,
            variables: { page, size },
            fetchPolicy: "network-only"
        });
        return data.allTasks;
    }

    async getTaskById(id: string) {
        const { data } = await this.client.query({
            query: GET_TASK_BY_ID,
            variables: { id },
            fetchPolicy: "network-only"
        });
        return data.taskById;
    }

    async addTask(input: TaskInput) {
        const { data } = await this.client.mutate({
            mutation: ADD_TASK,
            variables: { input }
        });
        return data.addTask;
    }

    async updateTask(id: string, input: TaskUpdateInput) {
        const { data } = await this.client.mutate({
            mutation: UPDATE_TASK,
            variables: { id, input }
        });
        return data.updateTask;
    }

    async deleteTask(id: string) {
        const { data } = await this.client.mutate({
            mutation: DELETE_TASK,
            variables: { id }
        });
        return data.deleteTask;
    }
}
