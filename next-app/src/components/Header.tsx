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
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center group cursor-pointer">
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--red-light)] transition-colors duration-200 relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[var(--red-primary)] group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Login Button */}
          <button className="group relative flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--red-primary)]/50 bg-[var(--bg-card)]/50 hover:bg-[var(--bg-card)] transition-all duration-300 cursor-pointer">
            <svg className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--red-primary)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">登录</span>
          </button>
          
          {/* Register Button */}
          <button className="group relative flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[var(--red-primary)] to-[var(--red-primary)]/80 hover:from-[var(--red-primary)]/90 hover:to-[var(--red-primary)] text-white text-sm font-medium shadow-lg shadow-[var(--red-primary)]/20 hover:shadow-[var(--red-primary)]/30 transition-all duration-300 cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="8" r="4"/>
              <path d="M19 8v6M22 11h-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>注册</span>
          </button>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--red-primary)]/20 to-transparent" />
    </header>
  );
}