import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ChallengeItem } from '@Types/slices/challenge';
import { Category, Dificulty } from "@/generated/graphql";

interface CompletedChallengesListProps {
    completedChallenges: ChallengeItem[];
    getCategoryColor: (category: Category) => string;
    getDifficultyColor: (dificulty: Dificulty) => string;
}

export default function CompletedChallengesList({
    completedChallenges,
    getCategoryColor,
    getDifficultyColor,
}: CompletedChallengesListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedChallenges.length > 0 ? (
                completedChallenges.map(challenge => (
                    <div key={challenge.id} className="bg-light-card rounded-lg p-6 shadow-sm border border-light-success/20">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-light-text mb-2">{challenge.name}</h3>
                                <p className="text-sm text-light-textSecondary mb-3">{challenge.description}</p>
                            </div>
                            <CheckCircle className="w-6 h-6 text-light-success" />
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

                            <div className="bg-light-success/10 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-light-success">¡Completado!</span>
                                    <span className="text-lg font-bold text-light-success">+{challenge.points} pts</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-light-textSecondary pt-2 border-t border-light-border">
                                <span>Completado: N/A</span> {/* Completion Date not from DB */}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-light-textSecondary">No hay desafíos completados.</p>
            )}
        </div>
    );
}
