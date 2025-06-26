'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Save, Edit3, Eye, Calendar } from 'lucide-react';
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

interface ViewEditPageModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: UserPage | null;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    editTitle: string;
    setEditTitle: (title: string) => void;
    editDescription: string;
    setEditDescription: (description: string) => void;
    editContent: string;
    setEditContent: (content: string) => void;
    savePageChanges: () => void;
    pageTypes: { value: string; label: string; icon: React.ElementType }[];
}

const ViewEditPageModal: React.FC<ViewEditPageModalProps> = ({
    isOpen,
    onClose,
    currentPage,
    isEditing,
    setIsEditing,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    editContent,
    setEditContent,
    savePageChanges,
    pageTypes,
}) => {
    if (!isOpen || !currentPage) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header del modal */}
                <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center space-x-3">
                        <currentPage.icon size={24} className="text-light-primary dark:text-dark-primary" />
                        {isEditing ? (
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="text-xl font-semibold bg-transparent border-b border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary outline-none text-light-text dark:text-dark-text"
                            />
                        ) : (
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                {currentPage.title}
                            </h2>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                >
                                    <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                                </button>
                                <button
                                    onClick={savePageChanges}
                                    className="flex items-center space-x-2 px-3 py-1.5 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                                >
                                    <Save size={16} />
                                    <span>Guardar</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                            >
                                <Edit3 size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                        >
                            <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                        </button>
                    </div>
                </div>

                {/* Contenido del modal */}
                <div className="p-6 space-y-6">
                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Descripción
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Breve descripción de tu página"
                                className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                            />
                        ) : (
                            <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                {currentPage.description || "Sin descripción"}
                            </p>
                        )}
                    </div>

                    {/* Información de la página */}
                    <div className="flex items-center space-x-6 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Creado: {currentPage.createdAt.toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Eye size={16} />
                            <span>Tipo: {pageTypes.find(type => type.value === currentPage.type)?.label || currentPage.type}</span>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Contenido
                        </label>
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Escribe el contenido de tu página..."
                                rows={12}
                                className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary resize-none"
                            />
                        ) : (
                            <div className="w-full min-h-[300px] px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text whitespace-pre-wrap">
                                {currentPage.content || "Esta página no tiene contenido aún."}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer del modal - solo se muestra cuando no está editando */}
                {!isEditing && (
                    <div className="flex items-center justify-between p-6 border-t border-light-border dark:border-dark-border">
                        <div className="flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                            <div className="w-2 h-2 bg-light-success dark:bg-dark-success rounded-full"></div>
                            <span>Página guardada automáticamente</span>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <Edit3 size={16} />
                            <span>Editar página</span>
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ViewEditPageModal;
