"use client";

import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import ThemedLogo from "../themed-logo";
import { useClerk } from "@clerk/nextjs";
import ImageCredits from "../imageGen/nav/credits";
import VideoCredits from "../shortVideoGen/nav/credits";
import Dropdown from "./dropdown";

export default function TopNav() {
  const { openSignIn, openSignUp } = useClerk();
  const path = usePathname();

  const showImageCredit = path.startsWith("/imageGen");
  const showVideoCredit = path.startsWith("/shortVideoGen");

  const showDropdown =
    path.startsWith("/chatbot") ||
    path.startsWith("/imageGen") ||
    path.startsWith("/shortVideoGen");

  const isImageDetailsPage = path.startsWith("/imageGen/image/");
  if (isImageDetailsPage) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-20 flex justify-between items-center px-6 h-16 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
      <div className="w-[20%] flex-shrink-0">
        <ThemedLogo />
      </div>

      <div className="flex justify-end items-center gap-4 mr-[17px]">
        {showImageCredit && <ImageCredits />}
        {showVideoCredit && <VideoCredits />}
        {showDropdown && <Dropdown />}

        <SignedOut>
          <button
            onClick={() => openSignIn()}
            className="px-4 py-2 rounded-lg hover:bg-white/80 dark:hover:bg-zinc-800/60 transition-all duration-200 cursor-pointer"
          >
            Sign in
          </button>
          <button
            onClick={() => openSignUp()}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:brightness-110 transition-all duration-200 shadow-md cursor-pointer"
          >
            Get Started
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <ModeToggle />
      </div>
    </nav>
  );
}
