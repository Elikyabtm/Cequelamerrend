"use client";

import { useEffect, useRef, useState } from "react";

export function Preface() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="preface"
      ref={ref}
      className="relative py-32 px-6"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMC41IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-3xl">
        {/* Section header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            Preface
          </span>
          <div className="mx-auto mt-4 h-px w-24 bg-primary/40" />
        </div>

        {/* Preface text */}
        <div
          className={`space-y-8 text-lg leading-relaxed text-foreground/80 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-primary">
            {
              "Le fer a une memoire. Il se souvient du feu de la forge, du choc des lames et de l'odeur de la peur. Mais le fer ne connait rien de la patience. Il ignore le temps qu'il faut a une graine pour percer la terre ou a une blessure pour devenir une cicatrice."
            }
          </p>
          <p>
            {
              "Ce recit est ne d'un contraste : celui d'un homme qui ne savait que detruire et d'une femme qui ne savait que recoudre. A Brunehame, l'ile oubliee des rois, la maree ne rapporte jamais par hasard. Elle ne se contente pas de rejeter des debris ; elle rend des destins brises pour voir si nous sommes capables de les reparer."
            }
          </p>
          <p>
            {
              "En tournant ces pages, vous sentirez le sel mordre vos levres et le vent hurler contre les falaises. Vous decouvrirez qu'entre le tumulte des guerres et le silence des sillons, il existe un espace fragile ou la redemption n'est pas un pardon accorde par les hommes, mais un pacte scelle avec la terre."
            }
          </p>
        </div>

        {/* Ornamental divider */}
        <div
          className={`mt-16 flex items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-px w-12 bg-border" />
          <svg
            className="h-4 w-4 text-primary/60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  );
}
