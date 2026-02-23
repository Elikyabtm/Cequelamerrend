import fs from "fs";
import path from "path";

export interface Chapter {
  id: string;
  number: number;
  title: string;
  paragraphs: string[];
}

function isChapterHeading(line: string): { type: "preface" | "chapter" | "epilogue"; num?: number; title?: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 120) return null;

  // Normalize: remove accents for comparison
  const normalized = trimmed.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  if (normalized === "PREFACE") {
    return { type: "preface" };
  }

  if (normalized.startsWith("EPILOGUE")) {
    const colonIdx = trimmed.indexOf(":");
    const title = colonIdx >= 0 ? trimmed.slice(colonIdx + 1).trim() : undefined;
    return { type: "epilogue", title };
  }

  // Match CHAPITRE N : TITLE (handle various colon/dash chars and non-breaking spaces)
  const cleanNorm = normalized.replace(/[\u00A0\u202F]/g, " ");
  const chapterMatch = cleanNorm.match(/^CHAPITRE\s+(\d+)\s*[:\-\u2013\u2014\uFF1A]\s*(.+)/);
  if (chapterMatch) {
    const num = parseInt(chapterMatch[1], 10);
    // Get the title from the original trimmed string (to preserve accents)
    const colonIdx = trimmed.search(/\s*[:\-\u2013\u2014\uFF1A]\s*/);
    const afterColon = colonIdx >= 0
      ? trimmed.slice(colonIdx).replace(/^\s*[:\-\u2013\u2014\uFF1A]\s*/, "").trim()
      : chapterMatch[2];
    return { type: "chapter", num, title: afterColon };
  }

  return null;
}

function parseChapters(): Chapter[] {
  const filePath = path.join(process.cwd(), "lib", "story-source.txt");
  const raw = fs.readFileSync(filePath, "utf-8");
  const lines = raw.split(/\r?\n/);

  console.log("[v0] Total lines in story file:", lines.length);
  console.log("[v0] First 3 lines:", lines.slice(0, 3).map((l, i) => `${i}: "${l.slice(0, 60)}..."`));

  const chapters: Chapter[] = [];
  let currentChapter: Chapter | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed === "FIN." || trimmed === "FIN") continue;

    const heading = isChapterHeading(trimmed);

    if (heading) {
      if (currentChapter) chapters.push(currentChapter);

      if (heading.type === "preface") {
        currentChapter = { id: "preface", number: 0, title: "Pr\u00e9face", paragraphs: [] };
      } else if (heading.type === "epilogue") {
        currentChapter = { id: "epilogue", number: 99, title: heading.title || "\u00c9pilogue", paragraphs: [] };
      } else {
        currentChapter = {
          id: `chapitre-${heading.num}`,
          number: heading.num!,
          title: heading.title || `Chapitre ${heading.num}`,
          paragraphs: [],
        };
      }
      console.log(`[v0] Found heading at line ${i + 1}: ${heading.type} ${heading.num ?? ""} - "${currentChapter.title}"`);
      continue;
    }

    if (currentChapter) {
      currentChapter.paragraphs.push(trimmed);
    }
  }

  if (currentChapter) chapters.push(currentChapter);

  console.log("[v0] Total chapters parsed:", chapters.length);
  for (const c of chapters) {
    console.log(`[v0]   #${c.number} "${c.title}" — ${c.paragraphs.length} paragraphs`);
  }

  return chapters.sort((a, b) => a.number - b.number);
}

let cachedChapters: Chapter[] | null = null;

export function getChapters(): Chapter[] {
  if (!cachedChapters) {
    cachedChapters = parseChapters();
  }
  return cachedChapters;
}

export function getChapter(id: string): Chapter | undefined {
  return getChapters().find((c) => c.id === id);
}
