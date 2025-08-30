"use server";

import { chatPrompt } from "../chatbot/Chatbot";

const defaultMessage =
  "Create a 30-second video script for a ADVENTURE STORY. Include exactly 3 scenes. For each scene, provide only two properties in the output JSON: - 'imagePrompt': a descriptive AI image prompt in ${selectedStyle} format - 'contentText': a narration or dialogue line WITHOUT any speaker labels, such as (Narrator) or similar. Only include the sentence itself.";

export async function createVideoScript(message: string = defaultMessage) {
  const response = await chatPrompt(message);
  const cleanedResponse = response.replace(/```json|\n```/g, "").trim();

  let jsonResponse;
  try {
    jsonResponse = JSON.parse(cleanedResponse);
    return { success: true, data: jsonResponse };
  } catch (error) {
    return { success: false, data: [] };
  }
}
