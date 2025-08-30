"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageIcon, MessageCircle, VideoIcon, FileUser } from "lucide-react";
import FloatingIconsCanvas from "@/components/homepage/animations/floating-icons-canvas";
import { ToolCard } from "@/components/homepage/components/tool-card";
import { FAQAccordion } from "@/components/homepage/components/faq-accordion";
import { FadeInSection } from "@/components/homepage/animations/fade-in-section";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden z-10">
        <FloatingIconsCanvas />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center text-white px-6 md:px-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-black dark:text-white leading-tight tracking-tight"
          >
            One AI Hub. Infinite Possibilities.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-2xl max-w-2xl mt-6 text-gray-700 dark:text-gray-300"
          >
            Unlock Limitless Possibilities with Smart AI Tools — Create,
            Collaborate, and Innovate at Scale.
          </motion.p>
        </motion.div>
      </section>

      <FadeInSection>
        <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-12">
          <h2 className="text-4xl font-bold tracking-tight">
            Explore AI Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <ToolCard
              icon={<MessageCircle className="w-8 h-8 text-blue-500" />}
              title="AI Chatbot"
              description="Experience human-like conversations with instant responses tailored to your queries."
              href="/chatbot"
            />
            <ToolCard
              icon={<ImageIcon className="w-8 h-8 text-green-500" />}
              title="Image Generation"
              description="Transform your ideas into visuals using our powerful AI image model."
              href="/imageGen"
            />
            <ToolCard
              icon={<VideoIcon className="w-8 h-8 text-purple-500" />}
              title="Video Generation"
              description="Create scroll-stopping videos from plain text in seconds."
              href="/shortVideoGen"
            />
            <ToolCard
              icon={<FileUser className="w-8 h-8 text-yellow-500" />}
              title="AI Storytelling"
              description="Unleash your creativity and craft compelling stories effortlessly."
              href="#"
              comingSoon={true}
            />
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-sm uppercase font-semibold text-green-500 tracking-widest">
              Image Generator
            </h3>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              Create Stunning Images from Text
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Transform your ideas into high-quality visuals with our advanced
              AI-powered image generation tool. Whether you're a designer,
              marketer, or just feeling creative — simply input a description
              and watch as your vision turns into reality.
            </p>
            <div>
              <a
                href="/imageGen"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Generate Your Image
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-[1px] rounded-xl">
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              <Image
                src="/homepage/image.jpg"
                alt="AI-generated high quality image"
                className="w-full rounded-t-xl object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 p-4 border-t border-gray-200 dark:border-gray-700">
                <strong>Prompt:</strong> “A serene Japanese zen garden during
                cherry blossom season, with gentle falling petals and a small
                wooden bridge, photorealistic”
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-[1px] rounded-xl w-full max-w-[360px] mx-auto md:mx-0">
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden aspect-[9/16]">
              <Image
                src="/homepage/video.png"
                alt="AI-generated short video preview"
                className="w-full h-full object-cover"
                loading="lazy"
                width={360}
                height={640}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm uppercase font-semibold text-green-500 tracking-widest">
              Video Generator
            </h3>
            <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              Turn Ideas into Scroll-Stopping Videos
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Easily generate short-form, social-ready videos using just text.
              Perfect for Reels, and Shorts — our AI blends images, voiceovers,
              and captions to bring your message to life in seconds.
            </p>
            <div>
              <a
                href="/shortVideoGen"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Create Your Video
              </a>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-left">
            <FAQAccordion
              question="Is there a free version?"
              answer="Yes! You can access our basic AI tools completely free."
            />
            <FAQAccordion
              question="Can I upgrade later?"
              answer="Absolutely. Upgrade anytime with one click."
            />
            <FAQAccordion
              question="How do credits work?"
              answer="Credits are used to access premium features such as higher usage limits, faster processing speeds, and priority support. You can purchase additional credits at any time through your account dashboard, and your credits will be automatically applied to the tools you use."
            />
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <footer className="mt-5 pt-8 pb-3 px-6 bg-gray-50 dark:bg-gray-900 text-center text-black dark:text-white border-t">
          <div className="max-w-6xl mx-auto space-y-12 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-extrabold bg-clip-text mb-4 transition-all duration-300 ease-in-out">
                Stay in the Loop
              </h2>
              <p className="text-md max-w-3xl font-light mb-6 text-gray-700 dark:text-gray-200">
                Get exclusive product updates, new AI tool releases, and expert
                tips — all tailored for you. No spam, just the good stuff.
              </p>

              <div className="flex flex-col items-center sm:flex-row justify-center gap-6 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-2 rounded-md border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-all duration-300 ease-in-out w-full sm:w-auto"
                />
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-pink-600 text-white transition-all duration-300 ease-in-out rounded-md py-4 px-8 mt-4 sm:mt-0 cursor-pointer"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="mt-12 text-sm font-sans text-gray-500 dark:text-gray-400">
              <p>&copy; 2025 AI Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </FadeInSection>
    </main>
  );
}
