"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, ImageIcon, VideoIcon } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const icons = [
  { Component: MessageCircle, color: "#3b82f6" },
  { Component: ImageIcon, color: "#10b981" },
  { Component: VideoIcon, color: "#a855f7" },
];

type FloatObj = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  iconIndex: number;
  zIndex: number;
};

export default function FloatingIconsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const floatObjects: FloatObj[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 24 + 16,
      iconIndex: Math.floor(Math.random() * icons.length),
      zIndex: Math.random() * 2 + 1,
    }));

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const iconCache = icons.map(({ Component, color }) => {
      const svgMarkup = renderToStaticMarkup(
        <Component color={color} stroke="none" fill={color} />
      );
      const encoded = `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
      const img = new Image();
      img.src = encoded;
      return img;
    });

    let lastTime = performance.now();
    const FRAME_INTERVAL = 1000 / 60;

    const draw = (now: number) => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      const delta = now - lastTime;
      if (delta >= FRAME_INTERVAL) {
        lastTime = now;
        ctx.clearRect(0, 0, width, height);

        floatObjects.forEach((obj) => {
          const icon = iconCache[obj.iconIndex];
          const scale = 1 / obj.zIndex;
          const opacity = 0.5 / obj.zIndex;

          ctx.save();
          ctx.globalAlpha = opacity;

          ctx.shadowBlur = 25;
          ctx.shadowColor = isDark
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(0, 0, 0, 0.15)";

          ctx.drawImage(icon, obj.x, obj.y, obj.size * scale, obj.size * scale);

          ctx.restore();

          obj.x += obj.vx;
          obj.y += obj.vy;

          if (obj.x < -50 || obj.x > width + 50) obj.vx *= -1;
          if (obj.y < -50 || obj.y > height + 50) obj.vy *= -1;

          obj.size = Math.max(16, obj.size + Math.random() * 0.3);
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ willChange: "transform, opacity" }}
    />
  );
}
