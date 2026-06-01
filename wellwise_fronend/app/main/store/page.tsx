'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useApi } from '@/lib/hooks/use-api';
import { getProductImageUrl } from '@/lib/image-utils';

// ── Source badges ────────────────────────────────────────────────────────────
const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  content_based:    { label: 'Profile',   color: 'bg-sky-500' },
  collaborative:    { label: 'Community', color: 'bg-violet-500' },
  goal_based:       { label: 'Goal',      color: 'bg-emerald-500' },
  bpr_model:        { label: 'AI',        color: 'bg-primary' },
  popular_fallback: { label: 'Popular',   color: 'bg-stone-400' },
};

function SourceBadges({ sources }: Readonly<{ sources?: string[] }>) {
  if (!sources?.length) return null;
  return (
    <div className="flex gap-1 flex-wrap mt-1">
      {sources.map(src => {
        const s = SOURCE_LABELS[src] ?? { label: src, color: 'bg-stone-400' };
        return (
          <span key={src} className={`${s.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
            {s.label}
          </span>
        );
      })}
    </div>
  );
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({
  icon, badge, title, href,
}: Readonly<{ icon: string; badge: string; title: string; href?: string }>) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">{badge}</span>
        </div>
        <h2 className="font-headline text-3xl font-extrabold text-on-surface">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
          See all <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}

// ── Product card (horizontal scroll) ────────────────────────────────────────
function ProductCard({ product, index, showSources = false }: Readonly<{ product: any; index: number; showSources?: boolean }>) {
  const { addToCart } = useApi();

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    try { await addToCart(product.id, 1); alert('Added to cart!'); }
    catch { alert('Failed to add. Please log in.'); }
  };

  return (
    <div className="min-w-65 md:min-w-75 group block shrink-0">
      <div className="aspect-4/5 bg-surface-container-low rounded-3xl overflow-hidden relative">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={getProductImageUrl(product, index)}
        />
      </div>
      <div className="mt-4 space-y-1">
        <Link href={`/main/product-details/${product.slug}`} className="font-headline text-base font-bold text-on-surface hover:text-primary transition-colors block leading-tight">
          {product.name}
        </Link>
        {showSources && <SourceBadges sources={product.sources} />}
        <div className="flex justify-between items-center pt-1">
          <span className="text-primary font-bold font-label">${product.price}</span>
          <button
            onClick={handleAdd}
            className="p-2 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-xl transition-all"
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Horizontal scroll row ────────────────────────────────────────────────────
function ProductRow({ items, showSources = false }: Readonly<{ items: any[]; showSources?: boolean }>) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {items.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} showSources={showSources} />
      ))}
    </div>
  );
}

// ── Empty section placeholder ─────────────────────────────────────────────────
function EmptySection({ message }: Readonly<{ message: string }>) {
  return (
    <div className="text-center py-8 text-stone-400 text-sm font-label">
      <span className="material-symbols-outlined text-2xl block mb-2">inventory_2</span>
      {message}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function Store() {
  const { getProducts, getRecommendations, addToCart, sessionStatus } = useApi();

  const handleAddToCart = async (productId: string) => {
    try { await addToCart(productId, 1); alert('Added to cart!'); }
    catch { alert('Failed to add. Please log in.'); }
  };

  const [products, setProducts]           = useState<any[]>([]);
  const [hybrid, setHybrid]               = useState<any[]>([]);
  const [goalRecs, setGoalRecs]           = useState<any[]>([]);
  const [collaborative, setCollaborative] = useState<any[]>([]);
  const [categories, setCategories]       = useState<any[]>([]);
  const [fbt, setFbt]                     = useState<any[]>([]);
  const [similar, setSimilar]             = useState<any[]>([]);
  const [newArrivals, setNewArrivals]     = useState<any[]>([]);
  const [crossSell, setCrossSell]         = useState<any[]>([]);
  const [loading, setLoading]             = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // ── Always: load products + new arrivals ──────────────────────────────
      const [prodsRes, arrivalsRes] = await Promise.allSettled([
        getProducts('take=12'),
        getRecommendations('new-arrivals', 'limit=6'),
      ]);

      const prods = prodsRes.status === 'fulfilled' ? (prodsRes.value.items ?? []) : [];
      setProducts(prods);
      if (arrivalsRes.status === 'fulfilled') setNewArrivals(arrivalsRes.value.items ?? []);

      // ── Product-ID-based endpoints (use first product) ────────────────────
      const anchorId = prods[0]?.id;
      if (anchorId) {
        const [fbtRes, simRes, csRes] = await Promise.allSettled([
          getRecommendations(`frequently-bought-together/${anchorId}`, 'limit=5'),
          getRecommendations(`similar/${anchorId}`, 'limit=6'),
          getRecommendations(`cross-sell/${anchorId}`, 'limit=6'),
        ]);
        if (fbtRes.status === 'fulfilled') setFbt(fbtRes.value.items ?? []);
        if (simRes.status === 'fulfilled') setSimilar(simRes.value.items ?? []);
        if (csRes.status === 'fulfilled')  setCrossSell(csRes.value.items ?? []);
      }

      // ── Authenticated: personalised endpoints ─────────────────────────────
      if (sessionStatus === 'authenticated') {
        const [hybridRes, goalRes, collabRes, catRes] = await Promise.allSettled([
          getRecommendations('hybrid',        'limit=8'),
          getRecommendations('goal-based',    'limit=6'),
          getRecommendations('collaborative', 'limit=6'),
          getRecommendations('categories',    'limit=6'),
        ]);
        if (hybridRes.status  === 'fulfilled') setHybrid(hybridRes.value.items ?? []);
        if (goalRes.status    === 'fulfilled') setGoalRecs(goalRes.value.items ?? []);
        if (collabRes.status  === 'fulfilled') setCollaborative(collabRes.value.items ?? []);
        if (catRes.status     === 'fulfilled') setCategories(catRes.value.items ?? []);
      }

      setLoading(false);
    }
    loadData();
  }, [sessionStatus, getProducts, getRecommendations]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-stone-600 font-medium">Loading sihatek market…</p>
      </div>
    );
  }

  const row1 = products.slice(0, 3);
  const row2 = products.slice(3, 6);

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mt-6 mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
            Curated for Your <span className="text-primary">Rhythms</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            Every selection is calibrated to your wellness analysis — products that support your current goals and lifestyle.
          </p>
        </div>
        <div className="flex-1 w-full h-80 rounded-4xl overflow-hidden wellness-glow">
          <img
            alt="Serene wellness space"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDND3DiMQEjSKr2xlA3lBMvtzfo-0EN7EEgyI4a65j40CD_QAzUqMuRboeNO4wEyYJeVa2hmnD1sIZX8yoVDpEshS1eCsA6mHzKXypOF9Bw9sTTaaTSbnNTYvj3vGmvmt1XByEpuaBJ8wRrBRVWWPQFjGd-cdtAsWa1U_ksW07mHlIW9ywgjjeLbt4x55eL0QTbOWjoklU2M733vEpOFjg_JrQCsvdti95dA-sk65iYIWiX0KMtkTCxLqANA8mfdCEVuyOGHFznr7ic"
          />
        </div>
      </section>

      {/* ── 1. HYBRID — Recommended for You ─────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="auto_awesome" badge="AI · 4-Source Fusion" title="Recommended for You" href="/main/store/all-products" />
        {hybrid.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hybrid.map((product, i) => (
              <div key={product.id} className="group">
                <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={getProductImageUrl(product, i)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Match</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors block leading-tight line-clamp-2">
                    {product.name}
                  </Link>
                  <SourceBadges sources={product.sources} />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-primary font-bold font-label text-sm">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="p-1.5 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptySection message={sessionStatus === 'authenticated' ? 'No personalized results yet' : 'Log in to see your personalized picks'} />
        )}
      </section>

      {/* ── 2. GOAL-BASED ────────────────────────────────────────────────── */}
      {goalRecs.length > 0 && (
        <section className="mb-20 bg-stone-900 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm mb-6">
              <span className="material-symbols-outlined text-primary text-sm">track_changes</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-variant">AI Goal Matching</span>
            </div>
            <h2 className="font-headline text-4xl font-extrabold leading-tight mb-8">Aligned with Your Wellness Goals</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {goalRecs.map((product, i) => (
                <Link key={product.id} href={`/main/product-details/${product.slug}`} className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
                  <div className="aspect-square rounded-xl overflow-hidden mb-3">
                    <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                  </div>
                  <h3 className="font-headline font-bold text-sm leading-tight truncate">{product.name}</h3>
                  <p className="text-primary font-bold text-xs mt-1 font-label">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 3. COLLABORATIVE — What People Like You Buy ──────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="group" badge="Community Picks" title="What People Like You Buy" />
        {collaborative.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collaborative.map((product, i) => (
              <div key={product.id} className="group">
                <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={getProductImageUrl(product, i)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-violet-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">Community</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors block leading-tight line-clamp-2">
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-primary font-bold font-label text-sm">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="p-1.5 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptySection message={sessionStatus === 'authenticated' ? 'Not enough community data yet' : 'Log in to see community recommendations'} />
        )}
      </section>

      {/* ── Search ───────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-stone-400 text-xl">search</span>
          </div>
          <input
            type="text"
            placeholder="Search for supplements, wellness gear, or goals…"
            className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-3xl font-medium text-on-surface placeholder:text-stone-400 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none shadow-sm transition-all"
          />
        </div>
      </section>

      {/* ── 4. ALL PRODUCTS — Row 1 ──────────────────────────────────────── */}
      {row1.length > 0 && (
        <section className="mb-20">
          <SectionHeader icon="storefront" badge="Catalogue" title="All Products" href="/main/store/all-products" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {row1.map((product, i) => (
              <div key={product.id} className="group block">
                <div className="aspect-4/5 bg-surface-container-low rounded-3xl overflow-hidden relative">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <Link href={`/main/product-details/${product.slug}`} className="font-headline text-xl font-bold text-on-surface hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-primary font-bold font-label ml-2 shrink-0">${product.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full mt-4 bg-white border border-outline-variant/15 py-3.5 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95"
                  >
                    <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. SIMILAR PRODUCTS ──────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="category" badge="Engine · Similar" title="Similar Products" />
        {similar.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similar.map((product, i) => (
              <div key={product.id} className="group">
                <div className="aspect-[4/5] bg-surface-container-low rounded-2xl overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={getProductImageUrl(product, i)}
                  />
                </div>
                <div className="mt-3 space-y-1.5">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-sm font-bold text-on-surface hover:text-primary transition-colors block leading-tight line-clamp-2">
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-primary font-bold font-label text-sm">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="p-1.5 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-lg transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptySection message="No similar products found" />
        )}
      </section>

      {/* ── 6. ALL PRODUCTS — Row 2 ──────────────────────────────────────── */}
      {row2.length > 0 && (
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {row2.map((product, i) => (
              <div key={product.id} className="group block">
                <div className="aspect-4/5 bg-surface-container-low rounded-3xl overflow-hidden">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <Link href={`/main/product-details/${product.slug}`} className="font-headline text-xl font-bold text-on-surface hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-primary font-bold font-label ml-2 shrink-0">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 7. CATEGORIES from Engine ────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="grid_view" badge="Browse by Need" title="Categories for You" />
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id ?? i}
                href={`/main/store/all-products`}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border bg-primary/5 border-primary/10 text-primary hover:bg-primary hover:text-white hover:border-transparent transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                <span className="font-headline font-bold text-sm text-center leading-tight">{cat.name ?? cat.category_name ?? cat}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Sleep Support','Stress Relief','Focus & Brain','Nutrition','Fitness','Mindfulness'].map((name) => (
              <button key={name} className="flex flex-col items-center gap-3 p-5 rounded-2xl border bg-stone-50 border-stone-200 text-stone-600 hover:bg-primary hover:text-white hover:border-transparent transition-all active:scale-95">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                <span className="font-headline font-bold text-sm text-center leading-tight">{name}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── 8. FREQUENTLY BOUGHT TOGETHER ────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="shopping_cart" badge="Engine · Basket Analysis" title="Frequently Bought Together" />
        {fbt.length >= 2 ? (
          <div className="bg-surface-container-low rounded-4xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 flex-wrap">
              {fbt.slice(0, 4).map((product, i) => (
                <div key={product.id} className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                  <Link href={`/main/product-details/${product.slug}`} className="group flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                      <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getProductImageUrl(product, i)} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-headline font-bold text-on-surface leading-tight truncate">{product.name}</p>
                      <p className="text-primary font-bold font-label text-sm mt-1">${product.price}</p>
                    </div>
                  </Link>
                  {i < Math.min(fbt.length, 4) - 1 && (
                    <span className="shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-stone-500 font-bold text-lg">+</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-stone-600 font-medium">
                Total: <span className="text-on-surface font-bold font-headline text-xl ml-1">
                  ${fbt.slice(0,4).reduce((s, p) => s + Number.parseFloat(p.price || 0), 0).toFixed(2)}
                </span>
              </div>
              <button className="sm:ml-auto bg-primary text-white px-8 py-3.5 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform shadow-lg shadow-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                Add Bundle to Bag
              </button>
            </div>
          </div>
        ) : (
          <EmptySection message="No bundle data yet" />
        )}
      </section>

      {/* ── 9. NEW ARRIVALS ──────────────────────────────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="new_releases" badge="Just Landed" title="New Arrivals" />
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.slice(0, 6).map((product, i) => (
              <div key={product.id} className="group block">
                <div className="aspect-4/5 bg-surface-container-low rounded-3xl overflow-hidden relative">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">New</span>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <Link href={`/main/product-details/${product.slug}`} className="font-headline text-xl font-bold text-on-surface hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="text-primary font-bold font-label ml-2 shrink-0">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptySection message="No new arrivals" />
        )}
      </section>

      {/* ── 10. CROSS-SELL — Complete Your Routine ───────────────────────── */}
      <section className="mb-20">
        <SectionHeader icon="upgrade" badge="Engine · Cross-Sell" title="Complete Your Routine" />
        {crossSell.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crossSell.slice(0, 6).map((product, i) => (
              <div key={product.id} className="bg-surface-container-low rounded-3xl overflow-hidden group hover:bg-surface-container-highest transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-headline text-lg font-bold text-on-surface leading-tight">{product.name}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-primary font-bold font-label text-lg">${product.price}</span>
                    <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:scale-[0.97] transition-transform shadow-md shadow-primary/20 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptySection message="No cross-sell products found" />
        )}
      </section>

      {/* ── 11. FOR YOU (second carousel, hybrid) ────────────────────────── */}
      {hybrid.length > 0 && (
        <section className="mb-20">
          <SectionHeader icon="auto_awesome" badge="AI Personalised" title="For You" href="/main/store/all-products" />
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {hybrid.map((product, i) => (
              <Link key={product.id} href={`/main/product-details/${product.slug}`} className="group shrink-0 w-52">
                <div className="aspect-3/4 bg-surface-container-low rounded-2xl overflow-hidden relative">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">For You</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="font-headline text-base font-bold text-on-surface leading-tight">{product.name}</p>
                  <SourceBadges sources={product.sources} />
                  <p className="text-primary font-bold font-label text-sm">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── View All ─────────────────────────────────────────────────────── */}
      <section className="mt-8 mb-24 flex justify-center">
        <Link href="/main/store/all-products" className="group flex items-center gap-3 bg-white border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-label text-sm tracking-widest uppercase font-bold hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95">
          <span>Explore All Products</span>
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      </section>

      {/* ── Floating Cart ─────────────────────────────────────────────────── */}
      <div className="fixed bottom-12 right-12 z-50 hidden md:block">
        <Link href="/main/cart" className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center group hover:bg-primary transition-all duration-300 active:scale-95 border border-outline-variant/10 relative">
          <span className="material-symbols-outlined text-stone-600 group-hover:text-white text-3xl transition-colors">shopping_bag</span>
          <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white" />
        </Link>
      </div>
    </div>
  );
}
