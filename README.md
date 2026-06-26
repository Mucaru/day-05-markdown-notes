# 📝 MarkNotes

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000?style=flat-square&logo=vercel)
![Day](https://img.shields.io/badge/100_Days_Challenge-Day_05-orange?style=flat-square)

> Editor markdown minimalis dengan live preview — tulis di kiri, lihat hasilnya di kanan, simpan otomatis.

## ✨ Fitur

- ✍️ Editor markdown dengan live preview split-pane
- 💾 Auto-save ke localStorage — tidak ada tombol save
- 📁 Multi-note — buat, hapus, dan kelola banyak catatan
- 📤 Export note ke file `.md` dengan satu klik
- 🔀 Toggle view: editor only / split / preview only
- 📱 Responsif — sidebar drawer + panel toggle di mobile
- ⏱️ Timestamp "time ago" di setiap note

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| Next.js 15 (App Router) | Framework utama |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| react-markdown | Render markdown ke HTML |
| remark-gfm | Support GFM (table, checkbox, strikethrough) |
| localStorage | Persistensi data tanpa backend |
| Vercel | Deployment |

## 📁 Struktur Folder

```
app/
  layout.tsx              # Root layout + Google Fonts
  page.tsx                # Halaman utama + responsive logic
  globals.css             # Global styles + markdown preview styles
components/
  Sidebar.tsx             # Daftar note + new + delete
  Editor.tsx              # Textarea markdown + word/char count
  Preview.tsx             # Rendered markdown dengan react-markdown
  Toolbar.tsx             # Toggle view + export .md
hooks/
  useNotes.ts             # CRUD notes + localStorage sync
lib/
  exportMd.ts             # Helper export file .md
types/
  note.ts                 # Type Note
```

## 🚀 Jalankan Lokal

```bash
git clone https://github.com/Mucaru/day-05-markdown-notes.git
cd day-05-markdown-notes
npm install
npm run dev
```

Buka `http://localhost:3000`

## 🌐 Live Demo

**[day-05-markdown-notes.vercel.app](https://day-05-markdown-notes.vercel.app)**

---

Bagian dari tantangan [100 Hari 100 Web App](https://github.com/Mucaru) · Day 05 of 100