"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const plants = [
  {
    name: "Consoude",
    latin: "Symphytum officinale",
    use: "Cataplasme pour les os brises et les plaies profondes",
    moment:
      "Utilisee par Alma pour recoudre le flanc d'Edrin apres la cautérisation.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V8" />
        <path d="M16 8C16 8 12 4 8 6C4 8 6 14 10 14C14 14 16 10 16 8Z" />
        <path d="M16 12C16 12 20 8 24 10C28 12 26 18 22 18C18 18 16 14 16 12Z" />
        <path d="M16 18C16 18 13 15 10 17C7 19 9 23 12 23C15 23 16 20 16 18Z" />
      </svg>
    ),
  },
  {
    name: "Millepertuis",
    latin: "Hypericum perforatum",
    use: "Huile de massage pour les douleurs musculaires et les tensions",
    moment:
      "Utilise par Alma pour masser les epaules d'Edrin, un geste de soin qui devient un moment de rapprochement.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="10" r="4" />
        <path d="M16 14V28" />
        <path d="M12 18H20" />
        <circle cx="12" cy="10" r="1.5" />
        <circle cx="20" cy="10" r="1.5" />
        <circle cx="16" cy="6" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Racine de Bruyere",
    latin: "Calluna vulgaris",
    use: "Infusion contre les fievres et les infections du sang",
    moment:
      "Les mains de Maela, deformees par l'arthrose, ressemblent a des racines de bruyere torturees par le sel.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 4V28" />
        <path d="M16 28C12 28 8 24 8 20" />
        <path d="M16 28C20 28 24 24 24 20" />
        <path d="M16 20C14 20 10 18 10 14" />
        <path d="M16 20C18 20 22 18 22 14" />
        <path d="M16 12C15 12 12 10 12 8" />
        <path d="M16 12C17 12 20 10 20 8" />
      </svg>
    ),
  },
  {
    name: "Lavande",
    latin: "Lavandula angustifolia",
    use: "Eau de toilette et cataplasme apaisant, antiseptique naturel",
    moment:
      "Son parfum impregne les soins d'Alma, melange a la fumee de tourbe et au vinaigre de cidre.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V12" />
        <ellipse cx="16" cy="10" rx="2" ry="3" />
        <ellipse cx="13" cy="12" rx="2" ry="3" transform="rotate(-20 13 12)" />
        <ellipse cx="19" cy="12" rx="2" ry="3" transform="rotate(20 19 12)" />
        <ellipse cx="16" cy="7" rx="1.5" ry="2.5" />
        <path d="M12 22L16 18L20 22" />
      </svg>
    ),
  },
];

export function Herbarium() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section id="herbier" ref={ref} className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/herbarium-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-5"
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            {"L'Herbier de Maela & Alma"}
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl">
            Les Plantes de Brunehame
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Chaque plante est liee a un moment cle de l'histoire
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />
        </div>

        {/* Plant selector */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          {plants.map((plant, i) => (
            <button
              key={plant.name}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-3 border px-6 py-4 transition-all duration-300 ${
                activeIndex === i
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50"
              }`}
              type="button"
            >
              <span className={activeIndex === i ? "text-primary" : "text-muted-foreground"}>
                {plant.icon}
              </span>
              <span className="font-serif text-sm tracking-wider">
                {plant.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active plant detail */}
        <div
          className={`mx-auto max-w-2xl transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="border border-border bg-card/80 p-10 backdrop-blur-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-2xl tracking-wide text-foreground">
                  {plants[activeIndex].name}
                </h3>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  {plants[activeIndex].latin}
                </p>
              </div>
              <span className="text-primary/60">
                {plants[activeIndex].icon}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Usage medicinale
                </p>
                <p className="leading-relaxed text-foreground/80">
                  {plants[activeIndex].use}
                </p>
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Dans le recit
                </p>
                <p className="leading-relaxed italic text-foreground/70">
                  {plants[activeIndex].moment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
