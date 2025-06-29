"use client"
import { useState } from 'react';
import { Search, Plus, Trophy, TrendingUp, Users, Activity, Filter, X } from 'lucide-react';
import Sidebar from '@/app/Components/UI/Sidebar';
import { useRankingData, RankingEntity, ChallengeEntity } from "@/app/Hooks/RankingData";
import StatCard from '@/app/Components/RankingUsers/StatCard';
import RankingCard from '@/app/Components/RankingUsers/RankingCard';
import SkeletonCard from '@/app/Components/RankingUsers/SkeletonCard';

export default function PageRanking() {
    const {
        rankings,
        loading,
        error,
        stats,
        filters,
        searchRankings,
        filterByLevel,
        filterByCategory,
        toggleActiveFilter,
        clearFilters,
        getTopRankings
    } = useRankingData();

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        searchRankings(value);
    };

    if (error) {
        return (
            <div className="flex h-screen bg-gray-100 dark:bg-dark-background">
                <Sidebar role="admin" />
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
        <div className="flex h-screen bg-gray-100 dark:bg-dark-background">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between p-6 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
                    <div>
                        <h1 className="text-2xl font-semibold text-light-text dark:text-dark-text">Ranking de Usuarios</h1>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                            {stats.totalUsers} usuarios • {stats.activeUsers} activos
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                                showFilters 
                                    ? 'bg-light-primary text-white' 
                                    : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            <Filter size={20} className="mr-2" />
                            Filtros
                        </button>
                        <button className="flex items-center px-4 py-2 bg-light-primary text-white rounded-lg shadow-md hover:bg-light-primary-dark transition-colors">
                            <Plus size={20} className="mr-2" />
                            Nuevo Ranking
                        </button>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="p-6 bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                {/* Filters Panel */}
                {showFilters && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-light-border dark:border-dark-border">
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
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
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
                </main>
            </div>
        </div>
    );
}
