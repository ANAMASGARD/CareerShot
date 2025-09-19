"use client"

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { counselorAgent } from '../../_components/CounselorAgentCard';


type SessionDetails = {
  id:number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedCounselor: counselorAgent,
  createdOn: string,
  createdBy: string,
  user: string,
  counselorId: number
}

function CounselorVoiceAgent() {
  const {sessionId} = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  useEffect(()=>{
    sessionId && GetSessionDetails();
  } ,[sessionId])

  const GetSessionDetails=async()=>{
    const result = await axios.get('/api/user?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetails(result.data);

  }
  return (
    <div>
      <div>

      </div>
    </div>
  )
}

export default CounselorVoiceAgent