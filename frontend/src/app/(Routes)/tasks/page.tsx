'use client';

import { useState, useEffect, Key, SetStateAction } from 'react';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';

import Task from '@/app/Components/Task';
import UserContentAdmin from '@/app/Components/content/UserContentAdmin';
import Barrita from '@/app/Components/barrita';
import { motion } from 'framer-motion';
import ListTasks from '@/app/Components/listtasks'; 
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
                                <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Panel de</span>
                                <span className='text-light-text dark:text-dark-text text-3xl font-bold'>tareas</span>
                            </div>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mt-2">
                                {getTimeBasedGreeting().description}
                            </p>

                            {/* Carrusel de páginas del usuario */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-6">
                                    
                                </div>

                              
                            </div>
                           
                        </div>
                         <div className="mt-8">
                               <ListTasks></ListTasks>
                            </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;