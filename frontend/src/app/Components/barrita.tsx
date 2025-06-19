import React from 'react';

const quickStats = [
    {
        label: 'Visitas',
        value: 1200,
        trend: '+5%',
        color: 'text-green-500'
    },
    {
        label: 'Ventas',
        value: 300,
        trend: '-2%',
        color: 'text-red-500'
    },
];

export default function Barrita() {
    return (
        <div className="px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                        Bienvenido, 
                        <span className="text-light-primary dark:text-dark-primary capitalize">
                            Julian
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
                
                {/* Stats Rápidas en Header */}
                <div className="hidden lg:flex items-center gap-6">

                </div>
            </div>
        </div>
    );
}