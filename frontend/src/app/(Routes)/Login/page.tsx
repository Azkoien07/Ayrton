'use client';
import React from "react";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const particlesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = particlesContainerRef.current;
        if (!container) return;

        container.innerHTML = "";

        const count = 50;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full opacity-70";

            const size = Math.random() * 6 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            const hue = theme === "dark" ? 220 : 280;
            const sat = `${Math.random() * 40 + 60}%`;
            const light = theme === "dark"
                ? `${Math.random() * 30 + 60}%`
                : `${Math.random() * 20 + 40}%`;

            particle.style.backgroundColor = `hsl(${hue}, ${sat}, ${light})`;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            container.appendChild(particle);
        }

        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(0) translateX(20px); }
        75% { transform: translateY(20px) translateX(10px); }
        100% { transform: translateY(0) translateX(0); }
      }
    `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("¡Inicio de sesión exitoso!");
        }, 1500);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (registerForm.password !== registerForm.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("¡Cuenta creada con éxito!");
            setIsFlipped(false);
        }, 1500);
    };

    const updateRegisterForm = (field: keyof typeof registerForm, value: string) => {
        setRegisterForm((prev) => ({ ...prev, [field]: value }));
    };

    const bgColor = theme === "dark" ? "bg-[#1C1C1C]" : "bg-[#F4F4F4]";
    const textColor = theme === "dark" ? "text-[#EAEAEA]" : "text-[#2B2D42]";
    const textSecondary = theme === "dark" ? "text-[#B0B0B0]" : "text-[#4E5D6D]";
    const cardBg = theme === "dark" ? "bg-[#2C2C2C]" : "bg-[#FFFFFF]";
    const primaryColor = theme === "dark" ? "bg-[#4C8A8B] hover:bg-[#3e7071]" : "bg-[#1A5A4D] hover:bg-[#134239]";
    const accentColor = theme === "dark" ? "text-[#4C8A8B]" : "text-[#1A5A4D]";
    const borderColor = theme === "dark" ? "border-[#3A3A3A]" : "border-[#E0E0E0]";
    const inputBg = theme === "dark" ? "bg-[#3A3A3A]" : "bg-[#F9F9F9]";
    const inputFocus = theme === "dark" ? "focus:ring-[#4C8A8B]" : "focus:ring-[#1A5A4D]";

    return (
        <div
            className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${bgColor} ${textColor}`}

        >
            <div
                ref={particlesContainerRef}
                className="absolute inset-0 overflow-hidden pointer-events-none"
            />
            <ToastContainer position="top-right" autoClose={3000} theme={theme} />

            <button
                onClick={toggleTheme}
                className={`absolute top-6 right-6 p-3 rounded-full shadow-lg z-50 transition-all ${theme === "dark" ? "bg-[#2C2C2C]" : "bg-white"
                    }`}
            >
                {theme === "dark" ? (
                    <svg className="w-5 h-5 text-[#E5F7F6]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-[#1A5A4D]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>

            <div className="absolute w-full max-w-md transform -translate-y-60">
                <div className="text-center mb-6">
                    <h1 className="text-7xl font-palmer tracking-wide drop-shadow-md animate__animated animate__fadeIn">
                        Ayrton
                    </h1>
                    <p className={`${textSecondary} mt-3 animate__animated animate__fadeIn animate__delay-1s text-sm`}>
                        Organiza tus tareas y equipos con elegancia
                    </p>
                </div>

                <div
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                >
                    {/* Login */}
                    <div className="absolute w-full [backface-visibility:hidden]">
                        <form
                            onSubmit={handleLoginSubmit}
                            className={`${cardBg} shadow-2xl rounded-xl p-10 flex flex-col gap-6 transition-transform duration-500 transform border ${borderColor}`}
                        >
                            <h2 className="text-2xl font-semibold text-center mb-2">Iniciar Sesión</h2>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Correo electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="nombre@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <div className="text-right">
                                <a href="#" className={`text-sm ${accentColor} hover:underline`}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${primaryColor} text-white py-3 rounded-lg transition-colors shadow-md font-medium ${loading ? 'opacity-80' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando...
                                    </div>
                                ) : "Ingresar"}
                            </button>

                            <p className={`text-center ${textSecondary}`}>
                                ¿No tienes cuenta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsFlipped(true)}
                                    className={`${accentColor} hover:underline font-medium`}
                                >
                                    Regístrate
                                </button>
                            </p>
                        </form>
                    </div>

                    {/* Register */}
                    <div className="absolute w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <form
                            onSubmit={handleRegisterSubmit}
                            className={`${cardBg} shadow-2xl rounded-xl p-10 flex flex-col gap-6 transition-transform duration-500 transform border ${borderColor}`}
                        >
                            <h2 className="text-2xl font-semibold text-center mb-2">Crear Cuenta</h2>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Nombre completo</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Juan Pérez"
                                        value={registerForm.name}
                                        onChange={(e) => updateRegisterForm("name", e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Correo electrónico</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="nombre@ejemplo.com"
                                        value={registerForm.email}
                                        onChange={(e) => updateRegisterForm("email", e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={registerForm.password}
                                        onChange={(e) => updateRegisterForm("password", e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`block text-sm ${textSecondary}`}>Confirmar contraseña</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className={`h-5 w-5 ${textSecondary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={registerForm.confirmPassword}
                                        onChange={(e) => updateRegisterForm("confirmPassword", e.target.value)}
                                        required
                                        className={`pl-10 w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} focus:outline-none focus:ring-2 ${inputFocus} transition-colors`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${primaryColor} text-white py-3 rounded-lg transition-colors shadow-md font-medium ${loading ? 'opacity-80' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Cargando...
                                    </div>
                                ) : "Registrarse"}
                            </button>

                            <p className={`text-center ${textSecondary}`}>
                                ¿Ya tienes cuenta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsFlipped(false)}
                                    className={`${accentColor} hover:underline font-medium`}
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}