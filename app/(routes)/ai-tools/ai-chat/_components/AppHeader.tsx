import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import path from 'path'
import React from 'react'


const menuOptions=[{
     id:1,
     name:'Home',
     path:'/home'
},
{
     id:2,
     name:'History',
     path:'/history'
},

{
     id:3,
     name:'Profile',
     path:'/profile'
},
]

function AppHeader() {
  return (
    <div
      className="
        flex items-center justify-between
        px-6 py-4 md:px-5 lg:px-14
        bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl
        shadow-lg hover:shadow-xl dark:hover:shadow-slate-700/50 transition-shadow
        backdrop-blur-sm
      "
    >
      <Image src={'/logo.png'} alt='logo' width={180} height={100} />
      <div className='hidden md:flex gap-12 items-center'>
        {menuOptions.map((option,index)=>(
            <div key={index}>
                 <h2 className='hover:font-bold cursor-pointer transition-all text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'>{option.name}</h2>
                 </div>            
          ))}    
          </div>
       <div className='flex items-center gap-4'>
         
         <UserButton />
       </div>
    </div>
  )
}

export default AppHeader