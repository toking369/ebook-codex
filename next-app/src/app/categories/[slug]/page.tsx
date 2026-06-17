'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EbookCard from '@/components/EbookCard';
import { allBooks, categoryMap, categoryDetailData } from '@/data/books';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const catInfo = categoryMap[slug];
  const detailInfo = categoryDetailData[slug] || { title: slug, subtitle: '' };
  const [sortBy, setSortBy] = useState('popular');

  const catBooks = useMemo(() => {
    let books = allBooks.filter((b) => b.category === slug);
    switch (sortBy) {
      case 'popular': books.sort((a, b) => b.readers - a.readers); break;
      case 'rating': books.sort((a, b) => b.rating - a.rating); break;
      case 'price-low': books.sort((a, b) => a.price - b.price); break;
      case 'price-high': books.sort((a, b) => b.price - a.price); break;
    }
    return books;
  }, [slug, sortBy]);

  if (!catInfo) {
    return (
      <main className="cyber-grid min-h-screen">
        <Header />
        <section className="relative pt-32 pb-16 text-center">
          <div className="text-6xl mb-4 opacity-20">📒</div>
          <h1 className="text-2xl font-bold text-[var(--text-muted)] mb-2">未找到该分类</h1>
          <Link href="/categories" className="text-[var(--red-primary)] hover:underline">返回分类页</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const a = catInfo.color;
  const sortOptions = [
    { value: 'popular', label: '最热门' },
    { value: 'rating', label: '最高分' },
    { value: 'price-low', label: '价格从低' },
    { value: 'price-high', label: '价格从高' },
  ];

  return (
    <main className="cyber-grid min-h-screen">
      <Header />
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: a + '10' }} />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ backgroundColor: a + '08' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-8">
            <Link href="/" className="hover:text-[var(--red-light)] transition-colors">{'首页'}</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-[var(--red-light)] transition-colors">{'分类'}</Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{detailInfo.title}</span>
          </div>

          {/* Hero Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-xs" style={{
              borderColor: a + '30',
              backgroundColor: a + '10',
              color: a,
            }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: a }} />
              {catInfo.name} · {catBooks.length} 本电子书
            </div>

            <div className="flex items-start justify-between gap-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-3">
                  <span style={{ color: a }}>{detailInfo.title}</span>
                </h1>
                <p className="text-[var(--text-secondary)] text-base max-w-xl">{detailInfo.subtitle}</p>
              </div>

              <div className="hidden lg:flex items-center gap-6 px-6 py-4 rounded-xl border bg-[var(--bg-card)]" style={{ borderColor: a + '20' }}>
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: a }}>{catBooks.length}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{'电子书'}</div>
                </div>
                <div className="w-px h-10" style={{ backgroundColor: a + '20' }} />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: a }}>{catBooks.length > 0 ? (catBooks.reduce((s, b) => s + b.rating, 0) / catBooks.length).toFixed(1) : '0.0'}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{'平均评分'}</div>
                </div>
                <div className="w-px h-10" style={{ backgroundColor: a + '20' }} />
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: a }}>{catBooks.reduce((s, b) => s + b.readers, 0).toLocaleString()}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{'总阅读'}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {catInfo.popular.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border" style={{
                  backgroundColor: a + '08',
                  borderColor: a + '15',
                  color: a,
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="text-sm text-[var(--text-muted)]">
              {'共'} <span className="font-bold" style={{ color: a }}>{catBooks.length}</span> {'本电子书'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">{'排序：'}</span>
              <div className="flex items-center gap-1 p-1 rounded-lg border bg-[var(--bg-card)]" style={{ borderColor: 'var(--border-color)' }}>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: sortBy === opt.value ? a : 'transparent',
                      color: sortBy === opt.value ? '#fff' : 'var(--text-muted)',
                    }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {catBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {catBooks.map((book) => (
                <div key={book.id} className="relative">
                  {(book.isNew || book.isHot) && (
                    <div className="absolute -top-2 -right-2 z-20">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold text-white shadow-lg ${book.isNew ? 'bg-[#22C55E]' : ''}`}
                        style={!book.isNew ? { backgroundColor: a } : {}}>
                        {book.isNew ? 'NEW' : 'HOT'}
                      </span>
                    </div>
                  )}
                  <EbookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="text-5xl mb-4 opacity-20">📚</div>
              <h3 className="text-lg font-bold text-[var(--text-muted)] mb-2">{'暂无电子书'}</h3>
              <p className="text-sm text-[var(--text-muted)] opacity-60">{'该分类下还没有上架电子书'}</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

