const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

// Configure Google OAuth 2.0
const auth = new GoogleAuth({
  scopes: [
    'https://www.googleapis.com/auth/generative-language.retriever',
    'https://www.googleapis.com/auth/generative-language.tuning',
  ],
});

// Obtain OAuth token
async function getOAuthToken() {
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

// Initialize GenerativeAI client
async function initializeGenerativeAI() {
  const oauthToken = await getOAuthToken();
  
  return {
    async generateContent(modelId, userInput) {
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/${modelId}:generateContent`,
          { prompt: userInput },
          {
            headers: {
              'Authorization': `Bearer ${oauthToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching from Gemini API: ${error.message}`);
      }
    }
  };
}

module.exports = { initializeGenerativeAI };
