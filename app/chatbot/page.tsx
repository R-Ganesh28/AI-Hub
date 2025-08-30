"use client";

import { chatPrompt } from "@/actions/chatbot/Chatbot";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Loader2Icon } from "lucide-react";
import MarkdownRenderer from "@/components/chatbot/markdown-renderer";
import { motion, AnimatePresence } from "framer-motion";
import LimitReachedDialog from "@/components/chatbot/modal/limit-reached-dialog";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<
    { prompt: string; response: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (submitted && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    if (!submitted) {
      setSubmitted(true);
    }

    const totalResponseLength = history
      .map((item) => item.response)
      .join("\n\n").length;

    if (
      totalResponseLength > Number(process.env.NEXT_PUBLIC_MAIN_FREE_TIER_USAGE)
    ) {
      setShowLimitDialog(true);
      return;
    }

    const currentInput = prompt;
    setPrompt("");
    setLoading(true);

    try {
      const previousText = history
        .map((item) => `Prompt:\n${item.prompt}\n\nResponse:\n${item.response}`)
        .join("\n\n");

      const updatedPrompt = `${previousText}\n\nPrompt:\n${currentInput}`;
      const result = await chatPrompt(updatedPrompt);

      setHistory((prev) => [
        ...prev,
        { prompt: currentInput, response: result },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderedHistory = useMemo(
    () => (
      <AnimatePresence>
        {history.map(({ prompt, response }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 18,
              mass: 0.6,
              delay: 0.1,
            }}
            className="px-4 py-2 max-w-3xl w-full mx-auto mb-0"
          >
            {index !== 0 && (
              <hr className="mb-8 border-gray-300 dark:border-gray-700" />
            )}

            <div className="flex justify-end w-full">
              <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-4xl px-4 py-3 max-w-[70%]">
                <div>{prompt}</div>
              </div>
            </div>

            <div>
              <MarkdownRenderer content={response} />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    ),
    [history]
  );

  return (
    <div className="m-5">
      <LimitReachedDialog
        open={showLimitDialog}
        onCancel={() => setShowLimitDialog(false)}
        onConfirm={() => {
          setHistory([]);
          setPrompt("");
          setSubmitted(false);
          setShowLimitDialog(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <form
        onSubmit={handleSubmit}
        className={`${
          submitted
            ? "fixed bottom-4 left-1/2 transform -translate-x-1/2"
            : "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        } w-[50%] z-50 transition-all duration-300`}
      >
        <div className="relative w-full">
          {!submitted && (
            <div className="text-center mb-4 text-3xl font-medium text-black dark:text-white">
              What can I help with?
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            placeholder="Ask anything..."
            className="custom-scrollbar w-full max-h-40 p-4 pr-12 rounded-4xl bg-white dark:bg-gray-900 border dark:border-gray-700 resize-none outline-hidden shadow-lg dark:shadow-gray-900"
            rows={3}
          />

          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer absolute flex items-center bottom-4 right-3 bg-black dark:bg-white rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-300"
          >
            {loading ? (
              <Loader2Icon className="w-5 h-5 text-white dark:text-black animate-spin" />
            ) : (
              <ArrowUp className="w-5 h-5 text-white dark:text-black" />
            )}
          </button>
        </div>
      </form>

      <div className="mt-5 mb-32 space-y-6">
        {renderedHistory}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
