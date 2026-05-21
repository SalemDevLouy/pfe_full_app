"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

const ALL_PRODUCTS = [
  {
    name: "Weighted Sleep Mask",
    price: 45.00,
    category: "Sleep Support",
    insight: "Matches your sleep patterns",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu",
    badge: "Personal Match"
  },
  {
    name: "Magnesium Complex",
    price: 32.00,
    category: "Nutrition",
    insight: "Reduces morning cortisol",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98",
  },
  {
    name: "Organic Ceremonial Matcha",
    price: 58.00,
    category: "Focus Boost",
    insight: "Supports focus goals",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a",
    badge: "Focus Pick"
  },
  {
    name: "Stress-Relief Adaptogen",
    price: 38.00,
    category: "Stress Relief",
    insight: "Balanced nervous system",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S"
  },
  {
    name: "Linen Weighted Blanket",
    price: 185.00,
    category: "Sleep Support",
    insight: "Deepens REM cycles",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU"
  },
  {
    name: "Ambient Salt Diffuser",
    price: 65.00,
    category: "Stress Relief",
    insight: "Evening air purification",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChZLIgsggwADCm5J8bVz84jZmHlXtED4ifwmzdo6nxvjzFr1N_8g18taI9ugR3zTa8PXSp0fTXYRB9bt_YzJN6BtD2HNJKUlOtlO8EW8Yh7Sb32_InUm3md3sx87U4aFz7LLoSQc3WVFt2qMRi6gioI6vf4ugd-QoxFih_Tc39XdFq8bz9MhnJV6LDZIXUPV3coHmuDzZb6GvP7rAVULHrWZuhisbCCFaPk3xoy4vk0gpl9XznYRbjICVNszaXry-Yf7Mpx5ereMWO"
  },
  {
    name: "Ashwagandha KSM-66",
    price: 42.00,
    category: "Stress Relief",
    insight: "Tailored to your stress score",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S"
  },
  {
    name: "Melatonin Micro-dose",
    price: 28.00,
    category: "Sleep Support",
    insight: "Fits your sleep window",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMpndUrzpH5g45cFkD_-wi5FnYvgfUKcmN98YIl--4nzX2OGuAuEyyK4Bdkwp4IJB8hxcwdF3RSqGsccy1gQvoWYh5LdDTnjCgAGN2xNKnA4o5pOV6ocgsRKHNg56tJwO1RH9DsXtT-FROZb_t1dxClVEjI78oYKFIWwZZln9EZrq49ejpGqOZB8b5yuLnX67c1LwXB7uVH402yPISN1SFYy2u1NCXbprhhrlKIE1DxlefLlYqqW83w_ZZiZfauXHvyCN11Tz9wNKu"
  },
  {
    name: "Blue-Light Glasses",
    price: 75.00,
    category: "Sleep Support",
    insight: "Matches your screen hours",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a"
  },
  {
    name: "Lion's Mane Extract",
    price: 55.00,
    category: "Focus Boost",
    insight: "Boosts your focus profile",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98"
  },
  {
    name: "Oat Milk Sleep Elixir",
    price: 34.00,
    category: "Sleep Support",
    insight: "Evening ritual match",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMi2ZSP69RzDSHuHX-5kjw_oV0FCFGN9EJAERkS8jvu8TRw0kMYufbLdpjl1GkI3B5ZMyltuGBYohiMca6NXF5WQof11kP4waXv1ZO6fjewUfbU_GYouDrfw68nupljwvQppI94lscXA4oySMFEJYfGfao83-vyS6NQoqTqNmYVrXmQ0uNVS7JREYZbnL8-yDP66OwB0lIbW3HAdQkdeYwP_npToblkxzD8TECLLUydS_6GZOHc_HvYX0cPsxt1v_KvSvmHYIxZYNU"
  },
  {
    name: "Hemp CBD Softgels",
    price: 68.00,
    category: "Stress Relief",
    insight: "Similar to Adaptogen blend",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGNfTqDsGVy8SFagQPp_zWKTzU8xgMd-a_apF7RoOc3lZTnvxUvhDZrOokovOV_d5AYI050INkYVQHCvKFqjA84opSF2jlGQZljh9ox66D7dAj0kRh39tgZDqFNLZ76eglJpzRL1e4PbQ9tkEKEIGGNEgDkh9LE7b0rNlN6QmkCSWSVQ0DlU5fQGkPDNjXp5snkJHOUwZPDuAcsWns34je4UyYq4wO5jfOoQYvm0Ie8I3Magh-u7Jd2n5y_Xttt02DwfCYNt42-n98"
  },
  {
    name: "Collagen Peptides+",
    price: 52.00,
    category: "Nutrition",
    insight: "Trending this week",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYb7G1l90ksdBU57Na-FaGPAgYzIRMIPn_LbVDXJa6Sd8c_qdIDDCDc7SQIPiGyeLOo5sqvwuvihHMdqt8hOk3yLaQtNDKMSNhR5RT8rfbHwI-aYjI7MNKFoIrYRVkuCQyVPc8DFv9yQ0jdgiAhfvNoIm624V6PHRAG2FB-66rjVuDuVPSSLNJlF2QhXVOWOi0matBKDfQv42AN5ZX7_HWaSUe1_dIs8wFApAD3RYmqZffX3Fj0ftAtmVHzvh5yNYCUhbR9aw5tB6S"
  },
  {
    name: "Cold Exposure Kit",
    price: 120.00,
    category: "Stress Relief",
    insight: "Editor's pick",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvJSCXyQ4nNo6ScOH3foUYCnVKH39aKLTWK3xZBsugWoYI9igXvHWSnXJtW3brTAYlzUX0GGvlaqnv9KnYBpJGvGAO6cFK1b72cG1Pqa2jwuwYk2oVLlp1ZbnDdX8Jum1H-ZTVYyqDN6GqFacHIgpCWkbx_Ptkz7-7gxR9fbLSNCpKMw4A16QgTsqBgzcojL_2W6ADu_G_Hm2HRjrLDZAmCfO0JLfyqnwlgfNuggRQ5_nUTvq3zgaR5EllwbGKO3mjgRZ3aw_X755a"
  }
];

