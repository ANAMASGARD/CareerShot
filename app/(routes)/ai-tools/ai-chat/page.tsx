import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'

function Dashboard() {
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='font-bold text-2xl text-gray-900 dark:text-white'>
          My Dashboard
        </h2>
        <Button> + Consult With Counselor </Button>
      </div>
    <HistoryList />

    </div>
  )
}

export default Dashboard