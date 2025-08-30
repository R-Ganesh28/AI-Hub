"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { createCheckoutSession } from "@/actions/chatbot/stripe";
import { useRouter } from "next/navigation";
import { Loader2Icon, Check } from "lucide-react";
import { useUsage } from "@/context/chatbot/usage";

import clsx from "clsx";

export default function ProductCard({ name }: { name: string }) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const { subscribed, subscribedLoading } = useUsage();

  const handleCheckout = async () => {
    setLoading(true);
    if (name === "Free") {
      router.push("/chatbot/dashboard");
      return;
    }

    try {
      const response = await createCheckoutSession();
      const { url } = response;

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const memberFeatures = {
    free: {
      title: "Free",
      price: "0",
      desc: "Explore how AI can help you with everyday tasks",
      items: [
        "Limited word generation",
        "Advanced AI features",
        "Faster processing times",
        "Customer support",
      ],
    },
    plus: {
      title: "Plus",
      price: "599",
      desc: "Level up productivity and creativity with expanded access",
      items: [
        "Unlimited word generation",
        "Advanced AI features",
        "Faster processing times",
        "Priority customer support",
      ],
    },
  };

  const currentPlan =
    name === "Free" ? memberFeatures.free : memberFeatures.plus;

  const isCurrentPlan =
    (name === "Free" && !subscribed) || (name === "Monthly" && subscribed);

  const buttonText = isCurrentPlan
    ? "Your current plan"
    : name === "Monthly"
    ? "Get Plus"
    : "Get Started";

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <div
        className={`max-w-sm px-6 py-6 rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-gray-700/50 m-4 border bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 ${
          name == "Monthly" && "border-green-700"
        }`}
      >
        <div className="font-bold text-3xl mb-3">{currentPlan.title}</div>

        <div className="flex items-baseline mb-3">
          <div className="flex items-end space-x-1">
            <span className="text-lg">₹</span>
            <span className="text-5xl font-bold">{currentPlan.price}</span>
            <span className="text-xs text-muted-foreground">
              INR /<br /> monthly
            </span>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-300 mb-6 text-base">
          {currentPlan.desc}
        </div>

        {isLoaded && (
          <div className="mb-6">
            <button
              disabled={loading || isCurrentPlan || subscribedLoading}
              onClick={handleCheckout}
              className={clsx(
                "border border-input hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer",
                "w-full rounded-3xl py-3 text-lg font-medium transition-all duration-300",
                name === "Monthly" &&
                  "bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-800 text-white hover:text-white",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {loading || subscribedLoading ? (
                <Loader2Icon className="animate-spin mr-2 inline-block" />
              ) : (
                buttonText
              )}
            </button>
          </div>
        )}

        <div className="space-y-2">
          {currentPlan.items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
