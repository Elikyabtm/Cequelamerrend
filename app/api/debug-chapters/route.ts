import { getChapters } from "@/lib/chapters";
import { NextResponse } from "next/server";

export async function GET() {
  const chapters = getChapters();
  return NextResponse.json({
    total: chapters.length,
    chapters: chapters.map((c) => ({
      id: c.id,
      number: c.number,
      title: c.title,
      paragraphCount: c.paragraphs.length,
      firstParagraph: c.paragraphs[0]?.slice(0, 100),
    })),
  });
}
