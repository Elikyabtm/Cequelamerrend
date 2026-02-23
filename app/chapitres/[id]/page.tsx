import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getChapters } from "@/lib/chapters";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getChapters().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const chapter = getChapter(id);
  if (!chapter) return { title: "Chapitre introuvable" };
  const label =
    chapter.number === 0
      ? "Preface"
      : chapter.number === 99
        ? "Epilogue"
        : `Chapitre ${chapter.number}`;
  return {
    title: `${label} : ${chapter.title} | Ce que la mer rend`,
    description: chapter.paragraphs[0]?.slice(0, 160),
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapter = getChapter(id);
  if (!chapter) notFound();

  const chapters = getChapters();
  const currentIndex = chapters.findIndex((c) => c.id === id);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const label =
    chapter.number === 0
      ? "Preface"
      : chapter.number === 99
        ? "Epilogue"
        : `Chapitre ${chapter.number}`;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/chapitres"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
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
            Chapitres
          </Link>
          <Link
            href="/"
            className="font-serif text-sm tracking-wider text-foreground transition-colors hover:text-primary"
          >
            Brunehame
          </Link>
        </div>
      </header>

      {/* Chapter content */}
      <article className="mx-auto max-w-3xl px-6 py-20">
        {/* Chapter heading */}
        <div className="mb-16 text-center">
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
            {label}
          </span>
          <h1 className="mt-4 font-serif text-3xl tracking-wide text-foreground md:text-4xl lg:text-5xl text-balance">
            {chapter.title}
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-primary/40" />
        </div>

        {/* Paragraphs */}
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          {chapter.paragraphs.map((p, i) => {
            const isDialogue = p.startsWith("\u2014") || p.startsWith("--") || p.startsWith("\u2013");

            if (i === 0) {
              return (
                <p
                  key={i}
                  className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-primary"
                >
                  {p}
                </p>
              );
            }

            if (isDialogue) {
              return (
                <p key={i} className="italic text-foreground/70 pl-4 border-l-2 border-primary/20">
                  {p}
                </p>
              );
            }

            return <p key={i}>{p}</p>;
          })}
        </div>

        {/* Ornamental ending */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-primary/30" />
          <div className="h-1.5 w-1.5 rotate-45 bg-primary/50" />
          <div className="h-px w-12 bg-primary/30" />
        </div>

        {/* Navigation */}
        <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
          {prev ? (
            <Link
              href={`/chapitres/${prev.id}`}
              className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
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
              <div className="text-left">
                <div className="text-xs uppercase tracking-[0.2em]">
                  {prev.number === 0
                    ? "Preface"
                    : prev.number === 99
                      ? "Epilogue"
                      : `Chapitre ${prev.number}`}
                </div>
                <div className="mt-1 font-serif text-sm tracking-wide text-foreground">
                  {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/chapitres"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
          >
            Sommaire
          </Link>

          {next ? (
            <Link
              href={`/chapitres/${next.id}`}
              className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.2em]">
                  {next.number === 0
                    ? "Preface"
                    : next.number === 99
                      ? "Epilogue"
                      : `Chapitre ${next.number}`}
                </div>
                <div className="mt-1 font-serif text-sm tracking-wide text-foreground">
                  {next.title}
                </div>
              </div>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
          ) : (
            <div />
          )}
        </nav>
      </article>
    </main>
  );
}
