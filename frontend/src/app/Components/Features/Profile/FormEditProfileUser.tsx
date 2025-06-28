"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Phone, FileText, UserCheck,
  Shield, MapPin, Briefcase
} from 'lucide-react';

import ProfileAvatar from './ProfileAvatar';
import FormField from './FormField';
import Notification from '../../Notification';
import Sidebar from '../../UI/Sidebar';
import ProfileActions from './ProfileActions';

const ProfileData = {
  name: '',
  email: '',
  username: '',
  password: '',
  phone: '',
  bio: '',
  location: '',
  company: '',
  role: '',
  profileImage: ''
};


const FormEditProfile: React.FC = () => {
  const [profileData, setProfileData] = useState({ ...ProfileData });
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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
    setNotification({
      show: true,
      message: 'Perfil actualizado correctamente',
      type: 'success'
    });
  }, [validateForm]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setValidationErrors({});
    setProfileData({ ...ProfileData });
  }, []);

  const updateField = useCallback((field: string, value: any) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-light-background">
      <Sidebar role={''} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-light-text">
            Mi Perfil
          </h1>
          <p className="text-light-textSecondary">
            Gestiona tu información personal y preferencias
          </p>
        </motion.div>

        {/* Tarjeta Principal */}
        <motion.div
          className="bg-light-card rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Header de la tarjeta */}
          <div className="px-6 py-4 border-b border-light-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="text-light-primary" size={24} />
              <h2 className="text-xl font-semibold text-light-text">
                Información Personal
              </h2>
            </div>

            <ProfileActions
              isEditing={isEditing}
              isSaving={isSaving}
              onEdit={() => setIsEditing(true)}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ProfileAvatar
                  profileImage={profileData.profileImage}
                  onImageChange={(image: any) => updateField('profileImage', image)}
                  isEditing={isEditing}
                />

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-light-text">
                    {profileData.name || 'Nombre no definido'}
                  </h3>
                  <p className="text-light-textSecondary">
                    @{profileData.username || 'usuario'}
                  </p>
                </div>
              </motion.div>

              {/* Formulario */}
              <div className="flex-1 space-y-6">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FormField
                    label="Nombre Completo"
                    value={profileData.name}
                    onChange={(value: any) => updateField('name', value)}
                    icon={User}
                    error={validationErrors.name}
                    disabled={!isEditing}
                    placeholder="Ingresa tu nombre completo"
                  />

                  <FormField
                    label="Nombre de Usuario"
                    value={profileData.username}
                    onChange={(value: any) => updateField('username', value)}
                    icon={UserCheck}
                    error={validationErrors.username}
                    disabled={!isEditing}
                    placeholder="Ej: juanperez"
                  />

                  <FormField
                    label="Email"
                    value={profileData.email}
                    onChange={(value: any) => updateField('email', value)}
                    type="email"
                    icon={Mail}
                    error={validationErrors.email}
                    disabled={!isEditing}
                    placeholder="tu@email.com"
                  />

                  <FormField
                    label="Teléfono"
                    value={profileData.phone}
                    onChange={(value: any) => updateField('phone', value)}
                    icon={Phone}
                    disabled={!isEditing}
                    placeholder="+57 300 123 4567"
                  />

                  <FormField
                    label="Ubicación"
                    value={profileData.location}
                    onChange={(value: any) => updateField('location', value)}
                    icon={MapPin}
                    disabled={!isEditing}
                    placeholder="Ciudad, País"
                  />

                  <FormField
                    label="Empresa"
                    value={profileData.company}
                    onChange={(value: any) => updateField('company', value)}
                    icon={Briefcase}
                    disabled={!isEditing}
                    placeholder="Nombre de la empresa"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-sm font-medium flex items-center gap-2 mb-2 text-light-text">
                    <FileText size={16} />
                    Biografía
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Cuéntanos sobre ti..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border border-light-border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none ${!isEditing ? 'bg-light-accentSoft cursor-not-allowed' : 'bg-light-card'
                      }`}
                  />
                </motion.div>

                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FormField
                      label="Nueva Contraseña"
                      value={profileData.password}
                      onChange={(value: any) => updateField('password', value)}
                      type="password"
                      icon={Shield}
                      placeholder="Deja en blanco para mantener actual"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Notification
        notification={notification}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default FormEditProfile;
