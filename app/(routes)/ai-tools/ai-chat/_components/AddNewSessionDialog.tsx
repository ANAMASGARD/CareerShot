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
import { ArrowRightCircleIcon } from 'lucide-react'



function AddNewSessionDialog() {

const [note, setNote] = useState <string>();

  return (
    <Dialog>
  <DialogTrigger>
    <Button className='mt-3'> + Start a Consultation </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
        <div>
            <h2>
                Add a brief description of your career goals and current challenges to help our AI counselor provide personalized advice.
            </h2>
            <Textarea placeholder='Add Detail Here....' 
            className='h-[200px] mt-1'
            onChange={(e)=>setNote(e.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button disabled={!note}>Next <ArrowRightCircleIcon /> </Button>
        <DialogClose>
            <Button variant={'outline'}>Cancel</Button>
        </DialogClose>
        
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSessionDialog