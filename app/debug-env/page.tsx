"use client"

export default function DebugEnv() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        <div>
          <strong>NEXT_PUBLIC_VAPI_API_KEY:</strong> 
          <span className="ml-2">{process.env.NEXT_PUBLIC_VAPI_API_KEY || 'NOT FOUND'}</span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID:</strong> 
          <span className="ml-2">{process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID || 'NOT FOUND'}</span>
        </div>
        <div>
          <strong>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:</strong> 
          <span className="ml-2">{process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'NOT FOUND'}</span>
        </div>
      </div>
    </div>
  )
}