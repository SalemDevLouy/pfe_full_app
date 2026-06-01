"use client";

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { useApi } from "@/lib/hooks/use-api";
import { getProductImageUrl } from "@/lib/image-utils";

const PAGE_SIZE = 24;

function ProductSkeleton() {
  return (
    <div className="animate-pulse flex flex-col bg-white rounded-[2.5rem] p-5 border border-stone-100">
      <div className="aspect-square rounded-[2rem] bg-stone-200 mb-6" />
      <div className="space-y-3 px-1">
        <div className="h-5 bg-stone-200 rounded-full w-3/4" />
        <div className="h-4 bg-stone-100 rounded-full w-full" />
        <div className="h-4 bg-stone-100 rounded-full w-2/3" />
        <div className="h-8 bg-stone-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export default function AllProducts() {
  const { getProducts, addToCart, sessionStatus } = useApi();

  const [products, setProducts]   = useState<any[]>([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [loading, setLoading]     = useState(true);

  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search input
  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 400);
  };

  // Fetch categories once
  useEffect(() => {
    fetch("/api/v1/categories?take=200")
      .then(r => r.json())
      .then((data: any[]) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Fetch products on page / filter / search change
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      take: String(PAGE_SIZE),
      skip: String((page - 1) * PAGE_SIZE),
    });
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (activeCategory)  params.set("category", activeCategory);

    try {
      const data = await getProducts(params.toString());
      setProducts(data.items || []);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, activeCategory, getProducts]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleAddToCart = async (productId: string) => {
    try { await addToCart(productId, 1); alert("Added to cart!"); }
    catch { alert("Failed. Are you logged in?"); }
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(prev => prev === slug ? "" : slug);
    setPage(1);
  };

  // Pagination range — show max 7 page buttons
  const pageRange = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const delta = 2;
    const left  = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);
    const pages: (number | "…")[] = [1];
    if (left > 2) pages.push("…");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);
    return pages;
  })();

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-10">
        <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all w-max mb-6">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Store
        </Link>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
          All <span className="text-primary">Products</span>
        </h1>
        <p className="text-stone-500 text-lg mt-3">
          {total > 0
            ? `${total.toLocaleString()} products in our catalogue`
            : "Browse our complete wellness catalogue"}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-stone-400 text-xl">search</span>
        </div>
        <input
          type="text"
          placeholder="Search products by name…"
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl font-medium text-on-surface placeholder:text-stone-400 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none shadow-sm transition-all"
        />
        {search && (
          <button
            onClick={() => { setSearch(""); setDebouncedSearch(""); setPage(1); }}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-stone-400 hover:text-stone-600"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </div>

      {/* Category filter chips */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          <button
            onClick={() => handleCategoryClick("")}
            className={`shrink-0 px-5 py-2 rounded-full font-label text-sm font-semibold transition-all border ${
              activeCategory === ""
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-surface-container-low text-stone-500 border-outline-variant/15 hover:bg-surface-container-high"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`shrink-0 px-5 py-2 rounded-full font-label text-sm font-semibold transition-all border ${
                activeCategory === cat.slug
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-surface-container-low text-stone-500 border-outline-variant/15 hover:bg-surface-container-high"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Results summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-stone-500 font-medium text-sm">
          {loading ? "Loading…" : (
            <>
              Showing <span className="text-on-surface font-bold">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}</span>
              {" "}of <span className="text-on-surface font-bold">{total.toLocaleString()}</span> products
              {activeCategory && (
                <span className="ml-2 text-primary font-bold">
                  in &quot;{categories.find(c => c.slug === activeCategory)?.name ?? activeCategory}&quot;
                </span>
              )}
            </>
          )}
        </p>
        {(activeCategory || debouncedSearch) && (
          <button
            onClick={() => { setActiveCategory(""); setSearch(""); setDebouncedSearch(""); setPage(1); }}
            className="text-sm text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">filter_alt_off</span>
            Clear filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
          <span className="material-symbols-outlined text-stone-300 text-6xl mb-4">search_off</span>
          <h3 className="font-headline text-2xl font-bold text-on-surface">No products found</h3>
          <p className="text-stone-500 mt-2">Try different keywords or clear the filters.</p>
          <button
            onClick={() => { setActiveCategory(""); setSearch(""); setDebouncedSearch(""); setPage(1); }}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-[2.5rem] p-5 border border-stone-100 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
                <img
                  src={getProductImageUrl(product, i)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={product.name}
                />
                {product.categories?.[0]?.category?.name && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-bold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                      {product.categories[0].category.name}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                </button>
              </div>

              <div className="flex-1 flex flex-col px-1">
                <Link href={`/main/product-details/${product.slug}`}>
                  <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-stone-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {product.description || "High-quality wellness product."}
                </p>

                <div className="mt-auto pt-5 flex items-center justify-between border-t border-stone-50">
                  <span className="text-primary font-black text-2xl">${product.price}</span>
                  <div className="flex items-center gap-1 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                    <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-stone-700 font-bold text-xs">
                      {product._count?.reviews > 0 ? "★" : "New"}
                    </span>
                    <span className="text-stone-400 text-xs">{product._count?.reviews ?? 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-16 mb-8 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-10 h-10 rounded-xl border border-outline-variant/20 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white hover:border-transparent transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>

          {/* Page numbers */}
          {pageRange.map((p, idx) =>
            p === "…" ? (
              <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-stone-400 font-label text-sm">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(Number(p))}
                className={`w-10 h-10 rounded-xl font-label text-sm font-bold transition-all border ${
                  page === p
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "border-outline-variant/20 text-stone-500 hover:bg-primary/5 hover:border-primary/20"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-10 h-10 rounded-xl border border-outline-variant/20 flex items-center justify-center text-stone-500 hover:bg-primary hover:text-white hover:border-transparent transition-all disabled:opacity-30 disabled:pointer-events-none"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      )}

    </div>
  );
}
