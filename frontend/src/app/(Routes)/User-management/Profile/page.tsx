'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  User, Mail, Phone, FileText, UserCheck, Camera, Check, X, 
  Menu, Settings, Home, Users, BarChart3, LogOut, Eye, EyeOff,
  Shield, Clock, MapPin, Briefcase, Calendar, Save, RefreshCw,
  AlertCircle, CheckCircle, Loader2
} from 'lucide-react';
import { cn } from '@utilities/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@components/Sidebar';


interface DashboardProps {
  role?: string;
  userId?: string;
}

interface ProfileData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  numberPhone: string;
  role: string;
  document: string;
  department?: string;
  position?: string;
  joinDate?: string;
  lastLogin?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

interface ValidationErrors {
  email: string;
  numberPhone: string;
  emergencyPhone: string;
  general?: string;
}

interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
  details?: string;
}

const roleOptions = {
  admin: ['Dashboard', 'Usuarios', 'Reportes', 'Configuración'],
  instructor: ['Dashboard', 'Cursos', 'Estudiantes', 'Configuración'],
  student: ['Dashboard', 'Mis Cursos', 'Calificaciones', 'Configuración']
};

const roleOptionsMap = {
  admin: 'Administrador',
  instructor: 'Instructor',
  student: 'Estudiante'
};


const useFormValidation = (data: ProfileData) => {
  const validateEmail = useCallback((email: string): string => {
    if (!email) return 'El correo electrónico es requerido';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Ingrese un correo electrónico válido';
    }
    
    if (!email.endsWith('.edu.co')) {
      return 'Debe usar un correo institucional (.edu.co)';
    }
    
    return '';
  }, []);

  const validatePhone = useCallback((phone: string): string => {
    if (!phone) return 'El número de teléfono es requerido';
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!/^\d+$/.test(cleanPhone)) {
      return 'El número solo debe contener dígitos';
    }
    if (cleanPhone.length !== 10) {
      return 'El número debe tener exactamente 10 dígitos';
    }
    if (!cleanPhone.startsWith('3')) {
      return 'Ingrese un número de celular válido (debe iniciar con 3)';
    }
    
    return '';
  }, []);
  const validateForm = useCallback((): ValidationErrors => {
    return {
      email: validateEmail(data.email),
      numberPhone: validatePhone(data.numberPhone),
      emergencyPhone: data.emergencyPhone ? validatePhone(data.emergencyPhone) : ''
    };
  }, [data, validateEmail, validatePhone]);

  return { validateForm, validateEmail, validatePhone };
};
const useNotifications = () => {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: 'info',
    message: ''
  });
  const showNotification = useCallback((type: NotificationState['type'], message: string, details?: string) => {
    setNotification({ show: true, type, message, details });
    
    const timer = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, show: false }));
  }, []);

  return { notification, showNotification, hideNotification };
};

