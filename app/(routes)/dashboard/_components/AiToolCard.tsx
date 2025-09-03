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
    <div className='p-3 border rounded-xl flex flex-col items-center text-center hover:shadow-md transition cursor-pointer'>
        <Image src={tool.icon} width={40} height={40} alt={tool.name}   />
        <h2 className='font-medium '>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Link href ={tool.path} className='w-full ' >
        <Button className='w-full mt-3'>{tool.button}</Button>
        </Link>
        </div>
  )
}

export default AiToolCard