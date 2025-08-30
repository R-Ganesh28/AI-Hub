"use server";

import getCreditModel from "@/models/shortVideoGen/credit";
import getVideoModel from "@/models/shortVideoGen/video";
import dbConnect from "@/utils/chatbot/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveVideoToDatabase = async ({ data }: any) => {
  try {
    await dbConnect();

    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const userName = user?.fullName;

    const Credit = await getCreditModel();
    const userCredit = await Credit.findOne({ userEmail });
    userCredit.credits -= 1;
    await userCredit.save();

    const { videoScript, images, audioUrl, captions } = data;
    console.log({ videoScript, images, audioUrl, captions });

    const Video = await getVideoModel();
    await new Video({
      ...data,
      userEmail,
      userName,
    }).save();

    return {
      success: true,
      credits: userCredit.credits,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserVideosFromDatabase = async () => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const Video = await getVideoModel();
    const videos = await Video.find({ userEmail }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(videos));
  } catch (error: any) {
    console.log("Error occurred while fetching videos : ", error);
  }
};
