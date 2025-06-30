import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiHome, FiSettings, FiCreditCard, FiLogOut, FiChevronRight,
    FiUser, FiUsers, FiClipboard, FiVoicemail, FiBarChart,
    FiShield, FiDatabase, FiTrendingUp,FiXOctagon
} from "react-icons/fi";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
type UserRole = 'admin' | 'user' | 'superadmin' | null;
const adminNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/UserManagement/Admin", color: "from-light-primary to-light-secondary", description: "Panel de control administrativo" },
    { name: "Transactions", icon: <FiCreditCard />, href: "/Transactions", color: "from-light-warning to-orange-500", description: "Gestión de transacciones" },
    { name: "User Management", icon: <FiUsers />, href: "/UserManagement/pqrs", color: "from-blue-500 to-blue-600", description: "Administración de usuarios" },
    { name: "Ranking", icon: <FiTrendingUp />, href: "/UserManagement/RankingUsers", color: "from-purple-500 to-purple-600", description: "Ranking de usuarios" },
    { name: "Settings", icon: <FiSettings />, href: "/UserManagement/Settings", color: "from-slate-500 to-slate-600", description: "Configuración del sistema" },
];
const superAdminNavItems = [
    ...adminNavItems,
    { name: "System Control", icon: <FiShield />, href: "/SuperAdmin/SystemControl", color: "from-red-500 to-red-600", description: "Control total del sistema" },
    { name: "Database", icon: <FiDatabase />, href: "/SuperAdmin/Database", color: "from-gray-700 to-gray-800", description: "Gestión de base de datos" },
];
const userNavItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/UserManagement/UserBasic", color: "from-light-primary to-light-secondary", description: "Mi panel personal" },
    { name: "Tasks", icon: <FiClipboard />, href: "/Tasks", color: "from-green-500 to-green-600", description: "Mis tareas" },
    { name: "Plans", icon: <FiCreditCard />, href: "/Pay", color: "from-light-warning to-orange-500", description: "Planes y pagos" },
     { name: "Challenges", icon: <FiXOctagon />, href: "/Challenge", color: "from-light-warning to-orange-500", description: "Planes y pagos" },
    { name: "Pqrs", icon: <FiVoicemail />, href: "/PqrUser", color: "from-blue-500 to-blue-600", description: "Soporte y PQRS" },
    { name: "Settings", icon: <FiSettings />, href: "/UserManagement/Settings", color: "from-slate-500 to-slate-600", description: "Mi configuración" },
];

interface SidebarProps {
    sidebarOpen?: boolean;
    setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    onProfileClick?: () => void;
    role?: UserRole;
}

const getNavigationItems = (role: UserRole) => {
    switch (role) {
        case 'superadmin': return superAdminNavItems;
        case 'admin': return adminNavItems;
        case 'user': return userNavItems;
        default: return userNavItems;
    }
};

const getRoleDisplayText = (role: UserRole): string => {
    switch (role) {
        case 'superadmin': return 'Super Admin';
        case 'admin': return 'Administrator';
        case 'user': return 'User';
        default: return 'Guest';
    }
};

const getRoleColor = (role: UserRole): string => {
    switch (role) {
        case 'superadmin': return 'text-red-500 dark:text-red-400';
        case 'admin': return 'text-blue-500 dark:text-blue-400';
        case 'user': return 'text-green-500 dark:text-green-400';
        default: return 'text-gray-500 dark:text-gray-400';
    }
};

