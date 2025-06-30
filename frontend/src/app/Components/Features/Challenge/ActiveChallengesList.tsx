import React from 'react';
import { CheckCircle, Trash2, Zap, Star } from 'lucide-react';
import { ChallengeItem } from '@Types/slices/challenge';
import { Category, Dificulty } from "@/generated/graphql";

interface ActiveChallengesListProps {
    activeChallenges: ChallengeItem[];
    getCategoryColor: (category: Category) => string;
    getDifficultyColor: (dificulty: Dificulty) => string;
    handleUpdateChallenge: (challenge: ChallengeItem) => Promise<void>;
    handleDeleteChallenge: (id: string, name: string) => Promise<void>;
}

export default function ActiveChallengesList({
    activeChallenges,
    getCategoryColor,
    getDifficultyColor,
    handleUpdateChallenge,
    handleDeleteChallenge,
}: ActiveChallengesListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.length > 0 ? (
                activeChallenges.map(challenge => (
                    <div key={challenge.id} className="bg-light-card rounded-lg p-6 shadow-sm border border-light-border hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-light-text mb-2">{challenge.name}</h3>
                                <p className="text-sm text-light-textSecondary mb-3">{challenge.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    className="p-1 text-light-textSecondary hover:text-light-primary"
                                    onClick={() => handleUpdateChallenge({ ...challenge, state: true })} // Mark as completed
                                >
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                    className="p-1 text-light-textSecondary hover:text-light-error"
                                    onClick={() => handleDeleteChallenge(challenge.id, challenge.name)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(challenge.category)}`}>
                                    {challenge.category}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(challenge.dificulty)}`}>
                                    {challenge.dificulty}
                                </span>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm text-light-textSecondary mb-1">
                                    <span>Progreso</span>
                                    <span>0%</span> {/* Progress not from DB */}
                                </div>
                                <div className="w-full bg-light-border rounded-full h-2">
                                    <div 
                                        className="bg-light-primary h-2 rounded-full transition-all"
                                        style={{ width: `0%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-2 text-sm text-light-textSecondary">
                                    <Zap className="w-4 h-4" />
                                    <span>0 días</span> {/* Streak not from DB */}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-light-primary">
                                    <Star className="w-4 h-4" />
                                    <span>{challenge.points} pts</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-light-textSecondary pt-2 border-t border-light-border">
                                <span>Inicio: N/A</span> {/* Start/End Date not from DB */}
                                <span>Fin: N/A</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-light-textSecondary">No hay desafíos activos.</p>
            )}
        </div>
    );
}
