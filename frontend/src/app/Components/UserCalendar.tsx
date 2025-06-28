
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, Plus, X, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    date: string;
    time?: string;
    priority: 'low' | 'medium' | 'high';
}

interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    tasks: Task[];
}

interface UserCalendarProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

const UserCalendar: React.FC<UserCalendarProps> = ({
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        time: '',
        priority: 'medium' as Task['priority']
    });

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const priorityColors = {
        low: 'bg-light-success/20 text-light-success dark:bg-dark-success/20 dark:text-dark-success border-light-success/30 dark:border-dark-success/30',
        medium: 'bg-light-warning/20 text-light-warning dark:bg-dark-warning/20 dark:text-dark-warning border-light-warning/30 dark:border-dark-warning/30',
        high: 'bg-light-error/20 text-light-error dark:bg-dark-error/20 dark:text-dark-error border-light-error/30 dark:border-dark-error/30'
    };

    function isToday(date: Date) {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    function formatDateKey(date: Date): string {
        return date.toISOString().split('T')[0];
    }

    function getTasksForDate(date: Date): Task[] {
        const dateKey = formatDateKey(date);
        return tasks.filter(task => task.date === dateKey);
    }

    function getDaysInMonth(date: Date): CalendarDay[] {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const days: CalendarDay[] = [];

        const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
        for (let i = startDay; i > 0; i--) {
            const prevDate = new Date(year, month, 1 - i);
            days.push({
                date: prevDate,
                isCurrentMonth: false,
                tasks: getTasksForDate(prevDate)
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, month, i);
            days.push({
                date: currentDay,
                isCurrentMonth: true,
                tasks: getTasksForDate(currentDay)
            });
        }

        while (days.length % 7 !== 0) {
            const nextDate = new Date(year, month + 1, days.length - (daysInMonth + startDay) + 1);
            days.push({
                date: nextDate,
                isCurrentMonth: false,
                tasks: getTasksForDate(nextDate)
            });
        }

        return days;
    }

    function navigateMonth(offset: number): void {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        setCurrentDate(new Date(year, month + offset, 1));
    }

    function handleDayClick(date: Date): void {
        setSelectedDate(date);
        setShowTaskModal(true);
    }

    function handleCreateTask(): void {
        if (!newTask.title.trim()) return;

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            completed: false,
            date: formatDateKey(selectedDate),
            time: newTask.time || undefined,
            priority: newTask.priority
        };

        setTasks(prev => [...prev, task]);
        setNewTask({ title: '', time: '', priority: 'medium' });
        setShowTaskModal(false);
    }

    function toggleTaskComplete(taskId: string): void {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    }

    function deleteTask(taskId: string): void {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    }

    const selectedDateTasks = getTasksForDate(selectedDate);

    return (
        <div className="mt-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
            >
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                        Calendario
                    </h2>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Organiza tus tareas y gestiona tu tiempo eficientemente
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border overflow-hidden"
                    >
                        {/* Calendar Header */}
                        <div className="bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-6 border-b border-light-border dark:border-dark-border">
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => navigateMonth(-1)}
                                    className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors text-light-text dark:text-dark-text"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <div className="flex items-center space-x-3">
                                    <CalendarDays size={20} className="text-light-primary dark:text-dark-primary" />
                                    <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </h3>
                                </div>

                                <button
                                    onClick={() => navigateMonth(1)}
                                    className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors text-light-text dark:text-dark-text"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Day Names */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {dayNames.map((day) => (
                                    <div key={day} className="text-center py-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-2">
                                {getDaysInMonth(currentDate).map((day, index) => {
                                    const isSelected = selectedDate.getTime() === day.date.getTime();
                                    const isTodayDay = isToday(day.date);
                                    const hasActiveTasks = day.tasks.some(task => !task.completed);
                                    const completedTasks = day.tasks.filter(task => task.completed).length;

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleDayClick(day.date)}
                                            className={`
                                                group relative aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all duration-200 hover:bg-light-cardHover dark:hover:bg-dark-cardHover
                                                ${!day.isCurrentMonth
                                                    ? 'text-light-textSecondary dark:text-dark-textSecondary opacity-50'
                                                    : 'text-light-text dark:text-dark-text'
                                                }
                                                ${isSelected
                                                    ? 'bg-light-primary dark:bg-dark-primary text-white font-semibold shadow-lg'
                                                    : ''
                                                }
                                                ${isTodayDay && !isSelected
                                                    ? 'bg-light-success/20 dark:bg-dark-success/20 text-light-success dark:text-dark-success font-medium ring-1 ring-light-success/30 dark:ring-dark-success/30'
                                                    : ''
                                                }
                                            `}
                                        >
                                            <span className="text-sm font-medium">
                                                {day.date.getDate()}
                                            </span>

                                            {/* Task indicators */}
                                            {day.tasks.length > 0 && (
                                                <div className="flex space-x-1 mt-1">
                                                    {hasActiveTasks && (
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected
                                                                ? 'bg-white'
                                                                : 'bg-light-warning dark:bg-dark-warning'
                                                            }`}></div>
                                                    )}
                                                    {completedTasks > 0 && (
                                                        <div className={`w-1.5 h-1.5 rounded-full ${isSelected
                                                                ? 'bg-white/70'
                                                                : 'bg-light-success dark:bg-dark-success'
                                                            }`}></div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Hover effect */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <Plus size={14} className="text-current" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tasks Panel */}
                <div className="space-y-6">
                    {/* Selected Date Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                    {selectedDate.toLocaleDateString('es-ES', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })}
                                </h3>
                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                    {selectedDateTasks.length} tarea{selectedDateTasks.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTaskModal(true)}
                                className="p-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        {/* Tasks List */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {selectedDateTasks.length === 0 ? (
                                <div className="text-center py-8 text-light-textSecondary dark:text-dark-textSecondary">
                                    <Clock size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">No hay tareas para este día</p>
                                    <p className="text-xs mt-1">¡Haz clic en + para agregar una!</p>
                                </div>
                            ) : (
                                selectedDateTasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg border transition-all duration-200 ${task.completed
                                                ? 'bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border opacity-75'
                                                : 'bg-light-cardHover dark:bg-dark-cardHover border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <button
                                                    onClick={() => toggleTaskComplete(task.id)}
                                                    className={`mt-1 p-1 rounded-full transition-all duration-200 ${task.completed
                                                            ? 'bg-light-success dark:bg-dark-success text-white'
                                                            : 'border-2 border-light-border dark:border-dark-border hover:border-light-success dark:hover:border-dark-success'
                                                        }`}
                                                >
                                                    {task.completed && <Check size={12} />}
                                                </button>

                                                <div className="flex-1">
                                                    <p className={`text-sm font-medium ${task.completed
                                                            ? 'line-through text-light-textSecondary dark:text-dark-textSecondary'
                                                            : 'text-light-text dark:text-dark-text'
                                                        }`}>
                                                        {task.title}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-2">
                                                        {task.time && (
                                                            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary bg-light-background dark:bg-dark-background px-2 py-1 rounded-full border border-light-border dark:border-dark-border">
                                                                {task.time}
                                                            </span>
                                                        )}
                                                        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                                                            {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="p-1 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-error dark:hover:text-dark-error transition-colors duration-200"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border p-6"
                    >
                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">Estadísticas</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary">Total</span>
                                <span className="font-semibold text-light-primary dark:text-dark-primary">{tasks.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary">Completadas</span>
                                <span className="font-semibold text-light-success dark:text-dark-success">{tasks.filter(t => t.completed).length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary">Pendientes</span>
                                <span className="font-semibold text-light-warning dark:text-dark-warning">{tasks.filter(t => !t.completed).length}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border max-w-md w-full p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Nueva Tarea</h3>
                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Título de la tarea
                                </label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full p-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                    placeholder="Escribe tu tarea aquí..."
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Hora (opcional)
                                </label>
                                <input
                                    type="time"
                                    value={newTask.time}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
                                    className="w-full p-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Prioridad
                                </label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                                    className="w-full p-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                >
                                    <option value="low">Baja</option>
                                    <option value="medium">Media</option>
                                    <option value="high">Alta</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowTaskModal(false)}
                                className="flex-1 p-3 border border-light-border dark:border-dark-border text-light-text dark:text-dark-text rounded-lg hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateTask}
                                disabled={!newTask.title.trim()}
                                className="flex-1 p-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-primary/80 dark:hover:bg-dark-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Crear Tarea
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UserCalendar;