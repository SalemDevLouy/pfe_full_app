'use client';

import { useEffect, useState, use } from 'react';
import { useApi } from '@/lib/hooks/use-api';
import { getProductImageUrl } from '@/lib/image-utils';
import { ShoppingCart, Star, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getProductBySlug, getRecommendations, addToCart } = useApi();
  
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);

        if (data?.id) {
          const similar = await getRecommendations('content', `product_id=${data.id}&limit=4`);
          setSimilarProducts(similar.items || []);
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      alert("Product added to cart!");
    } catch (err) {
      alert("Please login to add to cart.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-vh-100 py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link href="/main/store" className="text-indigo-600 hover:underline">Return to Store</Link>
      </div>
    );
  }

  const imgUrl = getProductImageUrl(product);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumbs / Back */}
        <Link href="/main/store" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100">
              <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: any, idx: number) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border cursor-pointer hover:border-indigo-600 transition-colors">
                    <img src={getProductImageUrl({ images: [img] })} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {product.category?.name || 'Wellness'}
                </span>
                {product.avg_rating > 4.5 && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Star size={12} className="fill-amber-600" /> Best Seller
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-amber-500">
                   {[...Array(5)].map((_, i) => (
                     <Star key={i} size={18} fill={i < Math.round(product.avg_rating || 5) ? "currentColor" : "none"} />
                   ))}
                </div>
                <span className="text-slate-500 text-sm font-medium">({product.reviews_count || 0} customer reviews)</span>
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-black text-slate-900">${product.price}</span>
            </div>

            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {product.description || "No description available for this premium wellness product."}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-slate-50">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors">-</button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-colors">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white rounded-[1.5rem] py-4 font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-4 border border-slate-200 rounded-[1.5rem] text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-3 gap-4 py-8 border-t border-slate-100">
               <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={24} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-900">Free Shipping</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2 border-x">
                  <ShieldCheck size={24} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-900">2-Year Warranty</span>
               </div>
               <div className="flex flex-col items-center text-center gap-2">
                  <RefreshCw size={24} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-900">30-Day Return</span>
               </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="pt-20 border-t border-slate-100">
             <h2 className="text-3xl font-bold text-slate-900 mb-10">You might also like</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {similarProducts.map((p: any) => (
                  <Link key={p.id} href={`/main/product-details/${p.slug}`} className="group">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 mb-4 border border-slate-100">
                      <img src={p.images?.[0]?.url || imgUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{p.name}</h3>
                    <p className="text-lg font-bold text-slate-900">${p.price}</p>
                  </Link>
                ))}
             </div>
          </section>
        )}
      </div>
    </div>
  );
}
