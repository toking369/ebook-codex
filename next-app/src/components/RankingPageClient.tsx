"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allBooks } from "../data/books";

function getRankDisplay(rank: number): { medal: string; bg: string; label: string } {
  if (rank === 1) return { medal: "🥇", bg: "gold", label: "TOP 1" };
  if (rank === 2) return { medal: "🥈", bg: "silver", label: "TOP 2" };
  if (rank === 3) return { medal: "🥉", bg: "#CD7F32", label: "TOP 3" };
  return { medal: "", bg: "var(--text-muted)", label: "" };
}

const rankColors = ["#DC1E1E", "#D4A84B", "#8B5CF6"];

export default function RankingPageClient() {
  const [activeTab, setActiveTab] = useState("readers");

  const rankedBooks = useMemo(() => {
    var books = [...allBooks];
    switch (activeTab) {
      case "readers": books.sort(function(a,b){return b.readers-a.readers}); break;
      case "rating": books.sort(function(a,b){return b.rating!==a.rating?b.rating-a.rating:b.readers-a.readers}); break;
      case "new": books.sort(function(a,b){return b.id-a.id}); break;
    }
    return books;
  }, [activeTab]);

  var tabs = [
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
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-6">
            <Link href="/" className="hover:text-[var(--red-light)] transition-colors">首页</Link>
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
            {tabs.map(function(tab){
              return(
                <button key={tab.id} onClick={function(){setActiveTab(tab.id)}}
                  className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 relative cursor-pointer"
                  style={{color:activeTab===tab.id?"var(--gold)":"var(--text-muted)"}}
                >
                  <span className="text-base">{tab.icon}</span>{tab.label}
                  {activeTab===tab.id&&<span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)] rounded-full" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            {rankedBooks.slice(0,3).map(function(book,idx){
              var positions = [1,0,2];
              var pos = positions[idx];
              var rank = pos+1;
              var isFirst = pos===0;
              var isSecond = pos===1;
              return(
                <div key={book.id}
                  className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
                  style={{marginTop:isFirst?"0":isSecond?"20px":"40px"}}
                >
                  {isFirst&&<div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl z-10 animate-bounce">👑</div>}
                  <div className="absolute top-3 left-3 z-10 text-2xl">{getRankDisplay(rank).medal}</div>
                  <div className="h-28 bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",backgroundSize:"16px 16px"}} />
                    <svg className="w-10 h-10 opacity-20" viewBox="0 0 24 24" fill="none" stroke={rankColors[rank-1]} strokeWidth="1.5">
                      <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7V17" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className={"text-sm font-bold leading-snug line-clamp-1 mb-1 "+(isFirst?"text-[var(--gold)]":"text-[var(--text-primary)]")}>{book.title}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] mb-2">{book.author}</p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <svg className="w-3 h-3" style={{color:rankColors[rank-1]}} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-xs text-[var(--text-secondary)]">{book.rating}</span>
                      <span className="text-[9px] text-[var(--text-muted)]">({book.readers.toLocaleString()})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{backgroundColor: rankColors[rank-1]}}>免费</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {rankedBooks.slice(3).map(function(book,idx){
              var rank = idx + 4;
              return(
                <div key={book.id} className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                  <div className="flex items-center p-3 gap-3">
                    <div className="w-7 flex-shrink-0 text-center">
                      <span className="text-xs font-black text-[var(--text-muted)]">{String(rank).padStart(2,"0")}</span>
                    </div>
                    <div className="w-10 h-14 rounded-lg bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex-shrink-0 flex items-center justify-center border border-[var(--border-color)] overflow-hidden">
                      <span className="text-base opacity-30">📖</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1">{book.title}</h4>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)]">{book.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span className="text-[10px] text-[var(--text-secondary)]">{book.rating}</span>
                        </div>
                        <span className="text-[9px] text-[var(--text-muted)]">{book.readers.toLocaleString()} 人已读</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold text-[var(--red-primary)]" style={{backgroundColor: "var(--red-primary)15"}}>免费</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 pb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              排行榜每日更新 · 数据来源于用户阅读行为
            </div>
          </div>
        </div>
      </section>
    </>
  );
}