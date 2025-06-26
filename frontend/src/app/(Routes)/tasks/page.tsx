'use client';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import Sidebar from '@components/Sidebar';
import Barrita from '@components/barrita';
import ListTasks from '@components/listTasks';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import { motion } from 'framer-motion';
import { AddTaskMutationVariables, UpdateTaskMutationVariables } from '@/generated/graphql';

import {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
} from '@slice/taskSlice';


const Dashboard = ({ role }: DashboardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error, currentPage, totalItems } = useSelector(
        (state: RootState) => state.task
    );
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [searchTermBar, setSearchTermBar] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());

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
    const handleAddTask = async (data: AddTaskMutationVariables['input']) => {
        try {
            const result = await dispatch(addTask(data));

            if (addTask.rejected.match(result)) {
                const message =
                    result.payload?.message || result.error?.message || 'Error desconocido al registrar la tarea';
                toast.error(`Error al registrar la tarea: ${message}`);
                return false;
            }

            toast.success("Tarea registrada exitosamente");
            return true;
        } catch (e: any) {
            toast.error(`Excepción no controlada al registrar la tarea: ${e?.message || "Error desconocido"}`);
            return false;
        }
    };

    const handleUpdateTask = async (data: UpdateTaskMutationVariables) => {
        try {
            const result = await dispatch(updateTask(data));

            if (updateTask.rejected.match(result)) {
                const message =
                    result.payload?.message || result.error?.message || 'Error desconocido al actualizar la tarea';
                toast.error(`Error al actualizar la tarea: ${message}`);
                return false;
            }

            toast.success("Tarea actualizada correctamente");
            return true;
        } catch (e: any) {
            toast.error(`Excepción no controlada al actualizar la tarea: ${e?.message || "Error desconocido"}`);
            return false;
        }
    };

    const handleDeleteTask = async (taskId: string, taskName: string) => {
        try {
            const result = await dispatch(deleteTask(taskId));

            if (deleteTask.rejected.match(result)) {
                const message =
                    result.payload?.message || result.error?.message || 'Error desconocido al eliminar la tarea';
                toast.error(`Error al eliminar la tarea: ${message}`);
                return false;
            }

            toast.success(`Tarea "${taskName}" eliminada correctamente`);
            return true;
        } catch (e: any) {
            toast.error(`Excepción no controlada al eliminar la tarea: ${e?.message || "Error desconocido"}`);
            return false;
        }
    };

    const getTimeBasedGreeting = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 5 && hour < 12) {
            return {
                greeting: 'Buenos días',
                description: 'Comienza tu día gestionando tu panel de configuración.'
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                greeting: 'Buenas tardes',
                description: 'Continúa configurando y optimizando tu sistema.'
            };
        } else {
            return {
                greeting: 'Buenas noches',
                description: 'Revisa y ajusta la configuración de tu sistema.'
            };
        }
    };

    useEffect(() => {
        const updateGreeting = () => {
            const timeGreeting = getTimeBasedGreeting();
            setGreeting(timeGreeting.greeting);
        };

        updateGreeting();

        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
                </header>
                <Barrita></Barrita>
                {/*first content */}
                <div className="flex-1 overflow-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
                            <div className='flex items-center space-x-2 mb-4'>
                                <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Panel de</span>
                                <span className='text-light-text dark:text-dark-text text-3xl font-bold'>tareas</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                                {getTimeBasedGreeting().description}
                            </p>

                            {/* Carrusel de páginas del usuario */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-6">
                                </div>
                            </div>

                        </div>
                        <div className="mt-8">
                            <ListTasks
                                tasks={data}
                                loading={loading}
                                currentPage={page}
                                totalItems={totalItems}
                                onPageChange={setPage}
                            />

                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;