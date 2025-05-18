export type BentoSize = 'large' | 'medium' | 'small';

export type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface BentoData {
    id: string;
    title: string;
    description: string;
    emoji: string;
    size: BentoSize;
    accentColor: string;
    accentPosition: AccentPosition;
}

export const BENTO_ITEMS: BentoData[] = [
    {
        id: 'sprint-planning',
        title: 'Planifica tus sprints',
        description: 'Organiza el trabajo de tu equipo en tableros visuales, con listas flexibles, prioridades claras y asignaciones rápidas. Optimiza cada sprint con una vista clara de tareas, dependencias y entregables clave.',
        emoji: '🗂️',
        size: 'large',
        accentColor: 'from-blue-500/30 to-purple-500/20',
        accentPosition: 'top-right',
    },
    {
        id: 'ai-collaboration',
        title: 'Colaboración AI',
        description: 'Impulsa la productividad con inteligencia artificial: obtén resúmenes automáticos de tareas, sugerencias contextuales, detección de bloqueos y generación inteligente de subtareas basadas en la actividad del equipo.',
        emoji: '🤖',
        size: 'medium',
        accentColor: 'from-green-500/30 to-blue-500/20',
        accentPosition: 'bottom-left',
    },
    {
        id: 'real-time-reports',
        title: 'Reportes en tiempo real',
        description: 'Accede a reportes dinámicos y actualizados al instante con métricas clave como velocidad, cumplimiento de objetivos y carga por miembro. Visualiza el estado real de tus proyectos con dashboards interactivos.',
        emoji: '📊',
        size: 'medium',
        accentColor: 'from-amber-500/30 to-pink-500/20',
        accentPosition: 'top-left',
    },
    {
        id: 'seamless-integrations',
        title: 'Integraciones fluidas',
        description: 'Sincroniza tu flujo de trabajo conectando con herramientas como GitHub, Slack, Notion o Jira. Automatiza tareas repetitivas, recibe notificaciones en contexto y mantén todo centralizado sin fricciones.',
        emoji: '🔗',
        size: 'medium',
        accentColor: 'from-indigo-500/30 to-cyan-500/20',
        accentPosition: 'bottom-right',
    },

];
