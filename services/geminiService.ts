import { GoogleGenAI } from "@google/genai";
import { Case } from "../types";

// In a real app, this key would come from process.env.API_KEY
// For this demo, we assume the environment is set up or the user has one.
// The System Instructions mention process.env.API_KEY is available.

const API_KEY = process.env.API_KEY || ''; 

export const analyzeInfringement = async (caseItem: Case): Promise<string> => {
  if (!API_KEY) {
    return "AI Analysis unavailable: Missing API Key.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const prompt = `
      You are a copyright infringement analyst assistant. 
      Review the following claim details:
      
      Original Content: ${caseItem.originalContentUrl}
      Suspected Infringement: ${caseItem.infringingUrl}
      Platform: ${caseItem.platform}
      Description: ${caseItem.description}

      Please provide a brief assessment (max 100 words) on the likelihood of copyright infringement based on standard digital content laws (DMCA). 
      Suggest the next best legal step (e.g., File DMCA, Contact Owner, Ignore).
      Disclaimer: You are not a lawyer.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate analysis.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI analysis service.";
  }
};