const ProfilePage = ({ role = 'admin', userId }: DashboardProps) => {
  const validRole = roleOptions[role as keyof typeof roleOptions] ? role : 'admin';
  const validRoleDisplay = roleOptionsMap[validRole as keyof typeof roleOptionsMap] || 'Administrador';
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  
 
  const [profileData, setProfileData] = useState<ProfileData>({
    id: 1,
    name: 'Juan Carlos',
    lastname: 'García López',
    email: 'juan.garcia@universidad.edu.co',
    numberPhone: '3001234567',
    role: 'Administrador',
    document: '1234567890',
    department: 'Tecnología e Informática',
    position: 'Coordinador de Sistemas',
    joinDate: '2022-03-15',
    lastLogin: new Date().toISOString(),
    address: 'Calle 123 #45-67, Bogotá',
    emergencyContact: 'María García',
    emergencyPhone: '3009876543'
  });

  const [originalData, setOriginalData] = useState<ProfileData>(profileData);
  const [errors, setErrors] = useState<ValidationErrors>({
    email: '',
    numberPhone: '',
    emergencyPhone: ''
  });

  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const [imageLoading, setImageLoading] = useState(false);

  const { validateForm } = useFormValidation(profileData);
  const { notification, showNotification, hideNotification } = useNotifications();


  useEffect(() => {
    const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [profileData, originalData]);


  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  
  const formatPhoneNumber = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return cleaned;
  }, []);

  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'numberPhone' || name === 'emergencyPhone') {
      formattedValue = formatPhoneNumber(value);
    }
    
    setProfileData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [formatPhoneNumber, errors]);

  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    try {
      const validationErrors = validateForm();
      
      if (Object.values(validationErrors).some(error => error)) {
        setErrors(validationErrors);
        showNotification('error', 'Por favor corrige los errores en el formulario');
        return;
      }


      await new Promise(resolve => setTimeout(resolve, 1500));
      
   
      if (Math.random() < 0.1) {
        throw new Error('Error de conexión con el servidor');
      }

      setOriginalData({ ...profileData });
      setErrors({ email: '', numberPhone: '', emergencyPhone: '' });
      
      const now = new Date();
      const dateTimeStr = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      showNotification('success', '¡Perfil actualizado exitosamente!', `Actualizado el ${dateTimeStr}`);
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      showNotification('error', 'Error al actualizar el perfil', 'Por favor intenta nuevamente');
    } finally {
      setIsSaving(false);
    }
  }, [profileData, validateForm, showNotification]);


  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const file = files[0];
    

    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'La imagen es muy grande', 'Selecciona una imagen menor a 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Formato no válido', 'Selecciona una imagen válida');
      return;
    }

    setImageLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileImage(event.target.result);
          setHasUnsavedChanges(true);
          showNotification('info', 'Imagen actualizada', 'Recuerda guardar los cambios');
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      showNotification('error', 'Error al cargar la imagen');
    } finally {
      setImageLoading(false);
    }
  }, [showNotification]);


  const handleReset = useCallback(() => {
    setProfileData({ ...originalData });
    setErrors({ email: '', numberPhone: '', emergencyPhone: '' });
    setHasUnsavedChanges(false);
    showNotification('info', 'Formulario restablecido');
  }, [originalData, showNotification]);


  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  return (
    <div className="flex h-screen bg-light-background dark:bg-dark-background">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className={cn(
        'flex-1 flex flex-col transition-all duration-500 ease-in-out',
        sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
      )}>
        {/* Header mejorado */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-light-card/95 dark:bg-dark-card/95 border-b border-light-border dark:border-dark-border">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  Panel de{' '}
                  <span className="text-light-primary dark:text-dark-primary capitalize">
                    {validRoleDisplay}
                  </span>
                </h1>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-1">
                  {formattedDate}
                </p>
              </div>
              
              {/* Indicador de cambios no guardados */}
              <AnimatePresence>
                {hasUnsavedChanges && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-800"
                  >
                    <AlertCircle size={16} />
                    <span className="text-sm font-medium">Cambios sin guardar</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border"
            >
              {/* Header con gradiente mejorado */}
              <div className="relative h-48 bg-gradient-to-br from-light-primary via-light-primary/90 to-light-primary/70 dark:from-dark-primary dark:via-dark-primary/90 dark:to-dark-primary/70">
                <div className="absolute inset-0 bg-black/10"></div>
                
                {/* Información adicional en el header */}
                <div className="absolute top-4 right-4 text-white/90">
                  <div className="text-right">
                    <p className="text-sm">Último acceso</p>
                    <p className="text-xs opacity-80">
                      {new Date(profileData.lastLogin || '').toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                
                {/* Foto de perfil y nombre */}
                <div className="absolute left-8 -bottom-16 flex items-end">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-light-background dark:bg-dark-background">
                      {imageLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <Loader2 className="animate-spin text-light-primary dark:text-dark-primary" size={24} />
                        </div>
                      ) : (
                        <img
                          src={profileImage}
                          alt="Foto de perfil"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary hover:dark:bg-dark-primary/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Camera size={18} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={imageLoading}
                      />
                    </label>
                  </div>
                  <div className="ml-6 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm text-black px-4 py-3 rounded-lg shadow-lg border border-white/20">
                      <h2 className="text-2xl font-bold">
                        {profileData.name} {profileData.lastname}
                      </h2>
                      <div className="flex items-center mt-1 text-white/´70">
                        <Briefcase size={14} className="mr-1" />
                        <span className="text-sm">{profileData.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario mejorado */}
              <div className="pt-20 p-8">
                <form onSubmit={handleSubmit}>
                  {/* Título con toggle para campos avanzados */}
                  <div className="flex items-center justify-between mb-8 border-b border-light-border dark:border-dark-border pb-4">
                    <div className="flex items-center">
                      <UserCheck className="text-light-primary dark:text-dark-primary mr-3" size={24} />
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                        Información de Perfil
                      </h3>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                      className="flex items-center px-4 py-2 text-sm bg-light-background dark:bg-dark-background hover:bg-light-border dark:hover:bg-dark-border rounded-lg transition-colors border border-light-border dark:border-dark-border"
                    >
                      <Settings size={16} className="mr-2" />
                      {showAdvancedFields ? 'Ocultar' : 'Mostrar'} campos avanzados
                    </button>
                  </div>

                  {/* Grid de campos básicos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Campos básicos (sin cambios significativos, pero con mejor styling) */}
                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Nombre *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="text"
                          value={profileData.name}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border rounded-lg text-light-textSecondary dark:text-dark-textSecondary cursor-not-allowed backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Apellidos *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="text"
                          value={profileData.lastname}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border rounded-lg text-light-textSecondary dark:text-dark-textSecondary cursor-not-allowed backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Correo Electrónico *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className={cn(
                            "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-all duration-200 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text",
                            errors.email ? "border-red-500 focus:ring-red-500" : "border-light-border dark:border-dark-border"
                          )}
                          placeholder="correo@universidad.edu.co"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm rounded"
                          >
                            <div className="flex items-center">
                              <AlertCircle size={16} className="mr-2" />
                              {errors.email}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Teléfono *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="text"
                          name="numberPhone"
                          value={profileData.numberPhone}
                          onChange={handleChange}
                          className={cn(
                            "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-all duration-200 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text",
                            errors.numberPhone ? "border-red-500 focus:ring-red-500" : "border-light-border dark:border-dark-border"
                          )}
                          placeholder="300 123 4567"
                        />
                      </div>
                      <AnimatePresence>
                        {errors.numberPhone && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm rounded"
                          >
                            <div className="flex items-center">
                              <AlertCircle size={16} className="mr-2" />
                              {errors.numberPhone}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Número de Documento
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="text"
                          value={profileData.document}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border rounded-lg text-light-textSecondary dark:text-dark-textSecondary cursor-not-allowed backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                        Rol
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                        <input
                          type="text"
                          value={profileData.role}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border rounded-lg text-light-textSecondary dark:text-dark-textSecondary cursor-not-allowed backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campos avanzados con animación */}
                  <AnimatePresence>
                    {showAdvancedFields && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-light-border dark:border-dark-border pt-8 mb-8">
                          <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-6 flex items-center">
                            <Settings className="mr-2" size={20} />
                            Información Adicional
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Departamento
                              </label>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="text"
                                  name="department"
                                  value={profileData.department || ''}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-colors bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                                  placeholder="Ej: Tecnología e Informática"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Cargo
                              </label>
                              <div className="relative">
                                <UserCheck className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="text"
                                  name="position"
                                  value={profileData.position || ''}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-colors bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                                  placeholder="Ej: Coordinador de Sistemas"
                                />
                              </div>
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Dirección
                              </label>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <textarea
                                  name="address"
                                  value={profileData.address || ''}
                                  onChange={handleChange}
                                  rows={3}
                                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-colors bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text resize-none"
                                  placeholder="Ingresa tu dirección completa"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Contacto de Emergencia
                              </label>
                              <div className="relative">
                                <User className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="text"
                                  name="emergencyContact"
                                  value={profileData.emergencyContact || ''}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-colors bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                                  placeholder="Nombre del contacto"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Teléfono de Emergencia
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="text"
                                  name="emergencyPhone"
                                  value={profileData.emergencyPhone || ''}
                                  onChange={handleChange}
                                  className={cn(
                                    "w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-all duration-200 bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text",
                                    errors.emergencyPhone ? "border-red-500 focus:ring-red-500" : "border-light-border dark:border-dark-border"
                                  )}
                                  placeholder="300 987 6543"
                                />
                              </div>
                              <AnimatePresence>
                                {errors.emergencyPhone && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm rounded"
                                  >
                                    <div className="flex items-center">
                                      <AlertCircle size={16} className="mr-2" />
                                      {errors.emergencyPhone}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Fecha de Ingreso
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="date"
                                  name="joinDate"
                                  value={profileData.joinDate || ''}
                                  onChange={handleChange}
                                  className="w-full pl-10 pr-4 py-3 border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary transition-colors bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2">
                                Último Acceso
                              </label>
                              <div className="relative">
                                <Clock className="absolute left-3 top-3 text-light-textSecondary dark:text-dark-textSecondary" size={20} />
                                <input
                                  type="text"
                                  value={profileData.lastLogin ? new Date(profileData.lastLogin).toLocaleString('es-ES') : 'N/A'}
                                  disabled
                                  className="w-full pl-10 pr-4 py-3 bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border rounded-lg text-light-textSecondary dark:text-dark-textSecondary cursor-not-allowed backdrop-blur-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Botones mejorados */}
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-light-border dark:border-dark-border">
                    <div className="flex items-center text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      <AlertCircle size={16} className="mr-2" />
                      Los campos marcados con * son obligatorios
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={!hasUnsavedChanges || isSaving}
                        className="flex items-center px-6 py-3 bg-light-background dark:bg-dark-background hover:bg-light-border dark:hover:bg-dark-border text-light-text dark:text-dark-text rounded-lg transition-all duration-200 border border-light-border dark:border-dark-border disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Restablecer
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSaving || !hasUnsavedChanges}
                        className="flex items-center px-8 py-3 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary hover:dark:bg-dark-primary/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 active:scale-95"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Estadísticas del perfil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                      Perfil Completado
                    </p>
                    <p className="text-2xl font-bold text-light-text dark:text-dark-text">85%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                </div>
                <div className="mt-4 w-full bg-light-background dark:bg-dark-background rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                      Días Activo
                    </p>
                    <p className="text-2xl font-bold text-light-text dark:text-dark-text">
                      {profileData.joinDate ? Math.floor((new Date().getTime() - new Date(profileData.joinDate).getTime()) / (1000 * 3600 * 24)) : 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Calendar className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-light-card dark:bg-dark-card rounded-lg p-6 border border-light-border dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
                      Seguridad
                    </p>
                    <p className="text-2xl font-bold text-light-text dark:text-dark-text">Alta</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                    <Shield className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Sistema de notificaciones mejorado */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, x: 400, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 400, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 max-w-md"
          >
            <div className={cn(
              "p-4 rounded-lg shadow-xl backdrop-blur-sm border",
              notification.type === 'success' ? "bg-green-50/95 dark:bg-green-900/30 border-green-200 dark:border-green-800" : "",
              notification.type === 'error' ? "bg-red-50/95 dark:bg-red-900/30 border-red-200 dark:border-red-800" : "",
              notification.type === 'info' ? "bg-blue-50/95 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800" : ""
            )}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.type === 'success' && (
                    <CheckCircle className="text-green-500" size={20} />
                  )}
                  {notification.type === 'error' && (
                    <AlertCircle className="text-red-500" size={20} />
                  )}
                  {notification.type === 'info' && (
                    <AlertCircle className="text-blue-500" size={20} />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className={cn(
                    "font-semibold text-sm",
                    notification.type === 'success' ? "text-green-800 dark:text-green-200": "",
                    notification.type === 'error' ? "text-red-800 dark:text-red-200": "",
                    notification.type === 'info' ? "text-blue-800 dark:text-blue-200":""
                  )}>
                    {notification.message}
                  </p>
                  {notification.details && (
                    <p className={cn(
                      "text-xs mt-1",
                      notification.type === 'success' ? "text-green-700 dark:text-green-300" : "",
                      notification.type === 'error' ? "text-red-700 dark:text-red-300" : "",
                      notification.type === 'info' ? "text-blue-700 dark:text-blue-300" : ""
                    )}>
                      {notification.details}
                    </p>
                  )}
                </div>
                <button
                  onClick={hideNotification}
                  className={cn(
                    "ml-4 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 transition-colors",
                    notification.type === 'success' ? "text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 focus:ring-green-600" : "",
                    notification.type === 'error' ? "text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 focus:ring-red-600" : "",
                    notification.type === 'info' ? "text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50 focus:ring-blue-600" : ""
                  )}
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Barra de progreso para auto-hide */}
              <div className={cn(
                "mt-3 w-full bg-white/30 dark:bg-black/30 rounded-full h-1",
                notification.type === 'success' ? "bg-green-100 dark:bg-green-900/50" : "",
                notification.type === 'error' ? "bg-red-100 dark:bg-red-900/50" : "",
                notification.type === 'info' ? "bg-blue-100 dark:bg-blue-900/50" : ""
              )}>
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className={cn(
                    "h-1 rounded-full",
                    notification.type === 'success' ? "bg-green-500" : "",
                    notification.type === 'error' ? "bg-red-500" : "",
                    notification.type === 'info' ? "bg-blue-500" : ""
                  )}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;