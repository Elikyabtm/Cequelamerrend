"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const characters = [
  {
    name: "Edrin du Val Pourpre",
    title: "L'Echoue",
    image: "/images/edrin-armor.jpg",
    imageAlt: "Armure rouillée et épée brisée sur le sable",
    objects: ["Un espadon brise", "Une bourse de graines d'orge"],
    scars: "Des cicatrices que le sel commence a rouvrir",
    quote:
      "Je n'ai jamais ete un voleur. Pour l'instant, tu n'es qu'une ombre.",
    description:
      "Chevalier naufrage, rejete par la mer sur les cotes de Brunehame. Ses mains, faites pour broyer, vont devoir apprendre a semer. Le fer l'a tenu ensemble. Maintenant, c'est le fer qui va le tuer si on ne le libere pas.",
  },
  {
    name: "Alma",
    title: "La Soigneuse",
    image: "/images/alma-hands.jpg",
    imageAlt: "Mains broyant des herbes dans un mortier de pierre",
    objects: ["Une dague d'obsidienne", "Un mortier de pierre"],
    scars: "Celle qui appartient a tout le monde et a personne",
    quote:
      "Je voulais voir si un Lion pouvait apprendre a aimer la terre.",
    description:
      "Gardienne des remedes de Brunehame, trouvee elle aussi dans une nacelle de bois apres un naufrage. Elevee par Maela, elle porte le baton de soin. Ses mains connaissent la consoude, le millepertuis et les secrets de la vieille herboriste.",
  },
];

export function Characters() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="personnages" ref={ref} className="relative py-32 px-6">
      {/* Section header */}
      <div
        className={`mb-20 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
          La Forge des Destins
        </span>
        <h2 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl">
          Les Personnages
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Presentes par leurs objets et leurs cicatrices
        </p>
        <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />
      </div>

      {/* Characters grid */}
      <div className="mx-auto max-w-6xl space-y-24">
        {characters.map((char, i) => (
          <div
            key={char.name}
            className={`flex flex-col gap-8 md:gap-12 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } transition-all duration-1000 delay-${(i + 1) * 200} ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden md:w-1/2">
              <Image
                src={char.image || "/placeholder.svg"}
                alt={char.imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 p-8">
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-primary">
                  {char.title}
                </p>
                <h3 className="mt-2 font-serif text-3xl tracking-wide text-foreground">
                  {char.name}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div className="flex w-full flex-col justify-center md:w-1/2">
              {/* Objects */}
              <div className="mb-8">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Ses objets
                </p>
                <div className="flex flex-wrap gap-3">
                  {char.objects.map((obj) => (
                    <span
                      key={obj}
                      className="border border-border bg-muted/50 px-4 py-2 text-sm text-foreground/80"
                    >
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scars */}
              <div className="mb-8">
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Sa cicatrice
                </p>
                <p className="text-foreground/70 italic">{char.scars}</p>
              </div>

              {/* Description */}
              <p className="mb-8 leading-relaxed text-foreground/70">
                {char.description}
              </p>

              {/* Quote */}
              <blockquote className="border-l-2 border-primary/40 pl-6">
                <p className="italic text-foreground/60">
                  {`"${char.quote}"`}
                </p>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
