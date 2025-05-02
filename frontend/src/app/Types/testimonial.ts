export interface Testimonial {
    name: string;
    role: string;
    feedback: string;
}

// Data
export const testimonials: Testimonial[] = [
    { name: 'Juan Pérez', role: 'Desarrollador', feedback: 'Ayrton ha hecho la gestión de proyectos mucho más fácil y eficiente para mi equipo.' },
    { name: 'María González', role: 'Líder de Proyecto', feedback: 'Me encanta cómo se integra con otras herramientas y simplifica mi trabajo diario.' },
    { name: 'Carlos Díaz', role: 'Product Manager', feedback: 'Un producto impresionante. La visibilidad de los proyectos y el control es increíble.' },
];
