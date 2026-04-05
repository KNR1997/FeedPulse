import { GoogleGenAI } from "@google/genai";
import Feedback from "../models/Feedback.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeFeedbackWithGemini = async (
  feedbackId,
  title,
  description,
) => {
  try {
    const prompt = `
      Analyse this product feedback.

      Return ONLY valid JSON in this format:
      {
        "category": "",
        "sentiment": "",
        "priority_score": 1-10,
        "summary": "",
        "tags": []
      }

      Feedback Title: ${title}
      Feedback Description: ${description}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text = response.text;

    // Convert AI response to JSON
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const aiData = JSON.parse(cleanedText);

    const sentimentMap = {
      positive: "Positive",
      neutral: "Neutral",
      negative: "Negative",
    };

    // Update MongoDB
    await Feedback.findByIdAndUpdate(feedbackId, {
      ai_category: aiData.category,
      ai_sentiment: sentimentMap[aiData.sentiment?.toLowerCase()],
      ai_priority: aiData.priority_score,
      ai_summary: aiData.summary,
      ai_tags: aiData.tags,
      ai_processed: true,
    });

    console.log("Gemini analysis saved for:", feedbackId);
  } catch (error) {
    console.error("Gemini error:", error.message);
    throw new Error("Gemini analysis failed: " + error.message);
  }
};
