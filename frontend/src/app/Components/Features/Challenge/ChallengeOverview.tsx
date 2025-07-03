import React from 'react';
import { Play, CheckCircle } from 'lucide-react';
import { ChallengeItem } from '@Types/slices/challenge';
import { Category } from "@/generated/graphql";

interface ChallengeOverviewProps {
    activeChallenges: ChallengeItem[];
    completedChallenges: ChallengeItem[];
    getCategoryColor: (category: Category) => string;
}

export default function ChallengeOverview({
    activeChallenges,
    completedChallenges,
    getCategoryColor,
}: ChallengeOverviewProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Challenges */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-light-text">
                    <Play className="w-5 h-5 text-light-primary" />
                    Challenges Activos
                </h3>
                <div className="space-y-4">
                    {activeChallenges.length > 0 ? (
                        activeChallenges.slice(0, 3).map(challenge => (
                            <div key={challenge.id} className="bg-light-card rounded-lg p-4 shadow-sm border border-light-border">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-semibold text-light-text">{challenge.name}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(challenge.category)}`}>
                                        {challenge.category}
                                    </span>
                                </div>
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-light-textSecondary mb-1">
                                        <span>Progreso</span>
                                        {/* Progress is not directly from DB, assuming 0 for active */}
                                        <span>0%</span>
                                    </div>
                                    <div className="w-full bg-light-border rounded-full h-2">
                                        <div
                                            className="bg-light-primary h-2 rounded-full transition-all"
                                            style={{ width: `0%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm text-light-textSecondary">
                                    <span>🔥 0 días</span> {/* Streak not from DB */}
                                    <span>{challenge.points} pts</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-light-textSecondary">No hay desafíos activos.</p>
                    )}
                </div>
            </div>

            {/* Recent Completions */}
            <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-light-text">
                    <CheckCircle className="w-5 h-5 text-light-success" />
                    Completados Recientemente
                </h3>
                <div className="space-y-4">
                    {completedChallenges.length > 0 ? (
                        completedChallenges.slice(0, 3).map(challenge => (
                            <div key={challenge.id} className="bg-light-card rounded-lg p-4 shadow-sm border border-light-success/20">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-light-text">{challenge.name}</h4>
                                    <CheckCircle className="w-5 h-5 text-light-success" />
                                </div>
                                <p className="text-sm text-light-textSecondary mb-2">{challenge.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className={`px-2 py-1 rounded-full ${getCategoryColor(challenge.category)}`}>
                                        {challenge.category}
                                    </span>
                                    <span className="text-light-success font-semibold">+{challenge.points} pts</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-light-textSecondary">No hay desafíos completados recientemente.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
