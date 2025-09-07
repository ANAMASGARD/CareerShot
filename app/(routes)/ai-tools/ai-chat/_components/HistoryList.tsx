"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import { useState } from 'react'

function HistoryList() {

    const [historyList, setHistoryList] = useState([]);
  return (
    <div className='mt-3'>
        {historyList.length === 0 ? 
        <div className='flex items-center flex-col justify-center p-7 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl bg-gray-50 dark:bg-slate-800/50'> 
            <Image src={'/assistance.png'} alt='empty' 
            width={150} height={150} 
            />
            <h2 className='font-bold text-xl mt-2 text-gray-900 dark:text-white'>No Recent Consultations</h2>
            <p className='text-gray-600 dark:text-gray-300 text-center'>Consult with our AI-powered counselor to get personalized career advice and guidance.</p>
            <Button className='mt-3'> + Start a Consultation </Button>
        </div> :
        <div> List </div>}
    </div>
  )
}

export default HistoryList