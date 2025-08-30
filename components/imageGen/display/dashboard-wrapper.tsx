"use client";

import { useState } from "react";
import { ImageType } from "@/utils/imageGen/image-type";
import ImageDialog from "@/components/imageGen/dialog/image-dialog";
import ImageCard from "@/components/imageGen/display/image-card";

interface DashboardWrapperProps {
  images: ImageType[];
}

export default function DashboardWrapper({ images }: DashboardWrapperProps) {
  const [selectedImage, setSelectedImage] = useState<{
    _id: string;
    url: string;
    prompt: string;
  } | null>(null);

  const handleSelectedImage = (_id: string) => {
    const image = images.find((img) => img._id === _id);
    if (image) {
      setSelectedImage({
        _id: image._id,
        url: image.url,
        prompt: image.prompt,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image: ImageType) => (
          <div
            onClick={() => handleSelectedImage(image._id)}
            key={image._id}
            className="cursor-pointer"
          >
            <ImageCard image={image} />
          </div>
        ))}
      </div>

      <ImageDialog
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
