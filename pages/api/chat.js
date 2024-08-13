import { GoogleGenerativeAI } from '@google/generative-ai';

// Ensure your API key is correctly set in the environment variables
const apiKey = process.env.GEMINI_API_KEY; // Update this with your environment variable name
 
 
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ message: 'Input is required' });
  }

  try {
    // Generate content using the Gemini model
    const result = await model.generateContent(userInput);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
