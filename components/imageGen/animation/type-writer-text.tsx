"use client";

import { useState, useEffect } from "react";

const phrases = ["Image Generator", "AI Art Maker", "Prompt to Picture"];

export default function TypewriterText() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let typingDelay = isDeleting ? 80 : 150;
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 700);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentPhrase.slice(0, text.length - 1)
          : currentPhrase.slice(0, text.length + 1);
        setText(nextText);
      }, typingDelay);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <span className="text-5xl lg:text-7xl text-gray-900 dark:text-white font-bold whitespace-pre">
      {text}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
}
