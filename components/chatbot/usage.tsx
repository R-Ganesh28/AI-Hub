"use client";

import React from "react";
import { useUsage } from "@/context/chatbot/usage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Usage() {
  const { count, subscribed, subscribedLoading } = useUsage();

  const credits = Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE);
  const percentage = subscribed ? 100 : Math.min((count / credits) * 100, 100);

  return (
    <div>
      <div className="rounded-lg shadow border p-2">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-gray-400 w-full rounded-full mt-3">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor:
                percentage < 25
                  ? "green"
                  : percentage < 50
                  ? "lightgreen"
                  : percentage < 75
                  ? "gold"
                  : percentage < 90
                  ? "orange"
                  : "red",
            }}
          ></div>
        </div>

        <div className="text-sm my-2">
          {subscribedLoading ? (
            <span className="typewriter block w-fit">
              Checking subscription
            </span>
          ) : subscribed ? (
            "Unlimited credits"
          ) : (
            <>
              {`${count > credits ? credits : count} / ${credits} credit used`}
              <p className="text-xs mt-2 text-gray-500">
                Resets on{" "}
                {new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  1
                ).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </>
          )}
        </div>
      </div>
      <Link href="/chatbot/membership/">
        <Button className="w-full my-3 border cursor-pointer transition-all duration-300">
          Upgrade
        </Button>
      </Link>
    </div>
  );
}
