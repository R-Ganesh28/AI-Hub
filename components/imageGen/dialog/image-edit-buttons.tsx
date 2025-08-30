"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CloudDownload, SquareArrowOutUpRight, Image } from "lucide-react";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import Link from "next/link";

interface ImageType {
  image: {
    _id: string;
    url: string;
    prompt: string;
  };
}

export default function ImageEditButtons({ image }: ImageType) {
  const handleDownload = () => {
    saveAs(image.url, `${image.prompt || "download"}.jpg`);
  };

  const handleShare = async () => {
    const currentUrl = `${window.location.origin}/imageGen/image/${image._id}`;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL copied to clipboard. Share it!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex gap-4 justify-start">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2 px-5 py-3 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition cursor-pointer"
      >
        <CloudDownload className="w-5 h-5" />
        Download
      </Button>

      <Button
        onClick={handleShare}
        className="flex items-center gap-2 px-5 py-3 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition cursor-pointer"
      >
        <SquareArrowOutUpRight className="w-5 h-5" />
        Share
      </Button>

      <Link href={`/imageGen/image/${image._id}`}>
        <Button className="flex items-center gap-2 px-5 py-3 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer">
          <Image className="w-5 h-5" />
          View
        </Button>
      </Link>
    </div>
  );
}
