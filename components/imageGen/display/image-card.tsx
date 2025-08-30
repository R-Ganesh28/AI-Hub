import Image from "next/image";
import { useState } from "react";
import { ImageType } from "@/utils/imageGen/image-type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ImageCard = ({ image }: { image: ImageType }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden rounded-2xl shadow-lg group bg-white dark:bg-zinc-900">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500 dark:bg-zinc-800 animate-pulse z-10">
            <div className="w-8 h-8 border-4 border-white border-dotted rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={image.url}
          alt={image.prompt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-cover rounded-2xl transition-transform duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          } group-hover:scale-105 group-hover:brightness-75`}
          onLoad={() => setLoading(false)}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-4 text-center">
          <p className="text-gray-300 text-xs font-semibold mb-1 uppercase tracking-wider">
            Prompt
          </p>
          <p className="text-white text-sm line-clamp-3">{image.prompt}</p>
          <p className="text-gray-400 text-xs mt-2">
            {dayjs(image.createdAt).fromNow()} •{" "}
            {image?.userName || "Anonymous"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
