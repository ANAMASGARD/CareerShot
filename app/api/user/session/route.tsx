import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { sessionChatTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const { note, counselorId, counselorName, counselorAvatar, counselorSpecialty } = await request.json();
        
        console.log('🔍 POST /api/user/session - Creating new session');
        
        const user = await currentUser();
        
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { error: "Unauthorized or missing email address" },
                { status: 401 }
            );
        }

        if (!note || !counselorId) {
            return NextResponse.json(
                { error: 'Note and counselorId are required' },
                { status: 400 }
            );
        }

        // Generate a unique session ID
        const sessionId = uuidv4().replace(/-/g, '').substring(0, 11); // Create shorter ID like 78965436890
        
        console.log('📝 Creating session with ID:', sessionId);

        // Insert new session
        const insertedSession = await db
            .insert(sessionChatTable)
            .values({
                sessionId: sessionId,
                notes: note,
                conversation: null,
                report: null,
                createdBy: user.fullName ?? user.firstName ?? "Unknown",
                selectedCounselor: {
                    id: counselorId,
                    name: counselorName,
                    avatar: counselorAvatar,
                    specialty: counselorSpecialty
                },
                user: user.primaryEmailAddress.emailAddress,
            })
            .returning();

        console.log('✅ Session created successfully:', insertedSession[0]);

        return NextResponse.json({
            sessionId: sessionId,
            session: insertedSession[0],
            message: 'Session created successfully'
        });
        
    } catch (error: any) {
        console.error('❌ Error creating session:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}