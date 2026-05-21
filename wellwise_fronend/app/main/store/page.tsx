'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useApi } from '@/lib/hooks/use-api';
import { getProductImageUrl } from '@/lib/image-utils';

const FALLBACK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a",
];

const categories = [
  { name: "All Essentials", active: true },
  { name: "Sleep Support", active: false },
  { name: "Stress Relief", active: false },
  { name: "Focus Boost", active: false },
  { name: "Nutrition", active: false },
];

const categoryRecs = [
  { name: "Sleep Support", icon: "bedtime", color: "bg-indigo-50 text-indigo-600 border-indigo-100", count: "14 items" },
  { name: "Stress Relief", icon: "self_improvement", color: "bg-green-50 text-green-600 border-green-100", count: "11 items" },
  { name: "Focus & Brain", icon: "psychology", color: "bg-amber-50 text-amber-600 border-amber-100", count: "9 items" },
  { name: "Nutrition", icon: "nutrition", color: "bg-rose-50 text-rose-600 border-rose-100", count: "18 items" },
  { name: "Movement", icon: "fitness_center", color: "bg-sky-50 text-sky-600 border-sky-100", count: "7 items" },
  { name: "Mindfulness", icon: "spa", color: "bg-purple-50 text-purple-600 border-purple-100", count: "12 items" },
];

const upsellBundles = [
  {
    label: "Upgrade",
    tag: "Premium Pick",
    tagColor: "bg-amber-500",
    name: "Nano Magnesium Pro",
    description: "10× higher bioavailability than standard Mg",
    price: "$78.00",
    originalPrice: "$32.00",
    image: FALLBACK_IMAGES[1],
  },
  {
    label: "Complete your routine",
    tag: "Bundle & Save 15%",
    tagColor: "bg-primary",
    name: "Sleep Ritual Bundle",
    description: "Sleep Mask + Magnesium + Salt Diffuser",
    price: "$119.00",
    originalPrice: "$142.00",
    image: FALLBACK_IMAGES[0],
  },
  {
    label: "Add-on",
    tag: "Pairs Well",
    tagColor: "bg-green-500",
    name: "Lavender Pillow Mist",
    description: "Enhances your weighted blanket experience",
    price: "$18.00",
    originalPrice: null,
    image: FALLBACK_IMAGES[2],
  },
];



