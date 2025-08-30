"use client";

import { useVideo } from "@/context/shortVideoGen/video";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Img,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

export default function RemotionVideo({
  images = [],
  audio = "",
  captions = [],
}: any) {
  const {
    images: videoImages,
    audio: videoAudio,
    captions: videoCaptions,
  } = useVideo();

  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getCurrentCaptions = () => {
    const currentTime = (frame / fps) * 1000;
    const currentCaption = captions.find(
      (caption: any) =>
        currentTime >= caption.start && currentTime <= caption.end
    );
    return currentCaption ? (currentCaption as any).text : "";
  };

  const totalDuration =
    captions.length > 0
      ? Math.ceil((captions[captions.length - 1] as any).end / (1000 / fps))
      : 1;

  const calculateOpacity = (
    index: number,
    frame: number,
    startFrame: number,
    endFrame: number
  ): number => {
    if (startFrame >= endFrame) {
      console.warn("Invalid frame range:", { startFrame, endFrame });
      return 1;
    }
    const inputRange = [startFrame, startFrame + 50, endFrame - 50, endFrame];
    const uniqueInputRange = Array.from(new Set(inputRange)).sort(
      (a, b) => a - b
    );
    return index === 0 ? 1 : interpolate(frame, uniqueInputRange, [0, 1, 1, 0]);
  };

  const calculateScale = (
    frame: number,
    startFrame: number,
    totalDuration: number
  ): number => {
    return interpolate(
      frame,
      [startFrame, startFrame + totalDuration],
      [1, 1.5],
      {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }
    );
  };

  return (
    <AbsoluteFill>
      {images.map((image: any, index: any) => {
        const startFrame = (index * totalDuration) / images.length;
        const endFrame = startFrame + totalDuration;
        const opacity = calculateOpacity(index, frame, startFrame, endFrame);
        const scale = calculateScale(frame, startFrame, totalDuration);

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={totalDuration}
          >
            <Img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                margin: "auto",
                opacity,
                transform: `scale(${scale})`,
                transition: "all 0.5s ease-in-out",
              }}
            />
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                pointerEvents: "none",
              }}
            >
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  textAlign: "center",
                  lineHeight: 1.3,
                  fontFamily: "'Inter', sans-serif",
                  textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                }}
              >
                {getCurrentCaptions()}
              </h2>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audio}></Audio>
    </AbsoluteFill>
  );
}
