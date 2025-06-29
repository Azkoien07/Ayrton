'use client';

import { useState, useEffect } from 'react';
import { cn } from '@utilities/utils';
import { roleOptions } from '@Types/dashboard';
import { motion } from 'framer-motion';
import { FileText, Calendar, User, Settings } from 'lucide-react';
import { useUser } from '@context/userContext';
import Sidebar from '@components/UI/Sidebar';
import Barrita from '@components/Header';
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
        const updateGreeting = () => {
            const timeGreeting = getTimeBasedGreeting();
            setGreeting(timeGreeting.greeting);
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);
        return () => clearInterval(interval);
    }, []);

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
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={validRole} />

            <main className={cn('flex-1 flex flex-col transition-all duration-500 ease-in-out', sidebarOpen ? 'ml-[240px]' : 'ml-[72px]')}>
                <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border" />
                <Barrita />
                <div className="flex-1 overflow-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="p-6">
                        <div className="rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border">
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
            </main>

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
