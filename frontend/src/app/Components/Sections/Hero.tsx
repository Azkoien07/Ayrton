// components/Hero.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-light-background dark:bg-dark-background px-6 py-32 md:py-40 rounded-b-[4rem]">
            {/* Fondo decorativo con blur y formas fluidas */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-light-accent/30 dark:bg-dark-accent/30 rounded-full blur-[180px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-light-primary/20 dark:bg-dark-primary/20 rounded-full blur-[160px]" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/0" />
            </div>

            {/* Contenido */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Texto */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center md:text-left max-w-xl"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-light-primary dark:text-dark-primary font-palmer mb-6">
                        Transformá tu flujo de trabajo <br />
                        con <span className="text-light-accent dark:text-dark-accent">Ayrton</span>
                    </h1>

                    <p className="text-lg md:text-xl text-light-textSecondary dark:text-dark-textSecondary mb-10">
                        La solución integral para equipos que buscan productividad, visibilidad y colaboración en tiempo real.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/login"
                            className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-light-accent dark:bg-dark-accent rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            <span>Comenzar ahora</span>
                            <span className="absolute inset-0 bg-white/10 dark:bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition duration-300" />
                        </Link>
                        <a
                            href="#features"
                            className="border border-light-border dark:border-dark-border text-light-primary dark:text-dark-primary py-3 px-8 rounded-full text-lg font-semibold hover:bg-light-card/40 dark:hover:bg-dark-card/30 transition-all duration-300 hover:scale-105"
                        >
                            Ver cómo funciona →
                        </a>
                    </div>
                </motion.div>

                {/* Imagen / mockup / demo visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="w-full max-w-xl rounded-2xl overflow-hidden shadow-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border"
                >
                    {/* Sustituir por screenshot o animación */}
                    <div className="aspect-video flex items-center justify-center text-light-secondary dark:text-dark-secondary text-xl font-medium">
                        🌄 Vista previa del producto
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
