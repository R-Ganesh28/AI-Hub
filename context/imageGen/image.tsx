"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { generateImageByPrompt } from "@/actions/imageGen/generate-image";
import { toast } from "react-toastify";
import {
  getUserCreditsDb,
  checkCreditRecordDb,
} from "@/actions/imageGen/credit";
import { useUser } from "@clerk/nextjs";

interface GeneratedImageData {
  _id: string;
  url: string;
  prompt: string;
}

interface ImageContextType {
  imagePrompt: string;
  setImagePrompt: (query: string) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  generateImage: (event: React.FormEvent) => Promise<void>;
  generatedImage: GeneratedImageData | null;
  setGeneratedImage: Dispatch<SetStateAction<GeneratedImageData | null>>;
  selectedModel: string;
  setSelectedModel: Dispatch<SetStateAction<string>>;
  selectedAspectRatio: string;
  setSelectedAspectRatio: Dispatch<SetStateAction<string>>;
  credits: number;
  setCredits: React.Dispatch<SetStateAction<number>>;
  getUserCredits: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] =
    useState<GeneratedImageData | null>(null);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("");
  const [credits, setCredits] = useState(0);

  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      checkCreditRecordDb();
      getUserCredits();
    }
  }, [isLoaded, user]);

  const getUserCredits = () => {
    getUserCreditsDb().then((credit) => {
      setCredits(credit.credits);
    });
  };

  const generateImage = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!imagePrompt.trim()) {
      toast.error("Enter a valid prompt.");
      return;
    }

    if (!selectedModel) {
      toast.error("Please select a model before generating the image.");
      return;
    }

    if (!selectedAspectRatio) {
      toast.error("Please select an aspect ratio before generating the image.");
      return;
    }

    setLoading(true);

    try {
      const image = await generateImageByPrompt(
        imagePrompt,
        selectedModel,
        selectedAspectRatio
      );

      if (image?.success === false) {
        setCredits(image?.credits ?? credits);
        toast.error(
          "Insufficient credits. Please buy more credits to generate images."
        );
        return;
      }

      if (!image?._id || !image?.url || !image?.prompt) {
        toast.error(
          "Image generation failed. Please try using a different model."
        );
        return;
      }

      setCredits(image.credits);
      setGeneratedImage({
        _id: image._id,
        url: image.url,
        prompt: image.prompt,
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        imagePrompt,
        setImagePrompt,
        loading,
        setLoading,
        generateImage,
        generatedImage,
        setGeneratedImage,
        selectedModel,
        setSelectedModel,
        selectedAspectRatio,
        setSelectedAspectRatio,
        credits,
        setCredits,
        getUserCredits,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
