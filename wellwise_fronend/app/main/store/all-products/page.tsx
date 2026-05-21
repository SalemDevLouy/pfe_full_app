"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useApi } from "@/lib/hooks/use-api";
import { getProductImageUrl } from "@/lib/image-utils";

const CATEGORIES = ["All", "Supplements", "Vitamins", "Protein", "Sleep & Recovery", "Immunity", "Energy & Focus"];

export default function AllProducts() {
  const { getProducts, getRecommendations, addToCart, sessionStatus } = useApi();
  const [products, setProducts] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProducts('take=50');
        setProducts(data.items || []);
        
        if (sessionStatus === 'authenticated') {
          const recs = await getRecommendations('for-you', 'limit=4');
          setRecommendations(recs.items || []);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [getProducts, getRecommendations, sessionStatus]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const productCats = (product.categories?.map((c: any) => c.category?.name || c.name) || [])
        .concat(product.category_ids && Array.isArray(product.category_ids) ? product.category_ids : []);
      
      const matchesCategory = activeCategory === "All" || 
                              productCats.some((name: string) => name.toLowerCase().includes(activeCategory.toLowerCase()));
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, products]);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch {
      alert("Failed to add to cart. Are you logged in?");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-stone-500 font-medium">Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all w-max">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Store
        </Link>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mt-6">
          All <span className="text-primary">Products</span>
        </h1>
        <p className="text-stone-500 text-lg mt-4 max-w-2xl">
          Browse our complete catalog of wellness essentials, supplements, and gear to support your mindful journey.
        </p>
      </div>

      {/* Recommended For You - Small Row */}
      {recommendations.length > 0 && activeCategory === "All" && !searchQuery && (
        <div className="mb-16 bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-xl">stars</span>
            <h2 className="font-headline text-xl font-bold text-on-surface">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((item, i) => (
              <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex gap-4 items-center group">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-50 shrink-0">
                  <img 
                    src={getProductImageUrl(item, i)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/main/product-details/${item.slug}`} className="font-headline font-bold text-on-surface text-sm truncate block hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                  <p className="text-primary font-bold text-xs mt-1">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full lg:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-stone-400 text-xl">search</span>
          </div>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl font-medium text-on-surface placeholder:text-stone-400 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none shadow-sm transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-6 py-2.5 rounded-full font-label text-sm uppercase tracking-widest font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-surface-container-low text-stone-500 hover:bg-surface-container-high border border-outline-variant/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-stone-500 font-medium">
          Showing <span className="text-on-surface font-bold">{filteredProducts.length}</span> results
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, i) => (
          <div key={product.id} className="group flex flex-col bg-white rounded-[2.5rem] p-5 border border-stone-100 hover:border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/5">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-stone-50 mb-6">
              <img 
                src={getProductImageUrl(product, i)} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={product.name}
              />
              {/* Category Tags */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.categories?.slice(0, 1).map((cat: any) => (
                  <span key={cat.id} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-bold text-[10px] uppercase tracking-wider rounded-full shadow-sm">
                    {cat.name}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => handleAddToCart(product.id)}
                className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-hover shadow-lg shadow-primary/30"
              >
                <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
              </button>
            </div>
            
            <div className="flex-1 flex flex-col px-1">
              <Link href={`/main/product-details/${product.slug}`} className="block">
                <h3 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-stone-400 text-sm mt-1 line-clamp-2">
                {product.description || "High-quality wellness product to support your healthy lifestyle."}
              </p>
              
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-stone-50">
                <div className="flex flex-col">
                  <span className="text-primary font-black text-2xl">${product.price}</span>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Free Shipping</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                  <span className="material-symbols-outlined text-amber-400 text-sm fill-1">star</span>
                  <span className="text-stone-700 font-bold text-xs">4.9</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
          <span className="material-symbols-outlined text-stone-300 text-6xl mb-4">search_off</span>
          <h3 className="font-headline text-2xl font-bold text-on-surface">No products found</h3>
          <p className="text-stone-500 mt-2">Try adjusting your filters or search keywords.</p>
          <button 
            onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}