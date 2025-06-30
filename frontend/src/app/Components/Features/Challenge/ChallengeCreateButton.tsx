import React from 'react';
import { Plus } from 'lucide-react';

interface ChallengeCreateButtonProps {
    activeTab: string;
    setShowCreateModal: (show: boolean) => void;
}

export default function ChallengeCreateButton({ activeTab, setShowCreateModal }: ChallengeCreateButtonProps) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-light-text">
                {activeTab === 'overview' && 'Resumen de Challenges'}
                {activeTab === 'active' && 'Challenges Activos'}
                {activeTab === 'completed' && 'Challenges Completados'}
                {activeTab === 'analytics' && 'Analíticas de Progreso'}
            </h2>
            
            {activeTab !== 'analytics' && (
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-light-primary text-white px-4 py-2 rounded-lg hover:bg-light-secondary transition-colors flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Crear Challenge
                </button>
            )}
        </div>
    );
}
