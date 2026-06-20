import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const booksDir = path.join(process.cwd(), "src", "content", "ebooks");
  
  try {
    const files = fs.readdirSync(booksDir);
    const pdfFile = files.find(f => f.endsWith(".pdf"));
    
    if (!pdfFile) {
      return new NextResponse("No PDF files found", { status: 404 });
    }
    
    const pdfPath = path.join(booksDir, pdfFile);
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
