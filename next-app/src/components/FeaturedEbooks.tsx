import Link from "next/link";
import EbookCard from "./EbookCard";
import { allBooks } from "../data/books";

export default function FeaturedEbooks() {
  const featuredBooks = allBooks.filter((b) => b.isHot).slice(0, 8);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[var(--red-primary)] rounded-full" />
              <span className="text-xs text-[var(--red-light)] tracking-widest uppercase font-mono">精选推荐</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
              热门<span className="text-[var(--gold)]">电子书</span>
            </h2>
          </div>
          <Link href="/ebooks" className="hidden sm:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--red-light)] transition-colors duration-200 cursor-pointer">
            查看全部
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (<EbookCard key={book.id} book={book} />))}
        </div>
      </div>
    </section>
  );
}