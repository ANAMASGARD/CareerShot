"use client"

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { counselorAgent } from '../../_components/CounselorAgentCard';
import { Circle, Phone } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type SessionDetails = {
  id: number,
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
  const { sessionId } = useParams();
  const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get('/api/user?sessionId=' + sessionId);
      console.log(result.data);
      // Handle both array and single object responses
      const sessionData = Array.isArray(result.data) ? result.data[0] : result.data;
      setSessionDetails(sessionData);
    } catch (error) {
      console.error('Error fetching session details:', error);
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsConnected(true);
    setCallDuration(0);
  };

  if (!sessionDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 min-h-[600px] flex flex-col">
        {/* Header with Status */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Circle className="h-4 w-4" />
            <span className="text-sm">{isConnected ? 'Connected' : 'Not Connected'}</span>
          </div>
          <div className="text-2xl font-mono text-gray-600 dark:text-gray-300">
            {formatTime(callDuration)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Counselor Avatar */}
          <div className="relative">
            <Image 
              src={sessionDetails.selectedCounselor?.image || '/advisor1.png'} 
              alt={sessionDetails.selectedCounselor?.specialist || 'Career Counselor'} 
              width={120} 
              height={120} 
              className="h-[120px] w-[120px] rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Counselor Info */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {sessionDetails.selectedCounselor?.specialist || 'Career Counselor'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              AI Career Voice Agent
            </p>
          </div>

          {/* Message Area */}
          <div className="w-full max-w-md space-y-4">
            <div className="text-center">
              <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg text-sm">
                Assistant Msg
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm">
                User Msg
              </div>
            </div>
          </div>

          {/* Start Call Button */}
          <div className="mt-8">
            {!isConnected ? (
              <Button 
                onClick={handleStartCall}
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                Start Call
              </Button>
            ) : (
              <Button 
                onClick={() => setIsConnected(false)}
                variant="destructive"
                className="px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                End Call
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CounselorVoiceAgent;