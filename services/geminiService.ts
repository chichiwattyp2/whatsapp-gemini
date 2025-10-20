import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chat: Chat | null = null;

const getChatSession = (): Chat => {
  if (chat) {
    return chat;
  }

  // Ensure the API key is available in the environment variables
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey });

  // Create a new chat session
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are a helpful and friendly assistant responding to a WhatsApp message. Keep your replies very concise, casual, and conversational, like a real person texting. Use emojis where appropriate. Do not use markdown formatting.",
      temperature: 0.8,
      topP: 0.95,
    },
  });

  return chat;
};

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const chatSession = getChatSession();
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    // Propagate the error to be handled by the UI component
    throw error;
  }
};

export const resetChat = () => {
    chat = null;
};