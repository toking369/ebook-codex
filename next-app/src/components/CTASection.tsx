export default function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--red-primary)]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Cyber decorative border */}
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-[var(--red-primary)]/30 via-[var(--gold)]/20 to-[var(--red-primary)]/30 mb-8">
          <div className="bg-[var(--bg-primary)] rounded-2xl p-12 md:p-16">
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--red-primary)]/30" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--red-primary)]/30" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--red-primary)]/30" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--red-primary)]/30" />

            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-4">
              开启你的<span className="text-[var(--red-primary)] text-glow-red">交易进阶</span>之路
            </h2>
            <p className="text-[var(--text-secondary)] text-base md:text-lg mb-8 max-w-lg mx-auto">
              加入墨金书院，用知识武装交易，让每一笔投资都有据可依
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-cyber px-10 py-4 rounded-xl text-base font-bold relative z-10 shadow-lg shadow-[var(--red-primary)]/20 min-w-[180px]">
                立即注册 · 免费试读
              </button>
              <button className="px-8 py-4 rounded-xl text-base font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--gold)]/30 hover:text-[var(--gold)] transition-all duration-300">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
