import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiHome,
    FiSettings,
    FiHelpCircle,
    FiCreditCard,
    FiPieChart,
    FiLayers,
    FiLogOut,
    FiChevronRight,
    FiUser, 
} from "react-icons/fi";

const navItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard", color: "from-light-primary to-light-secondary" },
    { name: "Transactions", icon: <FiCreditCard />, href: "/transactions", color: "from-light-warning to-orange-500" },
    { name: "Settings", icon: <FiSettings />, href: "/settings", color: "from-slate-500 to-slate-600" },
];

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onProfileClick?: () => void; 
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, onProfileClick }: SidebarProps) {
    const [active, setActive] = React.useState("/dashboard");
    const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);


    const handleProfileClick = () => {
        if (onProfileClick) {
            onProfileClick();
        } else {
         
            window.location.href = '/profile';
         
        }
    };

    return (
        <motion.aside
            onHoverStart={() => setSidebarOpen(true)}
            onHoverEnd={() => setSidebarOpen(false)}
            animate={{ 
                width: sidebarOpen ? 240 : 72,
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
            {/* Header with Logo */}
            <motion.div 
                className="flex items-center justify-center h-20 border-b border-light-border dark:border-dark-border relative"
                whileHover={{ scale: 1.02 }}
            >
            
                
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute right-4  text-light-textSecondary dark:text-dark-textSecondary"
                    >
                        <FiChevronRight className="w-4 h-4" />
                    </motion.div>
                )}
            </motion.div>

            {/* Navigation */}
            <nav className="flex flex-col mt-8 gap-3 px-4 flex-grow">
                {navItems.map(({ name, icon, href, color }, index) => {
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

                                {/* Icon with enhanced styling */}
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

                                {/* Text with smooth animation */}
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

                                {/* Hover indicator for collapsed state */}
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

            {/* User Profile Section - MODIFICADO */}
            <motion.div 
                className="px-4 py-6 border-t border-light-border dark:border-dark-border mt-auto"
            >
                <motion.button
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 relative w-full p-2 rounded-xl cursor-pointer
                        hover:bg-light-accentSoft dark:hover:bg-dark-accentSoft 
                        focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent
                        transition-all duration-200 group"
                    whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(var(--light-accentSoft), 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                
                    <div className="relative">
                        <motion.img
                            src="https://i.pravatar.cc/40"
                            alt="User avatar"
                            className="rounded-full w-11 h-11 border-2 border-light-accent dark:border-dark-accent object-cover
                                group-hover:border-light-primary dark:group-hover:border-dark-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-light-success rounded-full border-2 border-white dark:border-dark-card" />
                        
                     
                        {!sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-light-primary dark:bg-dark-primary 
                                    rounded-full flex items-center justify-center"
                            >
                                <FiUser className="w-2 h-2 text-white" />
                            </motion.div>
                        )}
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
                                    John Doe
                                </span>
                                <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary truncate">
                                    john@example.com
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
                            Ver perfil
                            <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 
                                w-2 h-2 bg-light-card dark:bg-dark-card border-l border-b border-light-border dark:border-dark-border
                                rotate-45" />
                        </motion.div>
                    )}
                </motion.button>

                {/* Botón de logout separado */}
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
                            onClick={() => { window.location.href = "/"; }}
                        >
                            <FiLogOut className="w-4 h-4" />
                            <span >Cerrar sesión</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.aside>
    );
}