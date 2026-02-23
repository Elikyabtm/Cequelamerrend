"use client";

import { useEffect, useRef, useState } from "react";

const quotes: Record<string, string[]> = {
  destruction: [
    "Le fer a une memoire. Il se souvient du feu de la forge.",
    "Ces gens-la ne viennent jamais seuls. S'il est ici, d'autres suivront.",
    "Le destin porte une epee, Alma !",
    "La peur est une herbe qui pousse vite sur un sol pauvre.",
  ],
  neutral: [
    "La maree ne rend jamais seulement du bois flotte. Elle rend des destins.",
    "Sur un radeau, on finit toujours par voir arriver ce qu'on n'a pas invite.",
    "Brunehame a besoin de savoir qu'il existe autre chose que le vent et le sel.",
    "Le silence qui s'installa n'etait plus celui de la mefiance.",
  ],
  repair: [
    "La peau finit toujours par gagner.",
    "On ne soigne pas une ame sous une armure.",
    "Je voulais voir si un Lion pouvait apprendre a aimer la terre.",
    "Ces mains n'ont jamais rien tenu de doux.",
  ],
};

export function BalanceSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(50);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const category = value < 33 ? "destruction" : value > 66 ? "repair" : "neutral";
  const quoteIndex = Math.floor(
    ((value < 33 ? value : value > 66 ? value - 67 : value - 33) / 33) *
      (quotes[category].length - 1)
  );
  const currentQuote = quotes[category][Math.min(quoteIndex, quotes[category].length - 1)];

  const leftColor =
    value < 50
      ? `hsl(25 85% ${50 + (50 - value)}%)`
      : "hsl(25 85% 50% / 0.3)";
  const rightColor =
    value > 50
      ? `hsl(140 30% ${30 + (value - 50) * 0.6}%)`
      : "hsl(140 30% 30% / 0.3)";

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            Le theme central
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl text-balance">
            {"L'Equilibre"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Deplacez le curseur entre Destruction et Reparation
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />
        </div>

        {/* Slider area */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Labels */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: leftColor }}
              >
                <path d="M12 2L15 8H9L12 2Z" />
                <path d="M7 10L17 10" />
                <path d="M9 14L15 14" />
                <path d="M11 18L13 18" />
                <path d="M12 18V22" />
              </svg>
              <span
                className="font-serif text-sm uppercase tracking-[0.2em]"
                style={{ color: leftColor }}
              >
                Destruction
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="font-serif text-sm uppercase tracking-[0.2em]"
                style={{ color: rightColor }}
              >
                Reparation
              </span>
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: rightColor }}
              >
                <path d="M12 22C12 22 4 16 4 10C4 6 7 2 12 2C17 2 20 6 20 10C20 16 12 22 12 22Z" />
                <path d="M12 6V14" />
                <path d="M9 9L12 6L15 9" />
              </svg>
            </div>
          </div>

          {/* Custom slider */}
          <div className="relative">
            <div className="h-1 w-full overflow-hidden bg-muted">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: `${value}%`,
                  background: `linear-gradient(to right, hsl(25 85% 50%), hsl(200 35% 22%))`,
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="absolute inset-0 w-full cursor-pointer opacity-0"
              aria-label="Equilibre entre destruction et reparation"
            />
            {/* Thumb indicator */}
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-5 w-5 border-2 border-primary bg-background transition-all duration-150"
              style={{ left: `calc(${value}% - 10px)` }}
            />
          </div>

          {/* Quote display */}
          <div className="mt-12 min-h-[100px] flex items-center justify-center">
            <blockquote className="border-l-2 border-primary/40 pl-6 transition-all duration-500">
              <p className="text-lg italic leading-relaxed text-foreground/70">
                {`"${currentQuote}"`}
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {category === "destruction"
                  ? "Le Fer"
                  : category === "repair"
                    ? "La Terre"
                    : "La Maree"}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
