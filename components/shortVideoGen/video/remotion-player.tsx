import React from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "@/components/shortVideoGen/video/remotion-video";
import { useVideo } from "@/context/shortVideoGen/video";

export default function RemotionPlayer() {
  const { images, audio, captions } = useVideo();

  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30
      : 1;

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl transition-all duration-300">
        <div className="aspect-[9/16] w-[360px] rounded-xl overflow-hidden shadow-md ring-1 ring-zinc-200 dark:ring-zinc-700">
          <Player
            component={RemotionVideo}
            durationInFrames={totalDuration}
            compositionWidth={360}
            compositionHeight={640}
            fps={30}
            inputProps={{ images, audio, captions }}
            controls
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "black",
            }}
          />
        </div>
      </div>
    </div>
  );
}
