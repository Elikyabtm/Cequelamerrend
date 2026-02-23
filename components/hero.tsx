"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <Image
          src="/images/hero-cliffs.jpg"
          alt="Les falaises de Brunehame sous un ciel cuivre"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Ornamental line */}
        <div
          className={`mb-8 flex items-center gap-4 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="h-px w-16 bg-primary/60" />
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            Un recit de Brunehame
          </span>
          <div className="h-px w-16 bg-primary/60" />
        </div>

        {/* Title */}
        <h1
          className={`font-serif text-5xl leading-tight tracking-wide md:text-7xl lg:text-8xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="block text-foreground">Ce que la</span>
          <span className="block text-primary">Mer</span>
          <span className="block text-secondary-foreground/70">rend</span>
        </h1>

        {/* Quote */}
        <blockquote
          className={`mt-10 max-w-xl text-lg italic leading-relaxed text-muted-foreground md:text-xl transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          {
            '"Le fer a une memoire. Il se souvient du feu de la forge, du choc des lames et de l\'odeur de la peur. Mais le fer ne connait rien de la patience."'
          }
        </blockquote>

        {/* CTA */}
        <a
          href="#preface"
          className={`mt-12 group flex items-center gap-3 border border-primary/40 bg-primary/10 px-8 py-4 font-serif text-sm uppercase tracking-[0.3em] text-primary transition-all duration-500 hover:bg-primary/20 hover:border-primary/60 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          Entrer dans la chaumiere
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-px animate-pulse bg-gradient-to-b from-transparent to-primary/60" />
        </div>
      </div>
    </section>
  );
}
