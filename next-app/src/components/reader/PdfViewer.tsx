"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs";

export default function PdfViewer({ bookId }: { bookId: number }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const onLoadError = useCallback((err: Error) => {
    setError(err.message);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full overflow-y-auto px-4 py-4">
      {/* Status */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-[var(--red-primary)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-[var(--text-muted)]">正在加载PDF文档...</p>
        </div>
      )}
      {error && (
        <div className="py-20 text-center">
          <p className="text-sm text-[var(--red-primary)] mb-2">PDF加载失败</p>
          <p className="text-xs text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      {/* PDF Document */}
      <Document
        file={`/api/ebook/${bookId}/pdf`}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={null}
      >
        <div className="flex flex-col items-center gap-2">
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={typeof window !== "undefined" ? Math.min(window.innerWidth - 80, 1400) : 1200}
          />
        </div>
      </Document>

      {/* Navigation */}
      {numPages > 0 && (
        <div className="sticky bottom-0 flex items-center gap-4 mt-6 mb-4 px-6 py-3 rounded-xl border bg-[var(--bg-card)]" style={{ borderColor: "var(--border-color)" }}>
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            {"上一页"}
          </button>
          <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{pageNumber}</span>
            <span>/</span>
            <span>{numPages}</span>
          </div>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            {"下一页"}
          </button>
        </div>
      )}
    </div>
  );
}
