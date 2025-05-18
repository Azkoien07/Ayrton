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
        'top-right': 'top-[-10%] right-[-10%]',
        'bottom-left': 'bottom-[-10%] left-[-10%]',
        'top-left': 'top-[-10%] left-[-10%]',
        'bottom-right': 'bottom-[-10%] right-[-10%]',
    };

    const sizeClasses: Record<BentoData['size'], string> = {
        large: 'md:col-span-4 md:row-span-2',
        medium: 'md:col-span-2 md:row-span-1',
        small: 'md:col-span-2 md:row-span-1',
    };

    return (
        <section
            id="bento-section"
            className="relative px-6 py-24 max-w-7xl mx-auto"
            aria-labelledby="bento-heading"
        >
            {/* Fondo decorativo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-light-accent/5 dark:bg-dark-accent/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-light-accent/5 dark:bg-dark-accent/5 rounded-full blur-3xl" />
            </div>

            <motion.h2
                id="bento-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-light-primary dark:text-dark-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                Explora lo que puedes hacer
            </motion.h2>

            <motion.p
                className="text-center text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Herramientas potentes y flexibles para impulsar la productividad de tu equipo
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)]">
                {BENTO_ITEMS.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                            duration: 0.7,
                            delay: index * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ scale: 1.02 }}
                        className={`group relative p-6 sm:p-8 rounded-3xl bg-light-card dark:bg-dark-card border border-light-border/80 dark:border-dark-border/80 backdrop-blur-sm overflow-hidden ${sizeClasses[item.size]}`}
                        style={{ boxShadow: '0 4px 32px rgba(0, 0, 0, 0.05)' }}
                        data-testid={`bento-item-${item.id}`}
                    >
                        {/* Gradiente decorativo */}
                        <div
                            className={`absolute w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${item.accentColor} ${positionClasses[item.accentPosition]}`}
                        />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                {/* Emoji animado */}
                                <motion.div
                                    className="text-4xl mb-6 bg-light-card/80 dark:bg-dark-card/80 w-14 h-14 rounded-full flex items-center justify-center shadow-md"
                                    initial={{ scale: 0.8, rotate: -5 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    {item.emoji}
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-bold text-light-primary dark:text-dark-primary mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary text-base leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Flecha en hover */}
                            <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-light-accent dark:text-dark-accent flex justify-end">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M13.5 8.25L17.25 12L13.5 15.75"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.75 12H17.25"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Bento;
