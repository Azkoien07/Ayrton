import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, FileText, UserCheck, Camera, Check, X, Menu, Settings, Home, Users, BarChart3, LogOut } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Users, label: 'Usuarios', active: false },
    { icon: BarChart3, label: 'Reportes', active: false },
    { icon: Settings, label: 'Configuración', active: true },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 ${sidebarOpen ? 'w-60' : 'w-18'}`}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          {sidebarOpen && (
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white">SENA</h2>
              <p className="text-xs text-gray-500">Sistema Admin</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${
              item.active 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
          </div>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
          <LogOut size={20} />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </div>
      </div>
    </div>
  );
};


const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  


  const [profileData, setProfileData] = useState({
    id: 1,
    name: 'Juan Carlos',
    lastname: 'García López',
    email: 'juan.garcia@sena.edu.co',
    numberPhone: '3001234567',
    role: 'Administrador, Instructor',
    document: '1234567890'
  });


  const [errors, setErrors] = useState({
    email: '',
    numberPhone: ''
  });


  const [successMessage, setSuccessMessage] = useState('');


  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

  const role = 'admin';
  const roleOptions = {
    admin: 'Administrador',
    instructor: 'Instructor',
    student: 'Estudiante'
  };
  const validRole = roleOptions[role] || 'Administrador';


  const EMAIL_REGEX = /^[a-zA-Zñ_0-9\.]+@(gmail|hotmail|outlook|sena)\.(com|co|es|edu)\.(co)?$/;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  const validateForm = (): { email?: string; numberPhone?: string } => {
    const newErrors: { email?: string; numberPhone?: string } = {};


    if (!profileData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!EMAIL_REGEX.test(profileData.email)) {
      newErrors.email = 'Formato de correo inválido. Debe ser de dominio gmail, hotmail, outlook o sena.edu';
    }

  
    if (!profileData.numberPhone) {
      newErrors.numberPhone = 'El número de teléfono es requerido';
    } else if (profileData.numberPhone.length !== 10) {
      newErrors.numberPhone = 'El número debe tener exactamente 10 dígitos';
    } else if (!/^\d+$/.test(profileData.numberPhone)) {
      newErrors.numberPhone = 'El número solo debe contener dígitos';
    }

    return newErrors;
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors({
        email: validationErrors.email || '',
        numberPhone: validationErrors.numberPhone || ''
      });
      return;
    }
    console.log('Datos a actualizar:', profileData);
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    setSuccessMessage(`Perfil actualizado el ${dateStr} a las ${timeStr}`);
    setErrors({ email: '', numberPhone: '' });
 
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-18'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Menu size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Panel de{' '}
                    <span className="text-green-600 dark:text-green-400 capitalize">
                      {validRole}
                    </span>
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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

        {/* Contenido principal */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Perfil de usuario */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header con gradiente */}
              <div className="relative h-48 bg-gradient-to-r from-green-600 to-emerald-600">
                {/* Logo */}
                <div className="absolute top-4 right-4 text-white">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold">SENA</span>
                  </div>
                </div>
                
                {/* Foto de perfil y nombre */}
                <div className="absolute left-8 -bottom-16 flex items-end">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                      <img
                        src={profileImage}
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="ml-6 mb-8">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold">
                        {profileData.name} {profileData.lastname}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="pt-20 p-8">
                <div>
                  {/* Título */}
                  <div className="flex items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                    <UserCheck className="text-green-600 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Información de Perfil</h3>
                  </div>

                  {/* Grid de campos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={profileData.name}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Apellidos */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Apellidos
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={profileData.lastname}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        />
                      </div>
                      {errors.email && (
                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-sm rounded">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="numberPhone"
                          value={profileData.numberPhone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        />
                      </div>
                      {errors.numberPhone && (
                        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 text-sm rounded">
                          {errors.numberPhone}
                        </div>
                      )}
                    </div>

                    {/* Documento */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Número de Documento
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={profileData.document}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Rol */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rol
                      </label>
                      <div className="relative">
                        <UserCheck className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={profileData.role}
                          disabled
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                      onClick={() => window.location.reload()}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </button>
                  </div>
                </div>

                {/* Mensaje de éxito */}
                {successMessage && (
                  <div className="fixed top-4 right-4 z-50 max-w-md">
                    <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
                      <div className="flex items-center mb-2">
                        <Check className="text-green-500 mr-2" size={20} />
                        <p className="font-semibold text-green-800 dark:text-green-200">¡Perfil actualizado con éxito!</p>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-3">{successMessage}</p>
                      <button
                        onClick={() => setSuccessMessage('')}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;