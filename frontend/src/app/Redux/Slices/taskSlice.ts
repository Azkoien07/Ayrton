import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskItem } from '@Types/slices/task';
import { createInitialPaginatedState, RejectedPayload, GenericPaginatedState } from '@Types/generics/generic';
import { GET_ALL_TASKS, GET_TASK_BY_ID, ADD_TASK, UPDATE_TASK, DELETE_TASK } from '@graphql/Tasks/tasksGraph';
import {
    GetAllTasksQuery,
    GetAllTasksQueryVariables,
    GetTaskByIdQuery,
    GetTaskByIdQueryVariables,
    AddTaskMutation,
    AddTaskMutationVariables,
    UpdateTaskMutation,
    UpdateTaskMutationVariables,
    DeleteTaskMutation,
    DeleteTaskMutationVariables,
    Task as GraphQLTaskType
} from "@/generated/graphql";

const transformGraphQLToTaskItem = (graphqlData: GraphQLTaskType): TaskItem => {
    return {
        id: graphqlData.id,
        name: graphqlData.name,
        description: graphqlData.description,
        priority: graphqlData.priority,
        typeTask: graphqlData.typeTask,
        state: graphqlData.state,
        fCreation: graphqlData.fCreation,
        fExpiration: graphqlData.fExpiration,
        reminder: graphqlData.reminder
    };
};

interface TaskState extends GenericPaginatedState<TaskItem> {
    selectedItem: TaskItem | null;
}

export const fetchTasks = createAsyncThunk<NonNullable<GetAllTasksQuery['allTasks']>, GetAllTasksQueryVariables
>(
    'task/fetchAll',
    async ({ page, size }) => {
        const { data } = await client.query<GetAllTasksQuery, GetAllTasksQueryVariables>({
            query: GET_ALL_TASKS,
            variables: { page, size },
            fetchPolicy: 'no-cache',
        });
        if (!data.allTasks) {
            throw new Error('No tasks data received');
        }
        return data.allTasks;
    }
);

export const fetchTaskById = createAsyncThunk<NonNullable<GetTaskByIdQuery['taskById']>, GetTaskByIdQueryVariables
>(
    'task/fetchById',
    async ({ id }) => {
        const { data } = await client.query<GetTaskByIdQuery, GetTaskByIdQueryVariables>({
            query: GET_TASK_BY_ID,
            variables: { id },
        });
        if (!data.taskById) {
            throw new Error(`Task with ID ${id} not found`);
        }
        return data.taskById;
    }
);

export const addTask = createAsyncThunk<NonNullable<AddTaskMutation['addTask']>, AddTaskMutationVariables['input'],
    { rejectValue: RejectedPayload }
>(
    'task/add',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<AddTaskMutation, AddTaskMutationVariables>({
                mutation: ADD_TASK,
                variables: { input }
            });
            const res = data?.addTask;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during add task';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const updateTask = createAsyncThunk<
    NonNullable<UpdateTaskMutation['updateTask']>,
    UpdateTaskMutationVariables,
    { rejectValue: RejectedPayload }
>(
    'task/update',
    async ({ id, input }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<UpdateTaskMutation, UpdateTaskMutationVariables>({
                mutation: UPDATE_TASK,
                variables: { id, input },
            });
            const res = data?.updateTask;

            if (!res || res.code !== '200') {
                return rejectWithValue({
                    code: res?.code ?? '500',
                    message: res?.message ?? 'Operation failed.'
                });
            }
            return res;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during update task';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

export const deleteTask = createAsyncThunk<
    string,
    string,
    { rejectValue: RejectedPayload }
>(
    'task/delete',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate<DeleteTaskMutation, DeleteTaskMutationVariables>({
                mutation: DELETE_TASK,
                variables: { id },
            });
            const res = data?.deleteTask;

            if (!res || res.code !== '200') {
                return rejectWithValue({ code: res?.code ?? '500', message: res?.message ?? 'Unknown error' });
            }
            return id;

        } catch (error: any) {
            const errorMessage = error?.message || 'Unknown error during delete task';
            const errorCode = error?.graphQLErrors?.[0]?.extensions?.code || '500';
            return rejectWithValue({ code: errorCode, message: errorMessage });
        }
    }
);

const initialState: TaskState = {
    ...createInitialPaginatedState<TaskItem>(),
    selectedItem: null,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearTaskError: (state) => {
            state.error = null;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<NonNullable<GetAllTasksQuery['allTasks']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.data = action.payload.data
                        .filter((item): item is NonNullable<typeof item> => item !== null)
                        .map(transformGraphQLToTaskItem);
                } else {
                    state.data = [];
                }
                state.totalItems = action.payload.totalItems ?? 0;
                state.currentPage = action.payload.currentPage ?? 0;
                state.totalPages = action.payload.totalPages ?? 0;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching tasks' };
                state.data = [];
            })

            .addCase(fetchTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedItem = null;
            })
            .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<NonNullable<GetTaskByIdQuery['taskById']>>) => {
                state.loading = false;
                if (action.payload?.data) {
                    state.selectedItem = transformGraphQLToTaskItem(action.payload.data);
                } else {
                    state.selectedItem = null;
                }
                state.error = null;
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error fetching task by ID' };
                state.selectedItem = null;
            })

            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error adding task' };
            })

            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error updating task' };
            })

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                const payload = action.payload as RejectedPayload | undefined;
                state.error = payload ? { code: payload.code, message: payload.message } : { code: '500', message: action.error.message || 'Error deleting task' };
            });
    }
});


export const { } = taskSlice.actions;
export default taskSlice.reducer;
