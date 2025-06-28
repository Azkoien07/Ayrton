import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, CreditCard, Receipt } from 'lucide-react';

interface DashboardStats {
    totalIngresos: number;
    totalEgresos: number;
    totalTransacciones: number;
    transaccionesPendientes: number;
    ingresosTrend: number;
    egresosTrend: number;
}

interface QuickStatsSectionProps {
    stats: DashboardStats;
    vouchersLength: number;
}

const QuickStatsSection: React.FC<QuickStatsSectionProps> = ({ stats, vouchersLength }) => {
    const quickStats = [
        { 
            label: 'Total Ingresos', 
            value: `$${stats.totalIngresos.toLocaleString()}`, 
            trend: `${stats.ingresosTrend >= 0 ? '+' : ''}${stats.ingresosTrend.toFixed(1)}%`, 
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            icon: TrendingUp,
            isPositive: stats.ingresosTrend >= 0
        },
        { 
            label: 'Total Egresos', 
            value: `$${stats.totalEgresos.toLocaleString()}`, 
            trend: `${stats.egresosTrend >= 0 ? '+' : ''}${stats.egresosTrend.toFixed(1)}%`, 
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            icon: TrendingDown,
            isPositive: stats.egresosTrend <= 0
        },
        { 
            label: 'Transacciones', 
            value: stats.totalTransacciones.toString(), 
            trend: 'Total', 
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            icon: CreditCard,
            isPositive: null
        },
        { 
            label: 'Vouchers Activos', 
            value: vouchersLength.toString(), 
            trend: 'Activos', 
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
            icon: Receipt,
            isPositive: null
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="px-6 pb-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} 
                            className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border
                                hover:shadow-lg hover:shadow-light-primary/5 dark:hover:shadow-dark-primary/5 transition-all duration-300
                                hover:border-light-primary/20 dark:hover:border-dark-primary/20 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                    stat.isPositive === true ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                    stat.isPositive === false ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                                    'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wide mb-1">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-light-text dark:text-dark-text">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default QuickStatsSection;
