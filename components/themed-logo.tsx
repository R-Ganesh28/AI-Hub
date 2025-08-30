"use client";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ThemedLogo() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  let logoSrc = "/logo/logo.png";
  let logoLink = "/";

  if (pathname.startsWith("/chatbot")) {
    logoSrc =
      resolvedTheme === "dark"
        ? "/logo/chatbot_dark.png"
        : "/logo/chatbot_light.png";
    logoLink = "/chatbot";
  } else if (pathname.startsWith("/imageGen")) {
    logoSrc =
      resolvedTheme === "dark"
        ? "/logo/image_dark.png"
        : "/logo/image_light.png";
    logoLink = "/imageGen";
  } else if (pathname.startsWith("/shortVideoGen")) {
    logoSrc =
      resolvedTheme === "dark"
        ? "/logo/video_dark.png"
        : "/logo/video_light.png";
    logoLink = "/shortVideoGen";
  } else if (pathname === "/") {
    logoSrc =
      resolvedTheme === "dark" ? "/logo/dark_logo.png" : "/logo/logo.png";
    logoLink = "/";
  } else {
    return null;
  }

  return (
    <Link href={logoLink}>
      <Image src={logoSrc} alt="Logo" width={100} height={100} />
    </Link>
  );
}