export default function Store() {
  const { getProducts, getRecommendations, addToCart, sessionStatus } = useApi();

  const [products, setProducts] = useState<any[]>([]);
  const [forYou, setForYou] = useState<any[]>([]);
  const [goalRecommendations, setGoalRecommendations] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const allProds = await getProducts('take=12');
        setProducts(allProds.items || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }

      if (sessionStatus === 'authenticated') {
        try {
          const personal = await getRecommendations('for-you', `limit=8`);
          setForYou(personal.items || []);
        } catch {
          // recommendations unavailable
        }

        try {
          const goals = await getRecommendations('goal-based', 'limit=4');
          setGoalRecommendations(goals.items || []);
        } catch {
          // recommendations unavailable
        }

        try {
          const arrivals = await getRecommendations('new-arrivals', 'limit=3');
          setNewArrivals(arrivals.items || []);
        } catch {
          // recommendations unavailable
        }
      }

      setLoading(false);
    }
    loadData();
  }, [sessionStatus, getProducts, getRecommendations]);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      alert("Product added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart. Please check your login.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-stone-600 font-medium">Loading WellWise Store...</p>
      </div>
    );
  }

  const row1 = products.slice(0, 3);
  const row2 = products.slice(3, 6);
  const fbtSet = products.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="mt-6 mb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-tight">
            Curated for Your <span className="text-primary">Rhythms</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed">
            Every selection here is calibrated to your recent AI wellness analysis. We&apos;ve prioritized items that support your current focus goals and evening deceleration.
          </p>
        </div>
        <div className="flex-1 w-full h-80 rounded-[2rem] overflow-hidden wellness-glow">
          <img
            alt="Serene wellness space"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDND3DiMQEjSKr2xlA3lBMvtzfo-0EN7EEgyI4a65j40CD_QAzUqMuRboeNO4wEyYJeVa2hmnD1sIZX8yoVDpEshS1eCsA6mHzKXypOF9Bw9sTTaaTSbnNTYvj3vGmvmt1XByEpuaBJ8wRrBRVWWPQFjGd-cdtAsWa1U_ksW07mHlIW9ywgjjeLbt4x55eL0QTbOWjoklU2M733vEpOFjg_JrQCsvdti95dA-sk65iYIWiX0KMtkTCxLqANA8mfdCEVuyOGHFznr7ic"
          />
        </div>
      </section>

      {/* Recommended for You Section */}
      {forYou.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Personalized</span>
              </div>
              <h2 className="font-headline text-3xl font-extrabold text-on-surface">Recommended for You</h2>
            </div>
            <Link href="/main/store/all-products" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
              Explore All <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {forYou.map((product, i) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] group block">
                <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden relative">
                  <img
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={getProductImageUrl(product, i)}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Match</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-lg font-bold text-on-surface hover:text-primary transition-colors block truncate">
                    {product.name}
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold font-label">${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="p-2 bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Goal Based Recommendations */}
      {goalRecommendations.length > 0 && (
        <section className="mb-20 bg-stone-900 text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary text-sm">track_changes</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-variant">AI Goal Matching</span>
              </div>
              <h2 className="font-headline text-4xl font-extrabold leading-tight">Aligned with Your Wellness Goals</h2>
              <p className="text-stone-400 text-lg leading-relaxed">
                The engine has matched these products to your specific health objectives and biometric trends.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {goalRecommendations.slice(0, 4).map((product, i) => (
                <Link key={product.id} href={`/main/product-details/${product.slug}`} className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                  </div>
                  <h3 className="font-headline font-bold text-sm truncate">{product.name}</h3>
                  <p className="text-primary font-bold text-xs mt-1 font-label">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search */}
      <section className="mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-stone-400 text-xl">search</span>
          </div>
          <input
            type="text"
            placeholder="Search for supplements, wellness gear, or goals..."
            className="w-full pl-14 pr-6 py-4 bg-surface-container-low border border-outline-variant/20 rounded-[1.5rem] font-medium text-on-surface placeholder:text-stone-400 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/30 focus:outline-none shadow-sm transition-all hover:border-primary/20 hover:bg-surface-container-lowest"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-8 py-3 rounded-full font-label text-sm uppercase tracking-widest font-semibold transition-all ${
                cat.active
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-high text-stone-500 hover:bg-surface-container-highest'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid Row 1 */}
      {row1.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {row1.map((product, i) => (
            <div key={product.id} className="group block">
              <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={getProductImageUrl(product, i)}
                />
                {i === 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Personal Match</span>
                  </div>
                )}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-xl font-bold text-on-surface hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <span className="text-primary font-bold font-label">${product.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  {product.short_description || 'Matched to your wellness data'}
                </p>
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
        </section>
      )}

      {/* AI Insight Banner */}
      <section className="my-20">
        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 wellness-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="p-4 bg-primary/10 rounded-2xl shrink-0 z-10">
            <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
          </div>
          <div className="flex-1 space-y-3 z-10">
            <h4 className="font-headline text-2xl font-bold text-on-surface">Curated by AI Insight</h4>
            <p className="text-stone-600 font-medium leading-relaxed">Your stress levels were peak on Tuesday; we recommend these calming adaptogens to balance your nervous system before your next heavy work cycle.</p>
          </div>
          <button className="bg-primary text-white px-8 py-4 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform whitespace-nowrap shadow-lg shadow-primary/30 z-10">Explore Calming</button>
        </div>
      </section>

      {/* Product Grid Row 2 */}
      {row2.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {row2.map((product, i) => (
            <div key={product.id} className="group block">
              <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={getProductImageUrl(product, i)}
                />
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <Link href={`/main/product-details/${product.slug}`} className="font-headline text-xl font-bold text-on-surface hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <span className="text-primary font-bold font-label">${product.price}</span>
                </div>
                <p className="text-primary/80 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  {product.short_description || 'Matched to your wellness data'}
                </p>
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
        </section>
      )}

      {/* For You */}
      {forYou.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">AI Personalised</span>
              </div>
              <h2 className="font-headline text-3xl font-extrabold text-on-surface">For You</h2>
            </div>
            <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
              See all <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {forYou.map((product, i) => (
              <Link key={product.id} href={`/main/product-details/${product.slug}`} className="group shrink-0 w-52">
                <div className="aspect-[3/4] bg-surface-container-low rounded-2xl overflow-hidden relative">
                  <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={getProductImageUrl(product, i)} />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">For You</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="font-headline text-base font-bold text-on-surface leading-tight">{product.name}</p>
                  <p className="text-primary/80 text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                    {product.short_description || 'Tailored to your profile'}
                  </p>
                  <p className="text-primary font-bold font-label text-sm">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories for You */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Browse by Need</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Categories for You</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryRecs.map((cat, i) => (
            <button key={i} className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${cat.color} hover:scale-[1.03] transition-transform active:scale-95`}>
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
              <span className="font-headline font-bold text-sm text-center leading-tight">{cat.name}</span>
              <span className="text-[11px] opacity-70 font-label">{cat.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Frequently Bought Together */}
      {fbtSet.length >= 3 && (
        <section className="mt-24">
          <div className="space-y-1 mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">People Also Buy</span>
            </div>
            <h2 className="font-headline text-3xl font-extrabold text-on-surface">Frequently Bought Together</h2>
          </div>
          <div className="bg-surface-container-low rounded-[2rem] p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8">
              {fbtSet.map((product, i) => (
                <div key={product.id} className="flex items-center gap-4 md:gap-6 flex-1 w-full">
                  <Link href={`/main/product-details/${product.slug}`} className="group flex items-center gap-4 flex-1">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                      <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={getProductImageUrl(product, i)} />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface leading-tight">{product.name}</p>
                      <p className="text-primary font-bold font-label text-sm mt-1">${product.price}</p>
                    </div>
                  </Link>
                  {i < fbtSet.length - 1 && (
                    <span className="shrink-0 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-stone-500 font-bold text-lg">+</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-stone-600 font-medium">
                Total: <span className="text-on-surface font-bold font-headline text-xl ml-1">
                  ${fbtSet.reduce((sum, p) => sum + parseFloat(p.price || 0), 0).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => fbtSet.forEach(p => handleAddToCart(p.id))}
                className="sm:ml-auto bg-primary text-white px-8 py-3.5 rounded-xl font-label text-sm tracking-widest uppercase font-bold hover:scale-[0.98] transition-transform shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                Add All 3 to Bag
              </button>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>new_releases</span>
                <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Just Landed</span>
              </div>
              <h2 className="font-headline text-3xl font-extrabold text-on-surface">New Arrivals</h2>
            </div>
            <Link href="/main/store" className="text-primary font-bold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all">
              See all <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((product, i) => (
              <div key={product.id} className="group block">
                <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden relative">
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
                    <span className="text-primary font-bold font-label">${product.price}</span>
                  </div>
                  <p className="text-stone-500 text-xs font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>
                    {product.short_description || 'Trending this week'}
                  </p>
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

      {/* Cross-sell / Upsell */}
      <section className="mt-24 mb-8">
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>upgrade</span>
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-label">Enhance Your Order</span>
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface">Complete Your Routine</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upsellBundles.map((item, i) => (
            <div key={i} className="bg-surface-container-low rounded-[1.5rem] overflow-hidden group hover:bg-surface-container-highest transition-colors">
              <div className="aspect-video overflow-hidden relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} />
                <div className="absolute top-3 left-3">
                  <span className={`${item.tagColor} text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest`}>{item.tag}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-stone-400 text-xs font-bold uppercase tracking-widest font-label">{item.label}</p>
                <h3 className="font-headline text-lg font-bold text-on-surface leading-tight">{item.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary font-bold font-label text-lg">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-stone-400 line-through text-sm font-label">{item.originalPrice}</span>
                    )}
                  </div>
                  <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-label text-xs tracking-widest uppercase font-bold hover:scale-[0.97] transition-transform shadow-md shadow-primary/20 flex items-center gap-1.5 active:scale-95">
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View All */}
      <section className="mt-16 mb-24 flex justify-center">
        <Link href="/main/store" className="group flex items-center gap-3 bg-white border-2 border-primary/20 text-primary px-8 py-4 rounded-full font-label text-sm tracking-widest uppercase font-bold hover:bg-primary hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95">
          <span>Explore All Products</span>
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-12 right-12 z-50 hidden md:block">
        <Link href="/main/cart" className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center group hover:bg-primary transition-all duration-300 active:scale-95 border border-outline-variant/10 relative">
          <span className="material-symbols-outlined text-stone-600 group-hover:text-white text-3xl transition-colors">shopping_bag</span>
          <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-primary rounded-full border-2 border-white"></span>
        </Link>
      </div>
    </div>
  );
}
