"use client";

import Link from "next/link";
import { categories } from "@/data/books";



export default function CategoriesHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[var(--red-primary)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--gold)]/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-8">
          <Link href="/" className="hover:text-[var(--red-light)] transition-colors">首页</Link>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">分类</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--red-primary)]/20 bg-[var(--red-primary)]/5 text-xs text-[var(--red-light)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--red-primary)] animate-pulse" />
            全部分类 · {categories.reduce((s, c) => s + c.count, 0)} 本电子书
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3">
            按<span className="text-[var(--red-primary)]">分类</span>探索
          </h1>
          <p className="text-[var(--text-secondary)] text-base max-w-xl">
            六大核心分类，覆盖交易全领域知识体系，从基础入门到高级策略
          </p>
        </div>

        {/* Category grid - hero cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={"/categories/" + cat.id}
              className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden block"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] opacity-60" style={{ backgroundColor: cat.color }} />

              <div className="flex items-start justify-between mb-4 relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border" style={{
                  backgroundColor: cat.color + "12",
                  borderColor: cat.color + "20"
                }}>
                  {cat.icon}
                </div>
                <span className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  {String(cat.count).padStart(3, "0")}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">{cat.name}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{cat.description}</p>

              {/* Popular tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cat.popular.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] border" style={{
                    backgroundColor: cat.color + "08",
                    borderColor: cat.color + "15",
                    color: cat.color
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] group-hover:text-[var(--red-light)] transition-colors duration-200 pt-2 border-t border-[var(--border-color)]">
                <span>{cat.count} 本电子书</span>
                <svg className="w-3.5 h-3.5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
