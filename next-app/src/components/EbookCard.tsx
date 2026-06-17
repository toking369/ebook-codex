"use client";

import { useSyncExternalStore } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  readers: number;
  tags: string[];
  description: string;
}

interface CoverTheme {
  gradient: string;
  accentColor: string;
  icon: string;
  badgeText: string;
  gridOpacity: string;
  iconBg: string;
  iconBorder: string;
}

const coverThemesDark: Record<number, CoverTheme> = {
  1: { gradient: "from-[#1a0a0a] via-[#2d0f0f] to-[#0d0d1a]", accentColor: "#DC1E1E", icon: "\ud83d\udcca", badgeText: "K\u7ebf\u7ecf\u5178", gridOpacity: "0.07", iconBg: "#DC1E1E12", iconBorder: "#DC1E1E25" },
  2: { gradient: "from-[#0a0d1a] via-[#1a0a1a] to-[#1a1205]", accentColor: "#D4A84B", icon: "\ud83c\udfaf", badgeText: "\u6295\u8d44\u5fc5\u8bfb", gridOpacity: "0.07", iconBg: "#D4A84B12", iconBorder: "#D4A84B25" },
  3: { gradient: "from-[#0d0d0d] via-[#1a0505] to-[#05051a]", accentColor: "#FF4444", icon: "\u26a1", badgeText: "\u671f\u8d27\u7cbe\u8981", gridOpacity: "0.07", iconBg: "#FF444412", iconBorder: "#FF444425" },
  4: { gradient: "from-[#0a0505] via-[#1a0d05] to-[#050d1a]", accentColor: "#E8A020", icon: "\ud83d\udcc8", badgeText: "\u8d8b\u52bf\u7ecf\u5178", gridOpacity: "0.07", iconBg: "#E8A02012", iconBorder: "#E8A02025" },
};

const coverThemesLight: Record<number, CoverTheme> = {
  1: { gradient: "from-[#fdf2f2] via-[#f8e0e0] to-[#f0cccc]", accentColor: "#C41E1E", icon: "\ud83d\udcca", badgeText: "K\u7ebf\u7ecf\u5178", gridOpacity: "0.04", iconBg: "#C41E1E0A", iconBorder: "#C41E1E18" },
  2: { gradient: "from-[#faf6ed] via-[#f5edda] to-[#ede2c4]", accentColor: "#B8943E", icon: "\ud83c\udfaf", badgeText: "\u6295\u8d44\u5fc5\u8bfb", gridOpacity: "0.04", iconBg: "#B8943E0A", iconBorder: "#B8943E18" },
  3: { gradient: "from-[#fdf0f0] via-[#f8dada] to-[#f0c4c4]", accentColor: "#D43030", icon: "\u26a1", badgeText: "\u671f\u8d27\u7cbe\u8981", gridOpacity: "0.04", iconBg: "#D430300A", iconBorder: "#D4303018" },
  4: { gradient: "from-[#fdf8f0] via-[#f8eeda] to-[#f0e2c4]", accentColor: "#C89020", icon: "\ud83d\udcc8", badgeText: "\u8d8b\u52bf\u7ecf\u5178", gridOpacity: "0.04", iconBg: "#C890200A", iconBorder: "#C8902018" },
};

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.getAttribute("data-theme") !== "light";
}

