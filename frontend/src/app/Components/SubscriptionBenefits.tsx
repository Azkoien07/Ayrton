"use client";

import React from "react";

interface SubscriptionBenefitsProps {
  textSecondaryClass: string;
}

export default function SubscriptionBenefits({ textSecondaryClass }: SubscriptionBenefitsProps) {
  return (
    <div className="mt-16 text-center">
      <div className="flex justify-center space-x-6 text-sm">
        <span className={`flex items-center ${textSecondaryClass}`}>
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Cancela cuando quieras
        </span>
        <span className={`flex items-center ${textSecondaryClass}`}>
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Prueba gratis 14 días
        </span>
      </div>
    </div>
  );
}
