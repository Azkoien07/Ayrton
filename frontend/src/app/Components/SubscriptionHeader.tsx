"use client";

import React from "react";

interface SubscriptionHeaderProps {
  textSecondaryClass: string;
  textColorClass: string;
}

export default function SubscriptionHeader({ textSecondaryClass, textColorClass }: SubscriptionHeaderProps) {
  return (
    <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border mb-8'>
      <div className='text-center'>
        <div className='flex items-center justify-center space-x-2 mb-4'>
          <span className={`${textSecondaryClass} text-3xl font-light`}>Planes de</span>
          <span className={`${textColorClass} text-3xl font-bold`}>Suscripción</span>
        </div>
        <p className={`${textSecondaryClass} max-w-2xl mx-auto text-lg`}>
          Elige el plan perfecto para tu equipo y lleva tu productividad al siguiente nivel
        </p>
      </div>
    </div>
  );
}
