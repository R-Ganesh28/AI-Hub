"use server";

import { currentUser } from "@clerk/nextjs/server";
import Transaction from "@/models/chatbot/transaction";
import dbConnect from "@/utils/chatbot/db";
import stripe from "@/utils/chatbot/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  if (!customerEmail) {
    return { error: "No email found for the user" };
  }

  try {
    await dbConnect();

    const existingTransaction = await Transaction.findOne({ customerEmail });

    if (existingTransaction) {
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId,
        status: "all",
        limit: 1,
      });

      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === "active"
      );

      if (currentSubscription) {
        return { error: "Active subscription exists" };
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/chatbot/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/chatbot/`,
    });

    return { url: session.url ?? undefined };
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return { error: "Error creating Stripe Checkout session" };
  }
}

export async function checkUserSubscription() {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;

  try {
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });

    if (transaction && transaction.subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );
      if (subscription.status === "active") {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return {
      message: "Error checking subscription status. Please try again later.",
    };
  }
}

export async function createCustomerPortalSession(): Promise<{
  url?: string;
  error?: string;
}> {
  try {
    const user = await currentUser();
    const customerEmail = user?.emailAddresses[0]?.emailAddress;

    if (!customerEmail) {
      return { error: "User not authenticated." };
    }

    const transaction = await Transaction.findOne({ customerEmail });

    if (!transaction?.customerId) {
      return { error: "No subscription found." };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: transaction.customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/chatbot/dashboard`,
    });

    return {
      url:
        portalSession?.url ||
        `${process.env.NEXT_PUBLIC_URL}/chatbot/dashboard`,
    };
  } catch (error) {
    console.error("Error creating Stripe Customer Portal session:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
