
import os, sys, json

ebook_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\ebook'
output_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\next-app\src\content\ebooks'

os.makedirs(output_dir, exist_ok=True)

# Book ID -> filename mapping (manually matched)
mapping = [
    # (bookId, category, title, real_filename)
    (7, 'k-line', '70种K线组合形态整理', '70种K线组合形态整理.pdf'),
    (12, 'psychology', '战胜庄家', '青木-战胜庄家.pdf'),
    (2, 'futures', '28条期货交易法则', '28条期货交易法则.pdf'),
    (18, 'philosophy', '25条股票投资黄金法则', '25条股票投资黄金法则.doc'),
]

def convert_pdf_to_md(pdf_path, book_id, title):
    import fitz
    doc = fitz.open(pdf_path)
    lines = []
    lines.append(f'# {title}')
    lines.append('')
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        if text.strip():
            lines.append(text)
        lines.append('')
        lines.append('---')
        lines.append('')
    
    doc.close()
    return '\n'.join(lines)

def convert_doc_to_md(doc_path, book_id, title):
    import mammoth
    with open(doc_path, 'rb') as f:
        result = mammoth.convert_to_markdown(f)
        md_content = result.value
    return f'# {title}\n\n{md_content}'

for book_id, cat, title, filename in mapping:
    src_path = os.path.join(ebook_dir, filename)
    if not os.path.exists(src_path):
        print(f'MISSING: {filename}')
        continue
    
    ext = filename.rsplit('.', 1)[1].lower()
    print(f'Converting: {title} ({ext}, {os.path.getsize(src_path)//1024}KB)...')
    
    try:
        if ext == 'pdf':
            md = convert_pdf_to_md(src_path, book_id, title)
        elif ext == 'doc':
            md = convert_doc_to_md(src_path, book_id, title)
        else:
            print(f'  SKIP: unsupported format {ext}')
            continue
        
        # Trim to reasonable size - first 50KB or so for a preview
        max_chars = 50000
        if len(md) > max_chars:
            md = md[:max_chars] + '\n\n> *（内容过长已截断，仅显示前50KB）*'
        
        out_path = os.path.join(output_dir, f'{book_id}.md')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(md)
        
        print(f'  OK -> {out_path} ({len(md)} chars)')
    except Exception as e:
        print(f'  ERROR: {e}')

print('\nDone!')
