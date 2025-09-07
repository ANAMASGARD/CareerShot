import React from 'react'
import AppHeader from './_components/AppHeader';

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-slate-900'>
        <AppHeader />
        <div className='p-4 md:p-8 lg:p-12 py-4 md:py-8 lg:py-12 space-y-6'>
          {children}
        </div>
        </div>
  )
}

export default DashboardLayout