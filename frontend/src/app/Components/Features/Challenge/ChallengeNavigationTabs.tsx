import React from 'react';

interface ChallengeNavigationTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    activeChallengesCount: number;
    completedChallengesCount: number;
}

export default function ChallengeNavigationTabs({
    activeTab,
    setActiveTab,
    activeChallengesCount,
    completedChallengesCount,
}: ChallengeNavigationTabsProps) {
    return (
        <div className="flex space-x-1 bg-light-accentSoft rounded-lg p-1 mb-6">
            <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'overview'
                        ? 'bg-light-card text-light-primary shadow-sm'
                        : 'text-light-textSecondary hover:text-light-text'
                    }`}
            >
                Vista General
            </button>
            <button
                onClick={() => setActiveTab('active')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'active'
                        ? 'bg-light-card text-light-primary shadow-sm'
                        : 'text-light-textSecondary hover:text-light-text'
                    }`}
            >
                Challenges Activos ({activeChallengesCount})
            </button>
            <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'completed'
                        ? 'bg-light-card text-light-primary shadow-sm'
                        : 'text-light-textSecondary hover:text-light-text'
                    }`}
            >
                Completados ({completedChallengesCount})
            </button>
            <button
                onClick={() => setActiveTab('analytics')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${activeTab === 'analytics'
                        ? 'bg-light-card text-light-primary shadow-sm'
                        : 'text-light-textSecondary hover:text-light-text'
                    }`}
            >
                Analíticas
            </button>
        </div>
    );
}
