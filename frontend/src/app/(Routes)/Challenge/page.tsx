"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@utilities/utils';
import Sidebar from '@components/UI/Sidebar';
import Barrita from '@components/Header';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchChallenges, addChallenge, updateChallenge, deleteChallenge } from '@slice/challengeSlice';
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { Category, Dificulty } from "@/generated/graphql";
import { ChallengeItem } from '@Types/slices/challenge';

import ChallengeHeader from '@components/Features/Challenge/ChallengeHeader';
import ChallengeNavigationTabs from '@components/Features/Challenge/ChallengeNavigationTabs';
import ChallengeCreateButton from '@components/Features/Challenge/ChallengeCreateButton';
import ChallengeOverview from '@components/Features/Challenge/ChallengeOverview';
import ActiveChallengesList from '@components/Features/Challenge/ActiveChallengesList';
import CompletedChallengesList from '@components/Features/Challenge/CompletedChallengesList';
import ChallengeAnalytics from '@components/Features/Challenge/ChallengeAnalytics';
import CreateChallengeModal from '@components/Features/Challenge/CreateChallengeModal';

export default function UserChallengeDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { data: challenges, loading, error } = useSelector(
        (state: RootState) => state.challenge
    );

    const [newChallenge, setNewChallenge] = useState({
        name: '',
        description: '',
        category: Category.Desarrollo,
        dificulty: Dificulty.Baja,
        points: 50,
    });

    useEffect(() => {
        dispatch(fetchChallenges({ page: 0, size: 100 }));
    }, [dispatch]);

    const handleCreateChallenge = async () => {
        const input = {
            name: newChallenge.name,
            description: newChallenge.description,
            category: newChallenge.category,
            dificulty: newChallenge.dificulty,
            points: newChallenge.points,
            state: false, 
        };
        
        const result = await dispatch(addChallenge(input));
        if (addChallenge.fulfilled.match(result)) {
            toast.success("Desafío creado exitosamente");
            setShowCreateModal(false);
            setNewChallenge({
                name: '',
                description: '',
                category: Category.Desarrollo,
                dificulty: Dificulty.Baja,
                points: 50,
            });
            dispatch(fetchChallenges({ page: 0, size: 100 })); 
        } else {
            toast.error("Error al crear el desafío");
        }
    };

    const handleUpdateChallenge = async (challenge: ChallengeItem) => {
        const input = {
            name: challenge.name,
            description: challenge.description,
            category: challenge.category,
            dificulty: challenge.dificulty,
            points: challenge.points,
            state: challenge.state,
        };
        const result = await dispatch(updateChallenge({ id: challenge.id, input }));
        if (updateChallenge.fulfilled.match(result)) {
            toast.success("Desafío actualizado exitosamente");
            dispatch(fetchChallenges({ page: 0, size: 100 })); 
        } else {
            toast.error("Error al actualizar el desafío");
        }
    };

    const handleDeleteChallenge = async (id: string, name: string) => {
        const result = await dispatch(deleteChallenge(id));
        if (deleteChallenge.fulfilled.match(result)) {
            toast.success(`Desafío ${name} eliminado exitosamente`);
            dispatch(fetchChallenges({ page: 0, size: 100 })); 
        } else {
            toast.error("Error al eliminar el desafío");
        }
    };

    const getDifficultyColor = (dificulty: Dificulty) => {
        switch (dificulty) {
            case Dificulty.Baja: return 'bg-light-success/10 text-light-success border-light-success/20';
            case Dificulty.Intermedia: return 'bg-light-warning/10 text-light-warning border-light-warning/20';
            case Dificulty.Alta: return 'bg-light-error/10 text-light-error border-light-error/20';
            default: return 'bg-light-textSecondary/10 text-light-textSecondary border-light-textSecondary/20';
        }
    };

    const getCategoryColor = (category: Category) => {
        switch (category) {
            case Category.Desarrollo: return 'bg-light-primary/10 text-light-primary';
            case Category.Productividad: return 'bg-light-accent/10 text-light-accent';
            case Category.Eficiencia: return 'bg-light-secondary/10 text-light-secondary';
            default: return 'bg-light-textSecondary/10 text-light-textSecondary';
        }
    };

    const activeChallenges = challenges.filter(c => c.state === false); 
    const completedChallenges = challenges.filter(c => c.state === true); 


    const userDataPlaceholder = {
        name: "Usuario",
        position: " ",
        totalPoints: 0,
        level: 0,
        streak: 0,
        completedChallenges: completedChallenges.length,
    };

    return (
        <div className="flex h-screen bg-light-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="user" />

            <main className={cn('flex-1 flex flex-col transition-all duration-500 ease-in-out', sidebarOpen ? 'ml-[240px]' : 'ml-[72px]')}>
                <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 border-b border-light-border">
                    <Barrita />
                </header>
                <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <ChallengeHeader userDataPlaceholder={userDataPlaceholder} />

                        <ChallengeNavigationTabs
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            activeChallengesCount={activeChallenges.length}
                            completedChallengesCount={completedChallenges.length}
                        />

                        <ChallengeCreateButton activeTab={activeTab} setShowCreateModal={setShowCreateModal} />

                        {loading && <p className="text-light-text">Cargando desafíos...</p>}
                        {error && <p className="text-light-error">Error: {typeof error === 'string' ? error : error.message}</p>}

                        {!loading && !error && activeTab === 'overview' && (
                            <ChallengeOverview
                                activeChallenges={activeChallenges}
                                completedChallenges={completedChallenges}
                                getCategoryColor={getCategoryColor}
                            />
                        )}

                        {!loading && !error && activeTab === 'active' && (
                            <ActiveChallengesList
                                activeChallenges={activeChallenges}
                                getCategoryColor={getCategoryColor}
                                getDifficultyColor={getDifficultyColor}
                                handleUpdateChallenge={handleUpdateChallenge}
                                handleDeleteChallenge={handleDeleteChallenge}
                            />
                        )}

                        {!loading && !error && activeTab === 'completed' && (
                            <CompletedChallengesList
                                completedChallenges={completedChallenges}
                                getCategoryColor={getCategoryColor}
                                getDifficultyColor={getDifficultyColor}
                            />
                        )}

                        {!loading && !error && activeTab === 'analytics' && (
                            <ChallengeAnalytics />
                        )}

                        <CreateChallengeModal
                            showCreateModal={showCreateModal}
                            setShowCreateModal={setShowCreateModal}
                            newChallenge={newChallenge}
                            setNewChallenge={setNewChallenge}
                            handleCreateChallenge={handleCreateChallenge}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
