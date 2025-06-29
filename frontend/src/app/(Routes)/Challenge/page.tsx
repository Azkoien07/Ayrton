"use client";

import { useState } from "react";
import { cn } from '@utilities/utils';
import { useUser } from '@context/userContext';
import { useRankingData } from  '@/app/Hooks/RankingData';
import Sidebar from '@components/UI/Sidebar';
import Barrita from '@components/Header';
import ChallengeManagement from "@/app/Components/Features/Challenge/ChallengeManagement";
import ChallengeDashboardHeader from "@/app/Components/Features/Challenge/ChallengeDashboardHeader";
export default function ChallengeDashboard() {
    const { user } = useUser();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTermBar, setSearchTermBar] = useState("");

    // Usando tu hook personalizado
    const {
        rankings,
        loading,
        error,
        stats,
        filters,
        updateFilters,
        clearFilters,
        searchRankings,
        filterByLevel,
        filterByCategory,
        toggleActiveFilter,
        getRankingById,
        getTopRankings,
        getUserRanking,
        refetch
    } = useRankingData();

    const textSecondary = 'text-light-textSecondary dark:text-dark-textSecondary';
    const textColor = 'text-light-text dark:text-dark-text';

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                role={validRole} 
            />

            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
                </header>
                <Barrita />
                
                {/* Challenge Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        <ChallengeDashboardHeader 
                            textSecondaryClass={textSecondary} 
                            textColorClass={textColor}
                            stats={stats}
                            userRanking={getUserRanking(user?.id ? Number(user.id) : 0)}
                        />
                        <ChallengeManagement 
                            rankings={rankings}
                            loading={loading}
                            error={error}
                            filters={filters}
                            searchTermBar={searchTermBar}
                            setSearchTermBar={setSearchTermBar}
                            onSearch={searchRankings}
                            onFilterByLevel={filterByLevel}
                            onFilterByCategory={filterByCategory}
                            onToggleActiveFilter={toggleActiveFilter}
                            onClearFilters={clearFilters}
                            topRankings={getTopRankings(10)}
                            onRefresh={refetch}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}