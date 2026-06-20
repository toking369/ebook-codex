import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { allBooks } from "@/data/books";

function normalize(str: string): string {
  return str.replace(/[～\-——_.\s]/g, "").toLowerCase();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bookId = parseInt(id);
  const book = allBooks.find((b) => b.id === bookId);
  
  if (!book) {
    return new NextResponse("Book not found: " + id, { status: 404 });
  }
  
  const booksDir = path.join(process.cwd(), "src", "content", "ebooks");
  
  try {
    const files = fs.readdirSync(booksDir);
    const pdfs = files.filter(f => f.endsWith(".pdf"));
    
    // Try to find a PDF matching the book title
    const bookTitleNorm = normalize(book.title);
    let matchedPdf = pdfs.find(f => {
      const fileNameNorm = normalize(f.replace(".pdf", ""));
      return fileNameNorm.includes(bookTitleNorm) || bookTitleNorm.includes(fileNameNorm);
    });
    
    // Fallback: try with common variations
    if (!matchedPdf) {
      const titleParts = book.title.split(/[.、，【】()（）]/).filter(p => p.length > 2);
      for (const part of titleParts) {
        const partNorm = normalize(part);
        matchedPdf = pdfs.find(f => normalize(f).includes(partNorm));
        if (matchedPdf) break;
      }
    }
    
    // Final fallback: first PDF
    if (!matchedPdf) {
      matchedPdf = pdfs[0];
    }
    
    if (!matchedPdf) {
      return new NextResponse("No PDF files found", { status: 404 });
    }
    
    const pdfPath = path.join(booksDir, matchedPdf);
    const stat = fs.statSync(pdfPath);
    const buffer = fs.readFileSync(pdfPath);
    const blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
    
    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stat.size.toString(),
      },
    });
  } catch (err: any) {
    return new NextResponse("Error: " + err.message, { status: 500 });
  }
}
