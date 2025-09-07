"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

function History() {

  const  [userHistory, setUserHistory] = useState([])
  return (
    <div className='mt-5 p-5 border border-gray-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm'>
        <h2 className='font-bold text-lg text-gray-900 dark:text-white'>Previous History
        </h2>
        <p className='text-gray-600 dark:text-gray-300'> What Your Previously work on , You can find it here </p>
     {userHistory?.length === 0 && 
        <div className='flex flex-col items-center justify-center mt-4 ' > 
           <Image src={'/bulb.png'} 
           width={50} height={50} 
           alt='history' 
           />
           <h2 className='text-gray-700 dark:text-gray-300'> You don't Have any History</h2>
         <Button className='mt-3'>
            Explore AI Tools
         </Button>
        
        </div>
}  
    
    </div>
  )
}

export default History