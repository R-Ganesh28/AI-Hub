"use client";

import React from "react";
import Image from "next/image";
import imageData from "@/utils/imageGen/imageData";

export default function ImageMasonry() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
          Created with the AI Image Generator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Explore a curated gallery of AI-generated visuals, crafted from
          natural language prompts.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {imageData.map((image, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden break-inside-avoid rounded-2xl shadow-md group"
          >
            <Image
              src={image.src}
              alt={`AI Generated Art ${index + 1}`}
              width={600}
              height={800}
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-4 text-center">
              <p className="text-gray-300 text-sm font-semibold mb-2 uppercase tracking-wider">
                Prompt
              </p>
              <p className="text-white text-sm">{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
