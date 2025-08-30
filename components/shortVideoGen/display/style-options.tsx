import React from "react";
import { styleOptions } from "@/utils/shortVideoGen/video-details";
import Image from "next/image";
import { useVideo } from "@/context/shortVideoGen/video";

export function StyleOptions() {
  const { selectedStyle, handleStyleSelect } = useVideo();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Pick a Visual Style</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {styleOptions.map((style) => (
          <div
            key={style.name}
            onClick={() => handleStyleSelect(style.name)}
            className={`relative rounded-xl overflow-hidden transition-all cursor-pointer shadow-md ${
              selectedStyle === style.name ? "ring-3 ring-blue-500" : ""
            } aspect-[5/5]`}
          >
            <Image
              src={style.image}
              alt={style.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {style.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
