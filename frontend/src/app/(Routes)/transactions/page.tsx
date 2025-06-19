'use client';

import { useState } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';

import Task from '@/app/Components/Task';
import UserContentAdmin from '@/app/Components/content/UserContentAdmin';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    CreditCard, 
    Users, 
    Clock,
    Plus,
    Filter,
    Search,
    MoreVertical,
    Eye,
    Edit,
    Trash2
} from 'lucide-react';

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const sections = roleOptions[validRole as keyof typeof roleOptions];

    const quickStats = [
        { 
            label: 'Ingresos', 
            value: '$12,000', 
            trend: '+5%', 
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            icon: TrendingUp,
            isPositive: true
        },
        { 
            label: 'Egresos', 
            value: '$8,500', 
            trend: '-2%', 
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            icon: TrendingDown,
            isPositive: false
        },
        { 
            label: 'Transacciones', 
            value: '320', 
            trend: '+12', 
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
            icon: CreditCard,
            isPositive: true
        },
        { 
            label: 'Pendientes', 
            value: '7', 
            trend: '0', 
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
            icon: Clock,
            isPositive: null
        },
    ];

    
    const recentTransactions = [
        { id: 1, description: 'Pago de servicios', amount: -450, date: '2024-01-15', status: 'completado', type: 'egreso' },
        { id: 2, description: 'Venta de producto', amount: 1200, date: '2024-01-15', status: 'completado', type: 'ingreso' },
        { id: 3, description: 'Transferencia bancaria', amount: -800, date: '2024-01-14', status: 'pendiente', type: 'egreso' },
        { id: 4, description: 'Pago de cliente', amount: 2500, date: '2024-01-14', status: 'completado', type: 'ingreso' },
        { id: 5, description: 'Compra de insumos', amount: -300, date: '2024-01-13', status: 'completado', type: 'egreso' },
        { id: 6, description: 'Comisión por venta', amount: 150, date: '2024-01-13', status: 'procesando', type: 'ingreso' },
    ];
    const currentPlans = [
        { 
            id: 1, 
            name: 'Expansión Digital', 
            progress: 75, 
            budget: 15000, 
            spent: 11250, 
            status: 'en_progreso',
            deadline: '2024-03-15',
            team: 5
        },
        { 
            id: 2, 
            name: 'Optimización de Procesos', 
            progress: 45, 
            budget: 8000, 
            spent: 3600, 
            status: 'en_progreso',
            deadline: '2024-02-28',
            team: 3
        },
        { 
            id: 3, 
            name: 'Capacitación de Personal', 
            progress: 90, 
            budget: 5000, 
            spent: 4500, 
            status: 'completado',
            deadline: '2024-01-30',
            team: 8
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completado': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'pendiente': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'procesando': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'en_progreso': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const filteredTransactions = recentTransactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                {/* Header Compacto */}
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
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto">
                    {/* Sección de Bienvenida */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
                            <div className='flex items-center space-x-2 mb-4'>
                                <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Panel</span>
                                <span className='text-light-text dark:text-dark-text text-3xl font-bold'>de transacciones</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl">
                                Gestiona tus finanzas, monitorea transacciones y supervisa el progreso de tus proyectos desde un solo lugar.
                            </p>
                        </div>
                    </motion.div>

                    {/* Estadísticas Rápidas */}
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

                    {/* Sección de Transacciones Recientes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="px-6 pb-6"
                    >
                        <div className='rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border'>
                            <div className="p-6 border-b border-light-border dark:border-dark-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                                        Transacciones Recientes
                                    </h2>
                                    <button className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Nueva
                                    </button>
                                </div>
                                
                                {/* Filtros y búsqueda */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Buscar transacciones..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                        />
                                    </div>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                                    >
                                        <option value="all">Todos los estados</option>
                                        <option value="completado">Completado</option>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="procesando">Procesando</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-light-background dark:bg-dark-background">
                                        <tr>
                                            <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Descripción</th>
                                            <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Monto</th>
                                            <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Fecha</th>
                                            <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Estado</th>
                                            <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((transaction, index) => (
                                            <tr key={transaction.id} className="border-t border-light-border dark:border-dark-border hover:bg-light-background/50 dark:hover:bg-dark-background/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${transaction.amount > 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                                                            {transaction.amount > 0 ? 
                                                                <TrendingUp className="w-4 h-4 text-green-600" /> : 
                                                                <TrendingDown className="w-4 h-4 text-red-600" />
                                                            }
                                                        </div>
                                                        <span className="font-medium text-light-text dark:text-dark-text">
                                                            {transaction.description}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-light-textSecondary dark:text-dark-textSecondary">
                                                    {new Date(transaction.date).toLocaleDateString('es-ES')}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                            <Eye className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                                        </button>
                                                        <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                            <Edit className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                                        </button>
                                                        <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>

                    {/* Manejo de Planes/Proyectos */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="px-6 pb-6"
                    >
                        <div className='rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border'>
                            <div className="p-6 border-b border-light-border dark:border-dark-border">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                                        Proyectos Activos
                                    </h2>
                                    <button className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                                        <Plus className="w-4 h-4" />
                                        Nuevo Proyecto
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {currentPlans.map((plan) => (
                                    <div key={plan.id} className="bg-light-background dark:bg-dark-background rounded-lg p-6 border border-light-border dark:border-dark-border">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                                    {plan.name}
                                                </h3>
                                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    Fecha límite: {new Date(plan.deadline).toLocaleDateString('es-ES')}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    <Users className="w-4 h-4" />
                                                    {plan.team} miembros
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                                                    {plan.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    Progreso
                                                </span>
                                                <span className="text-sm font-medium text-light-text dark:text-dark-text">
                                                    {plan.progress}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2">
                                                <div 
                                                    className="bg-light-primary dark:bg-dark-primary h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${plan.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Presupuesto</p>
                                                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                                                        ${plan.budget.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Gastado</p>
                                                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                                                        ${plan.spent.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">Restante</p>
                                                    <p className="text-sm font-medium text-green-600">
                                                        ${(plan.budget - plan.spent).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-light-card dark:hover:bg-dark-card rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;