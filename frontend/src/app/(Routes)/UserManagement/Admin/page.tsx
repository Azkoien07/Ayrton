'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@utilities/utils';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import { useUser } from '@context/userContext'; 
import Sidebar from '@components/UI/Sidebar';
import UserContentAdmin from '@components/content/UserContentAdmin';
import { fetchUsers } from '@slice/userSlice'
import { UseDispatch } from 'react-redux';
import type { AppDispatch, RootState } from "@/app/Redux/store";

const Dashboard = ({ role }: DashboardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useUser();
    const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
    const [selected, setSelected] = useState(roleOptions[validRole as keyof typeof roleOptions][0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const users = useSelector((state: RootState) => state.user.data);
    const [page, setPage] = useState(0);
    const itemsPerPage = 5;
    const [isClient, setIsClient] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const sections = roleOptions[validRole as keyof typeof roleOptions];

    useEffect(() => {
        setIsClient(true);
        dispatch(fetchUsers({ page, size: itemsPerPage }));
    }, [dispatch, page, itemsPerPage]);

    const handleGoBack = () => {
        window.history.back();
    };

    const generateUsersPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
    
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        let yPosition = 25;
        
        
        const primaryColor: [number, number, number] = [41, 128, 185]; 
        const secondaryColor: [number, number, number] = [236, 240, 241]; 
        const accentColor: [number, number, number] = [46, 204, 113];
        const textColor: [number, number, number] = [44, 62, 80]; 
   
       
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 45, 'F');
        

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('REPORTE DE USUARIOS', pageWidth / 2, 25, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        const currentDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        doc.text(`Generado el ${currentDate}`, pageWidth / 2, 35, { align: 'center' });
        
        yPosition = 65;
        
        doc.setTextColor(...textColor);
        doc.setFillColor(...secondaryColor);
        doc.roundedRect(margin, yPosition - 5, pageWidth - (margin * 2), 25, 3, 3, 'F');
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(' RESUMEN ESTADÍSTICO', margin + 10, yPosition + 5);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
        const totalUsers = users?.length || 0;
        doc.text(`Total de usuarios registrados: ${totalUsers}`, margin + 10, yPosition + 15);
        
        yPosition += 40;
        

        doc.setFillColor(...primaryColor);
        doc.rect(margin, yPosition, pageWidth - (margin * 2), 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('ID', margin + 8, yPosition + 10);
        doc.text('NOMBRE COMPLETO', margin + 35, yPosition + 10);
        doc.text('CORREO ELECTRÓNICO', margin + 105, yPosition + 10);
        
        yPosition += 20;
        
        doc.setTextColor(...textColor);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        const drawTableHeader = (y: number) => {
            doc.setFillColor(...primaryColor);
            doc.rect(margin, y, pageWidth - (margin * 2), 15, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('ID', margin + 8, y + 10);
            doc.text('NOMBRE COMPLETO', margin + 35, y + 10);
            doc.text('CORREO ELECTRÓNICO', margin + 105, y + 10);
            
            return y + 20;
        };
        
        if (users && users.length > 0) {
            users.forEach((user, index) => {
            
                if (yPosition > pageHeight - 50) {
                    doc.addPage();
                    yPosition = 30;
                    yPosition = drawTableHeader(yPosition);
                    doc.setTextColor(...textColor);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'normal');
                }
                
    
                if (index % 2 === 0) {
                    doc.setFillColor(248, 249, 250);
                    doc.rect(margin, yPosition - 5, pageWidth - (margin * 2), 18, 'F');
                }
                
                
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.1);
                doc.line(margin, yPosition + 13, pageWidth - margin, yPosition + 13);
                
                
                const userId = user.id?.toString() || '-';
                const userName = user.name || user.username || 'Sin nombre';
                const userEmail = user.email || 'Sin email';
                
            
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...primaryColor);
                doc.text(`#${userId}`, margin + 8, yPosition + 5);
                
                
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...textColor);
                doc.text(userName.length > 25 ? userName.substring(0, 25) + '...' : userName, margin + 35, yPosition + 5);
                
                
                doc.setTextColor(100, 100, 100);
                doc.text('✉', margin + 100, yPosition + 5);
                doc.text(userEmail.length > 35 ? userEmail.substring(0, 35) + '...' : userEmail, margin + 105, yPosition + 5);
                
                yPosition += 18;
            });
        } else {
            
            doc.setFillColor(255, 241, 241);
            doc.roundedRect(margin, yPosition, pageWidth - (margin * 2), 30, 3, 3, 'F');
            doc.setTextColor(231, 76, 60);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('⚠ No hay usuarios disponibles', pageWidth / 2, yPosition + 20, { align: 'center' });
        }
        
        
        const totalPages = doc.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            
            
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
            
    
            doc.setTextColor(...textColor);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            
            
            doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
            
        
            const timestamp = new Date().toLocaleString('es-ES');
            doc.text(`Generado: ${timestamp}`, margin, pageHeight - 10);
            
        
            doc.text('Sistema de Gestión de Usuarios', pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        const fileName = `reporte_usuarios_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        
        console.log(' PDF generado exitosamente:', fileName);
        
    } catch (error) {
        console.error(' Error generando PDF:', error);
        alert('Error al generar el reporte PDF. Por favor, intenta nuevamente.');
    } finally {
        setIsGeneratingPDF(false);
    }
};

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            
            <div className="hidden lg:block">
                <Sidebar role={validRole} />
            </div>
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
                                        Panel de{' '}
                                        <span className="text-light-primary dark:text-dark-primary capitalize">
                                            {validRole}
                                        </span>
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        {new Date().toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Contenido Principal */}
                <div className="flex-1 overflow-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
                            <div className="border-b border-light-border dark:border-dark-border">
                                <nav className="flex overflow-x-auto">
                                    {sections.map((section, index) => (
                                        <button
                                            key={section}
                                            onClick={() => setSelected(section)}
                                            className={cn(
                                                'flex-shrink-0 px-6 py-4 font-medium text-sm border-b-2 transition-all duration-200',
                                                selected === section
                                                    ? 'border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary bg-light-primary/5 dark:bg-dark-primary/5'
                                                    : 'border-transparent text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text hover:border-light-border dark:hover:border-dark-border'
                                            )}
                                        >
                                            {section}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                                            {selected}
                                        </h2>
                                        <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
                                            Gestiona y configura {selected.toLowerCase()}
                                        </p>
                                    </div>
                                    {selected.toLowerCase().includes('usuario') && (
                                        <button
                                            onClick={generateUsersPDF}
                                            disabled={isGeneratingPDF}
                                            className="flex items-center gap-2 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg
                                                hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-200
                                                disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Download className="w-4 h-4" />
                                            {isGeneratingPDF ? 'Generando...' : 'Descargar PDF'}
                                        </button>
                                    )}
                                </div>
                                
                                <div className="min-h-[300px]">
                                    <UserContentAdmin role={validRole} users={users} />

                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-12 h-12 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full flex items-center justify-center mb-4">
                                            <div className="w-6 h-6 bg-light-primary dark:bg-dark-primary rounded-full opacity-60"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                                            {selected}
                                        </h3>
                                        <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-md">
                                            Esta sección permite gestionar todas las configuraciones relacionadas con {selected.toLowerCase()}.
                                        </p>
                                        <button className="mt-4 px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg
                                            hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors duration-200">
                                            Configurar {sections}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;