"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "@services/authService";

// Interactive Grid Pattern Component
const InteractiveGridPattern = ({ className = "", theme = "light" }: { className?: string; theme?: "light" | "dark" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const gridSize = 40;
    const cols = Math.ceil(rect.width / gridSize);
    const rows = Math.ceil(rect.height / gridSize);

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Grid colors based on theme
      const baseColor = theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(148, 163, 184, 0.2)';
      const hoverColor = theme === 'dark' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(16, 185, 129, 0.3)';
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Calculate distance from mouse
          const dx = mousePos.current.x - x;
          const dy = mousePos.current.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const alpha = 1 - (distance / maxDistance);
            ctx.strokeStyle = hoverColor;
            ctx.lineWidth = 2 * alpha;
          } else {
            ctx.strokeStyle = baseColor;
            ctx.lineWidth = 1;
          }
          
          // Draw vertical lines
          if (i <= cols) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, rect.height);
            ctx.stroke();
          }
          
          // Draw horizontal lines
          if (j <= rows) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(rect.width, y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const canvasRect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token); 
      localStorage.setItem("userRole", data.role);

      toast.success("¡Inicio de sesión exitoso!");

      if (data.role === "admin") {
        window.location.href = "/UserManagement/Admin"; 
      } else {
        window.location.href = "/UserManagement/UserBasic"; 
      }
    } catch (error) {
      console.error(error);
      toast.error("Credenciales inválidas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Theme classes
  const bgColor = theme === "dark" 
    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" 
    : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100";
  
  const textColor = theme === "dark" ? "text-slate-100" : "text-slate-800";
  const textSecondary = theme === "dark" ? "text-slate-400" : "text-slate-600";
  
  const cardBg = theme === "dark" 
    ? "bg-slate-800/80 backdrop-blur-xl border-slate-700/50" 
    : "bg-white/80 backdrop-blur-xl border-white/20";
  
  const primaryColor = theme === "dark"
    ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700";
  
  const accentColor = theme === "dark" ? "text-emerald-400" : "text-emerald-600";
  const inputBg = theme === "dark" ? "bg-slate-700/50" : "bg-slate-50";
  const inputBorder = theme === "dark" ? "border-slate-600" : "border-slate-200";
  const inputFocus = theme === "dark" ? "focus:border-emerald-500 focus:ring-emerald-500/20" : "focus:border-emerald-500 focus:ring-emerald-500/20";

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-700 ${bgColor} ${textColor}`}>
      {/* Interactive Grid Background */}
      <InteractiveGridPattern theme={theme} className="opacity-60" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-72 h-72 ${theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-400/10'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-20 w-96 h-96 ${theme === 'dark' ? 'bg-teal-500/10' : 'bg-teal-400/10'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 left-1/3 w-64 h-64 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-indigo-400/10'} rounded-full blur-3xl animate-pulse delay-500`}></div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-8 right-8 p-4 rounded-2xl shadow-xl z-50 transition-all duration-300 transform hover:scale-110 ${
          theme === "dark" 
            ? "bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-emerald-400" 
            : "bg-white/80 backdrop-blur-xl border border-white/20 text-emerald-600"
        }`}
      >
        {theme === "dark" ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="relative w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className={`text-8xl font-bold tracking-tight mb-4 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent'
            } animate-pulse`}>
              Ayrton
            </h1>
            <div className={`absolute -inset-1 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            } rounded-lg blur opacity-20 -z-10`}></div>
          </div>
          <p className={`${textSecondary} text-lg font-medium tracking-wide`}>
            Organiza tus tareas y equipos con elegancia
          </p>
          <div className={`w-24 h-1 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-emerald-400 to-teal-400' 
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          } mx-auto mt-4 rounded-full`}></div>
        </div>

        {/* Card Container */}
        <div className="relative">
          {/* Login Form */}
          <div className="absolute w-full">
            <form
              onSubmit={handleLoginSubmit}
              className={`${cardBg} shadow-2xl rounded-3xl p-10 border transition-all duration-500 transform hover:shadow-3xl`}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Bienvenido</h2>
                <p className={`${textSecondary} text-sm`}>Ingresa a tu cuenta para continuar</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${textColor}`}>
                    Correo electrónico
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:${accentColor}`}>
                      <svg className={`h-5 w-5 ${textSecondary} group-focus-within:text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`pl-12 w-full px-4 py-4 rounded-xl ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 ${inputFocus} transition-all duration-300 text-sm`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${textColor}`}>
                    Contraseña
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:${accentColor}`}>
                      <svg className={`h-5 w-5 ${textSecondary} group-focus-within:text-current`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`pl-12 w-full px-4 py-4 rounded-xl ${inputBg} border ${inputBorder} focus:outline-none focus:ring-2 ${inputFocus} transition-all duration-300 text-sm`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className={`rounded border-gray-300 ${accentColor} focus:ring-emerald-500 focus:ring-offset-0`} />
                    <span className={`ml-2 text-sm ${textSecondary}`}>Recordarme</span>
                  </label>
                  <a href="#" className={`text-sm ${accentColor} hover:underline font-medium`}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${primaryColor} text-white py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm transform hover:-translate-y-0.5 ${
                    loading ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${inputBorder}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} ${textSecondary}`}>o continúa con</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className={`flex items-center justify-center px-4 py-3 border ${inputBorder} rounded-xl hover:bg-gray-50 transition-colors`}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2 text-sm font-medium">Google</span>
                  </button>
                  <button type="button" className={`flex items-center justify-center px-4 py-3 border ${inputBorder} rounded-xl hover:bg-gray-50 transition-colors`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="ml-2 text-sm font-medium">Facebook</span>
                  </button>
                </div>

                <p className={`text-center ${textSecondary} text-sm`}>
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => window.location.href = "/Auth/register"}
                    className={`${accentColor} hover:underline font-semibold transition-colors`}
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
