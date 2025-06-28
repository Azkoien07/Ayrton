"use client";

import { useState } from "react";
import { cn } from '@utilities/utils';
import Sidebar from '@components/UI/Sidebar';
import Barrita from '@components/Header';
import TaskDashboardHeader from '@components/Features/Task/TaskDashboardHeader';
import TaskManagement from '@components/Features/Task/TaskManagement';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTermBar, setSearchTermBar] = useState("");

    const textSecondary = 'text-light-textSecondary dark:text-dark-textSecondary';
    const textColor = 'text-light-text dark:text-dark-text';

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role="user" />

            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
                </header>
                <Barrita />
                {/*first content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        <TaskDashboardHeader textSecondaryClass={textSecondary} textColorClass={textColor} />
                        <TaskManagement searchTermBar={searchTermBar} setSearchTermBar={setSearchTermBar} />
                    </div>
                </div>
            </main>
        </div>
    );
}
