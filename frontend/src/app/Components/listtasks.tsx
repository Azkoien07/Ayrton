import React, { useState, useMemo, useCallback } from 'react';
import { Eye, Edit2, Trash2, Clock, Calendar, Plus, Search, Filter, CheckCircle2, Circle, AlertCircle } from 'lucide-react';


interface Task {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaVencimiento: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'completada' | 'en_progreso' | 'pendiente';
}

interface TaskFormData {
  nombre: string;
  descripcion: string;
  fechaVencimiento: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'completada' | 'en_progreso' | 'pendiente';
}


const mockTasks: Task[] = [
  {
    id: 1,
    nombre: "Completar proyecto React",
    descripcion: "Finalizar el desarrollo del dashboard de tareas con todas las funcionalidades requeridas",
    fechaCreacion: "2024-06-15T10:30:00Z",
    fechaVencimiento: "2024-06-25T18:00:00Z",
    prioridad: "alta",
    estado: "en_progreso"
  },
  {
    id: 2,
    nombre: "Revisar documentación",
    descripcion: "Actualizar la documentación del API y crear ejemplos de uso",
    fechaCreacion: "2024-06-18T14:20:00Z",
    fechaVencimiento: "2024-06-22T12:00:00Z",
    prioridad: "media",
    estado: "pendiente"
  },
  {
    id: 3,
    nombre: "Meeting con cliente",
    descripcion: "Presentar avances del proyecto y discutir próximos pasos",
    fechaCreacion: "2024-06-10T09:00:00Z",
    fechaVencimiento: "2024-06-20T15:30:00Z",
    prioridad: "alta",
    estado: "completada"
  },
  {
    id: 4,
    nombre: "Optimizar base de datos",
    descripcion: "Mejorar queries y agregar índices para mejor performance",
    fechaCreacion: "2024-06-12T16:45:00Z",
    fechaVencimiento: "2024-06-28T14:00:00Z",
    prioridad: "baja",
    estado: "pendiente"
  }
];

type ModalType = 'view' | 'edit' | 'delete' | 'create';
type FilterType = 'todas' | 'completada' | 'en_progreso' | 'pendiente';
type SortType = 'fechaVencimiento' | 'prioridad' | 'fechaCreacion';

