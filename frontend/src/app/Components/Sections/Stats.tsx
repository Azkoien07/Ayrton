// components/StatsSection.tsx
import React from 'react';

const StatsSection = () => {
    return (
        <section className="px-6 py-20 bg-light-background dark:bg-dark-background">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <StatItem number="10K+" label="Usuarios activos" />
                <StatItem number="1M+" label="Tareas completadas" />
                <StatItem number="500+" label="Equipos colaborando" />
            </div>
        </section>
    );
};

const StatItem = ({ number, label }: { number: string; label: string }) => (
    <div>
        <h3 className="text-4xl font-bold text-light-primary dark:text-dark-primary">{number}</h3>
        <p className="mt-2 text-lg text-light-textSecondary dark:text-dark-textSecondary">{label}</p>
    </div>
);

export default StatsSection;
