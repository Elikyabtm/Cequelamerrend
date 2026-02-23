import React from "react"
import type { Metadata, Viewport } from "next";
import { Cinzel, Lora } from "next/font/google";

import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ce que la mer rend | Brunehame",
  description:
    "Le fer a une memoire. Decouvrez le recit d'Edrin et Alma sur l'ile oubliee de Brunehame, ou la maree ne rend jamais seulement du bois flotte.",
};

export const viewport: Viewport = {
  themeColor: "#1a2030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
