"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ChangeEvent,
  useEffect,
} from "react";
import { createVideoScript } from "@/actions/shortVideoGen/gemini-script";
import { generateImageForVideo } from "@/actions/shortVideoGen/gen-image-for-video";
import { generateAudio } from "@/actions/shortVideoGen/text-to-speech";
import { generateCaptions } from "@/actions/shortVideoGen/speech-to-caption";
import { saveVideoToDatabase } from "@/actions/shortVideoGen/save-video";
import {
  checkCreditRecordDb,
  checkUserCredits,
  getUserCreditsDb,
} from "@/actions/shortVideoGen/credit";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";

const initialState = {
  script: "script....",
  images: [] as string[],
  audio: "",
  captions: [] as object[],
  loading: false,
  selectedStory: "Adventure Story",
  selectedStyle: "Fantasy",
};

interface VideoContextType {
  script: string;
  images: string[];
  audio: string;
  captions: object[];
  loading: boolean;
  setScript: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<string[]>>;
  setAudio: Dispatch<SetStateAction<string>>;
  setCaptions: Dispatch<SetStateAction<object[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedStory: string;
  selectedStyle: string;
  customPrompt: string;
  handleStorySelect: (story: string) => void;
  handleStyleSelect: (style: string) => void;
  handleCustomPromptChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loadingMessage: string;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
  getUserCredits: () => void;
}

interface VideoScriptItem {
  imagePrompt: string;
  textContent?: string;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [script, setScript] = useState(initialState.script);
  const [images, setImages] = useState(initialState.images);
  const [audio, setAudio] = useState(initialState.audio);
  const [captions, setCaptions] = useState(initialState.captions);
  const [loading, setLoading] = useState(initialState.loading);
  const [selectedStory, setSelectedStory] = useState(
    initialState.selectedStory
  );
  const [selectedStyle, setSelectedStyle] = useState(
    initialState.selectedStyle
  );
  const [customPrompt, setCustomPrompt] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
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

  const handleStorySelect = (story: string) => {
    setSelectedStory(story);
    if (story !== "Custom Prompt") {
      setCustomPrompt("");
    }
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleCustomPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedStory("Custom Prompt");
  };

  const generateVideoScript = async () => {
    try {
      setLoadingMessage("Generating video script");
      const videoScript = await createVideoScript(
        `Create a 30-second video script for a ${
          customPrompt || selectedStory
        }. Include exactly 3 scenes. For each scene, provide only two properties in the output JSON:
        - "imagePrompt": a descriptive AI image prompt in ${selectedStyle} format
        - "contentText": a narration or dialogue line WITHOUT any speaker labels, such as (Narrator) or similar. Only include the sentence itself.`
      );

      if (!videoScript.success) {
        setLoadingMessage("Failed to generate video script");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }

      return videoScript.data;
    } catch (error: any) {
      throw new Error("Error during the video script generation: ", error);
    }
  };

  const generateImages = async (videoScript: any) => {
    try {
      if (videoScript.length >= 1) {
        setLoadingMessage("Generating images");
        const imageGenerationPromises: Promise<string | null>[] =
          videoScript.map(
            async (item: VideoScriptItem): Promise<string | null> => {
              try {
                const imageUrl: string = await generateImageForVideo(
                  item.imagePrompt
                );
                return imageUrl;
              } catch (err) {
                console.error(err);
                return null;
              }
            }
          );

        const images: (string | null)[] = await Promise.all(
          imageGenerationPromises
        );

        const validImages: string[] = images.filter(
          (image): image is string => image !== null
        );

        if (validImages.length === 0) {
          setLoadingMessage("Failed to generate images.");
          setLoading(false);
          return;
        }

        setImages(validImages);
        return validImages;
      }
    } catch (error: any) {
      throw new Error("Error during the image generation: ", error);
    }
  };

  const generateAudioFile = async (videoScript: any) => {
    setLoadingMessage("Generating audio");
    try {
      const script = videoScript
        .map((item: { contentText: string }) => item.contentText)
        .join(" ");

      if (!script || script.trim().length === 0) {
        console.warn("Empty script passed to audio generation.");
        return null;
      }

      const result: any = await generateAudio(script);

      if (!result || !result.url) {
        console.warn("Audio generation failed or returned invalid result.");
        return null;
      }

      setAudio(result.url);
      return result.url;
    } catch (error: any) {
      console.error("Error during the audio generation:", error);
      return null;
    }
  };

  const generateCaptionsArray = async (audioUrl: string) => {
    setLoadingMessage("Generating captions");
    try {
      const captionsArray = await generateCaptions(audioUrl);
      setCaptions(captionsArray);
      return captionsArray;
    } catch (error: any) {
      throw new Error("Error during the caption generation: ", error);
    }
  };

  async function saveVideoToDB(data: any) {
    try {
      setLoadingMessage("Saving video");
      const { success, credits }: any = await saveVideoToDatabase({
        data,
      });
      setLoadingMessage("Video creation successful!");

      if (success) {
        setCredits(credits);
        toast.success("Video generated.");
      }
      setLoadingMessage("Your video is ready for preview");
    } catch (error: any) {
      throw new Error("Error saving video to database:", error);
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Checking the credits");
      const { success }: any = await checkUserCredits();
      if (!success) {
        toast.error(
          "Insufficient credits. Please buy more credits to generate videos"
        );
        return;
      }

      const videoScript = await generateVideoScript();

      if (videoScript) {
        const images = await generateImages(videoScript);
        const audioUrl = await generateAudioFile(videoScript);

        if (!audioUrl) {
          setLoadingMessage("Audio generation failed. Please try again.");
          setLoading(false);
          return;
        }

        const captions = await generateCaptionsArray(audioUrl);

        console.log("Video script => ", videoScript);
        console.log("Images url => ", images);
        console.log("Audio url => ", audioUrl);
        console.log("Caption array => ", captions);

        if (images && captions) {
          await saveVideoToDB({ videoScript, images, audioUrl, captions });
        }
      }
    } catch (error) {
      setLoadingMessage("An error occurred during video creation.");
      console.error("Error during video creation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        script,
        images,
        audio,
        captions,
        loading,
        setScript,
        setImages,
        setAudio,
        setCaptions,
        setLoading,
        selectedStory,
        selectedStyle,
        customPrompt,
        handleStorySelect,
        handleStyleSelect,
        handleCustomPromptChange,
        handleSubmit,
        loadingMessage,
        setLoadingMessage,
        credits,
        setCredits,
        getUserCredits,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
