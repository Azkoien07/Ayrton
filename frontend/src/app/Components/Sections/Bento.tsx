'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BENTO_ITEMS, BentoData, AccentPosition } from '@Types/bento';

const Bento: React.FC = () => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('bento-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const positionClasses: Record<AccentPosition, string> = {
        'top-right': 'top-[-15%] right-[-15%]',
        'bottom-left': 'bottom-[-15%] left-[-15%]',
        'top-left': 'top-[-15%] left-[-15%]',
        'bottom-right': 'bottom-[-15%] right-[-15%]',
    };

    const sizeClasses: Record<BentoData['size'], string> = {
        large: 'md:col-span-4 md:row-span-2',
        medium: 'md:col-span-2 md:row-span-1',
        small: 'md:col-span-2 md:row-span-1',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 40,
            scale: 0.95,
            filter: 'blur(4px)'
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section
            id="bento-section"
            className="relative px-6 py-32 max-w-7xl mx-auto overflow-hidden"
            aria-labelledby="bento-heading"
        >
            {/* Efectos de fondo mejorados */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Gradientes de fondo principales */}
                <div className="absolute -top-60 -left-60 w-96 h-96 bg-gradient-to-br from-light-primary/10 via-light-secondary/5 to-light-accent/10 dark:from-dark-primary/10 dark:via-dark-secondary/5 dark:to-dark-accent/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-60 -right-60 w-96 h-96 bg-gradient-to-tl from-light-accent/10 via-light-primary/5 to-light-secondary/10 dark:from-dark-accent/10 dark:via-dark-primary/5 dark:to-dark-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
                
                {/* Elementos decorativos flotantes */}
                <div className="absolute top-20 right-1/4 w-32 h-32 bg-light-secondary/8 dark:bg-dark-secondary/8 rounded-full blur-2xl animate-pulse delay-500" />
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-light-accent/8 dark:bg-dark-accent/8 rounded-full blur-2xl animate-pulse delay-700" />
                
                {/* Patrón de red sutil */}
                <div 
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                        color: 'rgb(59 130 246)'
                    }}
                />
            </div>

            {/* Header mejorado con animaciones */}
            <motion.div
                className="text-center mb-20 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* Badge decorativo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-light-accent/10 via-light-primary/10 to-light-secondary/10 dark:from-dark-accent/10 dark:via-dark-primary/10 dark:to-dark-secondary/10 rounded-full border border-light-accent/20 dark:border-dark-accent/20 backdrop-blur-sm"
                >
                    <span className="text-sm font-bold text-light-primary dark:text-dark-primary uppercase tracking-wider">
                        ✨ Herramientas Poderosas
                    </span>
                </motion.div>

                <motion.h2
                    id="bento-heading"
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-light-primary dark:text-dark-primary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    <span className="bg-gradient-to-r from-light-primary via-light-secondary to-light-accent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-accent bg-clip-text text-transparent">
                        Explora lo que puedes hacer
                    </span>
                </motion.h2>

                <motion.p
                    className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Herramientas potentes y flexibles diseñadas para impulsar la productividad de tu equipo
                    <br />
                    <span className="text-light-accent dark:text-dark-accent font-semibold">
                        y transformar la manera en que trabajas
                    </span>
                </motion.p>

                {/* Línea decorativa animada */}
                <motion.div
                    className="mx-auto mt-8 w-24 h-1 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />
            </motion.div>

            {/* Grid de Bento mejorado */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 auto-rows-[minmax(200px,auto)] relative z-10"
            >
                {BENTO_ITEMS.map((item, index) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.03,
                            y: -8,
                            transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative p-8 rounded-3xl bg-light-card/80 dark:bg-dark-card/80 border border-light-border/50 dark:border-dark-border/50 backdrop-blur-md overflow-hidden cursor-pointer ${sizeClasses[item.size]} hover:border-light-primary/30 dark:hover:border-dark-primary/30 transition-all duration-500`}
                        style={{ 
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
                        }}
                        data-testid={`bento-item-${item.id}`}
                    >
                        {/* Gradiente decorativo mejorado */}
                        <div
                            className={`absolute w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-all duration-700 bg-gradient-to-br ${item.accentColor} ${positionClasses[item.accentPosition]}`}
                        />

                        {/* Efecto de brillo que se mueve */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden">
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
                        </div>

                        {/* Borde gradient sutil */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-light-primary/10 via-transparent to-light-accent/10 dark:from-dark-primary/10 dark:to-dark-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                {/* Emoji animado mejorado */}
                                <motion.div
                                    className="text-5xl mb-8 bg-gradient-to-br from-light-card via-light-accentSoft/50 to-light-card dark:from-dark-card dark:via-dark-accentSoft/50 dark:to-dark-card w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-light-border/30 dark:border-dark-border/30 group-hover:shadow-xl transition-all duration-300"
                                    initial={{ scale: 0.8, rotate: -5 }}
                                    whileHover={{ 
                                        scale: 1.15, 
                                        rotate: [0, -5, 5, -3, 3, 0],
                                        transition: { duration: 0.6 }
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                >
                                    {item.emoji}
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-bold text-light-primary dark:text-dark-primary mb-4 group-hover:text-light-secondary dark:group-hover:text-dark-secondary transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary text-base leading-relaxed group-hover:text-light-text dark:group-hover:text-dark-text transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>

                            {/* Indicador de interactividad mejorado */}
                            <div className="mt-8 flex items-center justify-between">
                                {/* Barra de progreso decorativa */}
                                <div className="flex-1 h-1 bg-light-border/30 dark:bg-dark-border/30 rounded-full overflow-hidden mr-4">
                                    <div className="h-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                                </div>

                                {/* Flecha mejorada */}
                                <motion.div 
                                    className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-light-accent dark:text-dark-accent"
                                    whileHover={{ x: 4 }}
                                >
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="drop-shadow-sm"
                                    >
                                        <path
                                            d="M13.5 8.25L17.25 12L13.5 15.75"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.75 12H17.25"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>

                        {/* Efecto de partículas en hover */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-light-accent dark:bg-dark-accent rounded-full animate-ping"
                                    style={{
                                        top: `${20 + i * 25}%`,
                                        right: `${15 + i * 10}%`,
                                        animationDelay: `${i * 0.2}s`,
                                        animationDuration: '2s'
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Indicador de scroll decorativo */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex justify-center mt-16"
            >
                <div className="w-8 h-12 border-2 border-light-border dark:border-dark-border rounded-full flex justify-center relative">
                    <div className="w-1 h-3 bg-light-primary dark:bg-dark-primary rounded-full mt-2 animate-bounce"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Bento;