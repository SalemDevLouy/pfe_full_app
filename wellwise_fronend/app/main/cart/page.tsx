'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/hooks/use-api';
import { getProductImageUrl } from '@/lib/image-utils';
import { Trash2, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { getCart, updateCartItem, removeFromCart, createOrder } = useApi();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error("Cart error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(itemId, newQty);
      await loadCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity");
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      await loadCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      await createOrder();
      alert("Order placed successfully!");
      globalThis.location.href = '/main/dashboard';
    } catch (err) {
      console.error("Failed to create order:", err);
      alert("Failed to create order. Please try again.");
    }
  };

  if (loading) return <div className="py-20 text-center">Loading your wellness cart...</div>;

  if (!cart?.items?.length) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-50 rounded-full mb-8 text-slate-300">
           <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-10">Start your journey to better health by exploring our curated collections.</p>
        <Link href="/main/store" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all">
          Go to Marketplace <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          {cart.items.map((item: any) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 p-6 bg-white border border-slate-100 rounded-4xl hover:shadow-lg transition-shadow">
              <div className="w-full md:w-40 aspect-square rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                <img 
                  src={getProductImageUrl(item.product)} 
                  alt={item.product?.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{item.product?.name}</h3>
                    <span className="text-xl font-black text-indigo-600">${item.product?.price}</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.product?.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-slate-100 rounded-xl p-1 bg-slate-50">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg">-</button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg">+</button>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-bold">
                    <Trash2 size={18} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white border border-slate-100 p-8 rounded-4xl shadow-xl shadow-slate-200/50">
               <h2 className="text-2xl font-bold mb-8 text-slate-900">Order Summary</h2>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span>${cart.total_price}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 font-medium">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="h-px bg-slate-100 my-4"></div>
                  <div className="flex justify-between text-2xl font-black text-slate-900">
                    <span>Total</span>
                    <span>${cart.total_price}</span>
                  </div>
               </div>

               <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-100"
               >
                 Place Order
                 <ArrowRight size={20} />
               </button>
            </div>

            <div className="bg-indigo-900 text-white p-8 rounded-4xl relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-amber-400" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-200">AI Wellness Scan</span>
                 </div>
                 <h4 className="text-xl font-bold mb-4">Optimized Routine</h4>
                 <p className="text-indigo-100/80 leading-relaxed text-sm mb-6">
                   Based on your selection, these items provide a synergistic effect on your recovery cycles.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
