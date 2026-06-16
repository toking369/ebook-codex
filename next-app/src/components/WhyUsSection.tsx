const reasons = [
  {
    title: "精选内容",
    description: "500+本专业证券投资电子书，每一个品类都经过专业人士筛选推荐。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Markdown 阅读",
    description: "所有电子书均采用Markdown格式呈现，支持自定义字体、字号、主题，阅读体验极佳。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "知识付费",
    description: "按电子书付费，一次购买永久阅读。用最经济的投入换取最有价值的交易智慧。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "多端同步",
    description: "支持PC、平板、手机多端阅读，阅读进度云端同步，随时随地学习。",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-[var(--red-primary)]/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs text-[var(--red-light)] tracking-widest uppercase font-mono">
              为什么选择我们
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--text-primary)]">
            四大<span className="text-[var(--red-primary)]">核心优势</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 text-center transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[var(--red-primary)]/10 to-[var(--gold)]/10 border border-[var(--red-primary)]/10 flex items-center justify-center text-[var(--red-light)] group-hover:bg-[var(--red-primary)]/15 transition-all duration-300">
                {reason.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
