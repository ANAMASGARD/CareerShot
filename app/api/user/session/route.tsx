import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { sessionChatTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import { AICounselorAgents } from '@/shared/list';

export async function POST(req: NextRequest) {
    try {
        console.log('🔍 POST /api/user/session - Creating new session');
        
        const user = await currentUser();
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { note, counselorId, counselorName, counselorAvatar, counselorSpecialty } = await req.json();
        
        if (!note || !counselorId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const selectedCounselor = AICounselorAgents.find(agent => agent.id === counselorId);
        if (!selectedCounselor) {
            return NextResponse.json({ error: 'Invalid counselor selected' }, { status: 400 });
        }

        const sessionId = uuidv4();
        const userEmail = user.primaryEmailAddress.emailAddress;

        const newSession = await db
            .insert(sessionChatTable)
            .values({
                sessionId: sessionId,
                user: userEmail,
                createdBy: userEmail,
                notes: note,
                selectedCounselor: selectedCounselor,
            })
            .returning();

        console.log('✅ Session created successfully:', sessionId);
        return NextResponse.json({ 
            sessionId,
            success: true,
            message: 'Session created successfully'
        });
    } catch (e: any) {
        console.error('❌ Session creation error:', e);
        return NextResponse.json({ 
            error: e.message || "Server error",
            details: process.env.NODE_ENV === 'development' ? e.stack : undefined
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');

        const user = await currentUser();
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;

        if (sessionId === 'all') {
            const result = await db
                .select()
                .from(sessionChatTable)
                .where(eq(sessionChatTable.user, userEmail));

            console.log('📊 Found sessions:', result.length);
            return NextResponse.json(result);
        } else if (sessionId) {
            const result = await db
                .select()
                .from(sessionChatTable)
                .where(eq(sessionChatTable.sessionId, sessionId));

            if (result.length === 0) {
                return NextResponse.json({ error: "Session not found" }, { status: 404 });
            }

            return NextResponse.json(result[0]);
        } else {
            return NextResponse.json({ error: "sessionId parameter is required" }, { status: 400 });
        }

    } catch (e: any) {
        console.error('❌ GET /api/user/session error:', e);
        return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
    }
}