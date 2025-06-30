import React from 'react';
import { Category, Dificulty } from "@/generated/graphql";

interface CreateChallengeModalProps {
    showCreateModal: boolean;
    setShowCreateModal: (show: boolean) => void;
    newChallenge: {
        name: string;
        description: string;
        category: Category;
        dificulty: Dificulty;
        points: number;
    };
    setNewChallenge: (challenge: {
        name: string;
        description: string;
        category: Category;
        dificulty: Dificulty;
        points: number;
    }) => void;
    handleCreateChallenge: () => Promise<void>;
}

export default function CreateChallengeModal({
    showCreateModal,
    setShowCreateModal,
    newChallenge,
    setNewChallenge,
    handleCreateChallenge,
}: CreateChallengeModalProps) {
    if (!showCreateModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-light-card rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-light-text">Crear Nuevo Challenge</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light-text mb-1">
                            Título
                        </label>
                        <input
                            type="text"
                            value={newChallenge.name}
                            onChange={(e) => setNewChallenge({...newChallenge, name: e.target.value})}
                            className="w-full p-2 border border-light-border rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent bg-light-background text-light-text"
                            placeholder="Ej: Hacer ejercicio diario"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text mb-1">
                            Descripción
                        </label>
                        <textarea
                            value={newChallenge.description}
                            onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                            className="w-full p-2 border border-light-border rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent bg-light-background text-light-text"
                            rows={3}
                            placeholder="Describe tu challenge..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-light-text mb-1">
                                Categoría
                            </label>
                            <select
                                value={newChallenge.category}
                                onChange={(e) => setNewChallenge({...newChallenge, category: e.target.value as Category})}
                                className="w-full p-2 border border-light-border rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent bg-light-background text-light-text"
                            >
                                {Object.values(Category).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-light-text mb-1">
                                Dificultad
                            </label>
                            <select
                                value={newChallenge.dificulty}
                                onChange={(e) => setNewChallenge({...newChallenge, dificulty: e.target.value as Dificulty})}
                                className="w-full p-2 border border-light-border rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent bg-light-background text-light-text"
                            >
                                {Object.values(Dificulty).map(diff => (
                                    <option key={diff} value={diff}>{diff}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-light-text mb-1">
                                Puntos
                            </label>
                            <input
                                type="number"
                                value={newChallenge.points}
                                onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
                                className="w-full p-2 border border-light-border rounded-lg focus:ring-2 focus:ring-light-primary focus:border-transparent bg-light-background text-light-text"
                                min="10"
                                max="500"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleCreateChallenge}
                        className="flex-1 bg-light-primary text-white py-2 px-4 rounded-lg hover:bg-light-secondary transition-colors"
                    >
                        Crear Challenge
                    </button>
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 bg-light-border text-light-text py-2 px-4 rounded-lg hover:bg-light-textSecondary transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
