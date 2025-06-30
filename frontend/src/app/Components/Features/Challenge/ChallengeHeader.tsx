import React from 'react';
import { Trophy, Target, Zap, CheckCircle } from 'lucide-react';
import { ChallengeItem } from '@Types/slices/challenge';

interface ChallengeHeaderProps {
    userDataPlaceholder: {
        name: string;
        position: string;
        totalPoints: number;
        level: number;
        streak: number;
        completedChallenges: number;
    };
}

export default function ChallengeHeader({ userDataPlaceholder }: ChallengeHeaderProps) {
    return (
        <div className="mb-8">
            <div className="bg-gradient-to-r from-light-primary to-light-secondary rounded-xl p-8 text-white mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">¡Hola, {userDataPlaceholder.name}!</h1>
                        <p className="text-light-accentSoft text-lg">Continúa tu racha de desafíos</p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold">#{userDataPlaceholder.position}</div>
                        <div className="text-light-accentSoft">Posición Global</div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 rounded-lg p-4">
                        <Trophy className="w-6 h-6 mb-2" />
                        <div className="text-2xl font-bold">{userDataPlaceholder.totalPoints}</div>
                        <div className="text-sm text-light-accentSoft">Puntos Totales</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <Target className="w-6 h-6 mb-2" />
                        <div className="text-2xl font-bold">{userDataPlaceholder.level}</div>
                        <div className="text-sm text-light-accentSoft">Nivel Actual</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <Zap className="w-6 h-6 mb-2" />
                        <div className="text-2xl font-bold">{userDataPlaceholder.streak}</div>
                        <div className="text-sm text-light-accentSoft">Días de Racha</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <CheckCircle className="w-6 h-6 mb-2" />
                        <div className="text-2xl font-bold">{userDataPlaceholder.completedChallenges}</div>
                        <div className="text-sm text-light-accentSoft">Completados</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
