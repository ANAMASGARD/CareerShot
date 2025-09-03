import React from 'react'
import AiToolCard from './AiToolCard'

const aiToolsList = [ {
    name: "AI Career Counselor",
    desc: "Chat with AI Agent",
    icon: "/chatbot.png",
    button:'Get Started',
    path:'/ai-chat'

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
    <div className='mt-7 p-5 bg-white border rounded-xl' >
        <h2 className='font-bold text-lg'> Available AI Tools</h2>
        <p> Start Building and Shape Your Career with the Personlized AI Counselor </p>
    
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>
        {aiToolsList.map((tool, index) => (
            <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    
    
    </div>
  )
}

export default AiTools