const testimonials = [
  {
    name: "张宇飞",
    role: "职业交易员",
    avatar: "张",
    content: "墨金书院的电子书质量非常高，K线技术分类里的书几乎涵盖了所有经典。Markdown格式阅读体验远超PDF，强烈推荐。",
    rating: 5,
  },
  {
    name: "李文静",
    role: "个人投资者",
    avatar: "李",
    content: "花了几十块钱买了一本《黄金游戏》，内容深入浅出，对我的交易体系帮助很大。按书付费的模式很友好。",
    rating: 5,
  },
  {
    name: "王明远",
    role: "量化研究员",
    avatar: "王",
    content: "作为量化从业者，这里的策略类书籍很专业。多端同步功能让我在地铁上也能学习，碎片时间充分利用。",
    rating: 4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs text-[var(--gold-light)] tracking-widest uppercase font-mono">
              用户评价
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
            来自<span className="text-[var(--gold)]">交易者</span>的声音
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 relative card-glow transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-4xl text-[var(--red-primary)]/10 font-serif leading-none select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < item.rating ? "text-[var(--gold)]" : "text-[var(--border-color)]"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 relative z-10">
                {item.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--red-primary)]/20 to-[var(--gold)]/20 border border-[var(--red-primary)]/10 flex items-center justify-center text-sm font-bold text-[var(--gold)]">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">{item.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
