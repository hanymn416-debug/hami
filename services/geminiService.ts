import { GoogleGenAI } from "@google/genai";

// Initialize the client securely
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAIBio = async (
  name: string,
  workplace: string,
  tone: 'professional' | 'funny' | 'poetic'
): Promise<string> => {
  try {
    const prompt = `Write a short, engaging social media bio (max 20 words) for a person named ${name} who works as ${workplace}. The tone should be ${tone}. Emoji usage is encouraged but keep it minimal.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Could not generate bio.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Creative enthusiast | Tech lover | Dreamer"; // Fallback
  }
};