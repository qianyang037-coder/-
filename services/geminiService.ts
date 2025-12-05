import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize API client only if key exists, but don't crash if it doesn't
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateLoveQuote = async (topic: string = "love and cooking"): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return "爱是让每顿饭都成为杰作的秘密佐料。";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, romantic, one-sentence quote about ${topic} in Chinese (Simplified). Do not use quotes in the output string.`,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating quote:", error);
    return "凡有爱之处，便有生活。";
  }
};
