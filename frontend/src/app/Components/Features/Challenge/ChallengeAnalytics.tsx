import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function ChallengeAnalytics() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-light-card rounded-lg p-6 shadow-sm border border-light-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-light-text">
                    <BarChart3 className="w-5 h-5 text-light-primary" />
                    Progreso Semanal
                </h3>
                <div className="h-64 flex items-end justify-center">
                    <p className="text-light-textSecondary">Gráfico de progreso aquí</p>
                </div>
            </div>
            
            <div className="bg-light-card rounded-lg p-6 shadow-sm border border-light-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-light-text">
                    <TrendingUp className="w-5 h-5 text-light-primary" />
                    Estadísticas
                </h3>
                <div className="space-y-4 text-light-textSecondary">
                    <div className="flex justify-between">
                        <span>Tasa de Completado</span>
                        <span className="font-semibold text-light-text">N/A</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Racha Más Larga</span>
                        <span className="font-semibold text-light-text">N/A</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Categoría Favorita</span>
                        <span className="font-semibold text-light-text">N/A</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Puntos Este Mes</span>
                        <span className="font-semibold text-light-text">N/A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
