"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Note } from "@/types/note";

type Props = {
  note: Note;
};

export default function Preview({ note }: Props) {
  const fullContent = note.title
    ? `# ${note.title}\n\n${note.content}`
    : note.content;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#0f0f0f",
        minWidth: 0,
      }}
    >
      {/* Preview label — sama tinggi dengan title input di Editor */}
      <div
        style={{
          height: "45px",
          padding: "0 20px",
          fontSize: "10px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#333",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderBottom: "1px solid #161616",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "6px",
        }}
      >
        preview
      </div>

      {/* Rendered content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 24px",
        }}
      >
        {note.content || note.title ? (
          <div className="md-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {fullContent}
            </ReactMarkdown>
          </div>
        ) : (
          <div
            style={{
              color: "#2a2a2a",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            nothing to preview yet
          </div>
        )}
      </div>
    </div>
  );
}