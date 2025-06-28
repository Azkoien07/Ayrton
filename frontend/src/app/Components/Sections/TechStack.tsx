import React, { useState, useEffect } from 'react';
import { FaReact, FaJava } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiGraphql, SiRedux } from "react-icons/si";

interface TechStackItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    delay: number;
    gradient: string;
}

const TechnologyCard: React.FC<TechStackItem> = ({
    title,
    description,
    icon,
    color,
    delay,
    gradient
}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`group relative overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out cursor-pointer 
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} 
            ${isHovered ? 'transform -translate-y-2 scale-[1.02]' : ''}
            h-full flex flex-col justify-between`}

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                boxShadow: isHovered
                    ? `0 25px 50px -12px ${color}20, 0 0 0 1px ${color}30`
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`} />

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                    className="absolute inset-0 rounded-2xl animate-pulse"
                    style={{
                        background: `linear-gradient(45deg, transparent, ${color}30, transparent)`,
                        backgroundSize: '200% 200%',
                        animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none'
                    }}
                />
            </div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                        {icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-white">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white transition-all duration-300 group-hover:dark:text-transparent group-hover:dark:bg-clip-text group-hover:dark:bg-gradient-to-r group-hover:dark:from-white group-hover:dark:to-gray-300">
                    {title}
                </h3>

                <p className="text-sm sm:text-[15px] text-gray-900 dark:text-white font-semibold leading-relaxed transition-all duration-300">
                    {description}
                </p>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '2s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

const TechStack: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const technologies: TechStackItem[] = [
        {
            title: "React",
            description: "Biblioteca de JavaScript para construir interfaces de usuario reactivas y declarativas con componentes reutilizables.",
            color: "#61DBFB",
            gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
            delay: 200,
            icon: < FaReact className="text-4xl text-[#61DBFB]" />,
        },
        {
            title: "TypeScript",
            description: "Superconjunto tipado de JavaScript que mejora la productividad y reduce errores en el desarrollo.",
            color: "#3178C6",
            gradient: "bg-gradient-to-br from-blue-600 to-blue-700",
            delay: 400,
            icon: <SiTypescript className="text-4xl text-[#3178C6]" />,
        },
        {
            title: "Tailwind CSS",
            description: "Framework CSS utilitario que acelera el desarrollo con clases predefinidas y diseño responsive.",
            color: "#38BDF8",
            gradient: "bg-gradient-to-br from-cyan-400 to-teal-500",
            delay: 600,
            icon: <SiTailwindcss className="text-4xl text-[#38BDF8]" />,
        },
        {
            title: "Java",
            description: "Lenguaje robusto y versátil para aplicaciones empresariales, móviles y sistemas backend escalables.",
            color: "#F89820",
            gradient: "bg-gradient-to-br from-orange-500 to-red-600",
            delay: 800,
            icon: <FaJava className="text-4xl text-[#F89820]" />,
        },
        {
            title: "Next.js",
            description: "Framework React para aplicaciones web modernas con SSR, SSG y optimizaciones automáticas.",
            color: "#000000",
            gradient: "bg-gradient-to-br from-gray-800 to-black",
            delay: 1000,
            icon: <SiNextdotjs className="text-4xl text-black dark:text-white" />,
        },
        {
            title: "GraphQL",
            description: "Lenguaje de consulta flexible que optimiza la comunicación entre cliente y servidor con precisión.",
            color: "#E10098",
            gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
            delay: 1200,
            icon: <SiGraphql className="text-4xl text-[#E10098]" />,
        },
        {
            title: "Redux Toolkit",
            description: "Contenedor de estado predecible y potente para aplicaciones JavaScript modernas con flujos de datos consistentes.",
            color: "#764ABC",
            gradient: "bg-gradient-to-br from-purple-500 to-indigo-700",
            delay: 1400,
            icon: <SiRedux className="text-4xl text-[#764ABC]" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-400 to-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
                <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
                        Integraciones y{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-pulse">
                            Tecnologías
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Construyendo el futuro con las mejores herramientas y tecnologías modernas
                    </p>
                </div>

                <div className={`mb-16 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="backdrop-blur-sm bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-full px-8 py-4 shadow-2xl">
                        <div className="text-lg font-semibold flex items-center gap-3 text-gray-900 dark:text-white">
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            Powered By
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">

                        {technologies.map((tech, index) => {
                            const isLast = index === technologies.length - 1;
                            return (
                                <div key={index} className={isLast ? "lg:col-start-2" : ""}>
                                    <TechnologyCard {...tech} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </div>
    );
};

export default TechStack;
