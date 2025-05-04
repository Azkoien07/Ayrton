import React, { useState, useEffect } from 'react';
import type { TechStackItem } from "@/app/Types/techStack";
import { technologies } from "@/app/Types/techStack";

const getColorClasses = (color: string) => {
    return {
        textColor: `text-${color}`,
        shadowColor: `hover:shadow-${color}/10`,
        borderColor: `hover:border-${color}/30`,
    };
};

const TechnologyCard: React.FC<TechStackItem> = ({
    title,
    description,
    icon: Icon,
    color,
    delay
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
            className={`bg-zinc-900 border rounded-lg p-6 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{
                borderColor: isHovered ?
                    (color === "#000000" ? "#333333" : `${color}4D`) : '#27272a',
                boxShadow: isHovered ?
                    `0 4px 12px 0 ${color === "#000000" ? "#3333331A" : `${color}1A`}` : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-start justify-between mb-4">
                <div
                    className="text-4xl transition-transform duration-300"
                    style={{
                        color: color,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    <Icon size={32} />
                </div>
                <div className="text-zinc-400 cursor-pointer transition-all duration-300 hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-2 transition-colors duration-300">{title}</h2>
            <p className="text-zinc-400 text-sm">
                {description}
            </p>
        </div>
    );
};


const TechStack: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        // Trigger visibility after initial render
        setVisible(true);
    }, []);

    return (
        <div className="bg-black text-white w-full min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className={`text-4xl font-bold text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
                Integraciones y <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#61DAFB] via-[#3178C6] to-[#D24939]">Tecnologías</span>
            </h1>

            <div className="relative w-full max-w-5xl">
                <div className={`absolute left-1/2 top-0 transform -translate-x-1/2 bg-zinc-800 border border-zinc-700 rounded-full px-6 py-3 z-10 shadow-lg transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}>
                    <div className="text-lg font-medium flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" />
                        </svg>
                        Powered By
                    </div>
                </div>

                <div className="w-full h-48 relative">
                    <div className={`absolute left-1/2 top-16 w-4/5 h-0.5 transform -translate-x-1/2 transition-all duration-1500 ${visible ? 'bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 opacity-100' : 'opacity-0'
                        }`}></div>

                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <div
                            key={index}
                            className={`absolute w-0.5 transition-all duration-700 ${visible ? 'h-32 opacity-100' : 'h-0 opacity-0'
                                }`}
                            style={{
                                left: `${10 + (index * 20)}%`,
                                top: '16px',
                                transitionDelay: `${200 * index}ms`,
                                background: `linear-gradient(to bottom, ${['#38bdf8', '#3b82f6', '#f9a8d4', '#10b981', '#6366f1'][index]} 0%, rgba(255,255,255,0.3) 100%)`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-24">
                    {technologies.map((tech, index) => (
                        <TechnologyCard
                            key={index}
                            title={tech.title}
                            description={tech.description}
                            icon={tech.icon}
                            color={tech.color}
                            delay={tech.delay}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