export default function EbookCard({ book }: { book: Book }) {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => true);

  const discount = Math.round((1 - book.price / book.originalPrice) * 100);
  const themes = isDark ? coverThemesDark : coverThemesLight;
  const theme = themes[book.id] || themes[1];
  const a = theme.accentColor;

  const textPrimary = isDark ? "text-white" : "text-[#1A1A2E]";
  const textAuthor = isDark ? "text-white/50" : "text-[#5A5550]/70";
  const starFill = isDark ? "0.9" : "1.0";
  const starEmpty = isDark ? "0.15" : "0.25";

  return (
    <div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1">
      <div className={"relative aspect-[3/4] bg-gradient-to-br " + theme.gradient + " overflow-hidden"}>
        <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700" style={{background: "radial-gradient(circle at 30% 20%, " + a + "22 0%, transparent 50%), radial-gradient(circle at 70% 80%, " + a + "11 0%, transparent 40%)"}} />
        <div className={"absolute inset-0 opacity-[" + theme.gridOpacity + "]"} style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px"}} />
        <div className="absolute -top-4 -right-4 text-[120px] font-black leading-none select-none opacity-[0.04]" style={{color: a}}>{String(book.id).padStart(2, "0")}</div>
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md backdrop-blur-sm border" style={{backgroundColor: a + "15", borderColor: a + "30"}}>
            <span className="text-[11px]">{theme.icon}</span>
            <span className="text-[10px] font-semibold tracking-wider" style={{color: a}}>{theme.badgeText}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <div className="relative w-[52px] h-[52px] flex items-center justify-center">
            <svg viewBox="0 0 52 52" className="absolute inset-0 w-full h-full" style={{filter: "drop-shadow(0 0 6px " + a + "60)"}}>
              <polygon points="26,2 38,12 38,30 26,50 14,30 14,12" fill={a} />
            </svg>
            <span className="relative z-10 text-white text-[11px] font-black leading-tight text-center">-{discount}<br /><span className="text-[8px]">OFF</span></span>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 z-[1]">
          <div className="w-16 h-[2px] mb-5 rounded-full" style={{background: "linear-gradient(90deg, transparent, " + a + "80, transparent)"}} />
          <div className="mb-5 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm border" style={{backgroundColor: theme.iconBg, borderColor: theme.iconBorder}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7V17" stroke={a} strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M8 7V17" stroke={a} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
              <path d="M16 7V17" stroke={a} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
            </svg>
          </div>
          <h3 className={"text-lg font-bold leading-snug text-center mb-2 drop-shadow-lg line-clamp-2 " + textPrimary} style={{textShadow: "0 0 20px " + a + "40, 0 2px 4px rgba(0,0,0,0.15)"}}>{book.title}</h3>
          <p className={"text-xs " + textAuthor}>{book.author}</p>
          <div className="flex items-center gap-1 mt-4">
            {[1,2,3,4,5].map((star) => (
              <svg key={star} className="w-3 h-3" viewBox="0 0 20 20" fill={star <= Math.round(book.rating) ? a : "none"} stroke={a} strokeWidth="1" style={{opacity: star <= Math.round(book.rating) ? starFill : starEmpty}}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 flex items-end p-5">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[1px]" style={{backgroundColor: a}} />
              <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-white/60" style={{color: a}}>ABOUT</span>
            </div>
            <p className="text-xs text-white/85 leading-relaxed line-clamp-3">{book.description}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-10 h-10"><div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 transition-all duration-300 group-hover:w-8 group-hover:h-8" style={{borderColor: a + "40"}} /></div>
        <div className="absolute bottom-0 left-0 w-10 h-10"><div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 transition-all duration-300 group-hover:w-8 group-hover:h-8" style={{borderColor: a + "40"}} /></div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">{book.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium border text-[var(--text-muted)] transition-colors duration-200" style={{backgroundColor: a + "08", borderColor: a + "15"}}>{tag}</span>))}</div>
        <div className="mb-3"><h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5 line-clamp-1">{book.title}</h4><p className="text-xs text-[var(--text-muted)]">{book.author}</p></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={a} style={{opacity: 0.8}}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-[var(--text-secondary)]">{book.rating}</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">(人读过)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5"><span className="text-lg font-black" style={{color: a}}>￥{book.price}</span><span className="text-[10px] text-[var(--text-muted)] line-through">￥{book.originalPrice}</span></div>
          <button className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 group/btn cursor-pointer" style={{backgroundColor: a + "15", color: a, border: "1px solid " + a + "30"}}
          >立即购买</button>
        </div>
      </div>
    </div>
  );
}
