"use client";

import { Note } from "@/types/note";
import { exportMd } from "@/lib/exportMd";

type Props = {
  note: Note;
  view: "split" | "editor" | "preview";
  onViewChange: (v: "split" | "editor" | "preview") => void;
};

const views: { key: "split" | "editor" | "preview"; label: string }[] = [
  { key: "editor", label: "editor" },
  { key: "split", label: "split" },
  { key: "preview", label: "preview" },
];

export default function Toolbar({ note, view, onViewChange }: Props) {
  return (
    <div
      style={{
        height: "40px",
        borderBottom: "1px solid #1e1e1e",
        background: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        flexShrink: 0,
      }}
    >
      {/* View toggle */}
      <div
        style={{
          display: "flex",
          gap: "2px",
          background: "#0d0d0d",
          border: "1px solid #1e1e1e",
          borderRadius: "5px",
          padding: "2px",
        }}
      >
        {views.map((v) => (
          <button
            key={v.key}
            onClick={() => onViewChange(v.key)}
            style={{
              background: view === v.key ? "#7C3AED" : "transparent",
              border: "none",
              borderRadius: "4px",
              padding: "3px 10px",
              cursor: "pointer",
              color: view === v.key ? "#fff" : "#555",
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
              transition: "all 0.15s",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Auto-save indicator */}
        <span
          style={{
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#2a2a2a",
            letterSpacing: "0.06em",
          }}
        >
          auto-saved
        </span>

        {/* Export button */}
        <button
          onClick={() => exportMd(note)}
          style={{
            background: "transparent",
            border: "1px solid #262626",
            borderRadius: "4px",
            padding: "4px 12px",
            cursor: "pointer",
            color: "#888",
            fontSize: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#7C3AED";
            e.currentTarget.style.color = "#a78bfa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#262626";
            e.currentTarget.style.color = "#888";
          }}
        >
          ↓ export .md
        </button>
      </div>
    </div>
  );
}