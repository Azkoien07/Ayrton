import React from 'react';

const Bento = () => {
    return (
        <section className="px-6 py-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center text-light-primary dark:text-dark-primary">Explora lo que puedes hacer</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <BentoItem className="md:col-span-4" title="Planifica tus sprints" description="Organiza el trabajo en tableros visuales y listas flexibles." />
                <BentoItem className="md:col-span-2" title="Colaboración AI" description="Aprovecha la inteligencia artificial para sugerencias y resumen de tareas." />
                <BentoItem className="md:col-span-2" title="Reportes en tiempo real" description="Visualiza métricas clave y el progreso de tus equipos." />
                <BentoItem className="md:col-span-4" title="Integraciones fluidas" description="Conecta fácilmente con GitHub, Slack y más herramientas que usas a diario." />
            </div>
        </section>
    );
};

const BentoItem = ({ title, description, className }: { title: string; description: string; className?: string }) => (
    <div className={`p-6 rounded-2xl shadow-lg bg-light-card border border-light-border dark:bg-dark-card dark:border-dark-border hover:scale-[1.02] transition-transform duration-300 ${className}`}>
        <h3 className="text-2xl font-semibold mb-2 text-light-primary dark:text-dark-primary">{title}</h3>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">{description}</p>
    </div>
);

export default Bento;