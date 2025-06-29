import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

export default function StatCard({ icon, title, value }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border">
            <div className="flex items-center space-x-3">
                {icon}
                <div>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">{title}</p>
                    <p className="text-2xl font-semibold text-light-text dark:text-dark-text">{value}</p>
                </div>
            </div>
        </div>
    );
}
