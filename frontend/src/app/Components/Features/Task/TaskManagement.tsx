"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { AddTaskMutationVariables, UpdateTaskMutationVariables } from "@/generated/graphql";
import { fetchTasks, addTask, updateTask, deleteTask, } from "@slice/taskSlice";
import { toast } from "sonner";
import ListTasks from "@components/Features/Task/ListTasks";

interface TaskManagementProps {
    searchTermBar: string;
    setSearchTermBar: (term: string) => void;
}

export default function TaskManagement({
    searchTermBar,
    setSearchTermBar,
}: TaskManagementProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, totalItems } = useSelector(
        (state: RootState) => state.task
    );
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearchTerm(searchTermBar);
            setPage(0);
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchTermBar]);

    useEffect(() => {
        dispatch(fetchTasks({ page, size: itemsPerPage }));
    }, [dispatch, page, itemsPerPage]);

    // Handlers for task operations
    const handleAddTask = async (data: AddTaskMutationVariables["input"]) => {
        try {
            const result = await dispatch(addTask(data));

            if (addTask.rejected.match(result)) {
                const message =
                    result.payload?.message ||
                    result.error?.message ||
                    "Error desconocido al registrar la tarea";
                toast.error(`Error al registrar la tarea: ${message}`);
                return false;
            }

            toast.success("Tarea registrada exitosamente");

            return true;
        } catch (e: any) {
            toast.error(
                `Excepción no controlada al registrar la tarea: ${e?.message || "Error desconocido"}`
            );
            return false;
        }
    };


    const handleUpdateTask = async (data: UpdateTaskMutationVariables) => {
        try {
            const result = await dispatch(updateTask(data));

            if (updateTask.rejected.match(result)) {
                const message =
                    result.payload?.message ||
                    result.error?.message ||
                    "Error desconocido al actualizar la tarea";
                toast.error(`Error al actualizar la tarea: ${message}`);
                return false;
            }

            toast.success("Tarea actualizada correctamente");

            return true;
        } catch (e: any) {
            toast.error(
                `Excepción no controlada al actualizar la tarea: ${e?.message || "Error desconocido"
                }`
            );
            return false;
        }
    };

    const handleDeleteTask = async (taskId: string, taskName: string) => {
        try {
            const result = await dispatch(deleteTask(taskId));

            if (deleteTask.rejected.match(result)) {
                const message =
                    result.payload?.message ||
                    result.error?.message ||
                    "Error desconocido al eliminar la tarea";
                toast.error(`Error al eliminar la tarea: ${message}`);
                return false;
            }

            toast.success(`Tarea "${taskName}" eliminada correctamente`);
            return true;
        } catch (e: any) {
            toast.error(
                `Excepción no controlada al eliminar la tarea: ${e?.message || "Error desconocido"
                }`
            );
            return false;
        }
    };

    return (
        <div className="mt-8">
            <ListTasks
                tasks={data}
                loading={loading}
                currentPage={page}
                totalItems={totalItems}
                onPageChange={setPage}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
}