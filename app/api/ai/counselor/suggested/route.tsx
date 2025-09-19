import { NextRequest, NextResponse } from "next/server";
import { AICounselorAgents } from '@/shared/list';

export async function POST(request: NextRequest) {
    try {
        const { note } = await request.json();
        
        if (!note) {
            return NextResponse.json(
                { error: 'Note is required' },
                { status: 400 }
            );
        }

        // Advanced AI-powered counselor matching based on career intent
        const queryLower = note.toLowerCase();
        
        // Define comprehensive keyword mappings for each counselor
        const counselorKeywords: Record<number, string[]> = {
            1: ['general', 'career', 'help', 'guidance', 'planning', 'advice', 'unsure', 'confused', 'lost', 'dont know'],
            2: ['tech', 'technology', 'programming', 'coding', 'software', 'developer', 'computer', 'it', 'ai', 'artificial intelligence', 'web', 'app', 'digital'],
            3: ['finance', 'banking', 'money', 'accounting', 'investment', 'ca', 'cfa', 'financial', 'economics', 'commerce'],
            4: ['medical', 'medicine', 'doctor', 'healthcare', 'nurse', 'hospital', 'health', 'neet', 'mbbs', 'nursing', 'biotech', 'pharmacy'],
            5: ['engineering', 'engineer', 'mechanical', 'civil', 'electrical', 'jee', 'technical', 'construction', 'design', 'manufacturing'],
            6: ['business', 'entrepreneur', 'startup', 'management', 'mba', 'company', 'leadership', 'sales', 'marketing', 'commerce'],
            7: ['art', 'creative', 'design', 'music', 'singing', 'singer', 'dancing', 'dancer', 'acting', 'actor', 'painting', 'drawing', 'fashion', 'photography', 'film', 'media', 'entertainment', 'arts'],
            8: ['teaching', 'teacher', 'education', 'school', 'professor', 'tutor', 'training', 'pedagogy', 'classroom'],
            9: ['science', 'research', 'scientist', 'physics', 'chemistry', 'biology', 'mathematics', 'lab', 'experiment', 'innovation'],
            10: ['law', 'legal', 'lawyer', 'advocate', 'judge', 'court', 'clat', 'litigation', 'corporate law'],
            11: ['data', 'analytics', 'machine learning', 'ai', 'artificial intelligence', 'python', 'statistics', 'algorithms', 'big data'],
            12: ['security', 'cybersecurity', 'hacking', 'ethical hacking', 'network security', 'cyber', 'protection', 'firewall'],
            13: ['environment', 'sustainability', 'green', 'renewable', 'climate', 'conservation', 'ecology', 'solar', 'wind energy'],
            14: ['marketing', 'digital marketing', 'social media', 'seo', 'content', 'branding', 'advertising', 'online'],
            15: ['cloud', 'aws', 'azure', 'google cloud', 'cloud computing', 'infrastructure', 'devops'],
            16: ['ux', 'ui', 'user experience', 'interface design', 'figma', 'prototyping', 'user design', 'app design']
        };
        
        // Calculate relevance scores for each counselor
        const counselorScores = AICounselorAgents.map(counselor => {
            const keywords = counselorKeywords[counselor.id] || [];
            let score = 0;
            
            // Check for exact keyword matches
            keywords.forEach((keyword: string) => {
                if (queryLower.includes(keyword)) {
                    score += keyword.length; // Longer keywords get higher scores
                }
            });
            
            // Bonus for multiple keyword matches
            const matchCount = keywords.filter((keyword: string) => queryLower.includes(keyword)).length;
            if (matchCount > 1) {
                score += matchCount * 5;
            }
            
            return {
                counselor,
                score,
                matchCount
            };
        });
        
        // Sort by score (highest first) and get top suggestions
        const sortedCounselors = counselorScores
            .filter(item => item.score > 0)
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return b.matchCount - a.matchCount;
            })
            .map(item => item.counselor);
        
        // If no matches found, provide smart fallbacks based on common patterns
        let suggestedCounselors: typeof AICounselorAgents;
        if (sortedCounselors.length === 0) {
            // Fallback logic for unmatched queries
            if (queryLower.includes('job') || queryLower.includes('work')) {
                suggestedCounselors = [AICounselorAgents[0], AICounselorAgents[5], AICounselorAgents[1]]; // General, Business, Tech
            } else if (queryLower.includes('study') || queryLower.includes('college')) {
                suggestedCounselors = [AICounselorAgents[0], AICounselorAgents[7], AICounselorAgents[4]]; // General, Education, Engineering
            } else {
                suggestedCounselors = [AICounselorAgents[0], AICounselorAgents[1], AICounselorAgents[5]]; // General, Tech, Business
            }
        } else {
            // Return top 3 most relevant counselors
            suggestedCounselors = sortedCounselors.slice(0, 3);
            
            // Ensure we always have at least 3 suggestions
            while (suggestedCounselors.length < 3) {
                const remaining = AICounselorAgents.filter(c => 
                    !suggestedCounselors.some((s: any) => s.id === c.id)
                );
                if (remaining.length > 0) {
                    suggestedCounselors.push(remaining[0]);
                } else {
                    break;
                }
            }
        }

        return NextResponse.json({
            suggestedCounselors,
            note,
            message: 'Counselors suggested successfully',
            matchingLogic: sortedCounselors.length > 0 ? 'keyword_match' : 'fallback'
        });
        
    } catch (error: any) {
        console.error('Error in suggested counselor API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}