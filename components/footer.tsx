export function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p className="font-serif text-lg tracking-wider text-foreground">
              Brunehame
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Ce que la mer rend
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#preface"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              Preface
            </a>
            <a
              href="/chapitres"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              Chapitres
            </a>
            <a
              href="#personnages"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              Personnages
            </a>
            <a
              href="#herbier"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              Herbier
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            {"La maree ne rend jamais seulement du bois flotte. Elle rend des destins."}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {"Brunehame, l'ile oubliee des rois"}
          </p>
        </div>
      </div>
    </footer>
  );
}
