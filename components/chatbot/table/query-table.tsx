"use client";

import React from "react";
import { Copy } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Props } from "@/utils/chatbot/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const wordCount = (text: string) => text.split(" ").length;

const QueryTable: React.FC<Props> = ({ data }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  const handleClick = (prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  return (
    <div className="overflow-x-auto mx-20">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <table className="min-w-full bg-white dark:bg-gray-900 text-sm rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">TEMPLATE</th>
            <th className="py-2 px-4 border-b text-left">QUERY</th>
            <th className="py-2 px-4 border-b text-left">DATE</th>
            <th className="py-2 px-4 border-b text-left">WORDS</th>
            <th className="py-2 px-4 border-b text-left">COPY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <td className="py-2 px-4 border-b">
                <div className="flex">
                  <Image
                    src={item.template.icon}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <div className="ml-2">{item.template?.name}</div>
                </div>
              </td>
              <td
                onClick={() => handleClick(item.prompt)}
                className="py-2 px-4 border-b max-w-xs relative group cursor-pointer"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="truncate">{item.prompt}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to copy the prompt</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{wordCount(item.content)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleCopy(item.content)}
                  className="flex items-center pl-2 cursor-pointer"
                >
                  <Copy className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
