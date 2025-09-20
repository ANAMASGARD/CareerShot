import { NextRequest, NextResponse } from "next/server";
import { AICounselorAgents } from '@/shared/list';
import { VertexAI } from '@google-cloud/vertexai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/configs/db";
import { sessionChatTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { note, selectedCounselorId, counselorId, counselorName, counselorAvatar, counselorSpecialty } = await request.json();
        
        if (!note) {
            return NextResponse.json({ error: 'Note is required' }, { status: 400 });
        }

        // Get current user
        const user = await currentUser();
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;

        // If counselorId is provided (from AddNewSessionDialog), create session directly
        if (counselorId) {
            const selectedCounselor = AICounselorAgents.find(agent => agent.id === counselorId);
            
            if (!selectedCounselor) {
                return NextResponse.json({ error: 'Invalid counselor selected' }, { status: 400 });
            }

            // Create new session
            const sessionId = uuidv4();
            
            try {
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
            } catch (dbError) {
                console.error('❌ Database error:', dbError);
                return NextResponse.json({ error: 'Failed to create session in database' }, { status: 500 });
            }
        }

        // If selectedCounselorId is provided, create session directly
        if (selectedCounselorId) {
            const selectedCounselor = AICounselorAgents.find(agent => agent.id === selectedCounselorId);
            
            if (!selectedCounselor) {
                return NextResponse.json({ error: 'Invalid counselor selected' }, { status: 400 });
            }

            // Create new session
            const sessionId = uuidv4();
            
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

            return NextResponse.json({ 
                sessionId,
                redirectUrl: `/ai-tools/ai-chat/counselor-agent/${sessionId}`,
                selectedCounselor 
            });
        }

        // Otherwise, get AI suggestions
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are an expert career guidance AI. Analyze the user's query and recommend exactly 3 AI counselors from the provided list.

User Query: "${note}"

Available AI Counselor Specialists:
${AICounselorAgents.map(agent => `${agent.id}. ${agent.specialist} - ${agent.description}`).join('\n')}

Your response MUST be a valid JSON array of 3 numbers (the counselor IDs), ordered by relevance. Example: [2, 11, 5]. Do not include any other text or markdown.`;

        console.log('🤖 Sending suggestion request to Google Gemini AI...');
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const aiResponseText = response.text();
        
        console.log('🎯 Gemini AI Raw Suggestion Response:', aiResponseText);

        const suggestedIds = JSON.parse(aiResponseText.trim());

        if (!Array.isArray(suggestedIds) || suggestedIds.length === 0) {
            throw new Error("AI did not return a valid array of IDs.");
        }

        const suggestedCounselors = suggestedIds.slice(0, 3).map(id => 
            AICounselorAgents.find(agent => agent.id === id)
        ).filter(Boolean);

        return NextResponse.json({ suggestedCounselors });
        
    } catch (error: any) {
        console.error('❌ Error in AI counselor suggestion API:', error);
        return NextResponse.json({ error: 'Failed to get AI suggestion.', details: error.message }, { status: 500 });
    }
}