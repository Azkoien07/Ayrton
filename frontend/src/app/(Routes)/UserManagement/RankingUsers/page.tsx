"use client";
import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Users, Activity, ArrowLeft, Menu, X } from 'lucide-react';
import { useRankingData } from "@/app/Hooks/RankingData";
import Sidebar from '@components/UI/Sidebar';
import StatCard from '@components/RankingUsers/StatCard';
import RankingCard from '@components/RankingUsers/RankingCard';
import SkeletonCard from '@components/RankingUsers/SkeletonCard';

export default function PageRanking() {
    const {
        rankings,
        loading,
        error,
        stats,
        filters,
        searchRankings,
        clearFilters
    } = useRankingData();

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        searchRankings(value);
    };

    if (error) {
        return (
            <div className="flex h-screen bg-gray-100 dark:bg-dark-background overflow-hidden">
                <Sidebar role="admin" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-2">Error al cargar rankings</h2>
                        <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block">
                <Sidebar role="admin" />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-64">
                        <Sidebar role="admin" />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                    <div className="px-4 py-4 sm:px-6 sm:py-6">
                        <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={handleGoBack}
                                    className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-light-text dark:text-dark-text truncate">
                                        Ranking de Usuarios
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        {stats.totalUsers} usuarios • {stats.activeUsers} activos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats Cards - Ahora dentro del contenedor principal */}
                <div className="px-4 py-6 sm:px-6 lg:px-8 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
                    <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                icon={<Users className="text-blue-500" size={24} />}
                                title="Total Usuarios"
                                value={stats.totalUsers.toString()}
                            />
                            <StatCard
                                icon={<Activity className="text-green-500" size={24} />}
                                title="Usuarios Activos"
                                value={stats.activeUsers.toString()}
                            />
                            <StatCard
                                icon={<TrendingUp className="text-purple-500" size={24} />}
                                title="Nivel Promedio"
                                value={stats.averageLevel.toString()}
                            />
                            <StatCard
                                icon={<Trophy className="text-yellow-500" size={24} />}
                                title="Total Desafíos"
                                value={stats.totalChallenges.toString()}
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="px-4 py-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 border-b border-light-border dark:border-dark-border">
                        <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-light-text dark:text-dark-text">Filtros Activos</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-light-primary hover:text-light-primary-dark"
                                >
                                    Limpiar todo
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => (
                                    value !== undefined && (
                                        <span
                                            key={key}
                                            className="inline-flex items-center px-3 py-1 bg-light-primary text-white text-sm rounded-full"
                                        >
                                            {key}: {value.toString()}
                                            <X size={14} className="ml-1 cursor-pointer" />
                                        </span>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rankings.map((ranking) => (
                                    <RankingCard key={ranking.id} ranking={ranking} />
                                ))}
                            </div>
                        )}

                        {!loading && rankings.length === 0 && (
                            <div className="text-center py-12">
                                <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    No se encontraron rankings
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Prueba ajustando los filtros o creando un nuevo ranking
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}