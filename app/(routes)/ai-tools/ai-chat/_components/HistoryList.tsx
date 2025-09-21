"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import AddNewSessionDialog from './AddNewSessionDialog';
import HistoryTable from './HistoryTable';
import { SessionDetails } from '../counselor-agent/[sessionId]/page';



function HistoryList( ) {

    const [historyList, setHistoryList] = useState<SessionDetails[]>([]);

    useEffect(() => {
        GetHistoryList();
    }, []);

    const  GetHistoryList=async()=>{
      try {
        const result= await axios.get('/api/user/session?sessionId=all');
        console.log('History List:', result.data);
        setHistoryList(result.data || []);
      } catch (error) {
        console.error('Error fetching history:', error);
        setHistoryList([]);
      }
    };

    const handleDeleteSession = (sessionId: string) => {
      // Remove the deleted session from the local state
      setHistoryList(prevList => prevList.filter(session => session.sessionId !== sessionId));
    };
  return (
    <div className='mt-3'>
        {historyList.length === 0 ? 
        <div className='flex items-center flex-col justify-center p-7 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-2xl bg-gray-50 dark:bg-slate-800/50'> 
            <Image src={'/assistance.png'} alt='empty' 
            width={150} height={150} 
            />
            <h2 className='font-bold text-xl mt-2 text-gray-900 dark:text-white'>No Recent Consultations</h2>
            <p className='text-gray-600 dark:text-gray-300 text-center'>Consult with our AI-powered counselor to get personalized career advice and guidance.</p>
            <AddNewSessionDialog />
        </div> :
        <div> 
           <HistoryTable historyList={historyList} onDeleteSession={handleDeleteSession} />
           </div>}
    </div>
  )
}

export default HistoryList