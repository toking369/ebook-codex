"use client";

import { useSyncExternalStore } from "react";

interface BookCoverProps {
  title: string;
  bookId: number;
  author?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.getAttribute("data-theme") !== "light";
}

function getAccentColor(bookId: number) {
  const colors = [
    { dark: "#DC1E1E", light: "#C41E1E" },
    { dark: "#D4A84B", light: "#B8943E" },
    { dark: "#06B6D4", light: "#0891B2" },
    { dark: "#8B5CF6", light: "#7C3AED" },
    { dark: "#22C55E", light: "#16A34A" },
    { dark: "#F97316", light: "#EA580C" },
    { dark: "#EC4899", light: "#DB2777" },
    { dark: "#6366F1", light: "#4F46E5" },
  ];
  return colors[bookId % colors.length];
}

function getGradient(bookId: number) {
  const gradients = [
    "from-[#1a0a0a] via-[#2d0f0f] to-[#0d0d1a]",
    "from-[#0a0d1a] via-[#1a0a1a] to-[#1a1205]",
    "from-[#0a1a1a] via-[#0a1a1a] to-[#0a0d1a]",
    "from-[#0d0d1a] via-[#1a0d2d] to-[#0d1a0d]",
    "from-[#0a1a0a] via-[#0d2d1a] to-[#0d1a0d]",
    "from-[#1a0d0a] via-[#2d1a0d] to-[#1a0d0a]",
    "from-[#1a0a1a] via-[#2d0d2d] to-[#1a0a1a]",
    "from-[#0a0d1a] via-[#0d0d2d] to-[#0a0d1a]",
  ];
  return gradients[bookId % gradients.length];
}

export default function BookCover({ title, bookId, author = "佚名", size = "medium", className = "" }: BookCoverProps) {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => true);
  const accent = getAccentColor(bookId);
  const accentColor = isDark ? accent.dark : accent.light;
  const gradient = getGradient(bookId);

  const sizeStyles = {
    small: { container: "w-12 h-16", icon: "w-5 h-5 mb-1", text: "text-[6px]", titleSize: "text-[6px]" },
    medium: { container: "w-16 h-24", icon: "w-7 h-7 mb-1.5", text: "text-[8px]", titleSize: "text-[8px]" },
    large: { container: "w-28 h-40", icon: "w-10 h-10 mb-2", text: "text-[10px]", titleSize: "text-[10px]" },
  };

  const styles = sizeStyles[size];

  return (
    <div className={`relative rounded-lg overflow-hidden ${styles.container} ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "12px 12px"
        }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: `linear-gradient(90deg, ${accentColor}80, ${accentColor})` }} />
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-1">
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
          <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7V17" strokeLinecap="round" />
          <path d="M8 7V17" strokeOpacity="0.5" strokeLinecap="round" />
          <path d="M16 7V17" strokeOpacity="0.5" strokeLinecap="round" />
        </svg>
        
        <div className="flex flex-col items-center justify-center flex-1 w-full text-center px-0.5">
          <span className={`${styles.titleSize} font-bold leading-tight text-center`} style={{ color: accentColor }}>
            {title}
          </span>
          <span className={`${styles.text} mt-0.5`} style={{ color: accentColor, opacity: 0.7 }}>
            {author}
          </span>
        </div>
        
        <span className={styles.text} style={{ color: accentColor, opacity: 0.6 }}>
          免费
        </span>
      </div>
      
      <div className="absolute -bottom-1 -right-1 text-4xl font-black leading-none opacity-[0.06]" style={{ color: accentColor }}>
        {bookId}
      </div>
    </div>
  );
}