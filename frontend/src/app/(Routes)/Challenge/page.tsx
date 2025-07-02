"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchChallenges, addChallenge, updateChallenge, deleteChallenge } from '@slice/challengeSlice';
import type { AppDispatch, RootState } from "@store/store";
import { Category, Dificulty } from "@/generated/graphql";
import { ChallengeItem } from '@Types/slices/challenge';
import Sidebar from '@components/UI/Sidebar';
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
    const [isClient, setIsClient] = useState(false);

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
        setIsClient(true);
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


    const handleGoBack = () => {
        window.history.back();
    };

    const userDataPlaceholder = {
        name: "Usuario",
        position: " ",
        totalPoints: 0,
        level: 0,
        streak: 0,
        completedChallenges: completedChallenges.length,
    };

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block">
                <Sidebar role={'user'} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-64">
                        <Sidebar role={'user'} />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col min-w-0">
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
                                        Desafíos
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        Explora y completa desafíos para mejorar tus habilidades
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
