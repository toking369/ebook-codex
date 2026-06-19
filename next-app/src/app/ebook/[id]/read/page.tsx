"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { allBooks } from "@/data/books";

const PdfViewer = dynamic(() => import("@/components/reader/PdfViewer"), { ssr: false });

export default function ReadPage() {
  const params = useParams();
  const id = params.id as string;
  const bookId = parseInt(id);
  const book = allBooks.find((b) => b.id === bookId);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  if (!book) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)]">
        <Header />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-[var(--text-muted)] mb-2">{"未找到该图书"}</h1>
          <Link href="/ebooks" className="text-[var(--red-primary)] hover:underline">{"返回书库"}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {!isFullscreen && <Header transparent={true} />}

      <div className={"flex-1 flex flex-col" + (isFullscreen ? " pt-0" : " pt-16")}>
        {/* Top bar */}
        <div className={"max-w-7xl w-full mx-auto flex items-center justify-between px-6 py-3" + (isFullscreen ? "" : " border-b")}
          style={isFullscreen ? {} : { borderColor: "var(--border-color)" }}>
          <span className="text-sm truncate max-w-[50%]" style={{ color: "var(--text-secondary)" }}>{book?.title}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => {
              if (!document.fullscreenElement) document.documentElement.requestFullscreen();
              else document.exitFullscreen();
            }} className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors"
              style={{ color: "var(--text-secondary)" }} title={isFullscreen ? "退出全屏" : "全屏阅读"}>
              {isFullscreen ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <Link href="/ebooks" className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors" style={{ color: "var(--text-secondary)" }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <PdfViewer bookId={bookId} />
        </div>
      </div>

      {!isFullscreen && <Footer />}
    </main>
  );
}