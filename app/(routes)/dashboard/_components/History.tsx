"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

function History() {

  const  [userHistory, setUserHistory] = useState([])
  return (
    <div className='mt-5 p-5 border rounded-xl'>
        <h2 className='font-bold text-lg'>Previous History
        </h2>
        <p> What Your Previously work on , You can find it here </p>
     {userHistory?.length === 0 && 
        <div className='flex flex-col items-center justify-center mt-4 ' > 
           <Image src={'/bulb.png'} 
           width={50} height={50} 
           alt='history' 
           />
           <h2> You don't Have any History</h2>
         <Button className='mt-3'>
            Explore AI Tools
         </Button>
        
        </div>
}  
    
    </div>
  )
}

export default History