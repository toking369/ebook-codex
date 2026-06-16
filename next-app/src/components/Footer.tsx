import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  产品: [
    { label: "书库", href: "/ebooks" },
    { label: "分类", href: "/categories" },
    { label: "排行榜", href: "/ranking" },
    { label: "价格", href: "/pricing" },
  ],
  支持: [
    { label: "帮助中心", href: "/help" },
    { label: "阅读指南", href: "/guide" },
    { label: "常见问题", href: "/faq" },
    { label: "反馈建议", href: "/feedback" },
  ],
  关于: [
    { label: "关于我们", href: "/about" },
    { label: "合作洽谈", href: "/cooperation" },
    { label: "用户协议", href: "/terms" },
    { label: "隐私政策", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      {/* Top glow */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--red-primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[220px]">
              知识付费电子书阅读平台，专注证券投资领域精品内容。
            </p>
            <div className="flex items-center gap-3 mt-4">
              {["微信", "微博", "抖音"].map((platform) => (
                <span
                  key={platform}
                  className="text-xs px-3 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--red-primary)]/30 hover:text-[var(--red-light)] transition-all duration-200 cursor-pointer"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs text-[var(--text-muted)] font-semibold tracking-widest uppercase mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--red-light)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} 墨金书院. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span className="font-mono">v2.0.1</span>
            <span>|</span>
            <span>沪ICP备2024XXXXXX号</span>
            <span>|</span>
            <span className="font-mono tracking-widest">MADE WITH BLOOD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}