import { Priority, TypeTask, AddTaskMutationVariables, UpdateTaskMutationVariables } from '@/generated/graphql';

export interface TaskItem {
    id: string;
    name: string;
    description: string;
    priority: Priority;
    typeTask: TypeTask;
    state: boolean;
    fCreation: string;
    fExpiration: string;
    reminder?: string | null;
}

export interface TaskFormData {
    name: string;
    description: string;
    priority: Priority;
    typeTask: TypeTask;
    state: boolean;
    fCreation?: string;
    fExpiration: string;
    reminder?: string | null;
}

export interface TaskListProps {
    tasks: TaskItem[];
    loading: boolean;
    currentPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onAddTask: (input: AddTaskMutationVariables["input"]) => Promise<boolean>;
    onUpdateTask: (input: UpdateTaskMutationVariables) => Promise<boolean>;
    onDeleteTask: (taskId: string, taskName: string) => Promise<boolean>;
}

export type ModalType = "view" | "edit" | "delete" | "create";
export type FilterType = "todas" | "completada" | "en_progreso" | "pendiente";
export type SortType = "fExpiration" | "priority" | "fCreation";