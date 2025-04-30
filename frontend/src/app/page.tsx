"use client";
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

    // Cleanup function
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

  const bgClass =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white"
      : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800";

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${bgClass}`}
    >
      <div
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      <ToastContainer position="top-right" autoClose={3000} theme={theme} />

      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full shadow-md z-50 transition-all"
        style={{
          background: theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.05)",
        }}
      >
        {theme === "dark" ? (
          <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-indigo-900" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <div className="absolute w-full max-w-sm">
        <div className="text-center mb-4">
          <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-md animate__animated animate__fadeIn">
            Ayrton
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 animate__animated animate__fadeIn animate__delay-1s">
            Organiza tus tareas y equipos
          </p>
        </div>

        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {/* Login */}
          <div className="absolute w-full [backface-visibility:hidden]">
            <form
              onSubmit={handleLoginSubmit}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col gap-4 transition-transform duration-500 transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Cargando..." : "Ingresar"}
              </button>
              <p className="text-center text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="text-blue-500 hover:underline"
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
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 flex flex-col gap-4 transition-transform duration-500 transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-center">Crear Cuenta</h2>
              <input
                type="text"
                placeholder="Nombre completo"
                value={registerForm.name}
                onChange={(e) => updateRegisterForm("name", e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerForm.email}
                onChange={(e) => updateRegisterForm("email", e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={registerForm.password}
                onChange={(e) => updateRegisterForm("password", e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={registerForm.confirmPassword}
                onChange={(e) => updateRegisterForm("confirmPassword", e.target.value)}
                required
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Cargando..." : "Registrarse"}
              </button>
              <p className="text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="text-blue-500 hover:underline"
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