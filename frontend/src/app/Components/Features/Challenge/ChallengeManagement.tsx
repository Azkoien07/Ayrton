import React, { useState } from 'react';
import { 
    Search, 
    Filter, 
    RefreshCw, 
    Trophy, 
    Medal, 
    Award,
    User,
    Calendar,
    Target
} from 'lucide-react';
import { RankingEntity, ChallengeEntity, RankingFilters } from  '@/app/Hooks/RankingData';

interface ChallengeManagementProps {
    rankings: RankingEntity[];
    loading: boolean;
    error: any;
    filters: RankingFilters;
    searchTermBar: string;
    setSearchTermBar: (term: string) => void;
    onSearch: (term: string) => void;
    onFilterByLevel: (level: number) => void;
    onFilterByCategory: (category: ChallengeEntity['category']) => void;
    onToggleActiveFilter: () => void;
    onClearFilters: () => void;
    topRankings: RankingEntity[];
    onRefresh: () => void;
}

export default function ChallengeManagement({
    rankings,
    loading,
    error,
    filters,
    searchTermBar,
    setSearchTermBar,
    onSearch,
    onFilterByLevel,
    onFilterByCategory,
    onToggleActiveFilter,
    onClearFilters,
    topRankings,
    onRefresh
}: ChallengeManagementProps) {
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermBar(e.target.value);
        onSearch(e.target.value);
    };

    const getRankIcon = (position: number) => {
        switch (position) {
            case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 2: return <Medal className="w-6 h-6 text-gray-400" />;
            case 3: return <Award className="w-6 h-6 text-amber-600" />;
            default: return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{position}</div>;
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Baja': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Intermedia': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Alta': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Desarrollo': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Productividad': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'Eficiencia': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">Error al cargar los challenges</div>
                <button 
                    onClick={onRefresh}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar usuarios o challenges..."
                            value={searchTermBar}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover transition-colors flex items-center gap-2"
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Actualizar
                        </button>
                    </div>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Nivel
                                </label>
                                <select
                                    value={filters.level || ''}
                                    onChange={(e) => e.target.value ? onFilterByLevel(Number(e.target.value)) : onClearFilters()}
                                    className="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                >
                                    <option value="">Todos los niveles</option>
                                    {[1,2,3,4,5].map(level => (
                                        <option key={level} value={level}>Nivel {level}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Categoría
                                </label>
                                <select
                                    value={filters.category || ''}
                                    onChange={(e) => e.target.value ? onFilterByCategory(e.target.value as ChallengeEntity['category']) : onClearFilters()}
                                    className="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                >
                                    <option value="">Todas las categorías</option>
                                    <option value="Desarrollo">Desarrollo</option>
                                    <option value="Productividad">Productividad</option>
                                    <option value="Eficiencia">Eficiencia</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={onToggleActiveFilter}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        filters.isActive 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text border border-light-border dark:border-dark-border'
                                    }`}
                                >
                                    Solo activos
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Top Rankings */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top 10 Rankings
                </h3>
                
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {topRankings.map((ranking) => (
                            <div 
                                key={ranking.id}
                                className="flex items-center gap-4 p-4 bg-light-background dark:bg-dark-background rounded-lg border border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    {getRankIcon(ranking.position)}
                                </div>
                                
                                <div className="flex-shrink-0">
                                    {ranking.userAvatar ? (
                                        <img 
                                            src={ranking.userAvatar} 
                                            alt={ranking.userName}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-500" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-light-text dark:text-dark-text truncate">
                                        {ranking.userName}
                                    </h4>
                                    <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                        Nivel {ranking.level} • {ranking.totalPoints} puntos
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className={`px-2 py-1 rounded-full text-xs ${ranking.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}`}>
                                        {ranking.isActive ? 'Activo' : 'Inactivo'}
                                    </div>
                                    {ranking.lastActivity && (
                                        <div className="text-xs text-light-textSecondary dark:text-dark-textSecondary flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(ranking.lastActivity).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* All Rankings */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                    Todos los Rankings ({rankings.length})
                </h3>
                
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="animate-pulse flex items-center gap-4 p-4">
                                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : rankings.length === 0 ? (
                    <div className="text-center py-12">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-light-textSecondary dark:text-dark-textSecondary">
                            No se encontraron rankings con los filtros aplicados
                        </p>
                        <button
                            onClick={onClearFilters}
                            className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {rankings.map((ranking) => (
                            <div 
                                key={ranking.id}
                                className="flex items-center gap-4 p-4 bg-light-background dark:bg-dark-background rounded-lg border border-light-border dark:border-dark-border hover:bg-light-hover dark:hover:bg-dark-hover transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    {getRankIcon(ranking.position)}
                                </div>
                                
                                <div className="flex-shrink-0">
                                    {ranking.userAvatar ? (
                                        <img 
                                            src={ranking.userAvatar} 
                                            alt={ranking.userName}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-gray-500" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-medium text-light-text dark:text-dark-text truncate">
                                        {ranking.userName}
                                    </h4>
                                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                        Nivel {ranking.level} • {ranking.totalPoints} puntos • {ranking.challenges?.length || 0} challenges
                                    </p>
                                    
                                    {/* Challenges Preview */}
                                    {ranking.challenges && ranking.challenges.length > 0 && (
                                        <div className="mt-2 flex gap-2 flex-wrap">
                                            {ranking.challenges.slice(0, 3).map((challenge) => (
                                                <div key={challenge.id} className="flex items-center gap-1">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(challenge.category)}`}>
                                                        {challenge.category}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                                                        {challenge.difficulty}
                                                    </span>
                                                </div>
                                            ))}
                                            {ranking.challenges.length > 3 && (
                                                <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                                    +{ranking.challenges.length - 3} más
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-full text-sm ${ranking.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}`}>
                                        {ranking.isActive ? 'Activo' : 'Inactivo'}
                                    </div>
                                    {ranking.lastActivity && (
                                        <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(ranking.lastActivity).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}