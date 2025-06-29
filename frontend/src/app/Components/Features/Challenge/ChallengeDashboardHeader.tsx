import React from 'react';
import { Trophy, Target, Users, Award } from 'lucide-react';
import { RankingEntity } from '@/app/Hooks/RankingData';

interface ChallengeDashboardHeaderProps {
    textSecondaryClass: string;
    textColorClass: string;
    stats: {
        totalUsers: number;
        activeUsers: number;
        averageLevel: number;
        totalChallenges: number;
    };
    userRanking?: RankingEntity;
}

export default function ChallengeDashboardHeader({ 
    textSecondaryClass, 
    textColorClass, 
    stats,
    userRanking 
}: ChallengeDashboardHeaderProps) {
    return (
        <div className="mb-8">
            {/* Title Section */}
            <div className="mb-6">
                <h1 className={`text-3xl font-bold ${textColorClass} mb-2`}>
                    Centro de Challenges
                </h1>
                <p className={`${textSecondaryClass} text-lg`}>
                    Participa en desafíos, compite y escala en el ranking
                </p>
            </div>

            {/* User Ranking Card */}
            {userRanking && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-1">Tu Posición Actual</h3>
                            <p className="text-blue-100">¡Sigue participando para subir de nivel!</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold">#{userRanking.position}</div>
                            <div className="text-sm text-blue-100">Nivel {userRanking.level}</div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            <span>{userRanking.totalPoints} puntos</span>
                        </div>
                        <div className="flex items-center">
                            <Target className="w-5 h-5 mr-2" />
                            <span>{userRanking.challenges?.length || 0} challenges</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${textSecondaryClass} text-sm font-medium`}>
                                Total Usuarios
                            </p>
                            <p className={`${textColorClass} text-2xl font-bold`}>
                                {stats.totalUsers.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${textSecondaryClass} text-sm font-medium`}>
                                Usuarios Activos
                            </p>
                            <p className={`${textColorClass} text-2xl font-bold`}>
                                {stats.activeUsers.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${textSecondaryClass} text-sm font-medium`}>
                                Nivel Promedio
                            </p>
                            <p className={`${textColorClass} text-2xl font-bold`}>
                                {stats.averageLevel}
                            </p>
                        </div>
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`${textSecondaryClass} text-sm font-medium`}>
                                Total Challenges
                            </p>
                            <p className={`${textColorClass} text-2xl font-bold`}>
                                {stats.totalChallenges.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                            <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}