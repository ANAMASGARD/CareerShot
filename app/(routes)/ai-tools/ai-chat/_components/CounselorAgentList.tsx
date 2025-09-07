import React from 'react'
import { AICounselorAgents } from '@/shared/list';
import CounselorAgentCard from './CounselorAgentCard';

function CounselorAgentList() {
  return (
    <div className='mt-5'>
<h2 className='font-bold text-xl'>AI Specialist Counselors Agent</h2>
      
       <div className='grid grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 gap-4 p-4 border
     border-gray-200 dark:border-slate-700 rounded-xl hover:shadow-md
      dark:hover:shadow-slate-700/50 transition cursor-pointer bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 mt-2'>
        {AICounselorAgents.map((counselor,index) => (
          <div key={index}> 
            <CounselorAgentCard counselorAgent={counselor} />
          </div>
        ))}
       </div>

    </div>
  )
}

export default CounselorAgentList