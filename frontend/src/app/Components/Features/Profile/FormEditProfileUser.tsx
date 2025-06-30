'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, FileText, UserCheck,
  Shield, MapPin, Briefcase
} from 'lucide-react';

import ProfileAvatar from './ProfileAvatar';
import FormField from './FormField';
import Notification from '../../Notification';
import { useUser } from '@context/userContext';
import Sidebar from '../../UI/Sidebar';
import ProfileActions from './ProfileActions';

const ProfileData = { name: '', email: '', username: '', password: '', phone: '', bio: '', location: '', company: '', role: '', profileImage: '' };

const FormEditProfile: React.FC = () => {
  const { user } = useUser();
  const validRole = user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user';
  const [profileData, setProfileData] = useState({ ...ProfileData });
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = useCallback(() => {
    const errors: { [key: string]: string } = {};
    if (!profileData.name) errors.name = "El nombre es obligatorio";
    if (!profileData.username) errors.username = "El nombre de usuario es obligatorio";
    if (!profileData.email) errors.email = "El email es obligatorio";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [profileData]);

  const handleSave = useCallback(async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsEditing(false);
    setNotification({ show: true, message: 'Perfil actualizado correctamente', type: 'success' });
  }, [validateForm]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setValidationErrors({});
    setProfileData({ ...ProfileData });
  }, []);

  const updateField = useCallback((field: string, value: any) => setProfileData(prev => ({ ...prev, [field]: value })), []);

  return (
    <div className="min-h-screen bg-light-background flex">
      <Sidebar
        role={validRole}
        sidebarOpen={isMobile ? sidebarOpen : true}
        setSidebarOpen={setSidebarOpen}
      />

      <main className={`flex-1 transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : 'ml-[72px] md:ml-[240px]'}`}>
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
          {/* Header */}
          <motion.div className="mb-6 flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-light-text">Mi Perfil</h1>
              <p className="text-light-textSecondary text-sm md:text-base">Gestiona tu información personal y preferencias</p>
            </div>

            {isMobile && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-4 p-2 rounded-full text-light-primary dark:text-dark-primary hover:bg-light-primary/10 dark:hover:bg-dark-primary/10 transition">
                ☰
              </button>
            )}
          </motion.div>

          {/* Main Card */}
          <motion.div className="bg-light-card rounded-xl shadow-lg overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {/* Card Header */}
            <div className="px-4 md:px-6 py-4 border-b border-light-border flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <User className="text-light-primary" size={24} />
                <h2 className="text-lg md:text-xl font-semibold text-light-text">Información Personal</h2>
              </div>
              <ProfileActions isEditing={isEditing} isSaving={isSaving} onEdit={() => setIsEditing(true)} onSave={handleSave} onCancel={handleCancel} />
            </div>

            <div className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <motion.div className="flex flex-col items-center space-y-3 md:space-y-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                  <ProfileAvatar profileImage={profileData.profileImage} onImageChange={(image: any) => updateField('profileImage', image)} isEditing={isEditing} />
                  <div className="text-center">
                    <h3 className="text-base md:text-lg font-semibold text-light-text">{profileData.name || 'Nombre no definido'}</h3>
                    <p className="text-light-textSecondary text-sm">@{profileData.username || 'usuario'}</p>
                  </div>
                </motion.div>

                {/* Formulario */}
                <div className="flex-1 space-y-4 md:space-y-6">
                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <FormField label="Nombre Completo" value={profileData.name} onChange={(v) => updateField('name', v)} icon={User} error={validationErrors.name} disabled={!isEditing} placeholder="Ingresa tu nombre completo" />
                    <FormField label="Nombre de Usuario" value={profileData.username} onChange={(v) => updateField('username', v)} icon={UserCheck} error={validationErrors.username} disabled={!isEditing} placeholder="Ej: juanperez" />
                    <FormField label="Email" value={profileData.email} onChange={(v) => updateField('email', v)} type="email" icon={Mail} error={validationErrors.email} disabled={!isEditing} placeholder="tu@email.com" />
                    <FormField label="Teléfono" value={profileData.phone} onChange={(v) => updateField('phone', v)} icon={Phone} disabled={!isEditing} placeholder="+57 300 123 4567" />
                    <FormField label="Ubicación" value={profileData.location} onChange={(v) => updateField('location', v)} icon={MapPin} disabled={!isEditing} placeholder="Ciudad, País" />
                    <FormField label="Empresa" value={profileData.company} onChange={(v) => updateField('company', v)} icon={Briefcase} disabled={!isEditing} placeholder="Nombre de la empresa" />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <label className="text-sm font-medium flex items-center gap-2 mb-2 text-light-text"><FileText size={16} />Biografía</label>
                    <textarea value={profileData.bio} onChange={(e) => updateField('bio', e.target.value)} disabled={!isEditing} placeholder="Cuéntanos sobre ti..." rows={4} className={`w-full px-4 py-3 rounded-lg border border-light-border focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none ${!isEditing ? 'bg-light-accentSoft cursor-not-allowed' : 'bg-light-card'}`} />
                  </motion.div>

                  {isEditing && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                      <FormField label="Nueva Contraseña" value={profileData.password} onChange={(v) => updateField('password', v)} type="password" icon={Shield} placeholder="Deja en blanco para mantener actual" />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Notification notification={notification} onClose={() => setNotification(prev => ({ ...prev, show: false }))} />
      </main>
    </div>
  );
};

export default FormEditProfile;
