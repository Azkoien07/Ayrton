
'use client';
import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative overflow-hidden px-6 py-32 md:py-40 rounded-b-[4rem] min-h-screen flex items-center" 
                 style={{ backgroundColor: '#F9FAFB' }}>
      
            <div className="absolute inset-0 -z-10 overflow-hidden">
             
                <div 
                    className="absolute w-[800px] h-[800px] rounded-full blur-[200px] animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, #E5E9F320 0%, transparent 70%)',
                        top: `${20 + mousePosition.y * 0.1}%`,
                        left: `${-20 + mousePosition.x * 0.1}%`,
                        animationDuration: '6s'
                    }}
                />
                <div 
                    className="absolute w-[600px] h-[600px] rounded-full blur-[180px] animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, #8CA1C715 0%, transparent 70%)',
                        bottom: `${-10 + mousePosition.y * 0.05}%`,
                        right: `${-10 + mousePosition.x * 0.05}%`,
                        animationDuration: '8s',
                        animationDelay: '2s'
                    }}
                />
                <div 
                    className="absolute w-[400px] h-[400px] rounded-full blur-[160px] animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, #5879B510 0%, transparent 70%)',
                        top: `${50 + mousePosition.y * 0.03}%`,
                        right: `${30 + mousePosition.x * 0.03}%`,
                        animationDuration: '10s',
                        animationDelay: '4s'
                    }}
                />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-float opacity-30"
                        style={{
                            backgroundColor: '#8CA1C7',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    />
                ))}

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.015]"
                     style={{
                         backgroundImage: `radial-gradient(circle at 1px 1px, #3A5A8F 1px, transparent 0)`,
                         backgroundSize: '40px 40px'
                     }}
                />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                {/* Text Content */}
                <div className={`text-center lg:text-left max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full px-6 py-3 mb-8 text-sm font-medium shadow-lg hover:scale-105 transition-transform duration-300"
                         style={{ 
                             backgroundColor: '#FFFFFF', 
                             border: '1px solid #D1D5DB',
                             color: '#6B7280'
                         }}>
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }}></div>
                        ✨ Versión 2.0 disponible ahora
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
                        <span className="block mb-2" style={{ color: '#374151' }}>
                            Transformá tu
                        </span>
                        <span className="block mb-2" style={{ color: '#374151' }}>
                            flujo de trabajo
                        </span>
                        <span className="block">
                            con{" "}
                            <span className="relative inline-block">
                                <span style={{ color: '#3A5A8F' }} className="font-bold">
                                    Ayrton
                                </span>
                                <div className="absolute -inset-1 rounded-lg opacity-20 animate-pulse" 
                                     style={{ backgroundColor: '#E5E9F3', filter: 'blur(8px)' }}></div>
                            </span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0"
                       style={{ color: '#6B7280' }}>
                        La solución integral para equipos que buscan{" "}
                        <span className="font-semibold" style={{ color: '#3A5A8F' }}>productividad</span>,{" "}
                        <span className="font-semibold" style={{ color: '#5879B5' }}>visibilidad</span> y{" "}
                        <span className="font-semibold" style={{ color: '#8CA1C7' }}>colaboración</span> en tiempo real.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                        <button className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                                style={{ backgroundColor: '#3A5A8F' }}>
                            <span className="relative z-10 flex items-center gap-3">
                                Comenzar ahora
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                 style={{ backgroundColor: '#5879B5' }}></div>
                        </button>
                        
                        <button className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                                style={{ 
                                    color: '#374151',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #D1D5DB'
                                }}>
                            <span className="flex items-center gap-3">
                                Ver cómo funciona
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    {/* Stats or Trust indicators */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-16 text-sm" style={{ color: '#6B7280' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                 style={{ backgroundColor: '#22C55E' }}>
                                ✓
                            </div>
                            <span>+10k equipos activos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                 style={{ backgroundColor: '#5879B5' }}>
                                ⚡
                            </div>
                            <span>99.9% uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                 style={{ backgroundColor: '#FBBF24' }}>
                                ⭐
                            </div>
                            <span>4.9/5 rating</span>
                        </div>
                    </div>
                </div>

                {/* Visual/Demo Section */}
                <div className={`w-full max-w-2xl relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
                    {/* Main container */}
                    <div className="relative group">
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 animate-pulse"
                             style={{ backgroundColor: '#E5E9F3' }}></div>
                        
                        {/* Main card */}
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border"
                             style={{ 
                                 backgroundColor: '#FFFFFF',
                                 borderColor: '#D1D5DB'
                             }}>
                            {/* Header bar */}
                            <div className="flex items-center gap-3 p-6 border-b"
                                 style={{ 
                                     backgroundColor: '#F9FAFB',
                                     borderColor: '#D1D5DB'
                                 }}>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBF24' }}></div>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }}></div>
                                </div>
                                <div className="flex-1 text-center">
                                    <div className="text-sm font-medium" style={{ color: '#6B7280' }}>
                                        ayrton.app/dashboard
                                    </div>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="aspect-video p-8 flex flex-col items-center justify-center relative overflow-hidden">
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-[0.02]"
                                     style={{
                                         backgroundImage: `radial-gradient(circle at 2px 2px, #3A5A8F 1px, transparent 0)`,
                                         backgroundSize: '30px 30px'
                                     }}
                                />

                                {/* Dashboard mockup */}
                                <div className="relative z-10 w-full max-w-md">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto shadow-lg"
                                             style={{ backgroundColor: '#3A5A8F' }}>
                                            A
                                        </div>
                                        <h3 className="text-xl font-bold mb-2" style={{ color: '#374151' }}>
                                            Dashboard Intuitivo
                                        </h3>
                                        <p className="text-sm" style={{ color: '#6B7280' }}>
                                            Visualiza todo tu proyecto en tiempo real
                                        </p>
                                    </div>

                                    {/* Mock interface elements */}
                                    <div className="space-y-4">
                                        {[
                                            { progress: 100, color: '#22C55E', status: 'Completado' },
                                            { progress: 60, color: '#FBBF24', status: 'En progreso' },
                                            { progress: 30, color: '#5879B5', status: 'Pendiente' }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border"
                                                 style={{ 
                                                     backgroundColor: '#F9FAFB',
                                                     borderColor: '#D1D5DB'
                                                 }}>
                                                <div className="w-3 h-3 rounded-full animate-pulse" 
                                                     style={{ backgroundColor: item.color }}></div>
                                                <div className="flex-1">
                                                    <div className="h-2 rounded-full mb-2" 
                                                         style={{ backgroundColor: '#E5E7EB' }}>
                                                        <div className="h-2 rounded-full transition-all duration-1000" 
                                                             style={{ 
                                                                 backgroundColor: item.color,
                                                                 width: `${item.progress}%`
                                                             }}></div>
                                                    </div>
                                                    <div className="text-xs" style={{ color: '#6B7280' }}>
                                                        {item.status}
                                                    </div>
                                                </div>
                                                <div className="text-xs font-medium" style={{ color: '#374151' }}>
                                                    {item.progress}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating elements */}
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full animate-float opacity-30"
                                        style={{
                                            backgroundColor: '#8CA1C7',
                                            left: `${20 + (i * 20)}%`,
                                            top: `${20 + (i % 2) * 40}%`,
                                            animationDelay: `${i * 0.5}s`,
                                            animationDuration: `${3 + (i % 2)}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dark mode styles */}
            <div className="hidden dark:block absolute inset-0 -z-20" style={{ backgroundColor: '#12141A' }}>
                {/* Dark mode background elements would go here */}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    75% { transform: translateY(-10px) rotate(270deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                @media (prefers-color-scheme: dark) {
                    section {
                        background-color: #12141A !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;