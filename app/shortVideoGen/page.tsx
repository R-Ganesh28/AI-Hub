"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVideo } from "@/context/shortVideoGen/video";
import { storyOptions } from "@/utils/shortVideoGen/video-details";
import { StyleOptions } from "@/components/shortVideoGen/display/style-options";
import { ToastContainer } from "react-toastify";
import LoadingDialog from "@/components/shortVideoGen/dialog/loading-dialog";
import RemotionPlayer from "@/components/shortVideoGen/video/remotion-player";
import HeroSection from "@/components/shortVideoGen/hero/hero-section";
import { TriangleAlert, ZapIcon } from "lucide-react";

export default function Page() {
  const {
    selectedStory,
    selectedStyle,
    customPrompt,
    handleStorySelect,
    handleCustomPromptChange,
    handleSubmit,
    loading,
    images,
    audio,
    captions,
  } = useVideo();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans text-foreground">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />

      <HeroSection onScroll={handleScroll} />

      <div
        ref={scrollRef}
        className="min-h-screen px-4 sm:px-8 lg:px-12 py-24 bg-gradient-to-b from-background via-background/80 to-background/40 backdrop-blur-3xl"
      >
        <div className="max-w-[1440px] mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="w-full rounded-3xl border border-emerald-500/40 dark:border-emerald-400/20 bg-white/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-10 sm:p-12 space-y-10 transition-all">
              <section>
                <h3 className="text-xl font-semibold mb-4">
                  Choose a Story Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {storyOptions.map((story) => (
                    <div key={story.label}>
                      {story.type === "custom" ? (
                        <Input
                          type="text"
                          value={customPrompt}
                          onChange={handleCustomPromptChange}
                          placeholder="Enter your own prompt"
                          className={`h-12 w-full rounded-xl px-4 border-2 bg-background/50 backdrop-blur-xl text-foreground placeholder:text-muted-foreground transition-all duration-300 ${
                            selectedStory === "Custom Prompt"
                              ? "border-emerald-500 ring-2 ring-emerald-400/50"
                              : "border-border"
                          }`}
                        />
                      ) : (
                        <Button
                          onClick={() => handleStorySelect(story.label)}
                          variant="outline"
                          className={`h-12 w-full text-sm font-medium transition-all rounded-xl cursor-pointer ${
                            selectedStory === story.label
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:text-white border-none shadow-lg hover:brightness-110"
                              : "border-border bg-muted hover:bg-muted/70 text-muted-foreground"
                          }`}
                        >
                          {story.label}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <StyleOptions />

              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={(!selectedStory && !customPrompt) || !selectedStyle}
                  className="w-full h-14 text-lg dark:text-white font-semibold bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl shadow-xl transition-all cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-4 border-white border-dotted rounded-full animate-spin" />
                      <span>Generating Video...</span>
                    </div>
                  ) : (
                    <>
                      <ZapIcon className="h-5 w-5 mr-2" />
                      <span>Generate Video</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 flex items-start gap-2 bg-yellow-100/20 dark:bg-yellow-300/10 border border-yellow-500/30 dark:border-yellow-400/30 text-yellow-800 dark:text-yellow-300 text-sm rounded-xl px-4 py-3">
                <TriangleAlert className="w-5 h-5 self-center shrink-0" />
                <span>
                  Please note: Generating your video might take a few minutes
                  depending on the story length and selected style.
                </span>
              </div>
            </div>

            <div className="w-full h-max-[70vh] rounded-3xl border border-cyan-500/30 dark:border-cyan-400/20 bg-white/10 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl min-h-[600px] p-8 transition-all">
              {images && audio && captions ? (
                <div className="flex justify-center w-full h-full rounded-2xl overflow-hidden">
                  <RemotionPlayer />
                </div>
              ) : (
                <div className="text-muted-foreground text-xl font-medium text-center">
                  Your video preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoadingDialog />
    </div>
  );
}
