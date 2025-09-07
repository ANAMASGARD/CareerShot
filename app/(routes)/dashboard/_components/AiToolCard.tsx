import React from 'react'
import Image from 'next/image'
import AiTools from './AiTools'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TOOL {
    name: string,
    desc: string,
    icon: string,
    button: string,
    path: string
}

type AIToolProps = {
    tool: TOOL
}

function AiToolCard({ tool }:  AIToolProps) {
  return (
    <div className='p-3 border border-gray-200 dark:border-slate-700 rounded-xl flex flex-col items-center text-center hover:shadow-md dark:hover:shadow-slate-700/50 transition cursor-pointer bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700'>
        <Image src={tool.icon} width={40} height={40} alt={tool.name}   />
        <h2 className='font-medium text-gray-900 dark:text-white'>{tool.name}</h2>
        <p className='text-gray-400 dark:text-gray-400'>{tool.desc}</p>
        <Link href ={tool.path} className='w-full ' >
        <Button className='w-full mt-3'>{tool.button}</Button>
        </Link>
        </div>
  )
}

export default AiToolCard