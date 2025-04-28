"use client";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Inicio de sesión exitoso!");
  };

  const openModal = () => {
    document.getElementById('registerModal')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    document.getElementById('registerModal')?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 text-gray-800">
      <ToastContainer />

      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-3">AYRTON</h1>
          <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 mt-4 font-medium">Organiza tus</p>
        </div>

        {/* Card del formulario */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transition-all duration-300 hover:shadow-xl border border-gray-300">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {/* Campo: Correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </button>

            <div className="text-center text-sm text-gray-500 pt-2">
              ¿No tienes una cuenta?
              <button type="button" onClick={openModal} className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de registro */}
      <div id="registerModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 hidden z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-300">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Crear una cuenta</h2>

          {/* Formulario de registro */}
          <form className="space-y-4">
            <div>
              <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                id="register-name"
                name="name"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                placeholder="Juan Pérez"
                required
              />
            </div>
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="register-email"
                name="email"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                id="register-password"
                name="password"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                id="register-confirm-password"
                name="confirm-password"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg mt-4"
            >
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;