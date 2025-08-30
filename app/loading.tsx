import React from "react";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white/30 via-gray-100/20 to-white/30 dark:from-gray-900/40 dark:via-gray-800/30 dark:to-gray-900/40 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl shadow-2xl bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/20 animate-fade-in">
        <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin" />
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
          Loading something awesome...
        </p>
      </div>
    </div>
  );
}
