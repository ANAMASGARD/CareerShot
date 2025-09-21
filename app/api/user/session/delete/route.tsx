import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { sessionChatTable } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const userEmail = user.primaryEmailAddress.emailAddress;

    console.log('Deleting session:', sessionId, 'for user email:', userEmail);

    // Delete the session from the database
    const result = await db
      .delete(sessionChatTable)
      .where(
        and(
          eq(sessionChatTable.sessionId, sessionId),
          eq(sessionChatTable.user, userEmail)
        )
      )
      .returning();

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Session not found or you do not have permission to delete it' }, 
        { status: 404 }
      );
    }

    console.log('Session deleted successfully:', result);

    return NextResponse.json(
      { 
        message: 'Session deleted successfully',
        deletedSession: result[0]
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' }, 
      { status: 500 }
    );
  }
}