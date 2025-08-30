"use client";

import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { useImage } from "@/context/imageGen/image";

const models = [
  { id: "", name: "Select Model" },
  {
    id: "stabilityai/stable-diffusion-xl-base-1.0",
    name: "Stable Diffusion XL",
  },
  {
    id: "stabilityai/stable-diffusion-3.5-large",
    name: "Stable Diffusion 3.5",
  },
  { id: "black-forest-labs/FLUX.1-schnell", name: "FLUX.1 Schnell" },
  { id: "black-forest-labs/FLUX.1-dev", name: "FLUX.1 Dev" },
];

const aspectRatios = [
  { id: "", name: "Aspect Ratio" },
  { id: "1:1", name: "1:1" },
  { id: "4:3", name: "4:3" },
  { id: "16:9", name: "16:9" },
  { id: "9:16", name: "9:16" },
];

export default function ModelAspectDropdown() {
  const {
    selectedModel,
    setSelectedModel,
    selectedAspectRatio,
    setSelectedAspectRatio,
  } = useImage();

  const currentModel = models.find((m) => m.id === selectedModel) || models[0];
  const currentAspectRatio =
    aspectRatios.find((a) => a.id === selectedAspectRatio) || aspectRatios[0];

  return (
    <div className="flex justify-center space-x-4">
      <div className="w-1/3 relative">
        <Listbox value={selectedModel} onChange={setSelectedModel}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2 pl-4 pr-10 text-left text-gray-800 dark:text-gray-100 shadow-sm outline-none hover:border-blue-400 dark:hover:border-blue-400 transition">
              <span className="block truncate">{currentModel.name}</span>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
              />
            </ListboxButton>

            <ListboxOptions className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 text-sm shadow-xl ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md focus:outline-none transition-all">
              {models.map((model) => (
                <ListboxOption key={model.id} value={model.id} as={Fragment}>
                  {({ selected, focus }) => (
                    <li
                      className={`relative flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-md transition-colors ${
                        focus
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-100 dark:text-blue-900"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {selected && (
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-600 shrink-0" />
                      )}
                      <span
                        className={`truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {model.name}
                      </span>
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      <div className="w-1/3 relative">
        <Listbox value={selectedAspectRatio} onChange={setSelectedAspectRatio}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 py-2 pl-4 pr-10 text-left text-gray-800 dark:text-gray-100 shadow-sm outline-none hover:border-blue-400 dark:hover:border-blue-400 transition">
              <span className="block truncate">{currentAspectRatio.name}</span>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={18}
              />
            </ListboxButton>

            <ListboxOptions className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 text-sm shadow-xl ring-1 ring-black/10 dark:ring-white/10 backdrop-blur-md focus:outline-none transition-all">
              {aspectRatios.map((aspect) => (
                <ListboxOption key={aspect.id} value={aspect.id} as={Fragment}>
                  {({ selected, focus }) => (
                    <li
                      className={`relative flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-md transition-colors ${
                        focus
                          ? "bg-blue-100 text-blue-900 dark:bg-blue-100 dark:text-blue-900"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {selected && (
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-600 shrink-0" />
                      )}
                      <span
                        className={`truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {aspect.name}
                      </span>
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
