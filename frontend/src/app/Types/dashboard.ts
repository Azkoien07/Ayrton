export interface DashboardProps {
  role?: string;
  userId?: string;
}

export const roleOptions = {
  admin: ["Usuarios", "Tareas", "Transacciones", "Configuración"],
  user: ["Mis Tareas", "Mis Transacciones", "Mi Perfil", "Configuración"],
};
