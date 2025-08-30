"use client";

import React from "react";
import { Player } from "@remotion/player";
import RemotionVideo from "@/components/shortVideoGen/video/remotion-video";

export default function DashboardVideoPlayer({ video }: { video: any }) {
  const { images, audioUrl, captions } = video;

  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / 30)) + 30
      : 1;

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#1a1a1a] transition-all duration-300 hover:scale-[1.02] w-[300px] h-[450px]">
      <Player
        component={RemotionVideo}
        durationInFrames={totalDuration}
        compositionWidth={300}
        compositionHeight={450}
        fps={30}
        inputProps={{ images, audio: audioUrl, captions }}
        controls
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
