import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-light-border dark:border-dark-border animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                </div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
            <div className="flex justify-end space-x-2">
                <div className="h-8 bg-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
        </div>
    );
}
