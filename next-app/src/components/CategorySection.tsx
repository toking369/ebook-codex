import Link from "next/link";
import { categories } from "../data/books";

const colorMap: Record<string, { gradient: string; border: string }> = {
  "k-line": { gradient: "from-red-900/20 to-red-800/5", border: "border-red-900/30" },
  trend: { gradient: "from-amber-900/20 to-amber-800/5", border: "border-amber-900/30" },
  psychology: { gradient: "from-purple-900/20 to-purple-800/5", border: "border-purple-900/30" },
  indicators: { gradient: "from-cyan-900/20 to-cyan-800/5", border: "border-cyan-900/30" },
  futures: { gradient: "from-orange-900/20 to-orange-800/5", border: "border-orange-900/30" },
  philosophy: { gradient: "from-green-900/20 to-green-800/5", border: "border-green-900/30" },
  "short-term": { gradient: "from-rose-900/20 to-rose-800/5", border: "border-rose-900/30" },
  trading: { gradient: "from-indigo-900/20 to-indigo-800/5", border: "border-indigo-900/30" },
  selection: { gradient: "from-pink-900/20 to-pink-800/5", border: "border-pink-900/30" },
  beginner: { gradient: "from-teal-900/20 to-teal-800/5", border: "border-teal-900/30" },
};

export default function CategorySection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-transparent to-[var(--bg-secondary)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full" />
            <span className="text-xs text-[var(--gold-light)] tracking-widest uppercase font-mono">分类浏览</span>
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
            按<span className="text-[var(--red-primary)]">类别</span>探索
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-3 max-w-lg mx-auto">
            {categories.length} 大核心分类，覆盖交易全领域知识体系
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const cm = colorMap[cat.id] || { gradient: "from-gray-900/20 to-gray-800/5", border: "border-gray-900/30" };
            return (
              <Link
                href={`/categories/${cat.id}`}
                key={cat.id}
                className={`group card-glow bg-[var(--bg-card)] border ${cm.border} rounded-xl p-6 cursor-pointer transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">{cat.count.toString().padStart(3, "0")}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{cat.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{cat.description}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] group-hover:text-[var(--red-light)] transition-colors duration-200">
                  <span>{cat.count} 本电子书</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}