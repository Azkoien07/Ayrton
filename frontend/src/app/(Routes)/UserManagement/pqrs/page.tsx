'use client';

import { Search, FileText, AlertCircle, MessageSquare, ArrowLeft, Menu, X, Plus } from 'lucide-react';
import PqrCard from '@components/Pqrs/PqrCard';
import StatsCard from '@components/Pqrs/StatsCard';
import PqrModal from '@components/Pqrs/PqrModal';
import { useUser } from '@context/userContext';
import Sidebar from '@components/UI/Sidebar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from "@store/store";
import {
    fetchPqrs,
    addPqr,
    updatePqr,
    deletePqr,
} from '@slice/pqrSlice';
import { Pqr } from '@/app/Types/Pqr';
import { useRouter } from 'next/navigation';
import { PqrInput, PqrUpdateInput } from '@/generated/graphql';
import { TypePqr } from '@/generated/graphql';

const PqrDashboard = () => {
    const { user } = useUser();
    const dispatch = useDispatch<AppDispatch>();
    const {
        data: pqrs,
        loading,
        error,
        totalItems,
        currentPage,
        totalPages
    } = useSelector((state: RootState) => state.pqr);
    const router = useRouter();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [stateFilter, setStateFilter] = useState('all');
    const [selectedPqr, setSelectedPqr] = useState<Pqr | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchPqrs({ page: 0, size: 5 }));
    }, [dispatch]);

    // Configurar cliente y resize handler
    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredPqrs = pqrs.filter((pqr: Pqr) =>
        (pqr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pqr.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (typeFilter === 'all' || pqr.typePqr === typeFilter) &&
        (stateFilter === 'all' ||
            (stateFilter === 'pending' && !pqr.state) ||
            (stateFilter === 'resolved' && pqr.state))
    );

    // Calcular estadísticas
    const stats = {
        total: totalItems,
        peticiones: pqrs.filter((pqr: Pqr) => pqr.typePqr === TypePqr.Peticion).length,
        quejas: pqrs.filter((pqr: Pqr) => pqr.typePqr === TypePqr.Queja).length,
        reclamos: pqrs.filter((pqr: Pqr) => pqr.typePqr === TypePqr.Reclamo).length,
        pendientes: pqrs.filter((pqr: Pqr) => pqr.state === false).length,
        resueltas: pqrs.filter((pqr: Pqr) => pqr.state === true).length,
    };

    // Handlers
    const handleView = (pqr: Pqr) => {
        setSelectedPqr(pqr);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (pqr: Pqr) => {
        setSelectedPqr(pqr);
        setIsEditMode(true);
        setIsCreating(false);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedPqr(null);
        setIsEditMode(false);
        setIsCreating(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (pqrId: string, pqrName: string) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar "${pqrName}"?`)) {
            try {
                await dispatch(deletePqr(pqrId)).unwrap();
                // Opcional: mostrar notificación de éxito
            } catch (error) {
                console.error('Error al eliminar PQR:', error);
                // Opcional: mostrar notificación de error
            }
        }
    };

    const handleSavePqr = async (formData: any) => {
        try {
            if (isEditMode && selectedPqr) {
                const input: PqrUpdateInput = {
                    typePqr: formData.typePqr,
                    title: formData.title,
                    description: formData.description,
                    argument: formData.argument,
                    state: formData.state,
                    answer: formData.answer,
                    userName: formData.userName,
                    userEmail: formData.userEmail,
                    userPhone: formData.userPhone,
                };
                await dispatch(updatePqr({ id: selectedPqr.id, input })).unwrap();
            } else if (isCreating) {
                const input: PqrInput = {
                    typePqr: formData.typePqr,
                    title: formData.title,
                    description: formData.description,
                    argument: formData.argument,
                    answer: formData.answer,
                    userName: formData.userName,
                    userEmail: formData.userEmail,
                    userPhone: formData.userPhone,
                };
                await dispatch(addPqr(input)).unwrap();
            }
            setIsModalOpen(false);
            setSelectedPqr(null);
            setIsCreating(false);
            setIsEditMode(false);
            dispatch(fetchPqrs({ page: currentPage, size: 10 }));
        } catch (error) {
            console.error("Error saving PQR:", error);
        }
    };

    const handlePageChange = (newPage: number) => {
        dispatch(fetchPqrs({ page: newPage, size: 10 }));
    };

    // Mostrar loading spinner si está cargando
    if (loading && pqrs.length === 0) {
        return (
            <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-primary dark:border-dark-primary mx-auto mb-4"></div>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">Cargando PQRs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block">
                <Sidebar role={validRole} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-64">
                        <Sidebar role={validRole} />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                    <div className="px-4 py-4 sm:px-6 sm:py-6">
                        <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => router.back()}
                                    className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-light-text dark:text-dark-text truncate">
                                        Gestión de PQRs
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        Administra y consulta todas las peticiones, quejas y reclamos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                                    <p className="text-red-800 dark:text-red-200">
                                        Error al cargar las PQRs: {typeof error === 'string' ? error : (error?.message || 'Error desconocido')}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Stats Cards - Mejorado responsive */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                            <StatsCard
                                title="Total PQRs"
                                value={stats.total}
                                icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-blue-500"
                            />
                            <StatsCard
                                title="Peticiones"
                                value={stats.peticiones}
                                icon={<FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-green-500"
                            />
                            <StatsCard
                                title="Quejas"
                                value={stats.quejas}
                                icon={<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-yellow-500"
                            />
                            <StatsCard
                                title="Reclamos"
                                value={stats.reclamos}
                                icon={<MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-red-500"
                            />
                            <StatsCard
                                title="Pendientes"
                                value={stats.pendientes}
                                icon={<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-orange-500"
                            />
                            <StatsCard
                                title="Resueltas"
                                value={stats.resueltas}
                                icon={<MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />}
                                color="bg-emerald-500"
                            />
                        </div>

                        {/* Filtros y búsqueda - Mejorado responsive */}
                        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-4 sm:p-6 mb-6 border border-light-border dark:border-dark-border">
                            <div className="flex flex-col gap-4">
                                {/* Barra de búsqueda */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por título o descripción..."
                                        className="w-full pl-10 pr-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Filtros y botón crear */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                                        <select
                                            className="px-3 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text text-sm"
                                            value={typeFilter}
                                            onChange={(e) => setTypeFilter(e.target.value)}
                                        >
                                            <option value="all">Todos los tipos</option>
                                            <option value="Peticion">Peticiones</option>
                                            <option value="Queja">Quejas</option>
                                            <option value="Reclamo">Reclamos</option>
                                        </select>

                                        <select
                                            className="px-3 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text text-sm"
                                            value={stateFilter}
                                            onChange={(e) => setStateFilter(e.target.value)}
                                        >
                                            <option value="all">Todos los estados</option>
                                            <option value="pending">Pendientes</option>
                                            <option value="resolved">Resueltas</option>
                                        </select>
                                    </div>
                                    
                                    <button
                                        onClick={handleCreate}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium whitespace-nowrap"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Crear PQR</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PQR Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {filteredPqrs.map((pqr: Pqr) => (
                                <PqrCard
                                    key={pqr.id}
                                    pqr={pqr}
                                    onView={handleView}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredPqrs.length === 0 && !loading && (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-2">
                                    No se encontraron PQRs
                                </h3>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
                                    {pqrs.length === 0 ? 'No hay PQRs registradas' : 'Intenta ajustar los filtros de búsqueda'}
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                        className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-border dark:hover:bg-dark-border transition-colors text-sm"
                                    >
                                        Anterior
                                    </button>

                                    <span className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg text-sm">
                                        {currentPage} de {totalPages}
                                    </span>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages}
                                        className="px-4 py-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-border dark:hover:bg-dark-border transition-colors text-sm"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Loading overlay for updates */}
                    {loading && pqrs.length > 0 && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 flex items-center gap-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-light-primary dark:border-dark-primary"></div>
                                <p className="text-light-text dark:text-dark-text">Procesando...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal */}
                <PqrModal
                    formData={
                        isEditMode && selectedPqr ? {
                            ...selectedPqr,
                            userPhone: selectedPqr.userPhone || user?.phone || '',
                            answer: selectedPqr.answer || '',
                        } : {
                            typePqr: TypePqr.Peticion,
                            title: '',
                            description: '',
                            argument: '',
                            userName: user?.name || '',
                            userEmail: user?.email || '',
                            userPhone: user?.phone || '',
                            state: false,
                            answer: '',
                        }
                    }
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedPqr(null);
                        setIsCreating(false);
                        setIsEditMode(false);
                    }}
                    onSave={handleSavePqr}
                    isEditMode={isEditMode}
                />
            </div>
        </div>
    );
};

export default PqrDashboard;