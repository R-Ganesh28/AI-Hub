"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { saveCreditToDb } from "@/actions/imageGen/credit";
import { useImage } from "@/context/imageGen/image";

export default function CreditsPage() {
  const [selected, setSelected] = useState({ credits: 10, amount: 5.0 });
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { theme } = useTheme();
  const { getUserCredits } = useImage();

  const creditOptions = [
    { credits: 10, amount: 5.0 },
    { credits: 20, amount: 10.0 },
    { credits: 50, amount: 20.0 },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSuccess = async () => {
    try {
      await saveCreditToDb(selected.amount, selected.credits);
      getUserCredits();
      toast.success(`Successfully purchased ${selected.credits} Credits.`);
    } catch (error) {
      toast.error(
        "An error occurred while processing your credits. Please try again or contact support."
      );
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selected.amount }),
      });

      const data = await res.json();
      if (!data.order) return toast.error("Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: data.order.amount,
        currency: "INR",
        name: "Buy Credits",
        description: `${selected.credits} credits`,
        order_id: data.order.id,
        handler: () => {
          handleSuccess();
        },
        prefill: { email: user?.emailAddresses[0]?.emailAddress },
        theme: { color: "#6366f1" },
        display: {
          widget: {
            main: {
              isDarkMode: theme === "dark",
            },
          },
        },
      };

      // @ts-ignore
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          Upgrade Your Creativity
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Buy credits to unlock more image generations. Simple, fast, and secure
          checkout.
        </p>
      </div>

      <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900">
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Choose Your Plan
          </h2>
        </div>

        <div className="px-8 py-6 space-y-5">
          <div className="grid gap-4">
            {creditOptions.map((option) => (
              <button
                key={option.credits}
                onClick={() => setSelected(option)}
                className={`w-full h-12 flex items-center justify-between px-5 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                selected.credits === option.credits
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-white dark:to-gray-200 dark:text-gray-900 border-transparent shadow-md"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
              >
                <span>{option.credits} Credits</span>
                <span className="text-sm font-semibold">
                  ₹{option.amount.toFixed(2)}
                </span>
              </button>
            ))}
          </div>

          <button
            disabled={loading}
            onClick={handlePayment}
            className="w-full h-12 flex justify-center items-center rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-500 transition duration-200 ease-in-out shadow-lg cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-dotted rounded-full animate-spin" />
            ) : (
              <span>Buy Credits</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
