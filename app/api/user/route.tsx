import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { sessionChatTable, usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        console.log('🔍 POST /api/user - Starting user creation/check');
        
        const user = await currentUser();
        console.log('👤 Current user:', user ? 'Found' : 'Not found');

        if (!user || !user.primaryEmailAddress?.emailAddress) {
            console.log('❌ No user or email found');
            return NextResponse.json(
                { error: "Unauthorized or missing email address" },
                { status: 401 }
            );
        }

        const email = user.primaryEmailAddress.emailAddress;
        console.log('📧 User email:', email);

        console.log('🔍 Checking if user exists in database...');
        // Check if user already exists
        const existingUsers = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        console.log('📊 Existing users found:', existingUsers.length);

        if (existingUsers.length > 0) {
            console.log('✅ Returning existing user');
            return NextResponse.json(existingUsers[0]);
        }

        console.log('➕ Creating new user...');
        // Insert new user
        const insertedUsers = await db
            .insert(usersTable)
            .values({
                name: user.fullName ?? "",
                email: email,
            })
            .returning();

        console.log('✅ User created successfully');
        return NextResponse.json(insertedUsers[0]);
    } catch (e: any) {
        console.error('❌ API Error:', e);
        console.error('Error details:', {
            message: e.message,
            stack: e.stack,
            code: e.code
        });
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

        if (sessionId ==  'all') {
             const result = await db
            .select()
            .from(sessionChatTable)
            .where(eq(sessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress));

            return NextResponse.json(result[0]);
           
        }
        else {
            const result = await db
            .select()
            .from(sessionChatTable)
            .where(eq(sessionChatTable.sessionId, sessionId));

            return NextResponse.json(result[0]);
        }

       return NextResponse.json({ error: "Session not found" }, { status: 404 });
    } catch (e: any) {
        console.error('❌ GET /api/user error:', e);
        return NextResponse.json(
            { error: e.message || "Server error" },
            { status: 500 }
        );
    }
}
