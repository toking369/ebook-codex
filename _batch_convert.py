import fitz, os, sys

ebook_dir = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\ebook'
output_dir = 'mkbook'
os.makedirs(output_dir, exist_ok=True)

count = 0
success = 0
for fname in sorted(os.listdir(ebook_dir)):
    if not fname.lower().endswith('.pdf') or count >= 30:
        continue
    path = os.path.join(ebook_dir, fname)
    size_kb = os.path.getsize(path) // 1024
    if size_kb > 20000:
        count += 1
        continue
    try:
        doc = fitz.open(path)
        total_text = 0
        for page in doc:
            total_text += len(page.get_text().strip())
        doc.close()
        if total_text > 1000:
            doc2 = fitz.open(path)
            lines = []
            for page in doc2:
                t = page.get_text().strip()
                if t:
                    lines.append(t)
            doc2.close()
            # Sanitize filename
            title = fname.replace('.pdf', '').strip()
            md = f'# {title}\n\n' + '\n\n---\n\n'.join(lines)
            out_path = os.path.join(output_dir, f'{success}.md')
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(md[:80000])
            meta = f'{success}|{title}|{fname}'
            with open(os.path.join(output_dir, '_index.txt'), 'a', encoding='utf-8') as f:
                f.write(meta + '\n')
            print(f'OK  [{success:02d}] {total_text:>6} chars | {size_kb:>5}KB | {fname}')
            success += 1
        else:
            print(f'SKP [{count:02d}] no text | {size_kb:>5}KB | {fname}')
    except Exception as e:
        print(f'ERR [{count:02d}] {fname}: {str(e)[:50]}')
    count += 1

print(f'\nDone: {success} files converted, {count} scanned.')