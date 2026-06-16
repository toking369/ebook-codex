"use client";

import { useState } from "react";
import EbookCard from "./EbookCard";

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

const allBooks: Record<string, Book[]> = {
  "k-line": [
    { id: 1, title: "K线操盘定式", author: "陈培树", price: 39.9, originalPrice: 79.9, rating: 4.8, readers: 2340, tags: ["K线", "技术分析", "入门"], description: "从K线组合到实战定式，系统掌握K线操盘精髓。" },
    { id: 5, title: "K线图一看就懂", author: "李明辉", price: 29.9, originalPrice: 58.0, rating: 4.6, readers: 1850, tags: ["K线图", "入门", "图解"], description: "零基础学K线，配合大量图解案例，一目了然。" },
    { id: 6, title: "K线形态实战技术", author: "张文峰", price: 45.0, originalPrice: 88.0, rating: 4.7, readers: 1620, tags: ["K线形态", "实战", "超趋"], description: "精解经典K线形态，带你识别主力趋势与转折。" },
    { id: 7, title: "70种K线组合形态整理", author: "秘籍编写组", price: 19.9, originalPrice: 39.0, rating: 4.5, readers: 3210, tags: ["K线组合", "实用", "手册"], description: "常见K线组合形态全录，可作为交易参考手册随时查阅。" },
  ],
  "trend": [
    { id: 3, title: "股市趋势技术分析", author: "约翰·迈吉", price: 59.9, originalPrice: 128.0, rating: 4.9, readers: 5200, tags: ["趋势分析", "经典", "理论"], description: "技术分析圣经级著作，趋势交易者必读书目。" },
    { id: 8, title: "1250均线系统法则", author: "张卫星", price: 34.9, originalPrice: 68.0, rating: 4.6, readers: 1450, tags: ["均线", "系统", "三线开花"], description: "三线开花战法详解，掌握均线系统的核心用法。" },
    { id: 9, title: "波段交易技术入门与技巧", author: "建格努尔", price: 39.9, originalPrice: 78.0, rating: 4.7, readers: 1980, tags: ["波段", "入门", "实战"], description: "系统学习波段交易法，把握行情波段波动节奏。" },
  ],
  "psychology": [
    { id: 10, title: "交易心理分析", author: "罗尔·弗兰克", price: 44.9, originalPrice: 88.0, rating: 4.8, readers: 2780, tags: ["心理", "纪律", "博弈"], description: "抖破交易心理障碍，建立科学的交易心态与纪律。" },
    { id: 11, title: "88种股市陷阱", author: "克林格尔", price: 32.0, originalPrice: 65.0, rating: 4.5, readers: 2120, tags: ["陷阱", "规避", "心态"], description: "识别常见交易陷阱，让你少走弯路。" },
    { id: 12, title: "战胜庄家", author: "青木", price: 25.0, originalPrice: 50.0, rating: 4.6, readers: 3650, tags: ["博弈", "庄家", "心态"], description: "入市必读，理解庄家思维，打造强大交易心态。" },
  ],
  "quant": [
    { id: 13, title: "量化交易入门实战", author: "Ernest Chan", price: 54.0, originalPrice: 108.0, rating: 4.7, readers: 1650, tags: ["量化", "入门", "策略"], description: "量化交易基础教程，从策略设计到回测实战。" },
    { id: 14, title: "5分钟动量交易系统", author: "蓝翁居士", price: 28.0, originalPrice: 56.0, rating: 4.4, readers: 1380, tags: ["动量", "系统", "短线"], description: "简单高效的短线交易系统，适合业余投资者。" },
  ],
  "futures": [
    { id: 2, title: "28条期货交易法则", author: "Canter", price: 29.9, originalPrice: 59.9, rating: 4.7, readers: 1560, tags: ["期货", "风控", "规则"], description: "浓缩期货交易核心法则，助你避开致命交易陷阱。" },
    { id: 15, title: "1000%的男人", author: "期货冠军奇迹", price: 49.0, originalPrice: 98.0, rating: 4.8, readers: 2890, tags: ["期货", "传奇", "实战"], description: "期货冠军的买卖方法，倾尽全力的实战经验分享。" },
    { id: 16, title: "期货市场技术分析", author: "约翰·迈吉", price: 55.0, originalPrice: 110.0, rating: 4.6, readers: 1240, tags: ["期货", "技术", "经典"], description: "技术分析圣经之期货篇，深入浅出解析期货市场。" },
  ],
  "philosophy": [
    { id: 4, title: "黄金游戏（一）从A股获利", author: "占豪", price: 49.9, originalPrice: 99.0, rating: 4.9, readers: 3890, tags: ["A股", "投资策略", "趋势"], description: "解读A股市场运行规律，构建稳健获利交易体系。" },
    { id: 17, title: "投资最重要的事", author: "奥斯卡·黑希尔", price: 65.0, originalPrice: 128.0, rating: 4.9, readers: 4500, tags: ["价值投资", "哲学", "经典"], description: "投资大师的智慧结晶，谈投资的本质与人生哲学。" },
    { id: 18, title: "25条股票投资黄金法则", author: "威廉·欧纳尔", price: 22.0, originalPrice: 45.0, rating: 4.5, readers: 2760, tags: ["原则", "法则", "投资"], description: "经典的投资原则汇编，单纯而有力的交易规则。" },
  ],
};

