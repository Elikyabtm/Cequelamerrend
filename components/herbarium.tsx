"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const plants = [
  {
    name: "Consoude",
    latin: "Symphytum officinale",
    use: "Cataplasme pour les os brisés et les plaies profondes. Elle accélère la cicatrisation des tissus.",
    moment:
      "Utilisée par Alma pour soigner le flanc d'Edrin après la cautérisation au fer rouge, permettant à sa chair de se refermer.",
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
    use: "Huile apaisante pour les brûlures et les douleurs musculaires. On l'appelle aussi \"l'herbe aux fées\" pour ses vertus contre la mélancolie.",
    moment:
      "Alma utilise cette huile pour masser les épaules d'Edrin, raidies par le labour, créant leurs premiers moments d'intimité silencieuse.",
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
    name: "Orge",
    latin: "Hordeum vulgare",
    use: "Base de l'alimentation (soupe, pain, galettes). Symbole de résilience, elle pousse là où rien d'autre ne survit.",
    moment:
      "Incarne le pacte entre Edrin et Brunehame. Elle est le lien physique qu'il garde dans sa bourse de lin et la vie qu'il sème avec sa main mutilée à la fin.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V6" />
        <path d="M12 8L16 6L20 8" />
        <path d="M11 11L16 9L21 11" />
        <path d="M10 14L16 12L22 14" />
        <path d="M11 17L16 15L21 17" />
        <path d="M12 20L16 18L20 20" />
      </svg>
    ),
  },
  {
    name: "Belladone",
    latin: "Atropa belladonna",
    use: "À faible dose, elle calme les spasmes. À forte dose, c'est un poison mortel qui provoque des hallucinations et l'arrêt du cœur.",
    moment:
      "Alma en jette dans le foyer pour créer des vapeurs toxiques lors de l'attaque de sa chaumière, transformant son sanctuaire en piège pour les mercenaires.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V14" />
        <circle cx="16" cy="10" r="5" />
        <circle cx="16" cy="10" r="2" fill="currentColor" />
        <path d="M12 20L16 18L20 20" />
        <path d="M10 24L16 22L22 24" />
      </svg>
    ),
  },
  {
    name: "Lavande",
    latin: "Lavandula angustifolia",
    use: "Antiseptique et apaisant. Utilisée pour purifier l'air et nettoyer les blessures légères.",
    moment:
      "Imprègne les mains d'Alma et les linges de la chaumière. C'est l'odeur qui agresse et apaise Edrin à la fois lorsqu'il se réveille de son naufrage.",
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
  {
    name: "Ciguë",
    latin: "Conium maculatum",
    use: "Un puissant paralysant. Utilisée par les anciennes pour endormir les membres avant une amputation.",
    moment:
      "Citée par Alma comme une menace envers les villageois qui voulaient brûler le champ : le savoir de la soigneuse peut devenir l'arme de la sorcière.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V4" />
        <path d="M16 8L10 6" />
        <path d="M16 8L22 6" />
        <path d="M16 14L8 11" />
        <path d="M16 14L24 11" />
        <path d="M16 20L10 17" />
        <path d="M16 20L22 17" />
        <circle cx="10" cy="6" r="1.5" />
        <circle cx="22" cy="6" r="1.5" />
        <circle cx="8" cy="11" r="1.5" />
        <circle cx="24" cy="11" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Bruyère",
    latin: "Calluna vulgaris",
    use: "Plante de la lande et du souvenir. Ses racines sont dures et tortueuses comme la roche de Brunehame.",
    moment:
      "Maëla est comparée à une racine de bruyère. Alma dépose un bouquet de ses fleurs séchées sur le corps de son mentor lors de ses funérailles au Promontoire des Adieux.",
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
    name: "Pavot Noir",
    latin: "Papaver somniferum",
    use: "Extraction de l'opium pour plonger les blessés dans un sommeil profond et oublier l'insupportable.",
    moment:
      "Préparé en urgence par Alma et Lys au chapitre 23, lorsque le ciel vire au cuivre, pour affronter l'horreur des chairs déchirées par l'Armada.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V16" />
        <circle cx="16" cy="10" r="6" />
        <circle cx="16" cy="10" r="3" />
        <path d="M16 4V7" />
        <path d="M10 10H13" />
        <path d="M19 10H22" />
      </svg>
    ),
  },
  {
    name: "Saule",
    latin: "Salix alba",
    use: "L'écorce et les feuilles infusées calment la fièvre et les maux de tête.",
    moment:
      "Alma en broie les feuilles au chapitre 23. C'est le remède de l'urgence, celui qui permet aux défenseurs de Brunehame de rester debout malgré la douleur.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M16 28V8" />
        <path d="M16 8C14 6 10 6 8 8" />
        <path d="M16 8C18 6 22 6 24 8" />
        <path d="M16 12C13 10 9 11 7 14" />
        <path d="M16 12C19 10 23 11 25 14" />
        <path d="M16 16C14 15 11 16 9 19" />
        <path d="M16 16C18 15 21 16 23 19" />
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
            {"L'Herbier de Maëla & Alma"}
          </span>
          <h2 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl">
            Les Plantes de Brunehame
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Chaque plante est liée à un moment clé de l'histoire
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />
        </div>

        {/* Plant selector - scrollable on mobile */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {plants.map((plant, i) => (
              <button
                key={plant.name}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-2 border px-4 py-3 transition-all duration-300 ${
                  activeIndex === i
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-border hover:bg-muted/50"
                }`}
                type="button"
              >
                <span className={activeIndex === i ? "text-primary" : "text-muted-foreground"}>
                  {plant.icon}
                </span>
                <span className="font-serif text-xs tracking-wider">
                  {plant.name}
                </span>
              </button>
            ))}
          </div>
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
                  Usage médicinal
                </p>
                <p className="leading-relaxed text-foreground/80">
                  {plants[activeIndex].use}
                </p>
              </div>

              <div className="h-px bg-border" />

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Dans le récit
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
