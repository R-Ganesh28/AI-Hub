"use server";

import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function generateImageForVideo(imagePrompt: string) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      throw new Error("HUGGINGFACE_API_KEY is not defined");
    }

    const url = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "x-use-cache": "false",
      },
      body: JSON.stringify({ inputs: imagePrompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation failed:", errorText);
      throw new Error("Failed to generate image");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "AI Hub Video Gen Images",
            public_id: nanoid(),
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const cloudinaryUrl = uploadResponse.secure_url;
    console.log("Cloudinary image => ", cloudinaryUrl);
    return cloudinaryUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}
