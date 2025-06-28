'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@utilities/utils';

interface UserPage {
    id: number;
    title: string;
    type: string;
    icon: React.ElementType;
    thumbnail: string;
    description: string;
    content: string;
    createdAt: Date;
}

interface UserPagesCarouselProps {
    userPages: UserPage[];
    currentSlide: number;
    setCurrentSlide: (slide: number) => void;
    openModal: () => void;
    openPage: (page: UserPage | null) => void;
}

const UserPagesCarousel: React.FC<UserPagesCarouselProps> = ({
    userPages,
    currentSlide,
    setCurrentSlide,
    openModal,
    openPage,
}) => {
    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % Math.ceil(userPages.length / 4));
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + Math.ceil(userPages.length / 4)) % Math.ceil(userPages.length / 4));
    };

    const getVisiblePages = () => {
        const startIndex = currentSlide * 4;
        return userPages.slice(startIndex, startIndex + 4);
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                        Páginas recientes
                    </h2>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={openModal}
                        className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <Plus size={16} />
                        <span>Nueva página</span>
                    </button>
                </div>
            </div>

            {/* Carrusel */}
            <div className="relative">
                <div className="flex items-center space-x-4 overflow-hidden">
                    {/* Botón anterior */}
                    <button
                        onClick={prevSlide}
                        disabled={userPages.length <= 4}
                        className="flex-shrink-0 p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} className="text-light-text dark:text-dark-text" />
                    </button>

                    {/* Contenedor de páginas */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {getVisiblePages().map((page, index) => {
                            const IconComponent = page.icon;
                            return (
                                <motion.div
                                    key={page.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => openPage(page)}
                                >
                                    <div className="relative overflow-hidden rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 hover:shadow-lg">
                                        {/* Thumbnail/Preview */}
                                        <div className="aspect-video bg-gradient-to-br from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 flex items-center justify-center relative overflow-hidden">
                                            <IconComponent
                                                size={32}
                                                className="text-light-primary dark:text-dark-primary opacity-60"
                                            />
                                            {/* Overlay de hover */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-4">
                                            <h3 className="font-medium text-light-text dark:text-dark-text text-sm mb-1 truncate">
                                                {page.title}
                                            </h3>
                                            <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs mb-2 line-clamp-2">
                                                {page.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                                    {page.createdAt.toLocaleDateString()}
                                                </span>
                                                <div className="w-2 h-2 bg-light-success dark:bg-dark-success rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Botón siguiente */}
                    <button
                        onClick={nextSlide}
                        disabled={userPages.length <= 4}
                        className="flex-shrink-0 p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} className="text-light-text dark:text-dark-text" />
                    </button>
                </div>

                {/* Indicadores de slide */}
                {userPages.length > 4 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        {Array.from({ length: Math.ceil(userPages.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-colors",
                                    index === currentSlide
                                        ? "bg-light-primary dark:bg-dark-primary"
                                        : "bg-light-border dark:bg-dark-border"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPagesCarousel;
