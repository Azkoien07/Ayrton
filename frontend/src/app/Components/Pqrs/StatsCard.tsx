import React from 'react';

const StatsCard = ({ title, value, icon, color }: { 
    title: string; 
    value: number; 
    icon: React.ReactNode; 
    color: string;
}) => (
    <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 shadow-sm border border-light-border dark:border-dark-border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">{title}</p>
                <p className="text-2xl font-bold text-light-text dark:text-dark-text">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                {icon}
            </div>
        </div>
    </div>
);

export default StatsCard;
