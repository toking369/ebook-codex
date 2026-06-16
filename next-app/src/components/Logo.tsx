interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 36, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoBg" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#DC1E1E" />
            <stop offset="50%" stopColor="#B81212" />
            <stop offset="100%" stopColor="#8B0000" />
          </linearGradient>
          <linearGradient id="logoGold" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#D4A84B" />
            <stop offset="100%" stopColor="#F0D080" />
          </linearGradient>
          <linearGradient id="glowEdge" x1="0" y1="0" x2="36" y2="36">
            <stop offset="0%" stopColor="#DC1E1E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4A84B" stopOpacity="0.8" />
          </linearGradient>
          <filter id="logoGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#DC1E1E" floodOpacity="0.6" />
          </filter>
        </defs>
        <rect x="1" y="1" width="34" height="34" rx="8" stroke="url(#glowEdge)" strokeWidth="1.5" opacity="0.5" />
        <rect x="2" y="2" width="32" height="32" rx="7" fill="url(#logoBg)" />
        <rect x="5" y="5" width="26" height="26" rx="5" fill="none" stroke="url(#glowEdge)" strokeWidth="0.5" opacity="0.4" />
        <line x1="5" y1="12" x2="31" y2="12" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.5" />
        <line x1="5" y1="24" x2="31" y2="24" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.5" />
        <line x1="12" y1="5" x2="12" y2="31" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.5" />
        <line x1="24" y1="5" x2="24" y2="31" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.5" />
        <path d="M5 9V5H9" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <path d="M31 9V5H27" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <path d="M5 27V31H9" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <path d="M31 27V31H27" stroke="url(#logoGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        <path d="M13 11V25C13 25 14.5 23.5 18 23.5V11C14.5 11 13 11 13 11Z" fill="white" fillOpacity="0.9" />
        <path d="M23 11V25C23 25 21.5 23.5 18 23.5V11C21.5 11 23 11 23 11Z" fill="white" fillOpacity="0.7" />
        <line x1="18" y1="11" x2="18" y2="24" stroke="url(#logoGold)" strokeWidth="1" opacity="0.8" />
        <circle cx="18" cy="18" r="1.5" fill="url(#logoGold)" opacity="0.6" />
        <circle cx="29" cy="7" r="1.5" fill="#DC1E1E" opacity="0.6" filter="url(#logoGlow)" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black tracking-wider text-[var(--text-primary)]">
              墨金<span className="text-[var(--gold)]">书院</span>
            </span>
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[var(--text-muted)] font-mono uppercase">
            Cyber Ebook
          </span>
        </div>
      )}
    </div>
  );
}