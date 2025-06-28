import React, { useState, useMemo, useCallback } from 'react';
import { Eye, Edit2, Trash2, Clock, Calendar, Plus, Search, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Priority, TypeTask } from '@/generated/graphql';

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

interface TaskFormData {
  name: string;
  description: string;
  priority: Priority;
  fExpiration: string;
  state: boolean;
}

interface TaskListProps {
  tasks: TaskItem[];
  loading: boolean;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onDispatchAction: (action: any) => void;
}

type ModalType = 'view' | 'edit' | 'delete' | 'create';
type FilterType = 'todas' | 'completada' | 'en_progreso' | 'pendiente'; // Still mapping to component's logic
type SortType = 'fExpiration' | 'priority' | 'fCreation'; // Updated to match TaskItem fields

export default function ImprovedTaskList({ tasks, loading, currentPage, totalItems, onPageChange, onDispatchAction }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterType>('todas');
  const [sortBy, setSortBy] = useState<SortType>('fExpiration');
  const [editFormData, setEditFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    fExpiration: '',
    priority: Priority.Media,
    state: false
  });

  const formatearFecha = useCallback((fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const calcularTiempoTranscurrido = useCallback((fechaCreacion: string) => {
    const ahora = new Date();
    const fechaInicio = new Date(fechaCreacion);
    const diferencia = ahora.getTime() - fechaInicio.getTime();

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (dias > 0) {
      return `${dias} día${dias > 1 ? 's' : ''} ${horas}h`;
    } else if (horas > 0) {
      return `${horas} hora${horas > 1 ? 's' : ''}`;
    } else {
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      return `${minutos} min`;
    }
  }, []);

  const esVencida = useCallback((fExpiration: string) => {
    return new Date(fExpiration) < new Date();
  }, []);

  const getPrioridadColor = useCallback((priority: Priority): string => {
    const colors = {
      [Priority.Alta]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      [Priority.Media]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      [Priority.Baja]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }, []);

  // Helper to map boolean `state` to string status for display and filtering
  const mapStateToStatus = useCallback((state: boolean): 'completada' | 'en_progreso' | 'pendiente' => {
    // This mapping assumes: true = completada, false = pendiente/en_progreso.
    // If you have a separate 'in_progreso' state, your TaskItem would need a different field,
    // or your slice logic would need to send a specific string.
    return state ? 'completada' : 'pendiente'; // Defaulting false to 'pendiente'
  }, []);

  const getEstadoColor = useCallback((status: 'completada' | 'en_progreso' | 'pendiente') => {
    const colors = {
      completada: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      en_progreso: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      pendiente: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }, []);


  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const taskStatus = mapStateToStatus(task.state); // Map boolean state to string status
      const matchesFilter = filterStatus === 'todas' || taskStatus === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fExpiration':
          return new Date(a.fExpiration).getTime() - new Date(b.fExpiration).getTime();
        case 'priority':
          const prioridadOrder = { [Priority.Alta]: 3, [Priority.Media]: 2, [Priority.Baja]: 1 };
          return prioridadOrder[b.priority] - prioridadOrder[a.priority];
        case 'fCreation':
          return new Date(b.fCreation).getTime() - new Date(a.fCreation).getTime();
        default:
          return 0;
      }
    });
  }, [tasks, searchTerm, filterStatus, sortBy, mapStateToStatus]);


  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completadas = tasks.filter(t => t.state).length;
    const enProgreso = 0; // No direct 'en_progreso' state in TaskItem. You might need to add a `status` field to TaskItem if you want this granular stat.
    const pendientes = tasks.filter(t => !t.state).length;
    const vencidas = tasks.filter(t => !t.state && esVencida(t.fExpiration)).length;

    return { total, completadas, enProgreso, pendientes, vencidas };
  }, [tasks, esVencida]);


  const handleAction = useCallback((task: TaskItem | null, action: ModalType) => {
    setSelectedTask(task);
    setModalType(action);

    if (action === 'edit' && task) {
      setEditFormData({
        name: task.name,
        description: task.description,
        fExpiration: task.fExpiration.slice(0, 16),
        priority: task.priority,
        state: task.state
      });
    } else if (action === 'create') {
      setEditFormData({
        name: '',
        description: '',
        fExpiration: '',
        priority: Priority.Media,
        state: false
      });
    }

    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedTask(null);
    setModalType('view');
    setEditFormData({
      name: '',
      description: '',
      fExpiration: '',
        priority: Priority.Media,
        state: false
    });
  }, []);

  const handleDelete = useCallback((taskId: string) => {
    onDispatchAction({ type: 'tasks/deleteTask', payload: taskId });
    handleCloseModal();
  }, [handleCloseModal, onDispatchAction]);

  const handleSaveEdit = useCallback(() => {
    if (!selectedTask) return;

    const updatedTask: TaskItem = {
      ...selectedTask,
      name: editFormData.name,
      description: editFormData.description,
      priority: editFormData.priority,
      state: editFormData.state,
      fExpiration: editFormData.fExpiration + ':00Z'
    };
    onDispatchAction({ type: 'tasks/updateTask', payload: updatedTask });
    handleCloseModal();
  }, [selectedTask, editFormData, handleCloseModal, onDispatchAction]);

  const handleCreateTask = useCallback(() => {
    // Generate a simple unique ID for client-side creation. Your backend/slice should handle real ID generation.
    const newId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTask: TaskItem = {
      id: newId,
      name: editFormData.name,
      description: editFormData.description,
      priority: editFormData.priority,
      state: editFormData.state,
      typeTask: TypeTask.Personal, // Default value, adjust as needed or add to form
      fCreation: new Date().toISOString(),
      fExpiration: editFormData.fExpiration + ':00Z'
    };
    onDispatchAction({ type: 'tasks/createTask', payload: newTask });
    handleCloseModal();
  }, [editFormData, handleCloseModal, onDispatchAction]);

  const toggleTaskStatus = useCallback((taskId: string) => {
    const taskToToggle = tasks.find(task => task.id === taskId);
    if (!taskToToggle) return;

    const newStatus = !taskToToggle.state; // Toggle boolean state
    const updatedTask: TaskItem = { ...taskToToggle, state: newStatus };
    onDispatchAction({ type: 'tasks/updateTaskStatus', payload: updatedTask });
  }, [tasks, onDispatchAction]);

  return (
    <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
      {/* Header con estadísticas */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mis Tareas
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona tus tareas de manera eficiente
            </p>
          </div>
          <button
            onClick={() => handleAction(null, 'create')}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{taskStats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600">{taskStats.completadas}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completadas</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600">{taskStats.enProgreso}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">En Progreso</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{taskStats.pendientes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pendientes</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600">{taskStats.vencidas}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Vencidas</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todas">Todas</option>
              <option value="pendiente">Pendientes</option>
              <option value="completada">Completadas</option>
              {/* If you have a true 'en_progreso' state in your TaskItem, add it here */}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fExpiration">Por Vencimiento</option>
              <option value="priority">Por Prioridad</option>
              <option value="fCreation">Por Fecha de Creación</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Cargando tareas...</p>
          {/* You can add a spinner here */}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTasks.map((task) => {
              const taskStatus = mapStateToStatus(task.state);
              const isOverdue = !task.state && esVencida(task.fExpiration);

              return (
                <div
                  key={task.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 border-l-4 ${isOverdue
                    ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
                    : task.state
                      ? 'border-l-green-500'
                      : task.priority === Priority.Alta
                          ? 'border-l-red-400'
                          : task.priority === Priority.Media
                            ? 'border-l-yellow-400'
                            : 'border-l-green-400'
                    } border-r border-t border-b border-gray-200 dark:border-gray-700`}
                >
                  <div className="p-6">
                    {/* Header de la card */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className="mt-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {task.state ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <h3 className={`text-lg font-semibold line-clamp-2 ${task.state
                          ? 'text-gray-500 dark:text-gray-400 line-through'
                          : 'text-gray-900 dark:text-white'
                          }`}>
                          {task.name}
                        </h3>
                      </div>

                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => handleAction(task, 'view')}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction(task, 'edit')}
                          className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAction(task, 'delete')}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {isOverdue && (
                      <div className="flex items-center space-x-2 mb-3 p-2 bg-red-100 dark:bg-red-900/20 rounded-md">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700 dark:text-red-400 font-medium">
                          Tarea vencida
                        </span>
                      </div>
                    )}

                    {task.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(taskStatus)}`}>
                        {taskStatus.replace('_', ' ').charAt(0).toUpperCase() + taskStatus.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {calcularTiempoTranscurrido(task.fCreation)}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatearFecha(task.fExpiration)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredAndSortedTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {searchTerm || filterStatus !== 'todas' ? 'No se encontraron tareas' : 'No hay tareas'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchTerm || filterStatus !== 'todas'
                  ? 'Prueba ajustando los filtros de búsqueda'
                  : 'Crea tu primera tarea para comenzar'
                }
              </p>
              {!searchTerm && filterStatus === 'todas' && (
                <button
                  onClick={() => handleAction(null, 'create')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Tarea
                </button>
              )}
            </div>
          )}
          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-4 py-2 mx-1 text-gray-800 dark:text-gray-200">
                Página {currentPage} de {Math.ceil(totalItems / (/* items per page */ 10))}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage * 10 >= totalItems}
                className="px-4 py-2 mx-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {modalType === 'view' && 'Detalles de la tarea'}
                  {modalType === 'edit' && 'Editar tarea'}
                  {modalType === 'delete' && 'Eliminar tarea'}
                  {modalType === 'create' && 'Crear nueva tarea'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {modalType === 'view' && selectedTask && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                    <p className="text-gray-900 dark:text-white">{selectedTask.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                    <p className="text-gray-900 dark:text-white">{selectedTask.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridad</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(selectedTask.priority)}`}>
                        {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(mapStateToStatus(selectedTask.state))}`}>
                        {mapStateToStatus(selectedTask.state).replace('_', ' ').charAt(0).toUpperCase() + mapStateToStatus(selectedTask.state).replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiempo transcurrido</label>
                    <p className="text-gray-900 dark:text-white">{calcularTiempoTranscurrido(selectedTask.fCreation)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de vencimiento</label>
                    <p className="text-gray-900 dark:text-white">{formatearFecha(selectedTask.fExpiration)}</p>
                  </div>
                </div>
              )}

              {modalType === 'delete' && selectedTask && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    ¿Estás seguro de que quieres eliminar la tarea "<strong>{selectedTask.name}</strong>"?
                    Esta acción no se puede deshacer.
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleDelete(selectedTask.id)}
                      className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}

              {(modalType === 'edit' || modalType === 'create') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fecha de vencimiento *
                    </label>
                    <input
                      type="datetime-local"
                      value={editFormData.fExpiration}
                      onChange={(e) => setEditFormData({ ...editFormData, fExpiration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prioridad
                      </label>
                      <select
                        value={editFormData.priority}
                        onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value as Priority })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={Priority.Baja}>Baja</option>
                        <option value={Priority.Media}>Media</option>
                        <option value={Priority.Alta}>Alta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado
                      </label>
                      <select
                        value={editFormData.state ? 'completada' : 'pendiente'} // Map boolean state to string for select
                        onChange={(e) => setEditFormData({ ...editFormData, state: e.target.value === 'completada' })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pendiente">Pendiente</option>
                        {/* If you have a true 'en_progreso' state in your TaskItem, you'd handle it here */}
                        <option value="completada">Completada</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={modalType === 'create' ? handleCreateTask : handleSaveEdit}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                      disabled={!editFormData.name || !editFormData.fExpiration}
                    >
                      {modalType === 'create' ? 'Crear Tarea' : 'Guardar Cambios'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
