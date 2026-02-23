"use client";

import React from "react"

import { useEffect, useRef, useState } from "react";

export function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div
        className={`relative mx-auto max-w-xl text-center transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-primary">
          Les nouvelles du large
        </span>
        <h2 className="mt-4 font-serif text-3xl tracking-wide text-foreground md:text-4xl text-balance">
          Recevez des extraits comme des lettres retrouvees
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {
            "Des fragments du recit de Brunehame, livres par la maree, directement dans votre boite aux lettres."
          }
        </p>
        <div className="mx-auto mt-6 h-px w-24 bg-primary/40" />

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-12">
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.nom@exemple.fr"
                required
                className="flex-1 border border-border bg-muted/30 px-6 py-4 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="border border-primary/40 bg-primary/10 px-8 py-4 font-serif text-sm uppercase tracking-[0.3em] text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/60"
              >
                S'abonner
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-12 border border-primary/30 bg-primary/5 p-8">
            <p className="font-serif text-lg text-primary">
              La maree vous portera nos nouvelles.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Surveillez votre boite aux lettres.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
