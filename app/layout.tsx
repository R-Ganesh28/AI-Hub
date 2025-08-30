import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { UsageProvider } from "@/context/chatbot/usage";
import { Providers } from "@/components/providers";
import { ImageProvider } from "@/context/imageGen/image";
import MainWrapper from "@/components/main-wrapper";
import { VideoProvider } from "@/context/shortVideoGen/video";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Hub",
  description: " Unlock Limitless Possibilities with Smart AI Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <UsageProvider>
              <ImageProvider>
                <VideoProvider>
                  <header>
                    <TopNav />
                  </header>
                  <MainWrapper>{children}</MainWrapper>
                </VideoProvider>
              </ImageProvider>
            </UsageProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
