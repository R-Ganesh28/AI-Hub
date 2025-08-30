import { useEffect, useState } from "react";

const taglines = [
  "Create cinematic shorts in seconds.",
  "Unleash your creativity with AI.",
  "From script to screen — instantly.",
  "Turn ideas into visual magic.",
];

export default function HeroSection({ onScroll }: { onScroll: () => void }) {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen mt-[-5px] flex flex-col items-center justify-center px-6 py-24 text-center bg-background text-foreground overflow-hidden isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-transparent to-emerald-950/10 dark:to-white/5" />
      <div className="absolute top-[-100px] left-[10%] w-96 h-96 bg-cyan-500/20 dark:bg-cyan-400/10 rounded-full blur-[120px] -z-20" />
      <div className="absolute bottom-[-120px] right-[10%] w-[480px] h-[480px] bg-emerald-500/20 dark:bg-emerald-600/10 rounded-full blur-[160px] -z-20" />

      <h1 className="text-[4rem] sm:text-[6rem] font-extrabold leading-tight tracking-tight max-w-5xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-500 drop-shadow-2xl">
          <span className="text-[5rem] sm:text-[7rem] font-extrabold">AI</span>
        </span>{" "}
        <span className="text-foreground">Video Generator</span>
      </h1>

      <p className="text-lg sm:text-2xl mt-6 text-muted-foreground font-medium tracking-wide transition-opacity duration-700 ease-in-out opacity-90">
        {taglines[taglineIndex]}
      </p>

      <button
        onClick={onScroll}
        className="mt-12 px-8 py-4 text-lg font-medium rounded-full border border-emerald-500 bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer"
      >
        Try it now — It’s free
      </button>
    </section>
  );
}
