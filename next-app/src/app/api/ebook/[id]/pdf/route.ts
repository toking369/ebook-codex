import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PDF_MAP: Record<string, string> = {
  "1": Buffer.from("S+e6v+aTjeebmOWumuW8jy5wZGY=", "base64").toString(),
  "2": Buffer.from("MjjmnaHmnJ/otKfkuqTmmJPms5XliJkucGRm", "base64").toString(),
  "3": Buffer.from("6IKh5biC6LaL5Yq/5oqA5pyv5YiG5p6Q77yI56ysOOeJiO+8iS5wZGY=", "base64").toString(),
  "4": Buffer.from("6buE6YeR5ri45oiP77yI5LiA77yJ5LuOQeiCoeiOt+WIqS7ljaDosaou5omr5o+P54mILnBkZg==", "base64").toString(),
  "5": Buffer.from("S+e6v+WbvuS4gOeci+WwseaHgi5wZGY=", "base64").toString(),
  "6": Buffer.from("S+e6v+W9ouaAgeWunuaImOaKgOacry5wZGY=", "base64").toString(),
  "7": Buffer.from("NzDnp41L57q/57uE5ZCI5b2i5oCB5pW055CGLnBkZg==", "base64").toString(),
  "8": Buffer.from("MTI1MOWdh+e6v+ezu+e7n+azleWIme+8muS4iee6v+W8gOiKseS5izHvvIjlvKDljavmmJ/vvIlCLnBkZg==", "base64").toString(),
  "11": Buffer.from("ODjnp43ogqHluILpmbfpmLEucGRm", "base64").toString(),
  "12": Buffer.from("6Z2S5pyoLeaImOiDnOW6hOWuti5wZGY=", "base64").toString(),
  "14": Buffer.from("NeWIhumSn+WKqOmHj+S6pOaYk+ezu+e7ny5wZGY=", "base64").toString(),
  "15": Buffer.from("MTAwMCXnmoTnlLfkurrvvJrmnJ/otKflhqDlhpvlpYfov7nnmoTkubDljZbmlrnms5UucGRm", "base64").toString(),
  "16": Buffer.from("W+acn+i0p+W4guWcuuaKgOacr+WIhuaekF0u57qm57+wLuWiqOiPsi7miavmj4/niYgucGRm", "base64").toString(),
  "19": Buffer.from("S0RK5oyH5qCH5YWl6Zeo5LiO5a6e5oiY57K+6KejXzEzOTYwMzcxLnBkZg==", "base64").toString(),
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pdfName = PDF_MAP[id];

  if (!pdfName) {
    return new NextResponse("PDF not found for id: " + id + " keys: " + Object.keys(PDF_MAP).join(","), { status: 404 });
  }

  const filePath = path.join(process.cwd(), "src", "content", "ebooks", pdfName);
  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found: " + filePath, { status: 404 });
    }
    const stat = fs.statSync(filePath);
    const buffer = fs.readFileSync(filePath);
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
