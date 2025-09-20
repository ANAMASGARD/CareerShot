import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SessionDetails } from '../counselor-agent/[sessionId]/page'

type Props={
  record:SessionDetails 
}

function ViewReportDialog({record}:Props) {
  return (
    <div>
        <Dialog>
  <DialogTrigger className="text-blue-600 hover:text-blue-800 underline text-sm">
    View Report
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle asChild >
        <h2 className='text-center text-4xl'> Counselor AI Voice Agent Report</h2>

      </DialogTitle>
      <DialogDescription asChild >
       <div className='mb-4'>
        <h2 className='font-bold text-blue-500 text-lg'>Video Interface</h2>
       <div className='grid grid-cols-2 '>
        <div>
            <h2>
                Counselor Specialist : <span className='font-bold text-gray-900 dark:text-white'> {record.selectedCounselor?.specialist || 'Unknown Specialist'}</span>
            <h2>
                Counsulation Date: <span className='font-bold text-gray-900 dark:text-white'> {new Date(record.createdOn).toLocaleDateString()}</span>
                </h2>           
             
            </h2>
        </div>

       </div>
       
       </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default ViewReportDialog