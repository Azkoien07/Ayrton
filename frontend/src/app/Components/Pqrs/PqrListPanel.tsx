import React from 'react';
import { FileText, AlertCircle, MessageSquare, Calendar, User, Eye } from 'lucide-react';
import { Pqr } from '@/generated/graphql';

interface PqrListPanelProps {
    data: Pqr[] | null | undefined;
    loading: boolean;
    setShowPqrPanel: (show: boolean) => void;
}

const PqrListPanel: React.FC<PqrListPanelProps> = ({ data, loading, setShowPqrPanel }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'resolved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Pendiente';
            case 'in_progress':
                return 'En Progreso';
            case 'resolved':
                return 'Resuelto';
            case 'rejected':
                return 'Rechazado';
            default:
                return 'Desconocido';
        }
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <div className="bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                Mis PQRs ({data?.length || 0})
                            </h2>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-light-primary dark:border-dark-primary"></div>
                            </div>
                        ) : data && data.length > 0 ? (
                            <div className="space-y-4">
                                {data.map((pqr: any, index: number) => (
                                    <div
                                        key={pqr.id || index}
                                        className="border border-light-border dark:border-dark-border rounded-lg p-4 hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
                                                        {pqr.typePqr === 'PETICION' ? <FileText className="w-4 h-4 text-light-primary dark:text-dark-primary" /> :
                                                            pqr.typePqr === 'QUEJA' ? <AlertCircle className="w-4 h-4 text-light-primary dark:text-dark-primary" /> :
                                                                <MessageSquare className="w-4 h-4 text-light-primary dark:text-dark-primary" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-light-text dark:text-dark-text">
                                                            {pqr.title}
                                                        </h3>
                                                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                            {pqr.typePqr}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary line-clamp-2 mb-3">
                                                    {pqr.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {pqr.createdAt ? new Date(pqr.createdAt).toLocaleDateString() : 'Fecha no disponible'}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {pqr.userName}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pqr.state ? 'resolved' : 'pending')}`}>
                                                    {getStatusText(pqr.state ? 'resolved' : 'pending')}
                                                </span>
                                                <button className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-2">
                                    No tienes PQRs creadas
                                </h3>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                                    Crea tu primera petición, queja o reclamo para comenzar.
                                </p>
                                <button
                                    onClick={() => setShowPqrPanel(false)}
                                    className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Crear PQR
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PqrListPanel;
