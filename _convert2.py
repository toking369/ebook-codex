
import os, sys

ebook_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\ebook'
output_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\next-app\src\content\ebooks'
os.makedirs(output_dir, exist_ok=True)

import fitz
books_with_text = [
    (3, 'trend', '股市趋势技术分析', '炒股的智慧 作者：陈江挺.pdf'),
]

def extract_pdf_text(pdf_path, max_chars=80000):
    doc = fitz.open(pdf_path)
    lines = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text().strip()
        if text:
            lines.append(text)
        if sum(len(l) for l in lines) > max_chars:
            break
    doc.close()
    return '\n\n---\n\n'.join(lines)

for book_id, cat, title, filename in books_with_text:
    src = os.path.join(ebook_dir, filename)
    if not os.path.exists(src):
        print(f'MISSING: {filename}')
        continue
    print(f'Extracting: {title} ({os.path.getsize(src)//1024}KB)...')
    text = extract_pdf_text(src)
    md = f'# {title}\n\n{text}'
    out = os.path.join(output_dir, f'{book_id}.md')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(md)
    print(f'  -> {out} ({len(md)} chars)')

manual_mds = {}

code = open('_manual_mds.txt', 'r', encoding='utf-8').read()
exec(code)

for book_id, md_content in manual_mds.items():
    out = os.path.join(output_dir, f'{book_id}.md')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f'Wrote manual MD: {book_id}.md ({len(md_content)} chars)')

print('\nDone!')
