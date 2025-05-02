// components/CallToAction.tsx
import React from 'react';

const CallToAction = () => {
    return (
        <section className="px-6 py-16 bg-light-primary text-white text-center rounded-lg shadow-lg dark:bg-dark-primary dark:text-dark-text">
            <h2 className="text-3xl font-semibold mb-4 text-light-card dark:text-dark-card">
                Únete a nosotros
            </h2>
            <p className="text-lg mb-6 text-light-card dark:text-dark-card">
                Comienza a gestionar tus proyectos de manera más eficiente con Ayrton.
            </p>
            <a href="#" className="bg-white text-light-primary py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 dark:bg-dark-card dark:text-dark-primary dark:hover:bg-dark-hover">
                Empieza ahora
            </a>
        </section>
    );
};

export default CallToAction;
