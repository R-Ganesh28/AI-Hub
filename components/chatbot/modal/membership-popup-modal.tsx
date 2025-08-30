"use client";

import React from "react";
import { useUsage } from "@/context/chatbot/usage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function MembershipPopupModal() {
  const { openModal, setOpenModal } = useUsage();

  const features = [
    "Unlimited word generation",
    "Advanced AI capabilities",
    "Faster processing speed",
    "Priority customer support",
  ];

  return (
    <Dialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <DialogContent className="max-w-md rounded-2xl border bg-white dark:bg-gray-900 shadow-xl text-gray-800 dark:text-gray-100 px-8 py-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Upgrade Your Plan
          </DialogTitle>
        </DialogHeader>

        <div className="mt-1 space-y-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
            You've reached the free plan limit. Unlock full access to our
            advanced AI features and generate content without restrictions.
          </p>

          <div className="border rounded-lg px-4 py-4 bg-gray-50 dark:bg-gray-800 space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/chatbot/membership">
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white py-5 text-base font-medium rounded-xl transition-colors duration-300 cursor-pointer">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
