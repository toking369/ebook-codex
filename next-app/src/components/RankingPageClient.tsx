"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  readers: number;
  tags: string[];
  description: string;
}

const allBooks: Book[] = [
  { id: 3, title: "股市趋势技术分析", author: "约翰·迈吉", price: 59.9, originalPrice: 128.0, rating: 4.9, readers: 5200, tags: ["趋势分析", "经典", "理论"], description: "技术分析圣经级著作，趋势交易者必读。" },
  { id: 17, title: "投资最重要的事", author: "奥斯卡·黑希尔", price: 65.0, originalPrice: 128.0, rating: 4.9, readers: 4500, tags: ["价值投资", "哲学", "经典"], description: "投资大师的智慧结晶。" },
  { id: 4, title: "黄金游戏（一）从A股获利", author: "占豪", price: 49.9, originalPrice: 99.0, rating: 4.9, readers: 3890, tags: ["A股", "投资策略", "趋势"], description: "解读A股市场运行规律，构建稳健获利交易体系。" },
  { id: 7, title: "70种K线组合形态整理", author: "秘籍编写组", price: 19.9, originalPrice: 39.0, rating: 4.5, readers: 3210, tags: ["K线组合", "实用", "手册"], description: "常见K线组合形态全录，可作为交易参考手册。" },
  { id: 12, title: "战胜庄家", author: "青木", price: 25.0, originalPrice: 50.0, rating: 4.6, readers: 3650, tags: ["博弈", "庄家", "心态"], description: "入市必读，理解庄家思维。" },
  { id: 18, title: "25条股票投资黄金法则", author: "威廉·欧纳尔", price: 22.0, originalPrice: 45.0, rating: 4.5, readers: 2760, tags: ["原则", "法则", "投资"], description: "经典的投资原则汇编。" },
  { id: 15, title: "1000%的男人", author: "期货冠军奇迹", price: 49.0, originalPrice: 98.0, rating: 4.8, readers: 2890, tags: ["期货", "传奇", "实战"], description: "期货冠军的买卖方法，倾尽全力的实战经验分享。" },
  { id: 10, title: "交易心理分析", author: "罗尔·弗兰克", price: 44.9, originalPrice: 88.0, rating: 4.8, readers: 2780, tags: ["心理", "纪律", "博弈"], description: "抖破交易心理障碍，建立科学的交易心态。" },
  { id: 1, title: "K线操盘定式", author: "陈培树", price: 39.9, originalPrice: 79.9, rating: 4.8, readers: 2340, tags: ["K线", "技术分析", "入门"], description: "从K线组合到实战定式，系统掌握K线操盘精髓。" },
  { id: 13, title: "量化交易入门实战", author: "Ernest Chan", price: 54.0, originalPrice: 108.0, rating: 4.7, readers: 1650, tags: ["量化", "入门", "策略"], description: "量化交易基础教程。" },
  { id: 9, title: "波段交易技术入门与技巧", author: "建格努尔", price: 39.9, originalPrice: 78.0, rating: 4.7, readers: 1980, tags: ["波段", "入门", "实战"], description: "系统学习波段交易法。" },
  { id: 6, title: "K线形态实战技术", author: "张文峰", price: 45.0, originalPrice: 88.0, rating: 4.7, readers: 1620, tags: ["K线形态", "实战", "超趋"], description: "精解经典K线形态。" },
  { id: 5, title: "K线图一看就懂", author: "李明辉", price: 29.9, originalPrice: 58.0, rating: 4.6, readers: 1850, tags: ["K线图", "入门", "图解"], description: "零基础学K线，配合大量图解案例。" },
  { id: 8, title: "1250均线系统法则", author: "张卫星", price: 34.9, originalPrice: 68.0, rating: 4.6, readers: 1450, tags: ["均线", "系统", "三线开花"], description: "三线开花战法详解。" },
  { id: 2, title: "28条期货交易法则", author: "Canter", price: 29.9, originalPrice: 59.9, rating: 4.7, readers: 1560, tags: ["期货", "风控", "规则"], description: "浓缩期货交易核心法则。" },
  { id: 16, title: "期货市场技术分析", author: "约翰·迈吉", price: 55.0, originalPrice: 110.0, rating: 4.6, readers: 1240, tags: ["期货", "技术", "经典"], description: "技术分析圣经之期货篇。" },
];

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
      case "discount": books.sort(function(a,b){return(b.originalPrice-b.price)-(a.originalPrice-a.price)}); break;
      case "new": books.sort(function(a,b){return b.id-a.id}); break;
    }
    return books;
  }, [activeTab]);

  var tabs = [
    { id: "readers", label: "最热门", icon: "🔥" },
    { id: "rating", label: "最高分", icon: "⭐" },
    { id: "discount", label: "最优惠", icon: "💰" },
    { id: "new", label: "最新上架", icon: "🎉" },
  ];

  return (
    <>
      {/* HERO */}
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
            <p className="text-[var(--text-secondary)] text-base max-w-xl">
              发现最受欢迎的精品电子书，看看其他交易者在读什么
            </p>
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

      {/* PODIUM - Top 3 */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Top 3 Podium */}
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
                  {/* Crown accent */}
                  {isFirst&&(
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xl z-10 animate-bounce">👑</div>
                  )}
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 z-10 text-2xl">{getRankDisplay(rank).medal}</div>
                  {/* Cover bg */}
                  <div className="h-28 bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",backgroundSize:"16px 16px"}} />
                    <svg className="w-10 h-10 opacity-20" viewBox="0 0 24 24" fill="none" stroke={rankColors[rank-1]} strokeWidth="1.5">
                      <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7V17" strokeLinecap="round"/>
                    </svg>
                  </div>
                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className={"text-sm font-bold leading-snug line-clamp-1 mb-1 "+(isFirst?"text-[var(--gold)]":"text-[var(--text-primary)]")}>{book.title}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] mb-2">{book.author}</p>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <svg className="w-3 h-3" style={{color:rankColors[rank-1]}} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-[var(--text-secondary)]">{book.rating}</span>
                      <span className="text-[9px] text-[var(--text-muted)]">({book.readers.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-sm font-black" style={{color:rankColors[rank-1]}}>¥{book.price}</span>
                      <span className="text-[9px] text-[var(--text-muted)] line-through">¥{book.originalPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining list (rank 4+) */}
          <div className="max-w-4xl mx-auto space-y-3">
            {rankedBooks.slice(3).map(function(book,idx){
              var rank = idx + 4;
              var discount = Math.round((1-book.price/book.originalPrice)*100);
              return(
                <div key={book.id}
                  className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
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
                          <svg className="w-3 h-3 text-[var(--gold)]" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-[10px] text-[var(--text-secondary)]">{book.rating}</span>
                        </div>
                        <span className="text-[9px] text-[var(--text-muted)]">{book.readers.toLocaleString()} 人已读</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-black text-[var(--red-primary)]">¥{book.price}</div>
                      <div className="text-[9px] text-[var(--text-muted)] line-through">¥{book.originalPrice}</div>
                      {activeTab==="discount"&&<div className="text-[9px] font-bold text-[var(--red-primary)] mt-0.5">-{discount}%</div>}
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
