import Link from "next/link";
import { getChapters } from "@/lib/chapters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapitres | Ce que la mer rend",
  description: "Tous les chapitres du roman Ce que la mer rend.",
};

export default function ChapitresPage() {
  const chapters = getChapters();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg tracking-wider text-foreground transition-colors hover:text-primary"
          >
            Brunehame
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Ce que la mer rend
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Title */}
        <div className="mb-20 text-center">
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            Table des matieres
          </span>
          <h1 className="mt-4 font-serif text-4xl tracking-wide text-foreground md:text-5xl text-balance">
            Les Chapitres
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground leading-relaxed">
            {
              "Trente chapitres et un epilogue pour raconter le destin d'Edrin et Alma, entre le fer des batailles et le sel de Brunehame."
            }
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-primary/40" />
        </div>

        {/* Chapters list */}
        <div className="space-y-1">
          {chapters.map((chapter, index) => {
            const label =
              chapter.number === 0
                ? "Preface"
                : chapter.number === 99
                  ? "Epilogue"
                  : `Chapitre ${chapter.number}`;

            return (
              <Link
                key={chapter.id}
                href={`/chapitres/${chapter.id}`}
                className="group flex items-baseline gap-4 border-b border-border/30 py-5 transition-all duration-300 hover:bg-card/50 hover:pl-4"
              >
                <span className="shrink-0 font-serif text-xs uppercase tracking-[0.2em] text-primary/70 transition-colors group-hover:text-primary">
                  {label}
                </span>
                <span className="hidden grow border-b border-dotted border-border/50 md:block" />
                <span className="font-serif text-lg tracking-wide text-foreground transition-colors group-hover:text-primary md:text-xl">
                  {chapter.title}
                </span>
                <svg
                  className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-20 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {"Retour a l'ile"}
          </Link>
        </div>
      </div>
    </main>
  );
}
