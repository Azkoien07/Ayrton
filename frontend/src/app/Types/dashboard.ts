export interface DashboardProps {
    role: 'admin' | 'usuario' | 'coordinator' | 'learner';
}

// Data
export const roleOptions = {
    admin: ['Usuarios', 'Proyectos', 'Reportes', 'Configuración'],
    instructor: ['Asistencias', 'Equipos', 'Reportes', 'Notificaciones'],
    coordinator: ['Proyectos', 'Reportes', 'Aprobaciones', 'Mensajes'],
    learner: ['Mis Proyectos', 'Asistencias', 'Notificaciones', 'Perfil'],
};