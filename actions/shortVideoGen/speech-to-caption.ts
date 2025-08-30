"use server";

import { AssemblyAI } from "assemblyai";
const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY!,
});

export async function generateCaptions(audioFileUrl: string) {
  try {
    const data = {
      audio_url: audioFileUrl,
    };

    const transcript: any = await client.transcripts.transcribe(data);
    return transcript.words;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