export default function CategoryDetailSection() {
  const [activeTab, setActiveTab] = useState<string>("k-line");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "k-line", name: "K线技术", icon: "📊", color: "#DC1E1E" },
    { id: "trend", name: "趋势分析", icon: "📈", color: "#E8A020" },
    { id: "psychology", name: "交易心理", icon: "🧠", color: "#8B5CF6" },
    { id: "quant", name: "量化策略", icon: "🤖", color: "#06B6D4" },
    { id: "futures", name: "期货衍生品", icon: "⚡", color: "#F97316" },
    { id: "philosophy", name: "投资理念", icon: "🎯", color: "#22C55E" },
  ];

  const currentCat = categories.find((c) => c.id === activeTab);
  const books = allBooks[activeTab] || [];
  const accentColor = currentCat?.color || "#DC1E1E";

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300"
              style={{
                backgroundColor: activeTab === cat.id ? cat.color + "18" : "var(--bg-card)",
                color: activeTab === cat.id ? cat.color : "var(--text-secondary)",
                border: "1px solid " + (activeTab === cat.id ? cat.color + "30" : "var(--border-color)"),
                boxShadow: activeTab === cat.id ? "0 0 20px " + cat.color + "15" : "none",
              }}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* View controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {currentCat?.name}
            </h2>
            <span className="text-sm text-[var(--text-muted)]">({books.length} 本)</span>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
            <button
              onClick={() => setViewMode("grid")}
              className="p-2 rounded-md transition-all duration-200"
              style={{
                backgroundColor: viewMode === "grid" ? accentColor + "15" : "transparent",
                color: viewMode === "grid" ? accentColor : "var(--text-muted)",
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-2 rounded-md transition-all duration-200"
              style={{
                backgroundColor: viewMode === "list" ? accentColor + "15" : "transparent",
                color: viewMode === "list" ? accentColor : "var(--text-muted)",
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="14" height="3" rx="1" />
                <rect x="1" y="6.5" width="14" height="3" rx="1" />
                <rect x="1" y="12" width="14" height="3" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Book grid / list */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <EbookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {books.map((book) => {
              const discount = Math.round((1 - book.price / book.originalPrice) * 100);
              return (
                <div
                  key={book.id}
                  className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex"
                >
                  {/* Mini cover */}
                  <div className="w-24 sm:w-32 flex-shrink-0 bg-gradient-to-br from-[var(--bg-card-hover)] to-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }} />
                    <span className="text-2xl opacity-30 relative z-[1]">📖</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1">{book.title}</h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap" style={{ backgroundColor: accentColor }}>
                          -{discount}%
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mb-2">{book.author}</p>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1 leading-relaxed hidden sm:block">{book.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3" viewBox="0 0 20 20" fill={accentColor} style={{ opacity: 0.8 }}>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-[var(--text-secondary)]">{book.rating}</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">({book.readers.toLocaleString()} 人读过)</span>
                        <div className="flex gap-1">
                          {book.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] border" style={{
                              backgroundColor: accentColor + "08",
                              borderColor: accentColor + "15",
                              color: "var(--text-muted)"
                            }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black" style={{ color: accentColor }}>¥{book.price}</span>
                        <span className="text-[10px] text-[var(--text-muted)] line-through">¥{book.originalPrice}</span>
                      </div>
                      <button className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap"
                        style={{ backgroundColor: accentColor + "15", color: accentColor, border: "1px solid " + accentColor + "30" }}
                      >立即购买</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
