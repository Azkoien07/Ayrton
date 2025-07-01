'use client';

import { Search, Plus, FileText, AlertCircle, MessageSquare, ArrowLeft, Menu, X } from 'lucide-react';
import PqrCard from '@/app/Components/Pqrs/PqrCard';
import StatsCard from '@/app/Components/Pqrs/StatsCard';
import PqrModal from '@/app/Components/Pqrs/PqrModal';
import { useUser  } from '@context/userContext';
import Sidebar from '@/app/Components/UI/Sidebar';
import { useState, useEffect } from 'react';
import { cn } from '@utilities/utils';
import usePqrHandlers from '@/app/Julian/handlesPqr';
import { Pqr } from '@/app/Types/Pqr';
import { TypePqr } from '@/generated/graphql';

const PqrDashboard = () => {
    const { user } = useUser ();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
    const {
        data: pqrs,
        loading,
        totalItems,
        page,
        setPage,
        handleAddPqr,
        handleUpdatePqr,
        handleDeletePqr,
    } = usePqrHandlers();

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [stateFilter, setStateFilter] = useState('all');
    const [selectedPqr, setSelectedPqr] = useState<Pqr | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const filteredPqrs = pqrs.filter(pqr => {
        const matchesSearch = pqr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              pqr.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || pqr.typePqr === typeFilter;
        const matchesState = stateFilter === 'all' || 
                             (stateFilter === 'pending' && pqr.state === false) || // 'PENDING' es false
                             (stateFilter === 'resolved' && pqr.state === true); // 'RESOLVED' es true
        return matchesSearch && matchesType && matchesState;
    });

    const stats = {
        total: pqrs.length,
        peticiones: pqrs.filter(pqr => pqr.typePqr === 'Peticion').length,
        quejas: pqrs.filter(pqr => pqr.typePqr === 'Queja').length,
        reclamos: pqrs.filter(pqr => pqr.typePqr === 'Reclamo').length,
        pendientes: pqrs.filter(pqr => pqr.state === false).length, // 'PENDING' es false
        resueltas: pqrs.filter(pqr => pqr.state === true).length, // 'RESOLVED' es true
    };

    const handleView = (pqr: Pqr) => {
        setSelectedPqr(pqr);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEdit = (pqr: Pqr) => {
        setSelectedPqr(pqr);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (pqrId: string, pqrName: string) => {
        await handleDeletePqr(pqrId, pqrName);
    };

    const handleSavePqr = async (formData: any) => {
        if (isEditMode && selectedPqr) {
            await handleUpdatePqr({
                id: selectedPqr.id,
                input: {
                    typePqr: formData.typePqr,
                    title: formData.title,
                    description: formData.description,
                    argument: formData.argument,
                    state: formData.state as boolean,
                    answer: formData.answer || '', // Asegurarse de enviar answer
                    userName: formData.userName,
                    userEmail: formData.userEmail,
                    userPhone: formData.userPhone,
                }
            });
        } else {
            await handleAddPqr({
                typePqr: formData.typePqr,
                title: formData.title,
                description: formData.description,
                argument: formData.argument,
                userName: formData.userName,
                userEmail: formData.userEmail,
                userPhone: formData.userPhone,
            });
        }
        setIsModalOpen(false);
        setSelectedPqr(null);
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const handleGoBack = () => {
        window.history.back();
    };

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
                                    onClick={handleGoBack}
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

                <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                        <StatsCard
                            title="Total PQRs"
                            value={stats.total}
                            icon={<FileText className="w-6 h-6 text-white" />}
                            color="bg-blue-500"
                        />
                        <StatsCard
                            title="Peticiones"
                            value={stats.peticiones}
                            icon={<FileText className="w-6 h-6 text-white" />}
                            color="bg-green-500"
                        />
                        <StatsCard
                            title="Quejas"
                            value={stats.quejas}
                            icon={<AlertCircle className="w-6 h-6 text-white" />}
                            color="bg-yellow-500"
                        />
                        <StatsCard
                            title="Reclamos"
                            value={stats.reclamos}
                            icon={<MessageSquare className="w-6 h-6 text-white" />}
                            color="bg-red-500"
                        />
                        <StatsCard
                            title="Pendientes"
                            value={stats.pendientes}
                            icon={<AlertCircle className="w-6 h-6 text-white" />}
                            color="bg-orange-500"
                        />
                        <StatsCard
                            title="Resueltas"
                            value={stats.resueltas}
                            icon={<MessageSquare className="w-6 h-6 text-white" />}
                            color="bg-emerald-500"
                        />
                    </div>

                    {/* Filtros y búsqueda */}
                    <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 mb-6 border border-light-border dark:border-dark-border">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por título o descripción..."
                                        className="w-full pl-10 pr-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <select
                                    className="px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                >
                                    <option value="all">Todos los tipos</option>
                                    <option value="Peticion">Peticiones</option>
                                    <option value="Queja">Quejas</option>
                                    <option value="Reclamo">Reclamos</option>
                                </select>

                                <select
                                    className="px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                    value={stateFilter}
                                    onChange={(e) => setStateFilter(e.target.value)}
                                >
                                    <option value="all">Todos los estados</option>
                                    <option value="pending">Pendientes</option>
                                    <option value="resolved">Resueltas</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredPqrs.map((pqr) => (
                            <PqrCard
                                key={pqr.id}
                                pqr={pqr}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {filteredPqrs.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-2">
                                No se encontraron PQRs
                            </h3>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                Intenta ajustar los filtros de búsqueda
                            </p>
                        </div>
                    )}
                </div>
                <PqrModal
                    formData={selectedPqr ? {
                        typePqr: selectedPqr.typePqr,
                        title: selectedPqr.title,
                        description: selectedPqr.description,
                        argument: selectedPqr.argument,
                        userName: selectedPqr.userName,
                        userEmail: selectedPqr.userEmail,
                        userPhone: user?.phone || '', // Asegurar que userPhone esté presente
                        state: selectedPqr.state,
                        answer: selectedPqr.answer || '',
                    } : {
                        typePqr: TypePqr.Peticion,
                        title: '',
                        description: '',
                        argument: '',
                        userName: user?.name || '', 
                        userEmail: user?.email || '', 
                        userPhone: user?.phone || '', 
                        answer: '',
                    }}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedPqr(null);
                    }}
                    onSave={handleSavePqr}
                    isEditMode={isEditMode}
                />
            </div>
        </div>
    );
};

export default PqrDashboard;
