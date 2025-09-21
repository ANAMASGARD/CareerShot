import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetails } from '../counselor-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment';
import ViewReportDialog from './ViewReportDialog';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type Props={
  historyList:SessionDetails[]
  onDeleteSession?: (sessionId: string) => void
}


function HistoryTable({ historyList, onDeleteSession }: Props) {
  const [deletingSession, setDeletingSession] = useState<string | null>(null);

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      return;
    }

    setDeletingSession(sessionId);
    
    try {
      const response = await fetch(`/api/user/session/delete?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete session');
      }

      const result = await response.json();
      console.log('Session deleted:', result);
      
      toast.success('Session deleted successfully!');
      
      // Call the callback to refresh the list
      if (onDeleteSession) {
        onDeleteSession(sessionId);
      }
      
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session. Please try again.');
    } finally {
      setDeletingSession(null);
    }
  };

  return (
    <div>
<Table>
  <TableCaption>Previous Sessions Report</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">AI Counselor Specialist </TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {historyList.map((record:SessionDetails) => (
      <TableRow key={record.sessionId}>
        <TableCell className="font-medium">
          {record.selectedCounselor?.specialist || 'Unknown Specialist'}
        </TableCell>
        <TableCell>
          {record.notes || 'No description available'}
        </TableCell>
        <TableCell>
          {moment(record.createdOn).fromNow()}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end space-x-3">
            <ViewReportDialog record={record} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteSession(record.sessionId)}
              disabled={deletingSession === record.sessionId}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200"
              title="Delete this session"
            >
              {deletingSession === record.sessionId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  )
}

export default HistoryTable