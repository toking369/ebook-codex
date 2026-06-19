import os

fp='src/components/EbookCard.tsx'
with open(fp,'rb') as f:
    raw = f.read()

# 1. Add useRouter import alongside react import
raw = raw.replace(
    b'import { useSyncExternalStore } from "react";',
    b'import { useSyncExternalStore, useCallback } from "react";\r\nimport { useRouter } from "next/navigation";'
)

# 2. Add onClick handler to the outer div instead of making it a Link
# Change: cursor-pointer hover:scale... to include onClick
old = b'<div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1">'
new = b'<div className="group card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:-translate-y-1" onClick={() => router.push("/ebook/" + book.id + "/read")}>'
raw = raw.replace(old, new, 1)

# 3. Add router initialization 
# Find: export default function EbookCard({ book }: { book: Book }) {
# After it, add: const router = useRouter();
old_func = b'export default function EbookCard({ book }: { book: Book }) {'
new_func = b'export default function EbookCard({ book }: { book: Book }) {\r\n  const router = useRouter();'
raw = raw.replace(old_func, new_func, 1)

with open(fp,'wb') as f:
    f.write(raw)
print('Fixed EbookCard.tsx')
