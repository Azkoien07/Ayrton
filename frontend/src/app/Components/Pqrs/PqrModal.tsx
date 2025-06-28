import React from 'react';

interface PqrEntity {
    id: number;
    typePqr: 'Peticion' | 'Queja' | 'Reclamo';
    title: string;
    description: string;
    argument: string;
    answer: string;
    state: boolean;
    users?: UserEntity[];
}

interface UserEntity {
    id: number;
    name: string;
    email: string;
}

const PqrModal = ({ pqr, isOpen, onClose }: { 
    pqr: PqrEntity | null; 
    isOpen: boolean; 
    onClose: () => void;
}) => {
    if (!isOpen || !pqr) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                            Detalles de {pqr.typePqr}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Título</h3>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary">{pqr.title}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Descripción</h3>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary">{pqr.description}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Argumento</h3>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary whitespace-pre-wrap">{pqr.argument}</p>
                    </div>
                    
                    {pqr.answer && (
                        <div>
                            <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Respuesta</h3>
                            <div className="bg-light-background dark:bg-dark-background p-4 rounded-lg">
                                <p className="text-light-textSecondary dark:text-dark-textSecondary whitespace-pre-wrap">{pqr.answer}</p>
                            </div>
                        </div>
                    )}
                    
                    {pqr.users && pqr.users.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">Usuario</h3>
                            <div className="flex items-center gap-4">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary">{pqr.users[0].name}</span>
                                <span className="text-light-textSecondary dark:text-dark-textSecondary">{pqr.users[0].email}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PqrModal;
