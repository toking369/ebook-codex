"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "首页", href: "/" },
  { label: "书库", href: "/ebooks" },
  { label: "分类", href: "/categories" },
  { label: "排行榜", href: "/ranking" },
  { label: "关于", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--red-light)] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--red-primary)] group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="hidden sm:block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
            登录
          </button>
          <button className="btn-cyber px-5 py-2 rounded-lg text-sm font-medium relative z-10">
            注册
          </button>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--red-primary)]/20 to-transparent" />
    </header>
  );
}