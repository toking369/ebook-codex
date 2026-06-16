
"use client";

import { useSyncExternalStore } from "react";

function subscribeTheme(cb: () => void){var obs=new MutationObserver(cb);obs.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});return function(){obs.disconnect()}}
function getTheme(): boolean{return document.documentElement.getAttribute("data-theme")!=="light"}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeTheme, getTheme, function(){return true});

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.add("transitioning");
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    setTimeout(function(){document.documentElement.classList.remove("transitioning")},400);
    try{localStorage.setItem("theme", next ? "dark" : "light")}catch(e){}
  };

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 rounded-lg cursor-pointer flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--red-primary)]/40 transition-all duration-300 group"
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
      title={isDark ? "亮色模式" : "暗色模式"}
    >
      {/* Sun icon */}
      <svg
        className={"w-4 h-4 absolute transition-all duration-500 " + (isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--gold)" }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon */}
      <svg
        className={"w-4 h-4 absolute transition-all duration-500 " + (isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "var(--red-primary)" }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
