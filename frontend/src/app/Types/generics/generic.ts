// Tipo para errores rechazados (Global)
export interface RejectedPayload {
    code?: string;
    message?: string;
}

export interface GenericPaginatedState<T = any> {
    data: T[];
    loading: boolean;
    error: string | { code?: string; message?: string } | null;
    currentPage: number;
    totalItems: number;
    totalPages: number;
}

// initialStates.ts
export const createInitialPaginatedState = <T>(): GenericPaginatedState<T> => ({
    data: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
});