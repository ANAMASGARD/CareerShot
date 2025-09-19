import React from 'react'


interface counselorAgent {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
}

type props = {
  counselorAgent: counselorAgent;
  setSelectedCounselor: (counselor: counselorAgent) => void;
  selectedCounselor: counselorAgent | undefined;
}

function SuggestedCounselorCard({ counselorAgent, setSelectedCounselor, selectedCounselor }: props) {
  return (
    <div onClick={() => setSelectedCounselor(counselorAgent)} className={`border p-4 rounded-md cursor-pointer ${selectedCounselor?.id === counselorAgent.id ? 'bg-blue-500 text-white' : ''}`}>
      <h3 className='text-lg font-semibold'>{counselorAgent.name}</h3>
      <p className='text-sm text-gray-500'>{counselorAgent.specialty}</p>
    </div>
  )
}

export default SuggestedCounselorCard