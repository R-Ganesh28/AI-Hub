"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import template from "@/utils/chatbot/template";
import { ArrowLeft, Loader2Icon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatPrompt, saveQuery } from "@/actions/chatbot/Chatbot";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Template } from "@/utils/chatbot/types";
import { useUsage } from "@/context/chatbot/usage";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const params = useParams();

  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const foundPage = template.find(
    (item) => item.slug === params.slug
  ) as Template;

  if (!foundPage) {
    router.push("/chatbot/dashboard");
    return null;
  }

  const editorRef: any = useRef<any>(null);
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    if (content && editorInstance) {
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const { fetchUsage, subscribed, subscribedLoading, count } = useUsage();

  const isUsageExceeded =
    !subscribed &&
    !subscribedLoading &&
    count >= Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await chatPrompt(foundPage.aiPrompt + prompt);
      setContent(result);
      await saveQuery(foundPage, email, prompt, result);
      fetchUsage();
    } catch (error) {
      setContent(
        "An error occurred while generating the content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current.getInstance();
    const copied = editorInstance.getMarkdown();
    try {
      await navigator.clipboard.writeText(copied);
      toast.success("Content copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="mt-2">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName="!whitespace-normal !break-words !text-sm !max-w-[90vw] md:!max-w-md"
      />
      <div className="flex justify-between mx-5 mb-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/chatbot/dashboard/">
                <Button className="cursor-pointer">
                  <ArrowLeft />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleCopy} className="cursor-pointer">
                <Copy />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-white-100 dark:bg-slate-900 rounded-md border p-5 h-fit">
          <div className="flex flex-col gap-3 w-auto">
            <Image
              src={foundPage.icon}
              alt={foundPage.name}
              width={50}
              height={50}
            />
            <h2 className="font-medium text-lg">{foundPage.name}</h2>
            <p className="text-gray-500">{foundPage.desc}</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {foundPage?.form.map((item) => (
              <div className="my-2 flex flex-col gap-2 mb-7" key={item.name}>
                <label className="font-bold pb-5">{item.label}</label>
                {item.field === "input" ? (
                  <Input
                    name={item.name}
                    onChange={(event) => setPrompt(event.target.value)}
                    required={item.required}
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    onChange={(event) => setPrompt(event.target.value)}
                    required={item.required}
                    className="resize-none max-h-[200px]"
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              className="w-full py-6 cursor-pointer"
              disabled={loading || isUsageExceeded || subscribedLoading}
            >
              {loading && <Loader2Icon className="animate-spin mr-2" />}
              {subscribedLoading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : subscribed ||
                count < Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE) ? (
                "Generate Content"
              ) : (
                "Subscribe to generate content"
              )}
            </Button>
          </form>
        </div>

        <div className="col-span-2 bg-white rounded-lg">
          <Editor
            ref={editorRef}
            initialValue="Your generated content will be displayed here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
          />{" "}
        </div>
      </div>
    </div>
  );
}
