"use client";

import { useState, useEffect } from "react";
import { useNotes } from "@/hooks/useNotes";
import Sidebar from "@/components/Sidebar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import Toolbar from "@/components/Toolbar";

type View = "split" | "editor" | "preview";

export default function Home() {
  const { notes, activeId, activeNote, setActiveId, createNote, updateNote, deleteNote } =
    useNotes();
  const [view, setView] = useState<View>("split");
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"editor" | "preview">("editor");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile layout
  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0d0d0d" }}>
        {/* Mobile top bar */}
        <div style={{
          height: "48px",
          background: "#111",
          borderBottom: "1px solid #1e1e1e",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: "10px",
          flexShrink: 0,
        }}>
          <button
            onClick={() => setShowSidebar(true)}
            style={{
              background: "transparent",
              border: "1px solid #262626",
              borderRadius: "5px",
              color: "#888",
              fontSize: "16px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>

          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
            fontWeight: 600,
            color: "#7C3AED",
            flex: 1,
          }}>
            {activeNote?.title || "MarkNotes"}
          </span>

          {activeNote && (
            <button
              onClick={() => {
                import("@/lib/exportMd").then(({ exportMd }) => exportMd(activeNote));
              }}
              style={{
                background: "transparent",
                border: "1px solid #262626",
                borderRadius: "4px",
                padding: "4px 10px",
                cursor: "pointer",
                color: "#888",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ↓ .md
            </button>
          )}
        </div>

        {/* Mobile panel toggle */}
        {activeNote && (
          <div style={{
            display: "flex",
            background: "#0d0d0d",
            borderBottom: "1px solid #1a1a1a",
            flexShrink: 0,
          }}>
            {(["editor", "preview"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setMobilePanel(p)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: mobilePanel === p ? "#1e1530" : "transparent",
                  border: "none",
                  borderBottom: mobilePanel === p ? "2px solid #7C3AED" : "2px solid transparent",
                  color: mobilePanel === p ? "#a78bfa" : "#444",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Mobile content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activeNote ? (
            mobilePanel === "editor"
              ? <Editor note={activeNote} onUpdate={updateNote} />
              : <Preview note={activeNote} />
          ) : (
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#2a2a2a", fontSize: "13px" }}>
                no notes yet
              </span>
              <button
                onClick={createNote}
                style={{
                  background: "#7C3AED",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 18px",
                  color: "#fff",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                + new note
              </button>
            </div>
          )}
        </div>

        {/* Sidebar drawer overlay */}
        {showSidebar && (
          <>
            <div
              onClick={() => setShowSidebar(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 10,
              }}
            />
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "260px",
              zIndex: 20,
              display: "flex",
            }}>
              <Sidebar
                notes={notes}
                activeId={activeId}
                onSelect={(id) => { setActiveId(id); setShowSidebar(false); }}
                onCreate={() => { createNote(); setShowSidebar(false); }}
                onDelete={deleteNote}
              />
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "#0d0d0d",
    }}>
      <Sidebar
        notes={notes}
        activeId={activeId}
        onSelect={setActiveId}
        onCreate={createNote}
        onDelete={deleteNote}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {activeNote ? (
          <>
            <Toolbar note={activeNote} view={view} onViewChange={setView} />
            <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
              {(view === "split" || view === "editor") && (
                <Editor note={activeNote} onUpdate={updateNote} />
              )}
              {(view === "split" || view === "preview") && (
                <Preview note={activeNote} />
              )}
            </div>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "12px",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#2a2a2a",
              fontSize: "13px",
            }}>
              no notes yet
            </span>
            <button
              onClick={createNote}
              style={{
                background: "#7C3AED",
                border: "none",
                borderRadius: "5px",
                padding: "8px 18px",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              + new note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}