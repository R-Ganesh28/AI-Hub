"use client";

import { useImage } from "@/context/imageGen/image";
import { Loader2Icon, TriangleAlert, ZapIcon } from "lucide-react";
import ModelAspectDropdown from "./model-aspect-dropdrown";

export default function ImageGenerateInput() {
  const { generateImage, setImagePrompt, loading } = useImage();

  return (
    <form onSubmit={generateImage}>
      <div className="mt-6 flex flex-col items-center space-y-6">
        <div className="w-full max-w-xl space-y-4">
          <input
            type="text"
            placeholder="Enter your image description..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            onChange={(event) => setImagePrompt(event.target.value)}
          />

          <ModelAspectDropdown />
        </div>

        <button
          disabled={loading}
          className="w-full max-w-xs flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-medium text-white dark:text-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2Icon className="animate-spin mr-2 h-5 w-5" />
              <span>Generating Image...</span>
            </div>
          ) : (
            <>
              <ZapIcon className="h-5 w-5 mr-2" />
              <span>Generate Image</span>
            </>
          )}
        </button>

        <div className="flex items-start gap-2 text-sm text-yellow-600 dark:text-yellow-400">
          <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            Image generation might take longer depending on the selected model.
          </span>
        </div>
      </div>
    </form>
  );
}
