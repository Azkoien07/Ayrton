'use client';

import { useState, useEffect } from 'react';
import { roleOptions } from '@Types/dashboard';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Settings, ArrowLeft, Menu, X } from 'lucide-react';
import { useUser } from '@context/userContext';
import Sidebar from '@components/UI/Sidebar';
import NewPageModal from '@components/Modals/NewPageModal';
import ViewEditPageModal from '@components/Modals/ViewEditPageModal';
import UserPagesCarousel from '@components/UserPagesCarousel';
import UserCalendar from '@components/UserCalendar';

type UserPage = {
    id: number;
    title: string;
    type: string;
    icon: React.ElementType;
    thumbnail: string;
    description: string;
    content: string;
    createdAt: Date;
};

const UserBasicContent = () => {
    const { user } = useUser();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPageTitle, setNewPageTitle] = useState('');
    const [newPageDescription, setNewPageDescription] = useState('');
    const [newPageContent, setNewPageContent] = useState('');
    const [newPageType, setNewPageType] = useState('document');

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<UserPage | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editContent, setEditContent] = useState('');

    const [userPages, setUserPages] = useState<UserPage[]>([
        {
            id: 1,
            title: "Espacio de trabajo 1",
            type: "workspace",
            icon: User,
            thumbnail: "/api/placeholder/200/120",
            description: "Mi área de trabajo personal",
            content: "Contenido del espacio de trabajo...",
            createdAt: new Date('2024-01-15'),
        },
        {
            id: 2,
            title: "Espacio de trabajo 2",
            type: "tasks",
            icon: FileText,
            thumbnail: "/api/placeholder/200/120",
            description: "Lista de tareas pendientes",
            content: "Lista de tareas por hacer...",
            createdAt: new Date('2024-01-20'),
        },
        {
            id: 3,
            title: "Espacio de trabajo 3",
            type: "calendar",
            icon: Calendar,
            thumbnail: "/api/placeholder/200/120",
            description: "Gestión de tiempo",
            content: "Planificación de tiempo...",
            createdAt: new Date('2024-01-25'),
        },
        {
            id: 4,
            title: "WorldSkills IT",
            type: "project",
            icon: Settings,
            thumbnail: "/api/placeholder/200/120",
            description: "Proyecto WorldSkills",
            content: "Documentación del proyecto WorldSkills...",
            createdAt: new Date('2024-02-01'),
        },
    ]);

    const pageTypes = [
        { value: 'document', label: 'Documento', icon: FileText },
        { value: 'tasks', label: 'Tareas', icon: FileText },
        { value: 'calendar', label: 'Calendario', icon: Calendar },
        { value: 'workspace', label: 'Espacio de trabajo', icon: User },
        { value: 'project', label: 'Proyecto', icon: Settings },
    ];

    const getTimeBasedGreeting = () => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 5 && hour < 12) {
            return {
                greeting: 'Buenos días',
                description: 'Comienza tu día gestionando tu panel de configuración.',
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                greeting: 'Buenas tardes',
                description: 'Continúa configurando y optimizando tu sistema.',
            };
        } else {
            return {
                greeting: 'Buenas noches',
                description: 'Revisa y ajusta la configuración de tu sistema.',
            };
        }
    };

    useEffect(() => {
        setIsClient(true);
        const updateGreeting = () => {
            const timeGreeting = getTimeBasedGreeting();
            setGreeting(timeGreeting.greeting);
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    const openModal = () => {
        setIsModalOpen(true);
        setNewPageTitle('');
        setNewPageDescription('');
        setNewPageContent('');
        setNewPageType('document');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewPageTitle('');
        setNewPageDescription('');
        setNewPageContent('');
        setNewPageType('document');
    };

    const openPage = (page: UserPage | null) => {
        setCurrentPage(page);
        if (page) {
            setEditTitle(page.title);
            setEditDescription(page.description);
            setEditContent(page.content);
        } else {
            setEditTitle('');
            setEditDescription('');
            setEditContent('');
        }
        setIsEditing(false);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setCurrentPage(null);
        setIsEditing(false);
        setEditTitle('');
        setEditDescription('');
        setEditContent('');
    };

    const savePageChanges = () => {
        if (!editTitle.trim()) {
            alert('Por favor, ingresa un título para la página');
            return;
        }

        if (!currentPage) {
            alert('No hay página seleccionada para editar.');
            return;
        }

        const updatedPages = userPages.map(page =>
            page.id === currentPage.id
                ? {
                    ...page,
                    title: editTitle.trim(),
                    description: editDescription.trim() || "Página editada",
                    content: editContent.trim() || "Contenido de la página...",
                }
                : page
        );

        setUserPages(updatedPages);
        setIsEditing(false);
        const updatedCurrentPage = updatedPages.find(page => page.id === currentPage.id);
        setCurrentPage(updatedCurrentPage ?? null);
    };

    const createNewPage = () => {
        if (!newPageTitle.trim()) {
            alert('Por favor, ingresa un título para la página');
            return;
        }

        const selectedPageType = pageTypes.find(type => type.value === newPageType);
        const newPage: UserPage = {
            id: userPages.length + 1,
            title: newPageTitle.trim(),
            type: newPageType,
            icon: selectedPageType?.icon || FileText,
            thumbnail: "/api/placeholder/200/120",
            description: newPageDescription.trim() || "Nueva página creada",
            content: newPageContent.trim() || "Contenido de la página...",
            createdAt: new Date(),
        };

        setUserPages([...userPages, newPage]);
        closeModal();
    };

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block">
                <Sidebar role={validRole} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative w-64">
                        <Sidebar role={validRole} />
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
                                        Panel de Usuario
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        {getTimeBasedGreeting().description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto">
                        <div className="rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border shadow-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light">{greeting}</span>
                                <span className="text-light-text dark:text-dark-text text-3xl font-bold">Panel</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                                {getTimeBasedGreeting().description}
                            </p>
                        </div>

                        <UserPagesCarousel
                            userPages={userPages}
                            currentSlide={currentSlide}
                            setCurrentSlide={setCurrentSlide}
                            openModal={openModal}
                            openPage={openPage}
                        />

                        <UserCalendar
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </motion.div>
                </div>
            </div> {/* Cierre del div que envuelve header y contenido */}

            <ViewEditPageModal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                currentPage={currentPage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                editContent={editContent}
                setEditContent={setEditContent}
                savePageChanges={savePageChanges}
                pageTypes={pageTypes}
            />

            <NewPageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                newPageTitle={newPageTitle}
                setNewPageTitle={setNewPageTitle}
                newPageDescription={newPageDescription}
                setNewPageDescription={setNewPageDescription}
                newPageContent={newPageContent}
                setNewPageContent={setNewPageContent}
                newPageType={newPageType}
                setNewPageType={setNewPageType}
                createNewPage={createNewPage}
                pageTypes={pageTypes}
            />
        </div>
    );
};

export default UserBasicContent;
