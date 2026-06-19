"use client";

import Link from "next/link";

import { categories as allCats } from "../data/books";
const categories = [{ id: "all", name: "全部", icon: "📚" }, ...allCats.map(c => ({ id: c.id, name: c.name, icon: c.icon }))];

interface EbooksHeroProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalResults: number;
}

export default function EbooksHero({ activeCategory, onCategoryChange, searchQuery, onSearchChange, totalResults }: EbooksHeroProps) {
  return (
    <section className="cursor-pointer relative pt-32 pb-10 overflow-hidden">
      <div className="cursor-pointer absolute inset-0">
        <div className="cursor-pointer absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[var(--red-primary)]/4 rounded-full blur-[120px]" />
        <div className="cursor-pointer absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[var(--gold)]/3 rounded-full blur-[100px]" />
      </div>

      <div className="cursor-pointer relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="cursor-pointer flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-6">
          <Link href="/" className="cursor-pointer hover:text-[var(--red-light)] transition-colors">首页</Link>
          <span>/</span>
          <span className="cursor-pointer text-[var(--text-secondary)]">书库</span>
        </div>

        {/* Title */}
        <div className="cursor-pointer mb-8">
          <div className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--red-primary)]/20 bg-[var(--red-primary)]/5 text-xs text-[var(--red-light)] mb-4">
            <span className="cursor-pointer w-1.5 h-1.5 rounded-full bg-[var(--red-primary)] animate-pulse" />
            {totalResults} 本精选电子书
          </div>
          <h1 className="cursor-pointer text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3">
            书<span className="cursor-pointer text-[var(--gold)]">库</span>
          </h1>
          <p className="cursor-pointer text-[var(--text-secondary)] text-base max-w-xl">
            精选证券投资经典著作，从K线入门到量化交易，一应俱全
          </p>
        </div>

        {/* Search bar */}
        <div className="cursor-pointer relative max-w-2xl mb-6">
          <svg className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索书名、作者、关键词..."
            className="cursor-pointer w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--red-primary)]/40 focus:ring-1 focus:ring-[var(--red-primary)]/20 transition-all duration-300"
          />
        </div>

        {/* Category filter chips */}
        <div className="cursor-pointer flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300"
              style={{
                backgroundColor: activeCategory === cat.id ? "var(--red-primary)" : "var(--bg-card)",
                color: activeCategory === cat.id ? "#fff" : "var(--text-secondary)",
                border: "1px solid " + (activeCategory === cat.id ? "var(--red-primary)" : "var(--border-color)"),
              }}
            >
              <span className="cursor-pointer text-sm">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
