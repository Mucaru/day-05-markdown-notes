"use client";

import { useEffect, useRef } from "react";
import { Note } from "@/types/note";

type Props = {
  note: Note;
  onUpdate: (id: string, patch: Partial<Pick<Note, "title" | "content">>) => void;
};

export default function Editor({ note, onUpdate }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [note.id]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #262626",
        background: "#0d0d0d",
        minWidth: 0,
      }}
    >
      {/* Title input */}
      <div
        style={{
          padding: "14px 20px 10px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <input
          type="text"
          value={note.title}
          onChange={(e) => onUpdate(note.id, { title: e.target.value })}
          placeholder="Note title..."
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f5f5f5",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.02em",
          }}
        />
      </div>

      {/* Editor label */}
      <div
        style={{
          padding: "6px 20px",
          fontSize: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#333",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottom: "1px solid #161616",
        }}
      >
        markdown
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={note.content}
        onChange={(e) => onUpdate(note.id, { content: e.target.value })}
        placeholder="Start writing markdown..."
        spellCheck={false}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          padding: "16px 20px",
          color: "#c9c9c9",
          fontSize: "13px",
          lineHeight: "1.8",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.01em",
        }}
      />

      {/* Footer: char count */}
      <div
        style={{
          padding: "6px 20px",
          borderTop: "1px solid #1a1a1a",
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#333",
          }}
        >
          {note.content.length} chars
        </span>
        <span
          style={{
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#333",
          }}
        >
          {note.content.split(/\s+/).filter(Boolean).length} words
        </span>
      </div>
    </div>
  );
}