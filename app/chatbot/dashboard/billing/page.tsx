"use client";

import React, { useState } from "react";
import { createCustomerPortalSession } from "@/actions/chatbot/stripe";
import { Loader2Icon, MoveRight } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [billingLoading, setBillingLoading] = useState(false);

  const handleClick = async () => {
    setBillingLoading(true);
    try {
      const response = await createCustomerPortalSession();

      if (response.error) {
        toast.error(response.error);
      } else if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong.");
    } finally {
      setBillingLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <div className="p-10 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">Billing</h1>
        <p className="text-sm text-gray-500">Manage your subscription plan</p>
      </div>
      <div className="p-5 flex justify-center">
        <button
          className="cursor-pointer w-70 transition-all duration-300"
          onClick={handleClick}
          disabled={billingLoading}
        >
          {billingLoading ? (
            <div className="flex justify-center items-center">
              <Loader2Icon className="animate-spin mr-2" />
            </div>
          ) : (
            <div className="flex justify-center items-center hover:scale-90 transition-transform duration-300">
              <span>Manage Billing and Subscription</span>
              <MoveRight className="ml-1 w-4 h-4" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
