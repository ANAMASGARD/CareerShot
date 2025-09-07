import React from 'react'
import AiToolCard from './AiToolCard'

const aiToolsList = [ {
    name: "AI Career Counselor",
    desc: "Chat with AI Agent",
    icon: "/chatbot.png",
    button:'Ask Now',
    path:'/ai-tools/ai-chat'

}, 
{
    name: "AI Resume Analyzer",
    desc: "Chat with AI Agent",
    icon: "/resume.png",
    button:'Get Started',
    path:'/ai-resume-analyzer'

},
{
    name: "Roadmap Maker",
    desc: "Chat with AI Agent",
    icon: "/roadmap.png",
    button:'Get Started',
    path:'/career-roadmap-generator'

},
{
    name: "Cover Letter Generator",
    desc: "Chat with AI Agent",
    icon: "/cover.png",
    button:'Get Started',
    path:'/cover-letter-generator'

},]

function AiTools() {
  return (
    <div className='mt-7 p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm' >
        <h2 className='font-bold text-lg text-gray-900 dark:text-white'> Available AI Tools</h2>
        <p className='text-gray-600 dark:text-gray-300'> Start Building and Shape Your Career with the Personlized AI Counselor </p>
    
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>
        {aiToolsList.map((tool, index) => (
            <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    
    
    </div>
  )
}

export default AiTools