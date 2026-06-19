import os
fp = r'C:\Users\WindowsU3\Desktop\workspace\learn\ebook-project\next-app\src\components\EbookCard.tsx'
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('import { useSyncExternalStore } from "react";', 'import { useSyncExternalStore } from "react";\nimport Link from "next/link";')
old_div = '<div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1">'
new_link = '<Link href={"/ebook/" + book.id + "/read"} className="block cursor-pointer">\n      <div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">'
c = c.replace(old_div, new_link, 1)
c = c.replace('</div>\n    </div>\n  );\n}', '</div>\n    </Link>\n  );\n}')
c = c.replace('>立即购买</button>', '>立即阅读</span>')
with open(fp, 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
