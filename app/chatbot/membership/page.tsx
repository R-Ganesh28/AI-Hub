import React from "react";
import PlanCard from "@/components/chatbot/plan/plan-card";

export default async function Membership() {
  return (
    <div className="py-12 px-4 flex flex-col items-center bg-background text-foreground">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Upgrade Your Plan
        </h1>
        <p className="mt-2 text-muted-foreground text-md">
          Choose the plan that fits your needs and unlock advanced AI tools
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <PlanCard name="Free" />
        <PlanCard name="Monthly" />
      </div>
    </div>
  );
}
