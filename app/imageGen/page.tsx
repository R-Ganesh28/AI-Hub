"use client";

import TypewriterText from "@/components/imageGen/animation/type-writer-text";
import ImageMasonry from "@/components/imageGen/display/image-masonry";
import ImageGenerateInput from "@/components/imageGen/forms/image-generate-input";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useImage } from "@/context/imageGen/image";
import ImageDialog from "@/components/imageGen/dialog/image-dialog";

export default function Page() {
  const { generatedImage, setGeneratedImage } = useImage();

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />

      <div className="grid max-w-5xl w-full gap-12">
        <div className="text-center my-16">
          <div className="text-7xl lg:text-9xl font-bold mb-2">
            <span
              className="text-9xl bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse"
              style={{
                backgroundSize: "400% 400%",
                animation: "gradientAnimation 5s ease infinite",
              }}
            >
              AI
            </span>
          </div>

          <div>
            <TypewriterText />
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
            Generate stunning images with the power of AI. Just type your
            prompt, and our engine will visualize your imagination in seconds.
          </p>

          <ImageGenerateInput />
        </div>

        <ImageMasonry />
      </div>
      <ImageDialog
        image={generatedImage}
        onClose={() => setGeneratedImage(null)}
      />
    </div>
  );
}
