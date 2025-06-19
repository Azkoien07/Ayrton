'use client';

import { useState, useEffect, Key, SetStateAction } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';

import Task from '@/app/Components/Task';
import UserContentAdmin from '@/app/Components/content/UserContentAdmin';
import Barrita from '@/app/Components/barrita';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, FileText, Calendar, User, Settings, CalendarDays, X, Save, Edit3, Eye } from 'lucide-react';

const Dashboard = ({ role }: DashboardProps) => {
    const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
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

    const [currentPage, setCurrentPage] = useState<UserPage | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editContent, setEditContent] = useState('');
    
    const [userPages, setUserPages] = useState([
        {
            id: 1,
            title: "Espacio de trabajo 1",
            type: "workspace",
            icon: User,
            thumbnail: "/api/placeholder/200/120",
            description: "Mi área de trabajo personal",
            content: "Contenido del espacio de trabajo...",
            createdAt: new Date('2024-01-15')
        },
        {
            id: 2,
            title: "Espacio de trabajo 2",
            type: "tasks",
            icon: FileText,
            thumbnail: "/api/placeholder/200/120",
            description: "Lista de tareas pendientes",
            content: "Lista de tareas por hacer...",
            createdAt: new Date('2024-01-20')
        },
        {
            id: 3,
            title: "Espacio de trabajo 3",
            type: "calendar",
            icon: Calendar,
            thumbnail: "/api/placeholder/200/120",
            description: "Gestión de tiempo",
            content: "Planificación de tiempo...",
            createdAt: new Date('2024-01-25')
        },
        {
            id: 4,
            title: "WorldSkills IT",
            type: "project",
            icon: Settings,
            thumbnail: "/api/placeholder/200/120",
            description: "Proyecto WorldSkills",
            content: "Documentación del proyecto WorldSkills...",
            createdAt: new Date('2024-02-01')
        },
    ]);

    const sections = roleOptions[validRole as keyof typeof roleOptions];


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
                description: 'Comienza tu día gestionando tu panel de configuración.'
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                greeting: 'Buenas tardes',
                description: 'Continúa configurando y optimizando tu sistema.'
            };
        } else {
            return {
                greeting: 'Buenas noches',
                description: 'Revisa y ajusta la configuración de tu sistema.'
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
                    content: editContent.trim() || "Contenido de la página..."
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
        const newPage = {
            id: userPages.length + 1,
            title: newPageTitle.trim(),
            type: newPageType,
            icon: selectedPageType?.icon || FileText,
            thumbnail: "/api/placeholder/200/120",
            description: newPageDescription.trim() || "Nueva página creada",
            content: newPageContent.trim() || "Contenido de la página...",
            createdAt: new Date()
        };
        
        setUserPages([...userPages, newPage]);
        closeModal();
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(userPages.length / 4));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(userPages.length / 4)) % Math.ceil(userPages.length / 4));
    };

    const getVisiblePages = () => {
        const startIndex = currentSlide * 4;
        return userPages.slice(startIndex, startIndex + 4);
    };
    
    function isToday(date: Date) {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    function getDaysInMonth(currentDate: Date): { date: Date; isCurrentMonth: boolean }[] {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const days: { date: Date; isCurrentMonth: boolean }[] = [];
   
        const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
        for (let i = startDay; i > 0; i--) {
            const prevDate = new Date(year, month, 1 - i);
            days.push({ date: prevDate, isCurrentMonth: false });
        }
    
 
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
    
        const endDay = lastDayOfMonth.getDay() === 0 ? 6 : lastDayOfMonth.getDay() - 1;
        for (let i = 1; days.length % 7 !== 0; i++) {
            const nextDate = new Date(year, month + 1, i);
            days.push({ date: nextDate, isCurrentMonth: false });
        }
    
        return days;
    }

    function navigateMonth(offset: number): void {
        setCurrentDate(prevDate => {
            const year = prevDate.getFullYear();
            const month = prevDate.getMonth();
      
            return new Date(year, month + offset, 1);
        });
    }

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
            <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
            </header>
                <Barrita></Barrita>
                {/*first content */}
                <div className="flex-1 overflow-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
                            <div className='flex items-center space-x-2 mb-4'>
                                <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>{greeting}</span>
                                <span className='text-light-text dark:text-dark-text text-3xl font-bold'>Panel</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                                {getTimeBasedGreeting().description}
                            </p>
                        </div>

                        {/* Carrusel de páginas del usuario */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                                    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                        Páginas recientes
                                    </h2>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={openModal}
                                        className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Plus size={16} />
                                        <span>Nueva página</span>
                                    </button>
                                </div>
                            </div>

                            {/* Carrusel */}
                            <div className="relative">
                                <div className="flex items-center space-x-4 overflow-hidden">
                                    {/* Botón anterior */}
                                    <button
                                        onClick={prevSlide}
                                        disabled={userPages.length <= 4}
                                        className="flex-shrink-0 p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={20} className="text-light-text dark:text-dark-text" />
                                    </button>

                                    {/* Contenedor de páginas */}
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {getVisiblePages().map((page, index) => {
                                            const IconComponent = page.icon;
                                            return (
                                                <motion.div
                                                    key={page.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="group cursor-pointer"
                                                    onClick={() => openPage(page)}
                                                >
                                                    <div className="relative overflow-hidden rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 hover:shadow-lg">
                                                        {/* Thumbnail/Preview */}
                                                        <div className="aspect-video bg-gradient-to-br from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 flex items-center justify-center relative overflow-hidden">
                                                            <IconComponent 
                                                                size={32} 
                                                                className="text-light-primary dark:text-dark-primary opacity-60" 
                                                            />
                                                            {/* Overlay de hover */}
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                                        </div>

                                                        {/* Contenido */}
                                                        <div className="p-4">
                                                            <h3 className="font-medium text-light-text dark:text-dark-text text-sm mb-1 truncate">
                                                                {page.title}
                                                            </h3>
                                                            <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs mb-2 line-clamp-2">
                                                                {page.description}
                                                            </p>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                                                    {page.createdAt.toLocaleDateString()}
                                                                </span>
                                                                <div className="w-2 h-2 bg-light-success dark:bg-dark-success rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Botón siguiente */}
                                    <button
                                        onClick={nextSlide}
                                        disabled={userPages.length <= 4}
                                        className="flex-shrink-0 p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={20} className="text-light-text dark:text-dark-text" />
                                    </button>
                                </div>

                                {/* Indicadores de slide */}
                                {userPages.length > 4 && (
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {Array.from({ length: Math.ceil(userPages.length / 4) }).map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={cn(
                                                    "w-2 h-2 rounded-full transition-colors",
                                                    index === currentSlide
                                                        ? "bg-light-primary dark:bg-dark-primary"
                                                        : "bg-light-border dark:bg-dark-border"
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Calendario */}
                        <div className="mt-8">
                            <div className="w-[150p]-md   dark:bg-gray-800  p-4">
                                <div className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                    Calendario
                                </h2>
                            </div>

                            <div className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border p-2">
                                {/* Header del calendario */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                    >
                                        <ChevronLeft size={20} className="text-light-text dark:text-dark-text" />
                                    </button>
                                    
                                    <div className="flex items-center space-x-3">
                                        <CalendarDays size={20} className="text-light-primary dark:text-dark-primary" />
                                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </h3>
                                    </div>
                                    
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                    >
                                        <ChevronRight size={20} className="text-light-text dark:text-dark-text" />
                                    </button>
                                </div>

                                {/* Días de la semana */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {dayNames.map((day) => (
                                        <div key={day} className="text-center py-2 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Días del mes */}
                                <div className="grid grid-cols-7 gap-1">
                                    {getDaysInMonth(currentDate).map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedDate(day.date)}
                                            className={cn(
                                                "aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-200 hover:bg-light-cardHover dark:hover:bg-dark-cardHover",
                                                [
                                                    !day.isCurrentMonth && "text-light-textSecondary dark:text-dark-textSecondary",
                                                    day.isCurrentMonth && "text-light-text dark:text-dark-text",
                                                    selectedDate.getTime() === day.date.getTime() && "bg-light-primary dark:bg-dark-primary text-white font-semibold",
                                                    isToday(day.date) && selectedDate.getTime() !== day.date.getTime() && "bg-light-success/20 dark:bg-dark-success/20 text-light-success dark:text-dark-success font-medium"
                                                ].filter(Boolean).join(" ")
                                            )}
                                        >
                                            {day.date.getDate()}
                                        </button>
                                    ))}
                                </div>

                                {/* Footer del calendario */}
                                <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-light-success dark:bg-dark-success rounded-full"></div>
                                                <span className="text-light-textSecondary dark:text-dark-textSecondary">Hoy</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-3 h-3 bg-light-primary dark:bg-dark-primary rounded-full"></div>
                                                <span className="text-light-textSecondary dark:text-dark-textSecondary">Seleccionado</span>
                                            </div>
                                        </div>
                                        <span className="text-light-textSecondary dark:text-dark-textSecondary">
                                            {selectedDate.toLocaleDateString('es-ES', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Modal para ver/editar página existente */}
            {isViewModalOpen && currentPage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header del modal */}
                        <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                            <div className="flex items-center space-x-3">
                                <currentPage.icon size={24} className="text-light-primary dark:text-dark-primary" />
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="text-xl font-semibold bg-transparent border-b border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary outline-none text-light-text dark:text-dark-text"
                                    />
                                ) : (
                                    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                        {currentPage.title}
                                    </h2>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                        >
                                            <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                                        </button>
                                        <button
                                            onClick={savePageChanges}
                                            className="flex items-center space-x-2 px-3 py-1.5 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
                                        >
                                            <Save size={16} />
                                            <span>Guardar</span>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                    >
                                        <Edit3 size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                                    </button>
                                )}
                                <button
                                    onClick={closeViewModal}
                                    className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                                >
                                    <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                                </button>
                            </div>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6 space-y-6">
                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Descripción
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        placeholder="Breve descripción de tu página"
                                        className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                                    />
                                ) : (
                                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                        {currentPage.description || "Sin descripción"}
                                    </p>
                                )}
                            </div>

                            {/* Información de la página */}
                            <div className="flex items-center space-x-6 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} />
                                    <span>Creado: {currentPage.createdAt.toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Eye size={16} />
                                    <span>Tipo: {pageTypes.find(type => type.value === currentPage.type)?.label || currentPage.type}</span>
                                </div>
                            </div>

                            {/* Contenido */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Contenido
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        placeholder="Escribe el contenido de tu página..."
                                        rows={12}
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary resize-none"
                                    />
                                ) : (
                                    <div className="w-full min-h-[300px] px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text whitespace-pre-wrap">
                                        {currentPage.content || "Esta página no tiene contenido aún."}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer del modal - solo se muestra cuando no está editando */}
                        {!isEditing && (
                            <div className="flex items-center justify-between p-6 border-t border-light-border dark:border-dark-border">
                                <div className="flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                    <div className="w-2 h-2 bg-light-success dark:bg-dark-success rounded-full"></div>
                                    <span>Página guardada automáticamente</span>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    <Edit3 size={16} />
                                    <span>Editar página</span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Modal para crear nueva página */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header del modal */}
                        <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-dark-border">
                            <div className="flex items-center space-x-3">
                                <Plus size={24} className="text-light-primary dark:text-dark-primary" />
                                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                    Crear nueva página
                                </h2>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 rounded-full hover:bg-light-cardHover dark:hover:bg-dark-cardHover transition-colors"
                            >
                                <X size={20} className="text-light-textSecondary dark:text-dark-textSecondary" />
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6 space-y-6">
                            {/* Título */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Título de la página *
                                </label>
                                <input
                                    type="text"
                                    value={newPageTitle}
                                    onChange={(e) => setNewPageTitle(e.target.value)}
                                    placeholder="Ingresa el título de tu página"
                                    className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                                />
                            </div>

                            {/* Tipo de página */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Tipo de página
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {pageTypes.map((type) => {
                                        const IconComponent = type.icon;
                                        return (
                                            <button
                                                key={type.value}
                                                onClick={() => setNewPageType(type.value)}
                                                className={cn(
                                                    "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200",
                                                    newPageType === type.value
                                                        ? "bg-light-primary/10 dark:bg-dark-primary/10 border-light-primary dark:border-dark-primary"
                                                        : "bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary"
                                                )}
                                            >
                                                <IconComponent 
                                                    size={18} 
                                                    className={cn(
                                                        newPageType === type.value
                                                            ? "text-light-primary dark:text-dark-primary"
                                                            : "text-light-textSecondary dark:text-dark-textSecondary"
                                                    )}
                                                />
                                                <span className={cn(
                                                    "text-sm font-medium",
                                                    newPageType === type.value
                                                        ? "text-light-primary dark:text-dark-primary"
                                                        : "text-light-text dark:text-dark-text"
                                                )}>
                                                    {type.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    value={newPageDescription}
                                    onChange={(e) => setNewPageDescription(e.target.value)}
                                    placeholder="Breve descripción de tu página"
                                    className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
                                />
                            </div>

                            {/* Contenido */}
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Contenido inicial
                                </label>
                                <textarea
                                    value={newPageContent}
                                    onChange={(e) => setNewPageContent(e.target.value)}
                                    placeholder="Escribe el contenido inicial de tu página..."
                                    rows={6}
                                    className="w-full px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer del modal */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-light-border dark:border-dark-border">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-cardHover dark:hover:bg-dark-cardHover rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={createNewPage}
                                className="flex items-center space-x-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                <Save size={16} />
                                <span>Crear página</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;