export default function Sidebar({ sidebarOpen: propSidebarOpen, setSidebarOpen: propSetSidebarOpen, onProfileClick }: SidebarProps) {
    const { role, user } = useSelector((state: RootState) => state.auth);
    const validatedRole = role;


    const [internalSidebarOpen, setInternalSidebarOpen] = useState(true);
    const [isManualToggle, setIsManualToggle] = useState(false);
    const [active, setActive] = useState("");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const sidebarOpen = propSidebarOpen !== undefined ? propSidebarOpen : internalSidebarOpen;
    const setSidebarOpen = propSetSidebarOpen || setInternalSidebarOpen;

    const displayedNavItems = getNavigationItems(validatedRole);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            setActive(currentPath);
        }
    }, []);

    const toggleSideBarCollapseHandler = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsManualToggle(true);
        setSidebarOpen((prev) => !prev);
        setTimeout(() => setIsManualToggle(false), 3000);
    };

    const handleProfileClick = () => {
        if (onProfileClick) {
            onProfileClick();
        } else {
            window.location.href = '/UserManagement/ProfileUser';
        }
    };

    const handleLogout = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            window.location.href = "/";
        }
    };

    const validRoles: UserRole[] = ['admin', 'user', 'superadmin'];

    if (role === null || role === undefined) {
        return null;
    }
    if (!validRoles.includes(role as UserRole)) {
        return (
            <motion.aside
                className="fixed top-0 left-0 h-screen w-64 z-50 bg-red-50 dark:bg-red-900/20 
                          border-r border-red-200 dark:border-red-800 flex items-center justify-center"
            >
                <div className="text-center p-4">
                    <FiShield className="w-12 h-12 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                        Rol no válido
                    </p>
                    <p className="text-red-500 dark:text-red-300 text-sm mt-1">
                        Contacta al administrador
                    </p>
                </div>
            </motion.aside>
        );
    }

    return (
        <motion.aside
            onHoverStart={() => !isManualToggle && setSidebarOpen(true)}
            onHoverEnd={() => !isManualToggle && setSidebarOpen(false)}
            animate={{
                width: sidebarOpen ? 280 : 90,
                boxShadow: sidebarOpen
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 0.8
            }}
            className="fixed top-0 left-0 h-screen z-50
                bg-white dark:bg-dark-card
                border-r border-light-border dark:border-dark-border
                backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95
                flex flex-col overflow-hidden"
        >
            {/* Header con logo y toggle */}
            <motion.div
                className="flex items-center justify-between h-20 border-b border-light-border dark:border-dark-border px-4 relative"
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex items-center">
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col"
                        >
                            <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
                                Ayrton
                            </h1>
                            <span className={`text-xs font-medium ${getRoleColor(validatedRole)}`}>
                                {getRoleDisplayText(validatedRole)}
                            </span>
                        </motion.div>
                    )}
                </div>

                <motion.button
                    className="w-8 h-8 bg-light-accentSoft dark:bg-dark-accentSoft 
                               border border-light-border dark:border-dark-border
                               rounded-lg flex items-center justify-center shadow-sm
                               hover:bg-light-accent dark:hover:bg-dark-accent 
                               hover:text-white transition-all duration-200"
                    onClick={toggleSideBarCollapseHandler}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
                >
                    <motion.div
                        animate={{ rotate: sidebarOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FiChevronRight className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                    </motion.div>
                </motion.button>
            </motion.div>

            {/* Navigation */}
            <nav className="flex flex-col mt-8 gap-2 px-4 flex-grow">
                {displayedNavItems.map(({ name, icon, href, color, description }, index) => {
                    const isActive = active === href;
                    const isHovered = hoveredItem === href;

                    return (
                        <motion.div
                            key={href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <motion.a
                                href={href}
                                onClick={() => setActive(href)}
                                onHoverStart={() => setHoveredItem(href)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className={`
                                    flex items-center gap-4 rounded-xl px-4 py-3.5 cursor-pointer select-none
                                    relative overflow-hidden group transition-all duration-300
                                    ${isActive
                                        ? "bg-light-primary dark:bg-dark-primary text-white shadow-lg shadow-light-primary/20 dark:shadow-dark-primary/20"
                                        : "text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-accentSoft dark:hover:bg-dark-accentSoft"
                                    }
                                `}
                                whileHover={{
                                    scale: 1.02,
                                    x: 4
                                }}
                                whileTap={{ scale: 0.98 }}
                                layout
                                title={!sidebarOpen ? description : undefined}
                            >
                                {/* Gradient background for active state */}
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-90 rounded-xl`}
                                        layoutId="activeBackground"
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    className={`
                                        relative z-10 text-xl p-1 rounded-lg
                                        ${isActive
                                            ? "text-white"
                                            : isHovered
                                                ? "text-light-primary dark:text-dark-primary"
                                                : ""
                                        }
                                    `}
                                    whileHover={{ rotate: 5 }}
                                >
                                    {icon}
                                </motion.div>

                                {/* Text */}
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className={`
                                                whitespace-nowrap font-semibold text-base relative z-10
                                                ${isActive ? "text-white" : ""}
                                            `}
                                        >
                                            {name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Tooltip for collapsed state */}
                                {!sidebarOpen && isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="absolute left-16 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border
                                            px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-50
                                            text-light-text dark:text-dark-text"
                                    >
                                        {name}
                                        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 
                                            w-2 h-2 bg-light-card dark:bg-dark-card border-l border-b border-light-border dark:border-dark-border
                                            rotate-45" />
                                    </motion.div>
                                )}
                            </motion.a>
                        </motion.div>
                    );
                })}
            </nav>

            {/* User Profile Section */}
            <motion.div
                className="px-4 py-6 border-t border-light-border dark:border-dark-border mt-auto"
            >
                <motion.button
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 relative w-full p-2 rounded-xl cursor-pointer
                        hover:bg-light-accentSoft dark:hover:bg-dark-accentSoft 
                        focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent
                        transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="relative">
                        <motion.img
                            src={user?.avatar}
                            alt="User avatar"
                            className="rounded-full w-11 h-11 border-2 border-light-accent dark:border-dark-accent object-cover
                                group-hover:border-light-primary dark:group-hover:border-dark-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-light-success rounded-full border-2 border-white dark:border-dark-card" />
                    </div>

                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex flex-col justify-center flex-1 min-w-0"
                            >
                                <span className="text-sm font-bold text-light-text dark:text-dark-text truncate
                                    group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                    {user?.name}
                                </span>
                                <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary truncate">
                                    {user?.email}
                                </span>
                                <span className={`text-xs font-medium ${getRoleColor(validatedRole)}`}>
                                    {getRoleDisplayText(validatedRole)}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-light-textSecondary dark:text-dark-textSecondary 
                                    group-hover:text-light-primary dark:group-hover:text-dark-primary 
                                    transition-colors"
                            >
                                <FiUser className="w-4 h-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tooltip para el estado colapsado */}
                    {!sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute left-16 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border
                                px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap z-50
                                text-light-text dark:text-dark-text pointer-events-none"
                        >
                            Ver perfil - {getRoleDisplayText(validatedRole)}
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 
                                w-2 h-2 bg-light-card dark:bg-dark-card border-l border-b border-light-border dark:border-dark-border
                                rotate-45" />
                        </motion.div>
                    )}
                </motion.button>

                {/* Botón de logout */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{
                                scale: 1.05,
                                color: "rgb(239, 68, 68)"
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 rounded-lg
                                text-light-textSecondary dark:text-dark-textSecondary 
                                hover:text-light-error dark:hover:text-dark-error 
                                hover:bg-light-error/10 dark:hover:bg-dark-error/10
                                transition-all duration-200 text-sm font-medium"
                            title="Cerrar sesión"
                            onClick={handleLogout}
                        >
                            <FiLogOut className="w-4 h-4" />
                            <span>Cerrar sesión</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.aside>
    );
}
