// components/Features.tsx
import React from 'react';

const Features = () => {
    return (
        <section id='features' className="px-6 py-16 bg-light-background dark:bg-dark-background">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-light-primary dark:text-dark-primary">
                    Características clave
                </h2>
                <div className="grid md:grid-cols-3 gap-12">
                    <FeatureCard title="Gestión eficiente" description="Organiza y asigna tareas con facilidad para mantener tu equipo enfocado y en el camino correcto." />
                    <FeatureCard title="Colaboración en tiempo real" description="Trabaja en equipo, comparte ideas y actualizaciones al instante." />
                    <FeatureCard title="Informes detallados" description="Visualiza los progresos y resultados de tus proyectos con informes visuales y fáciles de entender." />
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
    <div className="p-6 bg-light-card rounded-xl shadow-lg border border-light-border dark:bg-dark-card dark:border-dark-border hover:scale-105 transition-transform duration-300">
        <h3 className="text-2xl font-semibold mb-4 text-light-primary dark:text-dark-primary">{title}</h3>
        <p className="text-light-textSecondary dark:text-dark-textSecondary">{description}</p>
    </div>
);

export default Features;
