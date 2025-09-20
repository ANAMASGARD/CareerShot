// Test script for AI Counselor Suggestion API
const axios = require('axios');

async function testAICounselorSuggestion() {
    try {
        console.log('🧪 Testing AI Counselor Suggestion API...\n');
        
        const testQueries = [
            'I want to become a software developer and learn programming',
            'I am interested in medicine and want to help people as a doctor',
            'I love art, design and want to work in creative field',
            'I want to start my own business and become an entrepreneur',
            'I am confused about my career and need general guidance'
        ];

        for (const query of testQueries) {
            console.log(`📝 Query: "${query}"`);
            
            const response = await axios.post('http://localhost:3000/api/ai/counselor/suggested', {
                note: query
            });
            
            console.log('✅ AI Response:', response.data.aiResponse);
            console.log('🎯 Suggested Counselors:', response.data.suggestedCounselors.map(c => c.specialist));
            console.log('🤖 Model Used:', response.data.model);
            console.log('---\n');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testAICounselorSuggestion();