import EbookCard from "./EbookCard";

const featuredBooks = [
  {
    id: 1,
    title: "K线操盘定式",
    author: "陈培树",
    price: 39.9,
    originalPrice: 79.9,
    rating: 4.8,
    readers: 2340,
    tags: ["K线", "技术分析", "入门"],
    description: "从K线组合到实战定式，系统掌握K线操盘精髓。",
  },
  {
    id: 2,
    title: "黄金游戏（一）从A股获利",
    author: "占豪",
    price: 49.9,
    originalPrice: 99.0,
    rating: 4.9,
    readers: 3890,
    tags: ["A股", "投资策略", "趋势"],
    description: "解读A股市场运行规律，构建稳健获利交易体系。",
  },
  {
    id: 3,
    title: "28条期货交易法则",
    author: "Canter",
    price: 29.9,
    originalPrice: 59.9,
    rating: 4.7,
    readers: 1560,
    tags: ["期货", "风控", "规则"],
    description: "浓缩期货交易核心法则，助你避开致命交易陷阱。",
  },
  {
    id: 4,
    title: "股市趋势技术分析",
    author: "约翰·迈吉",
    price: 59.9,
    originalPrice: 128.0,
    rating: 4.9,
    readers: 5200,
    tags: ["趋势分析", "经典", "理论"],
    description: "技术分析圣经级著作，趋势交易者必读书目。",
  },
];

export default function FeaturedEbooks() {
  return (
    <section className="cursor-pointer py-24 relative">
      {/* Section background */}
      <div className="cursor-pointer absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)] to-transparent" />

      <div className="cursor-pointer relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="cursor-pointer flex items-end justify-between mb-12">
          <div>
            <div className="cursor-pointer inline-flex items-center gap-2 mb-3">
              <div className="cursor-pointer w-1 h-5 bg-[var(--red-primary)] rounded-full" />
              <span className="cursor-pointer text-xs text-[var(--red-light)] tracking-widest uppercase font-mono">
                精选推荐
              </span>
            </div>
            <h2 className="cursor-pointer text-3xl md:text-4xl font-black text-[var(--text-primary)]">
              热门<span className="cursor-pointer text-[var(--gold)]">电子书</span>
            </h2>
          </div>
          <button className="cursor-pointer hidden sm:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--red-light)] transition-colors duration-200">
            查看全部
            <svg className="cursor-pointer w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Books grid */}
        <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <EbookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
