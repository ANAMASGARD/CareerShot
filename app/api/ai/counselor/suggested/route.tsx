import { NextRequest, NextResponse } from "next/server";
import { AICounselorAgents } from '@/shared/list';
import { VertexAI } from '@google-cloud/vertexai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { note } = await request.json();
        
        if (!note) {
            return NextResponse.json({ error: 'Note is required' }, { status: 400 });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create a robust prompt for the AI
        const prompt = `You are an expert career guidance AI. Your task is to analyze the user's career query and recommend exactly 3 AI counselors from the provided list.

User Query: "${note}"

Available AI Counselor Specialists:
${AICounselorAgents.map(agent => 
    `${agent.id}. ${agent.specialist} - ${agent.description}`
).join('\n')}

Instructions:
1.  Analyze the user's query for key themes, skills, and career interests.
2.  Recommend the 3 most relevant counselor specialists.
3.  Your response MUST be a valid JSON array of 3 numbers (the counselor IDs), ordered by relevance. Example: [2, 11, 5]
4.  Do not include any other text, explanations, or markdown formatting. Only the JSON array.`;

        console.log('🤖 Sending request to Google Gemini AI...');
        
        const result = await model.generateContent(prompt);
        const response = result.response;
        const aiResponseText = response.text();
        
        console.log('🎯 Gemini AI Raw Response:', aiResponseText);

        // Parse the JSON response from the AI
        const suggestedIds = JSON.parse(aiResponseText.trim());

        if (!Array.isArray(suggestedIds) || suggestedIds.length === 0) {
            throw new Error("AI did not return a valid array of IDs.");
        }

        // Get the counselor details from the suggested IDs
        const suggestedCounselors = suggestedIds.slice(0, 3).map(id => 
            AICounselorAgents.find(agent => agent.id === id)
        ).filter(Boolean); // Filter out any null/undefined results

        console.log('✅ Final suggested counselors:', suggestedCounselors);

        return NextResponse.json({
            suggestedCounselors,
            note,
            message: 'AI-powered counselor suggestions generated successfully.'
        });
        
    } catch (error: any) {
        console.error('❌ Error in AI counselor suggestion API:', error);
        
        // Return a server error if the AI service fails
        return NextResponse.json({
            error: 'Failed to get AI suggestion.',
            details: error.message,
        }, { status: 500 });
    }
}