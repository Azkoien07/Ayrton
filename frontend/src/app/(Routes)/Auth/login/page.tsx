"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { login } from "@slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@store/store";
import { addUser } from '@slice/userSlice'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector(
    (state: RootState) => state.task
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const updateRegisterForm = (field: keyof typeof registerForm, value: string) => {
    setRegisterForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    planId: "1",
    roleId: "2"
  });

  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const count = 50;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full opacity-30";

      const size = Math.random() * 6 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Using new accent colors
      particle.style.backgroundColor = '#8CA1C7';
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
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Handlers for login and register
  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      toast.success('¡Inicio de sesión exitoso!');

      const role = resultAction.payload.role;

      const redirectPath =
        role === 'admin'
          ? '/UserManagement/Admin'
          : '/UserManagement/UserBasic';

      router.push(redirectPath);
    } else {
      toast.error(`Error al iniciar sesión: ${resultAction.payload}`);
    }
  };

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, username, planId, roleId } = registerForm;

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await dispatch(addUser({ name, email, password, username, planId, roleId }));

      if (addUser.rejected.match(result)) {
        const message =
          result.payload?.message ||
          result.error?.message ||
          "Error desconocido al registrar el usuario";

        toast.error(`Error al registrar el usuario: ${message}`);
        return;
      }

      toast.success("Usuario registrado correctamente");
      setIsFlipped(false);
    } catch (e: any) {
      toast.error(
        `Excepción no controlada al registrar el usuario: ${e?.message || "Error desconocido"}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-22 relative overflow-hidden transition-colors duration-500 bg-[#F9FAFB] text-[#374151] px-4 sm:px-6 lg:px-8">
      <div
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      <div className="relative w-full max-w-md mx-auto py-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-palmer tracking-wide drop-shadow-sm animate__animated animate__fadeIn text-[#3A5A8F] -translate-y-19">
            Ayrton
          </h1>
          <p className="text-[#6B7280] mt-3 animate__animated animate__fadeIn animate__delay-1s text-sm sm:text-base -translate-y-18">
            Organiza tus tareas y equipos con elegancia
          </p>
        </div>

        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
        >
          {/* Login Form */}
          <div className="absolute w-full [backface-visibility:hidden]">
            <form
              onSubmit={handleLoginUser}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 transition-transform duration-500 transform border border-[#D1D5DB]"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 text-[#374151]">
                Iniciar Sesión
              </h2>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-[#5879B5] hover:text-[#3A5A8F] hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#3A5A8F] hover:bg-[#2D4A7C] text-white py-3 rounded-xl transition-colors shadow-lg font-medium ${loading ? "opacity-80" : ""
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Cargando...
                  </div>
                ) : (
                  "Ingresar"
                )}
              </button>

              <p className="text-center text-[#6B7280]">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="text-[#5879B5] hover:text-[#3A5A8F] hover:underline font-medium transition-colors"
                >
                  Regístrate
                </button>
              </p>
            </form>
          </div>

          {/* Register Form */}
          <div className="absolute w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <form
              onSubmit={handleRegisterUser}
              className="bg-white shadow-xl rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col gap-3 transition-transform duration-500 transform border border-[#D1D5DB] max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 text-[#374151]">
                Crear Cuenta
              </h2>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Nombre completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    value={registerForm.name}
                    onChange={(e) => updateRegisterForm("name", e.target.value)}
                    required
                    className="pl-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    value={registerForm.email}
                    onChange={(e) =>
                      updateRegisterForm("email", e.target.value)
                    }
                    required
                    className="pl-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) =>
                      updateRegisterForm("password", e.target.value)
                    }
                    required
                    className="pl-10 pr-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showRegisterPassword ? (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-[#6B7280] font-medium">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      updateRegisterForm("confirmPassword", e.target.value)
                    }
                    required
                    className="pl-10 pr-10 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#3A5A8F] focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#3A5A8F] hover:bg-[#2D4A7C] text-white py-3 rounded-xl transition-colors shadow-lg font-medium ${loading ? "opacity-80" : ""
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Cargando...
                  </div>
                ) : (
                  "Registrarse"
                )}
              </button>

              <p className="text-center text-[#6B7280]">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="text-[#5879B5] hover:text-[#3A5A8F] hover:underline font-medium transition-colors"
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