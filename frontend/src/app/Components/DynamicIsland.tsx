'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface DynamicIslandProps {
    message?: string;
    visible?: boolean;
    expanded?: boolean;
    onClick?: () => void;
}

export default function DynamicIsland({
    message = "¡Hola! Este es tu Dynamic Island ",
    visible = true,
    expanded = false,
    onClick,
}: DynamicIslandProps) {
    const [isExpanded, setIsExpanded] = useState(expanded);

    useEffect(() => {
        setIsExpanded(expanded);
    }, [expanded]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    layout
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                        onClick?.();
                    }}
                    initial={{ opacity: 0, scale: 0.85, y: -60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -60 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    whileHover={{ scale: 1.1, boxShadow: "0 20px 50px rgba(28, 198, 242, 0.6)" }}
                    className={`
            fixed top-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer select-none
            rounded-3xl border-4 flex items-center justify-center px-10 overflow-hidden
            min-w-[160px] max-w-[600px] font-extrabold text-center shadow-2xl
            transition-all duration-400 ease-in-out

            bg-gradient-to-r
            border-light-background
            text-light-text

            dark:bg-gradient-to-r
            dark:from-dark-primary dark:to-dark-accent
            dark:border-dark-background
            dark:text-dark-text
          `}
                    style={{
                        width: isExpanded ? 580 : 160,
                        height: isExpanded ? 80 : 50,
                    }}
                    aria-expanded={isExpanded}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setIsExpanded(!isExpanded);
                            onClick?.();
                        }
                    }}
                >
                    <motion.div
                        className="mr-6 flex-shrink-0 text-light-textSecondary dark:text-dark-textSecondary"
                        animate={{
                            rotate: isExpanded ? 360 : 0,
                        }}
                        transition={{
                            repeat: isExpanded ? Infinity : 0,
                            duration: 2.5,
                            ease: "linear",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-9 w-9"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        key={isExpanded ? "expanded" : "collapsed"}
                        initial={{ opacity: 0, x: isExpanded ? 15 : -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isExpanded ? -15 : 15 }}
                        transition={{ duration: 0.3 }}
                        className="whitespace-nowrap text-base md:text-2xl select-text"
                        aria-live="polite"
                    >
                        {isExpanded ? message : "🔔"}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
