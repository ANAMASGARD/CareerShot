import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { sessionChatTable } from "@/configs/schema";
import { report } from "process";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

const REPORT_GEN_PROMPT =`You are an AI Career Counselor Voice Agent that just finished a voice conversation with a user. Based on the provided context (Agent Info and Conversation History), generate a structured report with the following fields:
1. sessionId: a unique session identifier
2. agent: the career counselor specialist name (e.g., "IT/Tech Career Advisor")
3. user: name of the user or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. primaryGoal: one-sentence summary of the user's main career goal or problem
6. summary: a 2-3 sentence summary of the conversation, discussing the user's background, aspirations, and the advice given
7. userProfile: list of the user's stated skills, interests, and challenges (e.g., "proficient in Python", "interested in UX design", "struggles with networking")
8. experienceLevel: the user's current career stage (e.g., "Student", "Entry-Level", "Mid-Career", "Senior", "Career Changer")
9. urgency: the user's perceived urgency for making a change: "Low", "Medium", or "High"
10. mentionedTools: list of any specific tools, technologies, or qualifications mentioned (e.g., "Figma", "AWS", "MBA")
11. actionableSteps: list of AI-suggested next steps (e.g., "Update LinkedIn profile", "Build a portfolio project", "Network with industry professionals").

Return the result in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "primaryGoal": "string",
  "summary": "string",
  "userProfile": ["skill1", "interest2"],
  "experienceLevel": "string",
  "urgency": "string",
  "mentionedTools": ["tool1", "qualification2"],
  "actionableSteps": ["step1", "step2"]
} 
Only include valid fields. Respond with nothing else.
`;

export async function POST(request: NextRequest) {
    try {
        // 1. Get sessionDetails and messages from the request
        const { sessionDetails, messages } = await request.json();

        if (!sessionDetails || !messages) {
            return NextResponse.json({ error: 'Session details and messages are required.' }, { status: 400 });
        }

        // 2. Construct the UserInput string
        const UserInput = "AI Career Agent Info:" + JSON.stringify(sessionDetails) + ", Conversation History:" + JSON.stringify(messages); 

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 3. Structure the prompt for Gemini AI
        const promptParts: Content[] = [
            { role: "user", parts: [{ text: REPORT_GEN_PROMPT }] },
            { role: "model", parts: [{ text: "Understood. I am ready to generate the report. Please provide the user input." }] },
            { role: "user", parts: [{ text: UserInput }] }
        ];

        console.log('🤖 Generating Career Report with Google Gemini AI...');
        
        const genResult = await model.generateContent({ contents: promptParts });
        const response = genResult.response;
        const aiResponseText = response.text();

        console.log('🎯 Gemini AI Raw Report Response:', aiResponseText);

        // Clean up and parse the JSON response
        const cleanedJsonString = aiResponseText.trim().replace(/```json/g, '').replace(/```/g, '');
        const reportJson = JSON.parse(cleanedJsonString);

        //save to database 
        const updateResult = await db.update(sessionChatTable).set({
            report: reportJson,
            conversation: messages
        }).where(eq(sessionChatTable.sessionId, sessionDetails.sessionId));

        return NextResponse.json({ report: reportJson });

    } catch (error: any) {
        console.error('❌ Error generating career report:', error);
        return NextResponse.json({ error: 'Failed to generate career report.', details: error.message }, { status: 500 });
    }
}
