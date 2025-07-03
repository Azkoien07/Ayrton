'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@store/store';
import { TypePqr } from '@/generated/graphql';
import { fetchPqrs } from '@slice/pqrSlice';
import Sidebar from '@components/UI/Sidebar';
import PqrSubmissionSuccess from '@components/Pqrs/PqrSubmissionSuccess';
import PqrListPanel from '@components/Pqrs/PqrListPanel';
import PqrFormSteps from '@components/Pqrs/PqrFormSteps';

const PqrUserPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector(
        (state: RootState) => state.pqr
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedPqrType, setSubmittedPqrType] = useState<TypePqr | undefined>(undefined);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPqrPanel, setShowPqrPanel] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (showPqrPanel) {
            dispatch(fetchPqrs({ page: 0, size: 5 }));
        }
    }, [dispatch, showPqrPanel]);

    const handleSubmissionSuccess = (typePqr: TypePqr | undefined) => {
        setSubmittedPqrType(typePqr);
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setSubmittedPqrType(undefined);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    console.log({ isClient, isSubmitted, showPqrPanel });
    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block">
                <Sidebar role={'user'} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-64">
                        <Sidebar role={'user'} />
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
                                        {isClient && showPqrPanel ? 'Mis PQRs' : 'Crear Nueva PQR'}
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        {isClient && showPqrPanel ? 'Consulta el estado de tus peticiones, quejas y reclamos' : 'Completa el formulario para enviar tu petición, queja o reclamo'}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowPqrPanel(!showPqrPanel)}
                                    className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                                >
                                    {isClient && showPqrPanel ? 'Crear PQR' : 'Ver Mis PQRs'}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {isClient && isSubmitted ? (
                    <PqrSubmissionSuccess
                        typePqr={submittedPqrType}
                        onResetForm={resetForm}
                        onGoBack={handleGoBack}
                    />
                ) : isClient && showPqrPanel ? (
                    <PqrListPanel
                        data={data}
                        loading={loading}
                        setShowPqrPanel={setShowPqrPanel}
                    />
                ) : (
                    <PqrFormSteps onSubmissionSuccess={handleSubmissionSuccess} />
                )}
            </div>
        </div>
    );
};

export default PqrUserPage;