const CATEGORIES = ["All", "Sleep Support", "Stress Relief", "Focus Boost", "Nutrition"];

export default function AllProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.insight.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

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
      {filteredProducts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((item, i) => (
            <Link key={i} href="/main/product-details" className="group block">
              <div className="aspect-[4/5] bg-surface-container-low rounded-3xl overflow-hidden transition-all group-hover:bg-surface-container-highest relative">
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image}/>
                {item.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.badge}</span>
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-lg font-bold text-on-surface leading-tight pr-4">{item.name}</h3>
                  <span className="text-primary font-bold font-label whitespace-nowrap">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-stone-500 text-xs font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  {item.insight}
                </p>
                <button className="w-full mt-4 bg-white border border-outline-variant/15 py-3 rounded-xl font-label text-sm tracking-wide text-stone-500 hover:bg-primary-container hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95">
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                  Add to Bag
                </button>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="w-full bg-surface-container-low rounded-2xl p-12 text-center text-stone-500 mt-8 border border-dashed border-outline-variant/30 flex flex-col items-center justify-center">
           <span className="material-symbols-outlined text-5xl mb-4 text-stone-300">search_off</span>
           <p className="font-headline text-xl font-bold text-on-surface mb-2">No products found</p>
           <p className="max-w-md mx-auto">We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.</p>
           <button 
             onClick={() => {
               setSearchQuery("");
               setActiveCategory("All");
             }}
             className="mt-6 px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-bold font-label tracking-widest uppercase hover:bg-primary/20 transition-colors"
           >
             Clear Filters
           </button>
        </div>
      )}
    </div>
  );
}