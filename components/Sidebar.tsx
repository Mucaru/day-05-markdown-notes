"use client";

import { Note } from "@/types/note";

type Props = {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Sidebar({
  notes,
  activeId,
  onSelect,
  onCreate,
  onDelete,
}: Props) {
  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        background: "#111111",
        borderRight: "1px solid #262626",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 14px 12px",
          borderBottom: "1px solid #1e1e1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "13px",
            fontWeight: 600,
            color: "#7C3AED",
            letterSpacing: "0.04em",
          }}
        >
          MarkNotes
        </span>
        <button
          onClick={onCreate}
          title="New note"
          style={{
            background: "#7C3AED",
            border: "none",
            borderRadius: "4px",
            width: "24px",
            height: "24px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "16px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      </div>

      {/* Note count */}
      <div
        style={{
          padding: "8px 14px",
          fontSize: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#444",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {notes.length} {notes.length === 1 ? "note" : "notes"}
      </div>

      {/* List */}
      <ul
        style={{
          flex: 1,
          overflowY: "auto",
          margin: 0,
          padding: "0 8px",
          listStyle: "none",
        }}
      >
        {notes.map((note) => (
          <li key={note.id}>
            <div
              onClick={() => onSelect(note.id)}
              style={{
                padding: "8px 8px",
                borderRadius: "6px",
                cursor: "pointer",
                background: activeId === note.id ? "#1e1530" : "transparent",
                borderLeft:
                  activeId === note.id
                    ? "2px solid #7C3AED"
                    : "2px solid transparent",
                marginBottom: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: activeId === note.id ? "#f5f5f5" : "#aaa",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {note.title || "Untitled"}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#444",
                    marginTop: "2px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {timeAgo(note.updatedAt)}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                title="Delete"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#3a3a3a",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  lineHeight: 1,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ef4444")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#3a3a3a")
                }
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}