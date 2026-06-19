import fitz, os

ebook_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\ebook'
output_dir = 'mkbook'
os.makedirs(output_dir, exist_ok=True)

idx = 0
success = 0
for fname in sorted(os.listdir(ebook_dir)):
    if not fname.lower().endswith('.pdf'):
        continue
    path = os.path.join(ebook_dir, fname)
    size_kb = os.path.getsize(path) // 1024
    if size_kb > 20000 or size_kb < 50:
        continue
    try:
        doc = fitz.open(path)
        total = sum(len(page.get_text().strip()) for page in doc)
        doc.close()
        if total <= 1000:
            continue
        doc = fitz.open(path)
        lines = []
        for page in doc:
            t = page.get_text().strip()
            if t:
                lines.append(t)
        doc.close()
        title = fname.replace('.pdf', '').strip()
        md = f'# {title}\n\n' + '\n\n---\n\n'.join(lines)
        out_path = os.path.join(output_dir, f'{success}.md')
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(md[:80000])
        # Index
        with open(os.path.join(output_dir, '_index.txt'), 'a', encoding='utf-8') as f:
            f.write(f'{success}|{title}|{fname}|{total}|{size_kb}\n')
        print(f'OK  [{success:02d}] {total:>7} chars | {size_kb:>5}KB | {fname}')
        success += 1
    except Exception as e:
        pass
    idx += 1

print(f'\nDone: {success} files converted')