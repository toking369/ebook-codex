"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import BookCover from "./BookCover";

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  readers: number;
  tags: string[];
  description: string;
}

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.getAttribute("data-theme") !== "light";
}

function getAccentColor(bookId: number) {
  const colors = ["#DC1E1E", "#D4A84B", "#06B6D4", "#8B5CF6", "#22C55E", "#F97316", "#EC4899", "#6366F1"];
  return colors[bookId % colors.length];
}

export default function EbookCard({ book }: { book: Book }) {
  const router = useRouter();
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => true);
  const accentColor = getAccentColor(book.id);
  const textPrimary = isDark ? "text-white" : "text-[#1A1A2E]";
  const textAuthor = isDark ? "text-white/50" : "text-[#5A5550]/70";

  return (
    <div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1" onClick={() => router.push("/ebook/" + book.id + "/read")}>
      <div className="relative aspect-[3/4] bg-[var(--bg-card-hover)] overflow-hidden">
        {/* Generated book cover */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <BookCover title={book.title} author={book.author} bookId={book.id} size="large" className="w-full h-full rounded-lg shadow-2xl" />
        </div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold text-white" style={{backgroundColor: accentColor}}>免费</span>
        </div>
        
        {/* ID number */}
        <div className="absolute -top-4 -right-4 text-[120px] font-black leading-none select-none opacity-[0.04]" style={{color: accentColor}}>{String(book.id).padStart(2, "0")}</div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">{book.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium border text-[var(--text-muted)] transition-colors duration-200" style={{backgroundColor: accentColor + "08", borderColor: accentColor + "15"}}>{tag}</span>))}</div>
        <div className="mb-3"><h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5 line-clamp-1">{book.title}</h4><p className="text-xs text-[var(--text-muted)]">{book.author}</p></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={accentColor} style={{opacity: 0.8}}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-[var(--text-secondary)]">{book.rating}</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">(人读过)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{backgroundColor: accentColor + "15", color: accentColor}}>免费</span>
          <span className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer" style={{backgroundColor: accentColor + "15", color: accentColor, border: "1px solid " + accentColor + "30"}}
          >立即阅读</span>
        </div>
      </div>
    </div>
  );
}