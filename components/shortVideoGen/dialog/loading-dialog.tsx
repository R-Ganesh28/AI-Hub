"use client";

import React from "react";
import { useVideo } from "@/context/shortVideoGen/video";

export default function LoadingDialog() {
  const { loading, loadingMessage } = useVideo();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-[90%] sm:w-[400px] p-8 rounded-3xl shadow-2xl border dark:border-zinc-700 border-gray-200 bg-white dark:bg-zinc-900">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-cyan-500 animate-spin" />

          <h2 className="text-center text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-emerald-500 text-transparent bg-clip-text animate-pulse">
            {loadingMessage || "Generating your video..."}
          </h2>

          <p className="text-center text-sm text-gray-500 dark:text-zinc-400 max-w-xs">
            Please hold on while we bring your creation to life with advanced
            AI.
          </p>
        </div>
      </div>
    </div>
  );
}
