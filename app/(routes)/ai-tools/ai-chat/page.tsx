import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import CounselorAgentList from './_components/CounselorAgentList'

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
     <CounselorAgentList />

    </div>
  )
}

export default Dashboard