import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure API keys are handled securely.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getMathExplanation = async (expression: string, result: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "Oopsie! I need an API Key to do magic! ✨";
    }

    const prompt = `
      You are a kawaii, helpful math assistant.
      The user just calculated: ${expression} = ${result}.
      
      Please provide a brief, cute explanation of this math fact or a fun fact about the number ${result}.
      Keep it under 50 words and use 1-2 emojis.
      Tone: Cheerful, Encouraging, Cute.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't think of anything... sorry! 🥺";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My magic is tired right now... try again later! 💤";
  }
};