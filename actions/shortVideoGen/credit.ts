"use server";

import getCreditModel from "@/models/shortVideoGen/credit";
import dbConnect from "@/utils/chatbot/db";
import { currentUser } from "@clerk/nextjs/server";

export const saveCreditToDb = async (amount: number, credits: number) => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const Credit = await getCreditModel();
    const existingCredit = await Credit.findOne({ userEmail });

    if (existingCredit) {
      existingCredit.amount += amount;
      existingCredit.credits += credits;
      await existingCredit.save();

      return JSON.parse(JSON.stringify(existingCredit));
    } else {
      const Credit = await getCreditModel();
      const newCredit = new Credit({
        userEmail,
        amount,
        credits,
      });

      await newCredit.save();
      return JSON.parse(JSON.stringify(newCredit));
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getUserCreditsDb = async () => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const Credit = await getCreditModel();
    const credit = await Credit.find({ userEmail });

    return JSON.parse(JSON.stringify(credit[0]));
  } catch (err: any) {
    throw new Error(err);
  }
};

export const checkCreditRecordDb = async () => {
  try {
    await dbConnect();
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const Credit = await getCreditModel();
    const credit = await Credit.findOne({ userEmail });

    if (!credit) {
      const newCredit = new Credit({
        userEmail,
        amount: 0,
        credits: 3,
      });
      await newCredit.save();
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

export async function checkUserCredits() {
  const userCredit = await getUserCreditsDb();

  if (!userCredit || userCredit.credits < 1) {
    return { success: false };
  }
  return { success: true };
}
