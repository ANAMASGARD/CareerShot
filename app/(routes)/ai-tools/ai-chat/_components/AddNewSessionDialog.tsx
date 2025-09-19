"use client"

import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from 'lucide-react'
import CounselorAgentCard,{ counselorAgent } from './CounselorAgentCard'
import CounselorAgentList from './CounselorAgentList'
import SuggestedCounselorCard from './SuggestedCounselorCard'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function AddNewSessionDialog() {
  const [step, setStep] = useState(1); // 1 for note, 2 for counselor selection
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [suggestedCounselors, setSuggestedCounselors] = useState<counselorAgent[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<counselorAgent>();
  const router = useRouter();

  const onClickNext = async () => {
    if (step === 1) {
      // Move to step 2 and fetch suggested counselors
      setLoading(true);
      try {
        const result = await axios.post('/api/ai/counselor/suggested', {
          note: note
        });
        console.log('Suggested counselors:', result.data);
        setSuggestedCounselors(result.data.suggestedCounselors || []);
        setStep(2);
      } catch (error) {
        console.error('Error getting suggested counselors:', error);
        alert('Failed to get counselor suggestions. Please try again.');
      }
      setLoading(false);
    }
  };

  const onClickBack = () => {
    setStep(1);
    setSuggestedCounselors([]);
    setSelectedCounselor(undefined);
  };

  const onStartConsultation = async () => {
    if (!selectedCounselor) {
      alert('Please select a counselor');
      return;
    }

    setLoading(true);
    try {
      // Save ALL info to database
      const result = await axios.post('/api/user/session', {
        note: note,
        counselorId: selectedCounselor.id,
        counselorName: selectedCounselor.specialist,
        counselorAvatar: selectedCounselor.image,
        counselorSpecialty: selectedCounselor.specialist
      });
      
      console.log('Session created:', result.data);
      
      if (result.data.sessionId) {
        console.log('Redirect to session:', result.data.sessionId);
        // Redirect to the Conversation Page
        router.push('/ai-tools/ai-chat/counselor-agent/' + result.data.sessionId);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    }
    setLoading(false);
  };

  const resetDialog = () => {
    setStep(1);
    setNote('');
    setSuggestedCounselors([]);
    setSelectedCounselor(undefined);
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetDialog()}>
      <DialogTrigger asChild>
        <Button className='mt-3'> + Start a Consultation </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Add Basic Details' : 'Choose Your Counselor'}
          </DialogTitle>
          <DialogDescription asChild>
            {step === 1 ? (
              <div>
                <h2>
                  Add a brief description of your career goals and current challenges to help our AI counselor provide personalized advice.
                </h2>
                <Textarea 
                  placeholder='Add Detail Here....' 
                  className='h-[200px] mt-1'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2 className="mb-4">
                  Based on your query, here are our recommended counselors:
                </h2>
                <div className="text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded">
                  <strong>Your Query:</strong> {note}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedCounselors.map((counselor, index) => (
                    <div 
                      key={counselor.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedCounselor?.id === counselor.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedCounselor(counselor)}
                    >
                      <div className="text-center">
                        <img 
                          src={counselor.image} 
                          alt={counselor.specialist}
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                          onError={(e) => {
                            e.currentTarget.src = '/advisor1.png'; // Fallback image
                          }}
                        />
                        <h3 className="font-semibold text-sm">{counselor.specialist}</h3>
                        <p className="text-xs text-gray-600 mt-1">{counselor.description}</p>
                        {selectedCounselor?.id === counselor.id && (
                          <div className="mt-2 text-blue-600 text-xs">✓ Selected</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {step === 2 && (
              <Button variant="outline" onClick={onClickBack} disabled={loading}>
                <ArrowLeftCircleIcon className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            {step === 1 ? (
              <Button 
                onClick={onClickNext} 
                disabled={!note || loading}
              >
                {loading ? 'Loading...' : 'Next'} <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={onStartConsultation} 
                disabled={!selectedCounselor || loading}
              >
                {loading ? 'Creating Session...' : 'Start Consultation'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog