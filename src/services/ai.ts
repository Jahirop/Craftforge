import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const getAI = () => {
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will not work.");
  }
  return new GoogleGenAI({ apiKey });
};

export async function generateImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size,
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

export async function* streamChat(message: string, history: { role: string; parts: { text: string }[] }[] = []) {
  const ai = getAI();
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are the AI assistant for Craftforge Studio, a premium digital agency. You are professional, creative, and helpful. You know about UI/UX, full-stack development, and AI visuals.",
    },
    history: history,
  });

  const result = await chat.sendMessageStream({ message });
  for await (const chunk of result) {
    yield (chunk as GenerateContentResponse).text || "";
  }
}
