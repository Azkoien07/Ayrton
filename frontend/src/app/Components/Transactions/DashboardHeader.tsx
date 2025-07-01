import React from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps } from '@Types/dashboard';

interface DashboardHeaderProps {
    validRole: string;
    fetchPayments: () => void;
    fetchVouchers: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ validRole, fetchPayments, fetchVouchers }) => {
    return (
        <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                            Panel de{' '}
                            <span className="text-light-primary dark:text-dark-primary capitalize">
                                {validRole}
                            </span>
                        </h1>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                            {new Date().toLocaleDateString('es-ES', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>
                    <button 
                        onClick={() => { fetchPayments(); fetchVouchers(); }}
                        className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Actualizar
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
