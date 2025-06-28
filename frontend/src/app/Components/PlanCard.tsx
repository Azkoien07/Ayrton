"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@utilities/utils";
import { Plan } from "@Types/Plan";

interface PlanCardProps {
  plan: Plan;
  index: number;
  formatPrice: (price: number, currency: string) => string;
  handlePlanSelection: (plan: Plan) => void;
}

export default function PlanCard({ plan, index, formatPrice, handlePlanSelection }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'relative rounded-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]',
        plan.popular
          ? 'border-light-primary dark:border-dark-primary bg-gradient-to-b from-light-card to-light-primary/5 dark:from-dark-card dark:to-dark-primary/5 shadow-lg'
          : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Más Popular
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Plan Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
            {plan.name}
          </h3>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
            {plan.description}
          </p>
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-bold text-light-primary dark:text-dark-primary">
              {formatPrice(plan.price, plan.currency)}
            </span>
            <span className="text-light-textSecondary dark:text-dark-textSecondary ml-2">
              /{plan.period}
            </span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {plan.feutures.map((feature, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-light-primary/20 dark:bg-dark-primary/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-light-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-light-textSecondary dark:text-dark-textSecondary">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => handlePlanSelection(plan)}
          className={cn(
            'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]',
            plan.popular
              ? 'bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white shadow-lg hover:shadow-xl'
              : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/20 hover:bg-light-primary/20 dark:hover:bg-dark-primary/20'
          )}
        >
          {plan.buttonText}
        </button>
      </div>
    </motion.div>
  );
}
