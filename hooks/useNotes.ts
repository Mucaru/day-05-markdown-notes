"use client";

import { useState, useEffect } from "react";
import { Note } from "@/types/note";

const STORAGE_KEY = "md-notes";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: Note[] = JSON.parse(raw);
      setNotes(parsed);
      if (parsed.length > 0) setActiveId(parsed[0].id);
    } else {
      const welcome: Note = {
        id: generateId(),
        title: "Getting Started",
        content: `## Quick Reference\n\n**Bold** · *Italic* · ~~Strike~~ · \`code\`\n\n\`\`\`js\n// code block\nconsole.log("hello")\n\`\`\`\n\n> blockquote\n\n- [ ] task list\n- [x] done\n\n| col | col |\n|---|---|\n| a | b |`,
        updatedAt: Date.now(),
        };
      setNotes([welcome]);
      setActiveId(welcome.id);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeId) ?? null;

  function createNote() {
    const note: Note = {
      id: generateId(),
      title: "Untitled",
      content: "",
      updatedAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
  }

  function updateNote(id: string, patch: Partial<Pick<Note, "title" | "content">>) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n
      )
    );
  }

  function deleteNote(id: string) {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      if (activeId === id) {
        setActiveId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
  }

  return { notes, activeId, activeNote, setActiveId, createNote, updateNote, deleteNote };
}