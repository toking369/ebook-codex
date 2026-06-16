const categories = [
  {
    name: "K线技术",
    count: 86,
    icon: "📊",
    description: "K线形态、组合分析",
    color: "from-red-900/20 to-red-800/5",
    border: "border-red-900/30",
  },
  {
    name: "趋势分析",
    count: 64,
    icon: "📈",
    description: "均线、趋势线、通道",
    color: "from-amber-900/20 to-amber-800/5",
    border: "border-amber-900/30",
  },
  {
    name: "交易心理",
    count: 42,
    icon: "🧠",
    description: "纪律、心态、博弈",
    color: "from-purple-900/20 to-purple-800/5",
    border: "border-purple-900/30",
  },
  {
    name: "量化策略",
    count: 38,
    icon: "🤖",
    description: "算法、回测、系统",
    color: "from-cyan-900/20 to-cyan-800/5",
    border: "border-cyan-900/30",
  },
  {
    name: "期货衍生品",
    count: 51,
    icon: "⚡",
    description: "期货、期权、对冲",
    color: "from-orange-900/20 to-orange-800/5",
    border: "border-orange-900/30",
  },
  {
    name: "投资理念",
    count: 73,
    icon: "🎯",
    description: "价值投资、哲学",
    color: "from-green-900/20 to-green-800/5",
    border: "border-green-900/30",
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-transparent to-[var(--bg-secondary)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full" />
            <span className="text-xs text-[var(--gold-light)] tracking-widest uppercase font-mono">
              分类浏览
            </span>
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
            按<span className="text-[var(--red-primary)]">类别</span>探索
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-3 max-w-lg mx-auto">
            六大核心分类，覆盖交易全领域知识体系
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`group card-glow bg-[var(--bg-card)] border ${cat.border} rounded-xl p-6 cursor-pointer transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {cat.count.toString().padStart(3, "0")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{cat.name}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{cat.description}</p>
              <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] group-hover:text-[var(--red-light)] transition-colors duration-200">
                <span>{cat.count} 本电子书</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
