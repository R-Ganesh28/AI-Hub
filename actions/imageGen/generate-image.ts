"use server";

import { v2 as cloudinary } from "cloudinary";
import { nanoid } from "nanoid";
import { currentUser } from "@clerk/nextjs/server";
import getImageModel from "@/models/imageGen/image";
import dbConnect from "@/utils/imageGen/db";
import mongoose from "mongoose";
import getCreditModel from "@/models/imageGen/credit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateAspectRatio = (aspectRatio: string) => {
  const [w, h] = aspectRatio.split(":").map(Number);

  if (!w || !h || h === 0) {
    throw new Error(
      "Invalid aspect ratio format. Use format like '16:9', '1:1', etc."
    );
  }

  const baseWidth = 1024;
  const ratio = h / w;
  const height = Math.round(baseWidth * ratio);

  return { width: baseWidth, height };
};

export async function generateImageByPrompt(
  prompt: string,
  model: string,
  aspectRatio: string
) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  const userName = user?.fullName;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 240000);

  const url = `https://api-inference.huggingface.co/models/${model}`;
  const { width, height } = generateAspectRatio(aspectRatio);

  try {
    dbConnect();
    const Credit = await getCreditModel();
    const userCredit = await Credit.findOne({ userEmail });

    if (
      !userCredit ||
      typeof userCredit.credits !== "number" ||
      userCredit.credits < 1
    ) {
      return { success: false, _id: null, credits: userCredit?.credits ?? 0 };
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      throw new Error("HUGGINGFACE_API_KEY is not defined");
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "x-use-cache": "false",
      },
      body: JSON.stringify({ inputs: prompt, parameters: { width, height } }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation failed:", errorText);
      throw new Error("Failed to generate image");
    }

    userCredit.credits -= 1;
    await userCredit.save();

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "AI Hub Generated Image",
          public_id: nanoid(),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const cloudinaryUrl = uploadResponse.secure_url;

    prompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);

    const Image = await getImageModel();
    const image = await new Image({
      userEmail,
      userName,
      prompt,
      url: cloudinaryUrl,
    }).save();

    return {
      success: true,
      _id: image._id.toString(),
      url: image.url,
      prompt: image.prompt,
      credits: userCredit.credits,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getUserImagesFromDb = async (page: number, limit: number) => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const Image = await getImageModel();

    const [images, totalCount] = await Promise.all([
      Image.find({ userEmail })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Image.countDocuments({ userEmail }),
    ]);

    return {
      images: JSON.parse(JSON.stringify(images)),
      totalCount,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch user images");
  }
};

export const getImageFromDb = async (_id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return null;
    }

    await dbConnect();
    const Image = await getImageModel();
    const image = await Image.findById(_id);

    if (!image) {
      return null;
    }

    return JSON.parse(JSON.stringify(image));
  } catch (error: any) {
    throw new Error(error.message || "Error fetching image");
  }
};
