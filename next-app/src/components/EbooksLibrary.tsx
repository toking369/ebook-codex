"use client";

import { useState, useMemo } from "react";
import EbooksHero from "./EbooksHero";
import EbookCard from "./EbookCard";
import { allBooks } from "../data/books";

const ITEMS_PER_PAGE = 8;

type SortType = "popular" | "rating" | "newest";

export default function EbooksLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBooks = useMemo(() => {
    let books = [...allBooks];

    if (activeCategory !== "all") {
      books = books.filter((b) => b.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          b.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "popular": books.sort((a, b) => b.readers - a.readers); break;
      case "rating": books.sort((a, b) => b.rating - a.rating); break;
      case "newest": books.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1)); break;
    }

    return books;
  }, [activeCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const pagedBooks = filteredBooks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const sortOptions: { value: SortType; label: string }[] = [
    { value: "popular", label: "最热门" },
    { value: "rating", label: "最高分" },
    { value: "newest", label: "最新上架" },
  ];

  return (
    <section className="cursor-pointer py-10 relative">
      <div className="cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />

      <div className="cursor-pointer relative z-10 max-w-7xl mx-auto px-6">
        <EbooksHero
          activeCategory={activeCategory}
          onCategoryChange={(id) => { setActiveCategory(id); setCurrentPage(1); }}
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }}
          totalResults={filteredBooks.length}
        />

        <div className="cursor-pointer flex items-center justify-between mb-6">
          <div className="cursor-pointer text-sm text-[var(--text-muted)]">
            已筛选 <span className="cursor-pointer text-[var(--text-secondary)] font-bold">{filteredBooks.length}</span> 本
          </div>
          <div className="cursor-pointer flex items-center gap-2">
            <span className="cursor-pointer text-xs text-[var(--text-muted)]">排序：</span>
            <div className="cursor-pointer flex items-center gap-1 p-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)]">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className="cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    backgroundColor: sortBy === opt.value ? "var(--red-primary)" : "transparent",
                    color: sortBy === opt.value ? "#fff" : "var(--text-muted)",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pagedBooks.length > 0 ? (
          <>
            <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {pagedBooks.map((book) => (
                <div key={book.id} className="cursor-pointer relative">
                  {(book.isNew || book.isHot) && (
                    <div className="cursor-pointer absolute -top-2 -right-2 z-20">
                      <span className={"px-2 py-0.5 rounded text-[9px] font-bold text-white shadow-lg " + (book.isNew ? "bg-[#22C55E]" : "bg-[var(--red-primary)]")}>
                        {book.isNew ? "NEW" : "HOT"}
                      </span>
                    </div>
                  )}
                  <EbookCard book={book} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="cursor-pointer flex items-center justify-center gap-2 pb-10">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer px-3 py-2 rounded-lg text-xs border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                >
                  <svg className="cursor-pointer w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer w-9 h-9 rounded-lg text-xs font-bold transition-all duration-200"
                    style={{
                      backgroundColor: currentPage === page ? "var(--red-primary)" : "var(--bg-card)",
                      color: currentPage === page ? "#fff" : "var(--text-secondary)",
                      border: "1px solid " + (currentPage === page ? "var(--red-primary)" : "var(--border-color)"),
                    }}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer px-3 py-2 rounded-lg text-xs border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
                >
                  <svg className="cursor-pointer w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="cursor-pointer py-20 text-center">
            <div className="cursor-pointer text-5xl mb-4 opacity-20">📚</div>
            <h3 className="cursor-pointer text-lg font-bold text-[var(--text-muted)] mb-2">未找到相关书籍</h3>
            <p className="cursor-pointer text-sm text-[var(--text-muted)] opacity-60">请尝试其他搜索关键词或筛选条件</p>
          </div>
        )}
      </div>
    </section>
  );
}