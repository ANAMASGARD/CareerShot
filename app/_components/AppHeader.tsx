import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ThemeToggle'
import React from 'react'


function AppHeader() {
    return (
        <div className='p-4 shadow-sm bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between w-full '>
            <SidebarTrigger className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
            <ThemeToggle />
        </div>
    )
}

export default AppHeader