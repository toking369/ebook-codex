"use client";

import { useState } from "react";
import EbookCard from "./EbookCard";
import { allBooks, categories as allCategories } from "../data/books";

export default function CategoryDetailSection() {
  const [activeTab, setActiveTab] = useState<string>("k-line");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const catList = allCategories.map((c) => ({ id: c.id, name: c.name, icon: c.icon, color: c.color }));
  const currentCat = catList.find((c) => c.id === activeTab);
  const books = allBooks.filter((b) => b.category === activeTab);
  const accentColor = currentCat?.color || "#DC1E1E";

  return (
    <section className="cursor-pointer py-16 relative">
      <div className="cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
      <div className="cursor-pointer relative z-10 max-w-7xl mx-auto px-6">
        <div className="cursor-pointer flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {catList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300"
              style={{
                backgroundColor: activeTab === cat.id ? cat.color + "18" : "var(--bg-card)",
                color: activeTab === cat.id ? cat.color : "var(--text-secondary)",
                border: "1px solid " + (activeTab === cat.id ? cat.color + "30" : "var(--border-color)"),
                boxShadow: activeTab === cat.id ? "0 0 20px " + cat.color + "15" : "none",
              }}
            >
              <span className="cursor-pointer text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="cursor-pointer flex items-center justify-between mb-8">
          <div className="cursor-pointer flex items-center gap-3">
            <div className="cursor-pointer w-1 h-6 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="cursor-pointer text-xl font-bold text-[var(--text-primary)]">{currentCat?.name}</h2>
            <span className="cursor-pointer text-sm text-[var(--text-muted)]">({books.length} 本)</span>
          </div>
          <div className="cursor-pointer flex items-center gap-1 p-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
            <button onClick={() => setViewMode("grid")} className="cursor-pointer p-2 rounded-md transition-all duration-200" style={{ backgroundColor: viewMode === "grid" ? accentColor + "15" : "transparent", color: viewMode === "grid" ? accentColor : "var(--text-muted)" }}>
              <svg className="cursor-pointer w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
            </button>
            <button onClick={() => setViewMode("list")} className="cursor-pointer p-2 rounded-md transition-all duration-200" style={{ backgroundColor: viewMode === "list" ? accentColor + "15" : "transparent", color: viewMode === "list" ? accentColor : "var(--text-muted)" }}>
              <svg className="cursor-pointer w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="14" height="3" rx="1" /><rect x="1" y="6.5" width="14" height="3" rx="1" /><rect x="1" y="12" width="14" height="3" rx="1" /></svg>
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (<EbookCard key={book.id} book={book} />))}
          </div>
        ) : (
          <div className="cursor-pointer space-y-4">
            {books.map((book) => (
              <div key={book.id} className="cursor-pointer group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex">
                <div className="cursor-pointer w-24 sm:w-32 flex-shrink-0 bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden">
                  <span className="cursor-pointer text-2xl opacity-30 relative z-[1]">📖</span>
                </div>
                <div className="cursor-pointer flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="cursor-pointer flex-1 min-w-0">
                    <h4 className="cursor-pointer text-sm font-bold text-[var(--text-primary)] line-clamp-1 mb-1">{book.title}</h4>
                    <p className="cursor-pointer text-xs text-[var(--text-muted)] mb-2">{book.author}</p>
                    <p className="cursor-pointer text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed hidden sm:block">{book.description}</p>
                    <div className="cursor-pointer flex items-center gap-3 mt-2">
                      <div className="cursor-pointer flex items-center gap-1">
                        <svg className="cursor-pointer w-3 h-3" viewBox="0 0 20 20" fill={accentColor} style={{ opacity: 0.8 }}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <span className="cursor-pointer text-xs text-[var(--text-secondary)]">{book.rating}</span>
                      </div>
                      <span className="cursor-pointer text-[10px] text-[var(--text-muted)]">({book.readers.toLocaleString()} 人读过)</span>
                      <div className="cursor-pointer flex gap-1">
                        {book.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="cursor-pointer px-1.5 py-0.5 rounded text-[9px] border" style={{ backgroundColor: accentColor + "08", borderColor: accentColor + "15", color: "var(--text-muted)" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                    <span className="cursor-pointer px-3 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: accentColor + "15", color: accentColor }}>免费</span>
                    <span className="cursor-pointer px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap" style={{ backgroundColor: accentColor + "15", color: accentColor, border: "1px solid " + accentColor + "30" }}>立即阅读</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}