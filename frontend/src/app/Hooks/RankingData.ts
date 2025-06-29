import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export interface ChallengeEntity {
  id: number;
  category: 'Desarrollo' | 'Productividad' | 'Eficiencia';
  difficulty: 'Baja' | 'Intermedia' | 'Alta';
  name: string;
  description: string;
  points: number;
  completedAt?: Date;
}

export interface RankingEntity {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  level: number;
  position: number;
  totalPoints: number;
  challenges?: ChallengeEntity[];
  lastActivity?: Date;
  isActive: boolean;
}

export interface RankingFilters {
  search?: string;
  level?: number;
  category?: ChallengeEntity['category'];
  isActive?: boolean;
}

const GET_RANKINGS_QUERY = gql`
  query GetRankings($page: Int!, $size: Int!) {
    allRankings(page: $page, size: $size) {
      data {
        id
        level
        position
      }
      totalPages
      totalItems
      currentPage
    }
  }
`;

export function useRankingData(initialFilters?: RankingFilters) {
  const [filters, setFilters] = useState<RankingFilters>(initialFilters || {});
  const [localRankings, setLocalRankings] = useState<RankingEntity[]>([]);
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { data, loading, error, refetch } = useQuery(GET_RANKINGS_QUERY, {
    variables: { page: pagination.page, size: pagination.size }, 
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.allRankings?.data) { 
      const transformedRankings = data.allRankings.data.map((ranking: any) => ({
        ...ranking,
        userId: ranking.id,
        userName: `Usuario ${ranking.id}`,
        userAvatar: undefined,
        totalPoints: 0, 
        isActive: true,
        lastActivity: new Date(),
        challenges: [], 
      }));
      setLocalRankings(transformedRankings);
    }
  }, [data]);

  
  const updateFilters = useCallback((newFilters: Partial<RankingFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const searchRankings = useCallback((searchTerm: string) => {
    updateFilters({ search: searchTerm });
  }, [updateFilters]);

  const filterByLevel = useCallback((level: number) => {
    updateFilters({ level });
  }, [updateFilters]);

  const filterByCategory = useCallback((category: ChallengeEntity['category']) => {
    updateFilters({ category });
  }, [updateFilters]);

  const toggleActiveFilter = useCallback(() => {
    updateFilters({ isActive: !filters.isActive });
  }, [filters.isActive, updateFilters]);


  const getRankingById = useCallback((id: number) => {
    return localRankings.find(ranking => ranking.id === id);
  }, [localRankings]);

  const getTopRankings = useCallback((limit: number = 10) => {
    return localRankings
      .sort((a, b) => a.position - b.position)
      .slice(0, limit);
  }, [localRankings]);

  const getUserRanking = useCallback((userId: number) => {
    return localRankings.find(ranking => ranking.userId === userId);
  }, [localRankings]);

  const stats = {
    totalUsers: localRankings.length,
    activeUsers: localRankings.filter(r => r.isActive).length,
    averageLevel: Math.round(
      localRankings.reduce((sum, r) => sum + r.level, 0) / (localRankings.length || 1)
    ),
    totalChallenges: localRankings.reduce((sum, r) => sum + (r.challenges?.length || 0), 0),
  };

  return {

    rankings: localRankings,
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
    refetch,
  };
}
