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
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle asChild>
        <div className="text-center border-b pb-4 mb-6">
          <h2 className='text-3xl font-bold text-blue-600 mb-2'>🎯 AI Career Counselor Report</h2>
          <p className="text-gray-600">Personalized Career Development Session Analysis</p>
        </div>
      </DialogTitle>
      <DialogDescription asChild>
        <div className="space-y-6">
          
          {/* Session Information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className='font-bold text-blue-600 text-lg mb-3 flex items-center'>
              📋 Session Information
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Career Specialist:</span>
                  <div className="font-semibold text-gray-900">
                    {record.selectedCounselor?.specialist || 'Professional Career Counselor'}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Specialization:</span>
                  <div className="text-sm text-gray-700">
                    {record.selectedCounselor?.description || 'Career Development & Strategic Planning'}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Session ID:</span>
                  <div className="font-mono text-xs text-gray-700">
                    {record.sessionId}
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Consultation Date:</span>
                  <div className="font-semibold text-gray-900">
                    {new Date(record.createdOn).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Session Time:</span>
                  <div className="font-semibold text-gray-900">
                    {new Date(record.createdOn).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Session Duration:</span>
                  <div className="text-sm text-gray-700">
                    {record.conversation && Array.isArray(record.conversation) 
                      ? `${Math.max(1, Math.ceil((record.conversation as any[]).length / 2))} minutes` 
                      : 'Standard Session'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Summary */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className='font-bold text-green-600 text-lg mb-3 flex items-center'>
              📝 Session Summary
            </h3>
            <div className="text-gray-700">
              {record.notes ? (
                <p className="mb-3">{record.notes}</p>
              ) : (
                <p className="mb-3 italic">
                  This personalized career counseling session was conducted with {record.selectedCounselor?.specialist || 'our AI Career Specialist'}.
                  The session focused on your specific career goals, challenges, and development opportunities.
                </p>
              )}
            </div>
          </div>

          {/* AI Generated Report */}
          {record.report && typeof record.report === 'object' && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className='font-bold text-purple-600 text-lg mb-3 flex items-center'>
                🤖 AI Analysis & Insights
              </h3>
              <div className="space-y-3">
                {Object.entries(record.report as any).map(([key, value], index) => (
                  <div key={index} className="border-l-4 border-purple-300 pl-4">
                    <div className="font-semibold text-gray-900 capitalize mb-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-gray-700 text-sm">
                      {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Highlights */}
          {record.conversation && Array.isArray(record.conversation) && (record.conversation as any[]).length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className='font-bold text-yellow-700 text-lg mb-3 flex items-center'>
                💬 Key Discussion Points
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {(record.conversation as any[]).slice(0, 6).map((msg: any, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {msg.role === 'user' ? 'You' : 'AI Counselor'}
                    </span>
                    <span className="text-sm text-gray-700 flex-1">
                      {typeof msg.text === 'string' ? msg.text.substring(0, 150) + '...' : 'Discussion point'}
                    </span>
                  </div>
                ))}
                {(record.conversation as any[]).length > 6 && (
                  <div className="text-xs text-gray-500 text-center pt-2">
                    ... and {(record.conversation as any[]).length - 6} more discussion points
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Personalized Recommendations */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h3 className='font-bold text-indigo-600 text-lg mb-3 flex items-center'>
              🎯 Personalized Action Plan
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <div className="font-medium text-gray-900">Review Session Insights</div>
                  <div className="text-sm text-gray-600">
                    Reflect on the key points discussed with {record.selectedCounselor?.specialist || 'your counselor'}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <div className="font-medium text-gray-900">Implement Discussed Strategies</div>
                  <div className="text-sm text-gray-600">
                    Take action on the specific recommendations provided during your session
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <div className="font-medium text-gray-900">Track Your Progress</div>
                  <div className="text-sm text-gray-600">
                    Monitor your development and note any changes or improvements
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                <div>
                  <div className="font-medium text-gray-900">Schedule Follow-up</div>
                  <div className="text-sm text-gray-600">
                    Book your next session to continue your career development journey
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className='font-bold text-gray-700 text-lg mb-3 flex items-center'>
              📊 Session Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {record.conversation && Array.isArray(record.conversation) 
                    ? (record.conversation as any[]).length 
                    : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Total Exchanges</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {record.selectedCounselor?.specialist ? '✓' : '-'}
                </div>
                <div className="text-sm text-gray-600">Specialist Match</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {record.report ? '✓' : 'Pending'}
                </div>
                <div className="text-sm text-gray-600">AI Analysis</div>
              </div>
            </div>
          </div>

          {/* Professional Note */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start space-x-3">
              <span className="text-amber-600 text-xl mt-1">💡</span>
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Professional Note</h4>
                <p className="text-sm text-amber-700">
                  This report is based on your personal session with {record.selectedCounselor?.specialist || 'our AI Career Counselor'} 
                  on {new Date(record.createdOn).toLocaleDateString()}. The insights and recommendations are tailored specifically 
                  to your discussion and career goals. Continue building on these insights in your career development journey.
                </p>
              </div>
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