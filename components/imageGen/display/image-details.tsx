"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { OctagonAlert } from "lucide-react";
import Link from "next/link";

interface ImageType {
  url: string;
  prompt: string;
  createdAt: string;
  userName?: string;
}

export default function ImageDetails({ image }: { image: ImageType }) {
  if (!image) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <OctagonAlert className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-500 mt-1">
          We couldn't load the requested image. Please check the link or try
          again later.
        </p>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-5"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex justify-center mb-6 text-sm text-gray-500 dark:text-gray-400">
        <span>
          This image was generated on the{" "}
          <Link
            href="/imageGen"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            AI Hub – Image Generation
          </Link>{" "}
          page.
        </span>
      </div>

      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-auto rounded-2xl shadow-lg"
      />
      <div className="mt-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
          Prompt
        </p>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
          {image.prompt}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {dayjs(image.createdAt).fromNow()} • {image?.userName || "Anonymous"}
        </p>
      </div>
    </div>
  );
}
