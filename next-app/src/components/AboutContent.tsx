"use client";

const stats = [
  { label: "精选电子书", value: "500+", icon: "📚" },
  { label: "注册用户", value: "50,000+", icon: "👥" },
  { label: "好评率", value: "99.2%", icon: "⭐" },
  { label: "已有书籍类别", value: "8", icon: "📊" },
];

const milestones = [
  { year: "2024 Q1", title: "平台上线", desc: "黑金书院正式上线，首批50+ 本精选电子书。" },
  { year: "2024 Q3", title: "用户突破", desc: "注册用户突破5000人，开启多端同步阅读功能。" },
  { year: "2025 Q1", title: "内容体系完善", desc: "书库规模突破300本，覆盖全类技术分析与投资理念。" },
  { year: "2025 Q3", title: "社群生态", desc: "启动交易者社群，开设在线读书会与专家分享。" },
  { year: "2026 Q1", title: "书库进化", desc: "实现书库规模400+，引入AI智能推荐与个性化阅读体验。" },
  { year: "2026 Q2", title: "多端升级", desc: "全面升级多端同步体验，支持离线阅读与筆记同步功能。" },
  { year: "2026 H2", title: "更多可能", desc: "筹划中：专属交易者社区、读书记录分享、专家直播课程。" },
];

const values = [
  { title: "精品至上", desc: "每一本书都经过专业人士筛选，确保内容质量。", icon: "💎" },
  { title: "知识平权", desc: "以最合理的价格让每一位交易者都能获得精品内容。", icon: "⚖️" },
  { title: "技术驱动", desc: "采用Markdown格式，提供流畅的阅读体验与自定义显示。", icon: "💻" },
  { title: "社群共进", desc: "与数万交易者共同学习、分享、进步。", icon: "🤝" },
];

export default function AboutContent() {
  return (
    <section className="py-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 text-center card-glow transition-all duration-300">
              <span className="text-3xl mb-3 block">{stat.icon}</span>
              <div className="text-3xl font-black text-[var(--gold)] text-glow-gold mb-1">{stat.value}</div>
              <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-2">
              发展<span className="text-[var(--gold)]">历程</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">一起见证黑金书院的成长</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--red-primary)]/30 via-[var(--gold)]/30 to-[var(--red-primary)]/30 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((item, idx) => (
                <div key={idx} className={"relative flex items-start gap-6 " + (idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
                  <div className={"flex-1 " + (idx % 2 === 0 ? "md:text-right" : "md:text-left")}>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 card-glow transition-all duration-300">
                      <span className="text-xs font-bold text-[var(--red-light)] tracking-wider">{item.year}</span>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mt-1 mb-1">{item.title}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[var(--red-primary)] border-2 border-[var(--bg-primary)] -translate-x-1/2 mt-6" style={{ boxShadow: "0 0 8px rgba(220,30,30,0.4)" }} />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="pb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-2">
              核心<span className="text-[var(--red-primary)]">价值观</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">坚守的信念，驱动我们前行</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-6 text-center card-glow transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--red-primary)]/10 to-[var(--gold)]/10 border border-[var(--red-primary)]/10 flex items-center justify-center text-2xl">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
