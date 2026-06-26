import { Note } from "@/types/note";

export function exportMd(note: Note) {
  const blob = new Blob([note.content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${note.title || "untitled"}.md`;
  a.click();
  URL.revokeObjectURL(url);
}