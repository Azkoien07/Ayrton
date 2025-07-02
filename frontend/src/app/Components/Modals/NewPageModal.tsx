'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Save } from 'lucide-react';
import { cn } from '@utilities/utils';

interface NewPageModalProps {
    isOpen: boolean;
    onClose: () => void;
    newPageTitle: string;
    setNewPageTitle: (title: string) => void;
    newPageDescription: string;
    setNewPageDescription: (description: string) => void;
    newPageContent: string;
    setNewPageContent: (content: string) => void;
    newPageType: string;
    setNewPageType: (type: string) => void;
    createNewPage: () => void;
    pageTypes: { value: string; label: string; icon: React.ElementType }[];
}

const NewPageModal: React.FC<NewPageModalProps> = ({
    isOpen,
    onClose,
    newPageTitle,
    setNewPageTitle,
    newPageDescription,
    setNewPageDescription,
    newPageContent,
    setNewPageContent,
    newPageType,
    setNewPageType,
    createNewPage,
    pageTypes,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header del modal */}
                <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center space-x-3">
                        <Plus size={24} className="text-light-primary dark:text-dark-primary" />
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                            Crear nueva página
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                    >
                        <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                    </button>
                </div>

                {/* Contenido del modal */}
                <div className="p-6 space-y-6">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Título de la página *
                        </label>
                        <input
                            type="text"
                            value={newPageTitle}
                            onChange={(e) => setNewPageTitle(e.target.value)}
                            placeholder="Ingresa el título de tu página"
                            className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                        />
                    </div>

                    {/* Tipo de página */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Tipo de página
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {pageTypes.map((type) => {
                                const IconComponent = type.icon;
                                return (
                                    <button
                                        key={type.value}
                                        onClick={() => setNewPageType(type.value)}
                                        className={cn(
                                            "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                                            newPageType === type.value
                                                ? "bg-light-primary/10 dark:bg-dark-primary/10 border-light-primary dark:border-dark-primary"
                                                : "bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary"
                                        )}
                                    >
                                        <IconComponent
                                            size={18}
                                            className={cn(
                                                newPageType === type.value
                                                    ? "text-light-primary dark:text-dark-primary"
                                                    : "text-light-textSecondary dark:text-dark-textSecondary"
                                            )}
                                        />
                                        <span className={cn(
                                            "text-sm font-medium",
                                            newPageType === type.value
                                                ? "text-light-primary dark:text-dark-primary"
                                                : "text-light-text dark:text-dark-text"
                                        )}>
                                            {type.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Descripción
                        </label>
                        <input
                            type="text"
                            value={newPageDescription}
                            onChange={(e) => setNewPageDescription(e.target.value)}
                            placeholder="Breve descripción de tu página"
                            className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                        />
                    </div>

                    {/* Contenido */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Contenido inicial
                        </label>
                        <textarea
                            value={newPageContent}
                            onChange={(e) => setNewPageContent(e.target.value)}
                            placeholder="Escribe el contenido inicial de tu página..."
                            rows={6}
                            className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary resize-none"
                        />
                    </div>
                </div>

                {/* Footer del modal */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-light-border dark:border-dark-border">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={createNewPage}
                        className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <Save size={16} />
                        <span>Crear página</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default NewPageModal;
