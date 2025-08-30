"use server";

import { ElevenLabsClient } from "elevenlabs";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY!,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function generateAudio(text: string) {
  try {
    const audioStream = await client.textToSpeech.convertAsStream(
      "JBFqnCBsd6RMkjVDRZzb",
      {
        text,
        model_id: "eleven_multilingual_v2",
      }
    );

    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const fileName = nanoid(6);

    const audioUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "AI Hub Video Gen Audio",
          public_id: fileName,
          format: "mp3",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url!);
        }
      );

      Readable.from(audioBuffer).pipe(uploadStream);
    });

    return { url: audioUrl };
  } catch (error: any) {
    throw new Error(error);
  }
}
