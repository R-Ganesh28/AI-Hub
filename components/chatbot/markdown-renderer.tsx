"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  useEffect(() => {
    const blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
      if (block.querySelector("button")) return;

      const button = document.createElement("button");
      button.innerText = "Copy";
      button.className =
        "copy-btn absolute z-auto top-2 right-2 px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 transition";

      button.onclick = () => {
        const code = block.querySelector("code")?.innerText || "";
        navigator.clipboard.writeText(code).then(() => {
          button.innerText = "Copied!";
          setTimeout(() => (button.innerHTML = "Copy"), 1500);
        });
      };

      block.style.position = "relative";
      block.appendChild(button);
    });
  }, [content]);

  return (
    <div className="markdown-body w-full max-w-3xl mx-auto px-4 py-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        .markdown-body {
          font-family: "Inter", sans-serif;
          color: inherit;
          font-size: 1rem;
          line-height: 1.85;
        }

        .markdown-body input[type="checkbox"] {
          margin-right: 0.6rem;
          transform: scale(1.2);
          accent-color: #2563eb;
        }

        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }

        .markdown-body th,
        .markdown-body td {
          border: 1px solid #ccc;
          padding: 0.6rem 1rem;
          text-align: left;
        }

        .markdown-body th {
          background-color: #f3f4f6;
          font-weight: 600;
        }

        .dark .markdown-body th {
          background-color: #374151;
        }

        .dark .markdown-body td {
          border-color: #4b5563;
        }

        .markdown-body img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .markdown-body hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }

        .dark .markdown-body hr {
          border-top-color: #4b5563;
        }

        .markdown-body p {
          margin-bottom: 1.4rem;
          word-break: break-word;
        }

        .markdown-body ul,
        .markdown-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }

        .markdown-body li {
          margin-bottom: 0.6rem;
        }

        .markdown-body strong {
          font-weight: 600;
        }

        .markdown-body em {
          font-style: italic;
        }

        .markdown-body blockquote {
          border-left: 4px solid #aaa;
          padding-left: 1rem;
          margin: 1.5rem 0;
          background-color: rgba(0, 0, 0, 0.03);
          border-radius: 6px;
          color: #444;
        }

        .markdown-body p code,
        .markdown-body li code,
        .markdown-body blockquote code {
          background: rgba(120, 120, 120, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          font-size: 0.95rem;
          white-space: break-spaces;
        }

        .markdown-body pre {
          background: #1e1e1e;
          color: #f8f8f2;
          border-radius: 12px;
          overflow: auto;
          max-height: 500px;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 2rem 0;
          position: relative;
          white-space: pre;
          scrollbar-width: thin;
          scrollbar-color: #6b7280 transparent;
        }

        .markdown-body pre::-webkit-scrollbar {
          height: 10px;
          width: 10px;
        }

        .markdown-body pre::-webkit-scrollbar-thumb:horizontal {
          background: linear-gradient(to right, #6b7280, #4b5563);
          border-radius: 8px;
          border: 2px solid #1e1e1e;
        }

        .markdown-body pre::-webkit-scrollbar-thumb:vertical {
          background: linear-gradient(to bottom, #6b7280, #4b5563);
          border-radius: 8px;
          border: 2px solid #1e1e1e;
        }

        .markdown-body pre::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #9ca3af, #6b7280);
        }

        .markdown-body pre::-webkit-scrollbar-track {
          background: transparent;
        }

        .markdown-body pre code {
          background: none;
          padding: 1em;
          border-radius: 0;
          display: block;
          white-space: pre;
        }

        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3 {
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .markdown-body h1 {
          font-size: 1.9rem;
        }

        .markdown-body h2 {
          font-size: 1.6rem;
        }

        .markdown-body h3 {
          font-size: 1.3rem;
        }

        .copy-btn {
          font-family: inherit;
          cursor: pointer;
          z-index: 10;
        }

        .dark .markdown-body blockquote {
          background-color: rgba(255, 255, 255, 0.05);
          border-left-color: #aaa;
          color: #ccc;
        }

        .dark .markdown-body p code,
        .dark .markdown-body li code,
        .dark .markdown-body blockquote code {
          background: rgba(255, 255, 255, 0.08);
        }

        .dark .markdown-body pre {
          background: #282c34;
        }

        .dark .copy-btn {
          background-color: #444;
          color: #fff;
        }

        .dark .copy-btn:hover {
          background-color: #666;
        }
      `}</style>
    </div>
  );
}
