
import re

with open('next-app/src/components/EbookCard.tsx', 'r', encoding='utf-8-sig') as f:
    content = f.read()

content = content.replace(
    'import { useSyncExternalStore } from "react";(',''')
    'import { useSyncExternalStore } from "react";\nimport Link from "next/link";'(',''')
)

old_div = '<div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1">'
new_link = '<Link href={"/ebook/" + book.id + "/read"} className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1 block">'
content = content.replace(old_div, new_link)

content = content.rsplit('\n    </div>', 1)
content = content[0] + '\n    </Link>' + content[1]

with open('next-app/src/components/EbookCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated EbookCard.tsx')
