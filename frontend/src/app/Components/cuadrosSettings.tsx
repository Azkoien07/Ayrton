'use client';

import { useState } from 'react';
import { DashboardProps, roleOptions } from '@/app/Types/dashboard';
import { motion } from 'framer-motion';
import { 
    Settings, 
    Palette, 
    Bell, 
    Shield, 
    Users, 
    Database,
    Monitor,
    Globe,
    Lock,
    Zap,
    Eye,
    Download
} from 'lucide-react';

export default function CuadrosSettings({ role }: DashboardProps) {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const sections = roleOptions[validRole as keyof typeof roleOptions];
    const settingsCards = [
        {
            id: 1,
            title: 'Configuración General',
            description: 'Ajustes básicos del sistema y preferencias generales',
            icon: Settings,
            color: 'blue',
            actions: ['Editar', 'Ver detalles']
        },
        {
            id: 2,
            title: 'Personalización',
            description: 'Temas, colores y personalización de la interfaz',
            icon: Palette,
            color: 'purple',
            actions: ['Personalizar', 'Vista previa']
        },
        {
            id: 3,
            title: 'Notificaciones',
            description: 'Gestiona alertas, emails y notificaciones push',
            icon: Bell,
            color: 'yellow',
            actions: ['Configurar', 'Probar']
        },
        {
            id: 4,
            title: 'Seguridad',
            description: 'Configuración de seguridad y autenticación',
            icon: Shield,
            color: 'green',
            actions: ['Configurar', 'Auditoría']
        },
        {
            id: 5,
            title: 'Gestión de Usuarios',
            description: 'Administra usuarios, roles y permisos',
            icon: Users,
            color: 'indigo',
            actions: ['Gestionar', 'Roles']
        },
        {
            id: 6,
            title: 'Base de Datos',
            description: 'Configuración y respaldos de la base de datos',
            icon: Database,
            color: 'gray',
            actions: ['Configurar', 'Respaldar']
        },
    ];

const getColorClasses = (color: string) => {
        const colorMap = {
            blue: {
                bg: 'bg-blue-50 dark:bg-blue-900/20',
                icon: 'text-blue-600 dark:text-blue-400',
                button: 'bg-blue-600 hover:bg-blue-700',
                border: 'border-blue-200 dark:border-blue-800'
            },
            purple: {
                bg: 'bg-purple-50 dark:bg-purple-900/20',
                icon: 'text-purple-600 dark:text-purple-400',
                button: 'bg-purple-600 hover:bg-purple-700',
                border: 'border-purple-200 dark:border-purple-800'
            },
            yellow: {
                bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                icon: 'text-yellow-600 dark:text-yellow-400',
                button: 'bg-yellow-600 hover:bg-yellow-700',
                border: 'border-yellow-200 dark:border-yellow-800'
            },
            green: {
                bg: 'bg-green-50 dark:bg-green-900/20',
                icon: 'text-green-600 dark:text-green-400',
                button: 'bg-green-600 hover:bg-green-700',
                border: 'border-green-200 dark:border-green-800'
            },
            indigo: {
                bg: 'bg-indigo-50 dark:bg-indigo-900/20',
                icon: 'text-indigo-600 dark:text-indigo-400',
                button: 'bg-indigo-600 hover:bg-indigo-700',
                border: 'border-indigo-200 dark:border-indigo-800'
            },
            gray: {
                bg: 'bg-gray-50 dark:bg-gray-900/20',
                icon: 'text-gray-600 dark:text-gray-400',
                button: 'bg-gray-600 hover:bg-gray-700',
                border: 'border-gray-200 dark:border-gray-800'
            }, 
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    };

    return (
           <div className="space-y-6">
            {/* Grid de configuraciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {settingsCards.map((card, index) => {
                    const IconComponent = card.icon;
                    const colors = getColorClasses(card.color);
                    
                    return (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className={`bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border
                                hover:shadow-lg hover:shadow-light-primary/5 dark:hover:shadow-dark-primary/5 
                                transition-all duration-300 group cursor-pointer
                                hover:border-light-primary/20 dark:hover:border-dark-primary/20
                                hover:-translate-y-1`}
                        >
                            {/* Header con icono */}
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                                        <div className="w-2 h-2 bg-light-primary/60 dark:bg-dark-primary/60 rounded-full"></div>
                                        <div className="w-2 h-2 bg-light-primary/30 dark:bg-dark-primary/30 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col gap-2">
                                {card.actions.map((action, actionIndex) => (
                                    <button
                                        key={actionIndex}
                                        className={`w-full py-2 px-4 text-sm font-medium text-white rounded-lg 
                                            ${colors.button} transition-all duration-200
                                            transform hover:scale-105 active:scale-95`}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>

                            {/* Indicador de estado */}
                            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
                                <div className="flex items-center justify-between text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                    <span>Estado: Activo</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>Online</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Sección de configuraciones avanzadas */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="bg-light-card dark:bg-dark-card rounded-xl p-6 border border-light-border dark:border-dark-border"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                        Configuraciones Avanzadas
                    </h2>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                        </button>
                        <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-light-background dark:bg-dark-background rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Lock className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                            <span className="font-medium text-light-text dark:text-dark-text">Modo Desarrollador</span>
                        </div>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3">
                            Habilita funciones avanzadas para desarrollo
                        </p>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only" />
                            <div className="relative">
                                <div className="w-10 h-6 bg-light-border dark:bg-dark-border rounded-full shadow-inner"></div>
                                <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>

                    <div className="bg-light-background dark:bg-dark-background rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span className="font-medium text-light-text dark:text-dark-text">Modo Rendimiento</span>
                        </div>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3">
                            Optimiza el sistema para máximo rendimiento
                        </p>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only" />
                            <div className="relative">
                                <div className="w-10 h-6 bg-light-border dark:bg-dark-border rounded-full shadow-inner"></div>
                                <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                    </div>

                    <div className="bg-light-background dark:bg-dark-background rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">


                            <Monitor className="w-5 h-5 text-blue-500" />
                            <span className="font-medium text-light-text dark:text-dark-text">Monitoreo Avanzado</span>
                        </div>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3">
                            Logging detallado y métricas en tiempo real
                        </p>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only" />
                            <div className="relative">
                                <div className="w-10 h-6 bg-light-border dark:bg-dark-border rounded-full shadow-inner"></div>
                                <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform duration-300 ease-in-out"></div>
                            </div>
                        </label>
                        
                    </div>
                </div>
            </motion.div>
        </div>
    );
}