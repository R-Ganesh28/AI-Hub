"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isImageDetailsPage = path.startsWith("/imageGen/image/");
  return (
    <main className={`scroll-wrapper ${isImageDetailsPage ? "" : "pt-16"}`}>
      {children}
    </main>
  );
}
