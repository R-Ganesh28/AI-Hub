"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { saveCreditToDb } from "@/actions/shortVideoGen/credit";
import { useVideo } from "@/context/shortVideoGen/video";
import { motion } from "framer-motion";

export default function CreditsPage() {
  const [selected, setSelected] = useState({ credits: 10, amount: 50.0 });
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const { theme } = useTheme();
  const { getUserCredits } = useVideo();

  const creditOptions = [
    { credits: 10, amount: 50.0 },
    { credits: 20, amount: 100.0 },
    { credits: 50, amount: 200.0 },
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

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          Upgrade Your Creativity
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-300">
          Buy credits to unlock powerful AI short video generations — with
          secure checkout.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-10 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/70 rounded-t-3xl">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
            Choose Your Plan
          </h2>
        </div>

        <div className="px-10 py-8 space-y-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {creditOptions.map((option) => {
              const isSelected = selected.credits === option.credits;
              const isRecommended = option.credits === 20;

              return (
                <motion.div
                  key={option.credits}
                  onClick={() => setSelected(option)}
                  className={`relative group p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isSelected
                      ? "bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-white dark:to-zinc-200 text-white dark:text-zinc-900 shadow-xl"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:shadow-lg"
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-4 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md uppercase">
                      Recommended
                    </div>
                  )}

                  <div className="text-xl font-semibold">
                    {option.credits} Credits
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{option.amount.toFixed(2)}
                  </div>
                  <div
                    className={`text-sm ${
                      isSelected
                        ? "text-white dark:text-zinc-900"
                        : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    ₹{(option.amount / option.credits).toFixed(2)} per credit
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="underline"
                      className="mt-3 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          <button
            disabled={loading}
            onClick={handlePayment}
            className="mt-6 w-full h-14 flex justify-center items-center rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 focus:ring-4 focus:ring-emerald-400 dark:focus:ring-emerald-500 transition-all duration-200 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white border-dotted rounded-full animate-spin" />
            ) : (
              "Buy Credits"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
