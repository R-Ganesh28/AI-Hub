"use server";

import dbConnect from "@/utils/chatbot/db";
import Query from "@/models/chatbot/query";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

export async function chatPrompt(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const chatResponse = await chatSession.sendMessage(prompt);
  return chatResponse.response.text();
}

export async function saveQuery(
  template: object,
  email: string,
  prompt: string,
  content: string
) {
  try {
    await dbConnect();
    const newQuery = new Query({
      template,
      email,
      prompt,
      content,
    });
    await newQuery.save();
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await dbConnect();

    const skip = (page - 1) * pageSize;
    const totalQueries = await Query.countDocuments({ email });
    const rawQueries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    const queries = rawQueries.map((q: any) => ({
      ...q,
      _id: q._id.toString(),
      createdAt: q.createdAt?.toISOString?.() || null,
      updatedAt: q.updatedAt?.toISOString?.() || null,
    }));

    return {
      queries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export async function usageCount(email: string) {
  await dbConnect();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const result = await Query.aggregate([
    {
      $match: {
        email: email,
        $expr: {
          $and: [
            {
              $eq: [{ $year: "$createdAt" }, currentYear],
            },
            {
              $eq: [{ $month: "$createdAt" }, currentMonth],
            },
          ],
        },
      },
    },
    {
      $project: {
        wordCount: {
          $size: {
            $split: [{ $trim: { input: "$content" } }, " "],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalWords: { $sum: "$wordCount" },
      },
    },
  ]);

  return result.length > 0 ? result[0].totalWords : 0;
}
