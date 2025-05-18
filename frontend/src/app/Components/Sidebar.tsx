import React from "react";
import { motion } from "framer-motion";
import {
    FiHome,
    FiSettings,
    FiHelpCircle,
    FiCreditCard,
    FiPieChart,
    FiLayers,
} from "react-icons/fi";

const navItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { name: "Analytics", icon: <FiPieChart />, href: "/analytics" },
    { name: "Transactions", icon: <FiCreditCard />, href: "/transactions" },
    { name: "Integrations", icon: <FiLayers />, href: "/integrations" },
    { name: "Help", icon: <FiHelpCircle />, href: "/help" },
    { name: "Settings", icon: <FiSettings />, href: "/settings" },
];

// Props para sincronizar estado
interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const [active, setActive] = React.useState("/dashboard");

    return (
        <motion.aside
            onHoverStart={() => setSidebarOpen(true)}
            onHoverEnd={() => setSidebarOpen(false)}
            animate={{ width: sidebarOpen ? 220 : 72 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-screen
        bg-gradient-to-b from-dark-background via-dark-primary to-dark-accent
        shadow-xl text-dark-text flex flex-col
        dark:bg-gradient-to-b dark:from-dark-background dark:via-dark-primary dark:to-dark-accent
        dark:text-dark-text
      "
            style={{ overflow: "hidden" }}
        >
            {/* Logo */}
            <div className="flex items-center justify-center h-20 border-b border-dark-border">
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: sidebarOpen ? 360 : 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-3xl select-none"
                >
                    🌌
                </motion.div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col mt-6 gap-2 px-2 flex-grow">
                {navItems.map(({ name, icon, href }) => {
                    const isActive = active === href;
                    return (
                        <motion.a
                            key={href}
                            href={href}
                            onClick={() => setActive(href)}
                            className={`flex items-center gap-4 rounded-md px-3 py-2 cursor-pointer select-none
                ${isActive
                                    ? "bg-dark-primary bg-opacity-70 shadow-lg"
                                    : "hover:bg-dark-primary hover:bg-opacity-40"
                                } transition-colors duration-300`}
                            whileHover={{ scale: 1.05 }}
                            layout
                        >
                            <div className="text-2xl">{icon}</div>
                            {sidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="whitespace-nowrap font-medium text-lg"
                                >
                                    {name}
                                </motion.span>
                            )}
                        </motion.a>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="px-4 py-4 border-t border-dark-border flex items-center gap-3">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User avatar"
                    className="rounded-full w-10 h-10 border-2 border-dark-text"
                />
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-sm font-semibold">John Doe</span>
                        <button className="text-xs text-dark-textSecondary hover:text-dark-text transition-colors">
                            Logout
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.aside>
    );
}
