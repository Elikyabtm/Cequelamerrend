"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function ChapterPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="extrait" ref={ref} className="relative py-32 px-6">
      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            Chapitre 1
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl">
            Le Chant des Abimes
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />
        </div>

        {/* Chapter content */}
        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            {/* Image */}
            <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/images/brunehame-village.jpg"
                alt="Le village de Brunehame niché contre les falaises"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            {/* Text preview */}
            <div className="relative space-y-6 text-lg leading-relaxed text-foreground/80">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-primary">
                {
                  "Le vent sur Brunehame ne se contentait pas de souffler ; il hurlait comme une bete affamee, cherchant chaque interstice dans les murs de pierre seche et chaque faille dans les articulations des vieux. Ce matin-la, il avait l'odeur de la tempete de la veille : un parfum de varech arrache, de sable remue et de bois mort."
                }
              </p>
              <p>
                {
                  "Dans l'obscurite de la chaumiere, Alma ouvrit les yeux avant que la premiere lueur n'effleure l'horizon. Elle resta immobile sous sa couverture de laine rugueuse, ecoutant le souffle du monde."
                }
              </p>
              <p>
                {
                  "C'etait un silence particulier, celui qui suit les grands fracas de l'ocean, un silence lourd de tout ce que la mer avait englouti durant la nuit. Elle sentait le froid s'insinuer sous la porte, rampant sur le sol de terre battue comme une main invisible cherchant la chaleur du foyer."
                }
              </p>

              {/* Fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Read chapter button + all chapters button */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/chapitres/chapitre-1"
                className="border border-primary/40 bg-primary/10 px-8 py-3 font-serif text-sm uppercase tracking-[0.3em] text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/60"
              >
                Lire le chapitre 1
              </Link>
              <Link
                href="/chapitres"
                className="px-8 py-3 font-serif text-sm uppercase tracking-[0.3em] text-muted-foreground transition-all duration-300 hover:text-primary"
              >
                Tous les chapitres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
