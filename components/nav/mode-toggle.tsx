"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={cn(
        "relative h-6 w-12 flex items-center rounded-full border border-border transition-colors duration-300",
        isDark ? "bg-gray-800" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "absolute h-5 w-5 rounded-full shadow-md flex items-center justify-center transition-all duration-300",
          isDark ? "translate-x-[24px] bg-white" : "translate-x-[2px] bg-white"
        )}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-gray-900" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500" />
        )}
      </span>
    </button>
  );
}
