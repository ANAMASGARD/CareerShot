import React from 'react'
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
type Props={
  historyList:SessionDetails[]
}


function HistoryTable({ historyList }: Props) {
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
          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={() => window.location.href = `/ai-tools/ai-chat/counselor-agent/${record.sessionId}`}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Report
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  )
}

export default HistoryTable