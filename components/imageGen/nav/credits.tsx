"use client";

import React from "react";
import { useImage } from "@/context/imageGen/image";
import { Coins } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Credits() {
  const { credits } = useImage();

  if (typeof credits !== "number") return null;

  const displayCredits = credits > 99 ? "99+" : credits.toString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/imageGen/buy-credits"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium 
                 bg-zinc-200/50 dark:bg-zinc-700/50 text-zinc-800 dark:text-zinc-100 
                 border border-zinc-300 dark:border-zinc-600 shadow-sm backdrop-blur-md"
          >
            <Coins className="w-4 h-4 text-green-800 dark:text-green-400" />
            <span>{displayCredits} Credits</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your available credits</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
