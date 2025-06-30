import React from 'react';
import { RankingEntity, ChallengeEntity } from "@/app/Hooks/RankingData";
import { X } from 'lucide-react';

interface RankingCardProps {
    ranking: RankingEntity;
}

export default function RankingCard({ ranking }: RankingCardProps) {
    const getDifficultyColor = (difficulty: ChallengeEntity['difficulty']) => {
        switch (difficulty) {
            case 'Baja': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'Intermedia': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'Alta': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
        }
    };

    const getPositionBadge = (position: number) => {
        if (position === 1) return '🥇';
        if (position === 2) return '🥈';
        if (position === 3) return '🥉';
        return `#${position}`;
    };

    return (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 sm:p-6 border border-light-border dark:border-dark-border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {ranking.userAvatar ? (
                        <img
                            src={ranking.userAvatar}
                            alt={ranking.userName}
                            className="w-10 h-10 rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-light-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {ranking.userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">
                            {ranking.userName}
                        </h2>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                            ID: {ranking.userId}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-light-primary">
                        {getPositionBadge(ranking.position)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ranking.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                        {ranking.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">Nivel:</span>
                    <span className="font-medium text-light-text dark:text-dark-text">{ranking.level}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">Puntos:</span>
                    <span className="font-medium text-light-text dark:text-dark-text">{ranking.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">Desafíos:</span>
                    <span className="font-medium text-light-text dark:text-dark-text">
                        {ranking.challenges?.length || 0}
                    </span>
                </div>
            </div>

            {ranking.challenges && ranking.challenges.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                        Últimos Desafíos:
                    </h4>
                    <div className="space-y-1">
                        {ranking.challenges.slice(0, 2).map((challenge) => (
                            <div key={challenge.id} className="flex items-center justify-between text-sm">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary truncate">
                                    {challenge.name}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                                    {challenge.difficulty}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-light-secondary text-white rounded-lg shadow-md hover:bg-light-secondary-dark transition-colors text-sm">
                    Ver Detalles
                </button>
                <button className="px-4 py-2 bg-light-error text-white rounded-lg shadow-md hover:bg-light-error-dark transition-colors text-sm">
                    Eliminar
                </button>
            </div>
        </div>
    );
}
