export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--red-primary)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--gold)]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--purple-glow)] rounded-full blur-[150px]" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(220,30,30,.5) 25%, rgba(220,30,30,.5) 26%, transparent 27%, transparent 74%, rgba(220,30,30,.5) 75%, rgba(220,30,30,.5) 76%, transparent 77%),
              linear-gradient(90deg, transparent 24%, rgba(220,30,30,.5) 25%, rgba(220,30,30,.5) 26%, transparent 27%, transparent 74%, rgba(220,30,30,.5) 75%, rgba(220,30,30,.5) 76%, transparent 77%)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-[var(--red-primary)]/10 text-xs font-mono tracking-widest rotate-90 origin-left select-none" style={{ writingMode: 'vertical-rl' }}>
        CYBER_EBOK_01 // SECTOR_7G // KNOWLEDGE_IS_POWER
      </div>
      <div className="absolute bottom-20 right-10 text-[var(--red-primary)]/10 text-xs font-mono tracking-widest rotate-90 origin-right select-none" style={{ writingMode: 'vertical-rl' }}>
        TRADE_WITH_WISDOM // DATA_STREAM_ACTIVE // 2026
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--red-primary)]/20 bg-[var(--red-primary)]/5 text-xs text-[var(--red-light)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--red-primary)] animate-pulse" />
          知识付费 · 电子书阅读平台
          <span className="w-2 h-2 rounded-full bg-[var(--red-primary)] animate-pulse" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
          <span className="block text-[var(--text-primary)]">
            用<span className="text-[var(--red-primary)] text-glow-red">知识</span>
          </span>
          <span className="block text-[var(--text-primary)]">
            武装你的<span className="text-[var(--gold)] text-glow-gold">交易</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
          精选证券投资经典著作，从K线入门到量化交易，<br className="hidden md:block" />
          顶级交易员的智慧，尽在<span className="text-[var(--gold)]">墨金书院</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-cyber px-10 py-4 rounded-xl text-base font-bold relative z-10 shadow-lg shadow-[var(--red-primary)]/20 min-w-[180px]">
            探索书库
          </button>
          <button className="px-10 py-4 rounded-xl text-base font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--red-primary)]/30 hover:text-[var(--text-primary)] transition-all duration-300 min-w-[180px]">
            免费试读
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { label: "精选电子书", value: "500+" },
            { label: "注册用户", value: "12,800+" },
            { label: "好评率", value: "98.5%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-[var(--gold)] text-glow-gold">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-[var(--red-primary)]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