export default function ImprovedTaskList() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterType>('todas');
  const [sortBy, setSortBy] = useState<SortType>('fechaVencimiento');
  const [editFormData, setEditFormData] = useState<TaskFormData>({
    nombre: '',
    descripcion: '',
    fechaVencimiento: '',
    prioridad: 'media',
    estado: 'pendiente'
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

  const esVencida = useCallback((fechaVencimiento: string) => {
    return new Date(fechaVencimiento) < new Date();
  }, []);

  const getPrioridadColor = useCallback((prioridad: string): string => {
    const colors = {
      alta: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      media: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      baja: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    };
    return colors[prioridad as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }, []);

  const getEstadoColor = useCallback((estado: string) => {
    const colors = {
      completada: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      en_progreso: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      pendiente: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[estado as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }, []);


  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'todas' || task.estado === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fechaVencimiento':
          return new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime();
        case 'prioridad':
          const prioridadOrder = { alta: 3, media: 2, baja: 1 };
          return prioridadOrder[b.prioridad] - prioridadOrder[a.prioridad];
        case 'fechaCreacion':
          return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
        default:
          return 0;
      }
    });
  }, [tasks, searchTerm, filterStatus, sortBy]);


  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completadas = tasks.filter(t => t.estado === 'completada').length;
    const enProgreso = tasks.filter(t => t.estado === 'en_progreso').length;
    const pendientes = tasks.filter(t => t.estado === 'pendiente').length;
    const vencidas = tasks.filter(t => t.estado !== 'completada' && esVencida(t.fechaVencimiento)).length;
    
    return { total, completadas, enProgreso, pendientes, vencidas };
  }, [tasks, esVencida]);


  const handleAction = useCallback((task: Task | null, action: ModalType) => {
    setSelectedTask(task);
    setModalType(action);
    
    if (action === 'edit' && task) {
      setEditFormData({
        nombre: task.nombre,
        descripcion: task.descripcion,
        fechaVencimiento: task.fechaVencimiento.slice(0, 16),
        prioridad: task.prioridad,
        estado: task.estado
      });
    } else if (action === 'create') {
      setEditFormData({
        nombre: '',
        descripcion: '',
        fechaVencimiento: '',
        prioridad: 'media',
        estado: 'pendiente'
      });
    }
    
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedTask(null);
    setModalType('view');
    setEditFormData({
      nombre: '',
      descripcion: '',
      fechaVencimiento: '',
      prioridad: 'media',
      estado: 'pendiente'
    });
  }, []);

  const handleDelete = useCallback((taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    handleCloseModal();
  }, [handleCloseModal]);

  const handleSaveEdit = useCallback(() => {
    if (!selectedTask) return;
    
    setTasks(prev => prev.map(task => 
      task.id === selectedTask.id 
        ? { 
            ...task, 
            ...editFormData,
            fechaVencimiento: editFormData.fechaVencimiento + ':00Z'
          }
        : task
    ));
    handleCloseModal();
  }, [selectedTask, editFormData, handleCloseModal]);

  const handleCreateTask = useCallback(() => {
    const newTask: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      ...editFormData,
      fechaCreacion: new Date().toISOString(),
      fechaVencimiento: editFormData.fechaVencimiento + ':00Z'
    };
    
    setTasks(prev => [...prev, newTask]);
    handleCloseModal();
  }, [tasks, editFormData, handleCloseModal]);

  const toggleTaskStatus = useCallback((taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            estado: task.estado === 'completada' ? 'pendiente' : 'completada' as const
          }
        : task
    ));
  }, []);

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
              <option value="en_progreso">En Progreso</option>
              <option value="completada">Completadas</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fechaVencimiento">Por Vencimiento</option>
              <option value="prioridad">Por Prioridad</option>
              <option value="fechaCreacion">Por Fecha de Creación</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedTasks.map((task) => {
          const isOverdue = task.estado !== 'completada' && esVencida(task.fechaVencimiento);
          
          return (
            <div
              key={task.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 border-l-4 ${
                isOverdue 
                  ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10' 
                  : task.estado === 'completada'
                  ? 'border-l-green-500'
                  : task.prioridad === 'alta'
                  ? 'border-l-red-400'
                  : task.prioridad === 'media'
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
                      {task.estado === 'completada' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <h3 className={`text-lg font-semibold line-clamp-2 ${
                      task.estado === 'completada' 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {task.nombre}
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

                {task.descripcion && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {task.descripcion}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(task.prioridad)}`}>
                    {task.prioridad.charAt(0).toUpperCase() + task.prioridad.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(task.estado)}`}>
                    {task.estado.replace('_', ' ').charAt(0).toUpperCase() + task.estado.replace('_', ' ').slice(1)}
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {calcularTiempoTranscurrido(task.fechaCreacion)}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatearFecha(task.fechaVencimiento)}
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
                    <p className="text-gray-900 dark:text-white">{selectedTask.nombre}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                    <p className="text-gray-900 dark:text-white">{selectedTask.descripcion}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridad</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(selectedTask.prioridad)}`}>
                        {selectedTask.prioridad.charAt(0).toUpperCase() + selectedTask.prioridad.slice(1)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedTask.estado)}`}>
                        {selectedTask.estado.replace('_', ' ').charAt(0).toUpperCase() + selectedTask.estado.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiempo transcurrido</label>
                    <p className="text-gray-900 dark:text-white">{calcularTiempoTranscurrido(selectedTask.fechaCreacion)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de vencimiento</label>
                    <p className="text-gray-900 dark:text-white">{formatearFecha(selectedTask.fechaVencimiento)}</p>
                  </div>
                </div>
              )}

              {modalType === 'delete' && selectedTask && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    ¿Estás seguro de que quieres eliminar la tarea "<strong>{selectedTask.nombre}</strong>"? 
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
                      value={editFormData.nombre}
                      onChange={(e) => setEditFormData({...editFormData, nombre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={editFormData.descripcion}
                      onChange={(e) => setEditFormData({...editFormData, descripcion: e.target.value})}
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
                      value={editFormData.fechaVencimiento}
                      onChange={(e) => setEditFormData({...editFormData, fechaVencimiento: e.target.value})}
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
                        value={editFormData.prioridad}
                        onChange={(e) => setEditFormData({...editFormData, prioridad: e.target.value as 'alta' | 'media' | 'baja'})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado
                      </label>
                      <select
                        value={editFormData.estado}
                        onChange={(e) => setEditFormData({...editFormData, estado: e.target.value as 'completada' | 'en_progreso' | 'pendiente'})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_progreso">En Progreso</option>
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
                      disabled={!editFormData.nombre || !editFormData.fechaVencimiento}
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