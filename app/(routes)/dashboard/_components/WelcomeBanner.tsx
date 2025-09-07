import { Button } from '@/components/ui/button'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC76D6] dark:from-[#8B4252] dark:via-[#7A2BA8] dark:to-[#8A5FA2] rounded-xl shadow-lg'>
      <h2 className='font-bold text-2xl text-white mb-2'>
        AI Career Coach Agent
      </h2>
      <p className='text-white/90'> Smarter career decision start's from here - Get Personalized AI career Roadmap </p>
      <Button variant={'outline'} className='mt-3 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50'>Let's Get Started</Button>
    
    </div>
  )
}

export default WelcomeBanner