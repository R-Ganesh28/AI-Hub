"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageEditButtons from "./image-edit-buttons";

export default function CustomImageDialog({
  image,
  onClose,
}: {
  image: { _id: string; url: string; prompt: string } | null;
  onClose: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!image) setImageLoaded(false);
  }, [image]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-white/30 via-gray-100/20 to-white/30 dark:from-gray-900/40 dark:via-gray-800/30 dark:to-gray-900/40 backdrop-blur-sm z-50"
      onClick={() => onClose()}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <div
        className="w-[90%] md:w-[70%] max-w-7xl bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-300 dark:border-zinc-700 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Explore Your Generated Image
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            View, download, or share your AI-generated image along with its
            prompt details.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[60%] w-full flex justify-center items-center">
            {!imageLoaded && (
              <div className="h-[400px] flex items-center justify-center w-full bg-gray-100 dark:bg-zinc-800 rounded-xl">
                <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin" />
              </div>
            )}
            <img
              src={image.url}
              alt={image.prompt}
              onLoad={() => setImageLoaded(true)}
              className={`rounded-xl max-h-[500px] object-contain w-fit transition-opacity duration-300 shadow-2xl ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <div className="md:w-[40%] w-full flex flex-col justify-center items-center">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Prompt
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-4">
                {image.prompt}
              </p>
            </div>

            <div className="mt-6">
              <ImageEditButtons image={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
