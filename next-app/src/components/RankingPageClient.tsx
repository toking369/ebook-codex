"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allBooks, categories } from "../data/books";
import BookCover from "./BookCover";

function getAccentColor(bookId: number) {
  const colors = ["#DC1E1E", "#D4A84B", "#06B6D4", "#8B5CF6", "#22C55E", "#F97316", "#EC4899", "#6366F1"];
  return colors[bookId % colors.length];
}

export default function RankingPageClient() {
  const [activeTab, setActiveTab] = useState("readers");

  const rankedBooks = useMemo(() => {
    const books = [...allBooks];
    switch (activeTab) {
      case "readers": books.sort((a, b) => b.readers - a.readers); break;
      case "rating": books.sort((a, b) => b.rating !== a.rating ? b.rating - a.rating : b.readers - a.readers); break;
      case "new": books.sort((a, b) => b.id - a.id); break;
    }
    return books;
  }, [activeTab]);

  const tabs = [
    { id: "readers", label: "最热门", icon: "🔥" },
    { id: "rating", label: "最高分", icon: "⭐" },
    { id: "new", label: "最新上架", icon: "🎉" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--gold)]/4 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[var(--red-primary)]/3 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-6">
            <Link href="/" className="hover:text-[var(--red-light)] transition-colors cursor-pointer">首页</Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">排行榜</span>
          </div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 text-xs text-[var(--gold-light)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              每日更新 · 数据实时统计
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3">
              排行<span className="text-[var(--gold)]">榜</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-base max-w-xl">发现最受欢迎的精品电子书，看看其他交易者在读什么</p>
          </div>
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-0">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 relative cursor-pointer"
                style={{ color: activeTab === tab.id ? "var(--gold)" : "var(--text-muted)" }}
              >
                <span className="text-base">{tab.icon}</span>{tab.label}
                {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)] rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          
          {/* Top 3 Podium Style */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {rankedBooks.slice(0, 3).map((book, idx) => {
              const positions = [1, 0, 2];
              const pos = positions[idx];
              const rank = pos + 1;
              const accent = getAccentColor(book.id);
              const isFirst = rank === 1;
              
              const medals = ["🥇", "🥈", "🥉"];
              const medal = medals[pos];
              
              return (
                <Link href={`/ebook/${book.id}/read`} key={book.id}
                  className="relative group cursor-pointer"
                  style={{ marginTop: isFirst ? "0" : pos === 1 ? "40px" : "80px" }}
                >
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[var(--red-primary)]/10">
                    
                    {/* Medal Header */}
                    <div className="relative py-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}25, ${accent}08)` }}>
                      <div className="text-6xl">{medal}</div>
                      <div className="absolute top-3 right-3 text-[70px] font-black leading-none opacity-[0.08]" style={{ color: accent }}>
                        {rank}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
                    </div>
                    
                    {/* Book Cover */}
                    <div className="py-8 px-4 flex items-center justify-center bg-gradient-to-b from-[var(--bg-card-hover)] to-[var(--bg-primary)]">
                      <BookCover title={book.title} author={book.author} bookId={book.id} size="large" className="rounded-xl shadow-2xl" />
                    </div>
                    
                    {/* Book Info */}
                    <div className="p-5">
                      <h3 className={"text-base font-bold leading-snug line-clamp-2 mb-2 text-center " + (isFirst ? "text-[var(--gold)]" : "text-[var(--text-primary)]")}>
                        {book.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] text-center mb-3">{book.author}</p>
                      
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-bold" style={{ color: accent }}>{book.rating}</span>
                        </div>
                        <span className="text-xs text-[var(--text-muted)]">{book.readers.toLocaleString()}人在读</span>
                      </div>
                      
                      <div className="flex justify-center">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: accent }}>
                          免费阅读
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isFirst && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--gold)]/15 via-transparent to-[var(--gold)]/15 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Rest of the list - redesigned with right side content */}
          <div className="space-y-3">
            {rankedBooks.slice(3).map((book, idx) => {
              const rank = idx + 4;
              const accent = getAccentColor(book.id);
              const category = categories.find(c => c.id === book.category);
              
              return (
                <Link href={`/ebook/${book.id}/read`} key={book.id}
                  className="group flex items-center bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--red-primary)]/5 cursor-pointer"
                >
                  {/* Left rank number */}
                  <div className="w-14 flex-shrink-0 flex items-center justify-center bg-gradient-to-b py-4" style={{ background: `linear-gradient(180deg, ${accent}15, transparent)` }}>
                    <span className="text-2xl font-black" style={{ color: rank <= 10 ? accent : "var(--text-muted)", opacity: rank <= 10 ? 1 : 0.4 }}>
                      {String(rank).padStart(2, "0")}
                    </span>
                  </div>
                  
                  {/* Book cover */}
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                    <BookCover title={book.title} author={book.author} bookId={book.id} size="small" className="w-full h-full" />
                  </div>
                  
                  {/* Book info - middle */}
                  <div className="flex-1 min-w-0 px-3 py-3">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1 mb-1 group-hover:text-[var(--red-light)] transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-[10px] text-[var(--text-muted)] mb-2">{book.author}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{book.rating}</span>
                      </div>
                      <span>{book.readers.toLocaleString()}人在读</span>
                    </div>
                  </div>
                  
                  {/* Right side - category tag & stats */}
                  <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4 py-3 border-l" style={{ borderColor: "var(--border-color)" }}>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-medium" style={{ backgroundColor: `${accent}15`, color: accent }}>
                      <span>{category?.icon || "📖"}</span>
                      <span>{category?.name || "技术分析"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="whitespace-nowrap">免费阅读</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10 pb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              排行榜每日更新 · 共361本电子书
            </div>
          </div>
        </div>
      </section>
    </>
  );
}