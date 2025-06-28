"use client";

import React, { useState, useEffect } from "react";

interface TaskDashboardHeaderProps {
  textSecondaryClass: string;
  textColorClass: string;
}

export default function TaskDashboardHeader({ textSecondaryClass, textColorClass }: TaskDashboardHeaderProps) {
  const getTimeBasedGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return {
        greeting: 'Buenos días',
        description: 'Comienza tu día gestionando tu panel de configuración.'
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        greeting: 'Buenas tardes',
        description: 'Continúa configurando y optimizando tu sistema.'
      };
    } else {
      return {
        greeting: 'Buenas noches',
        description: 'Revisa y ajusta la configuración de tu sistema.'
      };
    }
  };

  const [greetingDescription, setGreetingDescription] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const timeGreeting = getTimeBasedGreeting();
      setGreetingDescription(timeGreeting.description);
    };

    updateGreeting();

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
      <div className='flex items-center space-x-2 mb-4'>
        <span className={`${textSecondaryClass} text-3xl font-light`}>Panel de</span>
        <span className={`${textColorClass} text-3xl font-bold`}>tareas</span>
      </div>
      <p className={`${textSecondaryClass} max-w-2xl mt-2`}>
        {greetingDescription}
      </p>

      {/* Carrusel de páginas del usuario */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
        </div>
      </div>
    </div>
  );
}
