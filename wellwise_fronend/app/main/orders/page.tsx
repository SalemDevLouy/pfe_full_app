"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApi } from "@/lib/hooks/use-api";
import { getProductImageUrl } from "@/lib/image-utils";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  PENDING:    { label: "Pending",    color: "bg-amber-100 text-amber-700",   icon: "schedule" },
  PAID:       { label: "Paid",       color: "bg-blue-100 text-blue-700",     icon: "payment" },
  PROCESSING: { label: "Processing", color: "bg-violet-100 text-violet-700", icon: "autorenew" },
  SHIPPED:    { label: "Shipped",    color: "bg-sky-100 text-sky-700",       icon: "local_shipping" },
  DELIVERED:  { label: "Delivered",  color: "bg-emerald-100 text-emerald-700", icon: "check_circle" },
  CANCELLED:  { label: "Cancelled",  color: "bg-stone-100 text-stone-500",   icon: "cancel" },
  REFUNDED:   { label: "Refunded",   color: "bg-rose-100 text-rose-600",     icon: "currency_exchange" },
};

const CANCELLABLE = new Set(["PENDING", "PROCESSING"]);

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: "bg-stone-100 text-stone-500", icon: "help" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.color}`}>
      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

function OrderSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-3xl border border-stone-100 p-6 space-y-4">
      <div className="flex justify-between">
        <div className="h-4 bg-stone-200 rounded-full w-32" />
        <div className="h-6 bg-stone-100 rounded-full w-24" />
      </div>
      <div className="flex gap-3">
        {[1, 2, 3].map(i => <div key={i} className="w-16 h-16 bg-stone-100 rounded-xl" />)}
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-stone-50">
        <div className="h-4 bg-stone-100 rounded-full w-24" />
        <div className="h-8 bg-stone-100 rounded-xl w-28" />
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { getOrders, cancelOrder, sessionStatus } = useApi();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    getOrders()
      .then((data: any) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus]);

  const handleCancel = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(orderId);
    try {
      await cancelOrder(orderId);
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: "CANCELLED" } : o)
      );
    } catch (err: any) {
      alert(err.message ?? "Could not cancel order.");
    } finally {
      setCancelling(null);
    }
  };

  if (sessionStatus !== "authenticated") {
    return (
      <div className="text-center py-24">
        <span className="material-symbols-outlined text-stone-300 text-6xl mb-4 block">lock</span>
        <h2 className="font-headline text-2xl font-bold mb-2">Sign in to view your orders</h2>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-10 mt-2">
        <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">Account</span>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mt-2">
          Order <span className="text-primary">History</span>
        </h1>
        <p className="text-stone-500 mt-2 text-lg">
          {!loading && orders.length > 0
            ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
            : "Track and manage your purchases"}
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <OrderSkeleton key={i} />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-stone-50 rounded-4xl border-2 border-dashed border-stone-200">
          <span className="material-symbols-outlined text-stone-300 text-6xl mb-4">shopping_bag</span>
          <h3 className="font-headline text-2xl font-bold text-on-surface">No orders yet</h3>
          <p className="text-stone-500 mt-2 mb-6">Your order history will appear here.</p>
          <Link
            href="/main/store"
            className="bg-primary text-white px-8 py-3.5 rounded-2xl font-label font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">local_mall</span>
            Go to Store
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            });
            const total = Number.parseFloat(order.totalAmount ?? order.total ?? 0).toFixed(2);
            const itemCount = order.items?.length ?? 0;
            const canCancel = CANCELLABLE.has(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all overflow-hidden"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-stone-50">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Order ID</p>
                    <p className="font-mono text-sm text-on-surface font-semibold">{order.id.slice(0, 8).toUpperCase()}…</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold text-on-surface">{date}</p>
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Items</p>
                    <p className="text-sm font-semibold text-on-surface">{itemCount}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items preview */}
                {order.items?.length > 0 && (
                  <div className="px-6 py-5">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                      {order.items.map((item: any, idx: number) => (
                        <div key={item.id} className="shrink-0 flex gap-3 items-center bg-stone-50 rounded-2xl p-3 min-w-[220px]">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                            <img
                              src={getProductImageUrl(item.product, idx)}
                              alt={item.product?.name ?? "Product"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/main/product-details/${item.product?.slug}`}
                              className="font-headline font-bold text-sm text-on-surface hover:text-primary transition-colors block leading-tight line-clamp-2"
                            >
                              {item.product?.name ?? "Product"}
                            </Link>
                            <p className="text-stone-400 text-xs mt-1">
                              Qty: {item.quantity} · <span className="text-primary font-bold">${Number.parseFloat(item.price ?? item.product?.price ?? 0).toFixed(2)}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-stone-50/60 border-t border-stone-100">
                  <div>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Order Total</p>
                    <p className="font-headline text-xl font-extrabold text-on-surface mt-0.5">${total}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {order.trackingNumber && (
                      <div className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-xl border border-stone-100 text-xs font-bold text-stone-600">
                        <span className="material-symbols-outlined text-sm">local_shipping</span>
                        {order.trackingNumber}
                      </div>
                    )}
                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => handleCancel(order.id)}
                        disabled={cancelling === order.id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-rose-200 text-rose-500 text-xs font-bold rounded-xl hover:bg-rose-50 transition-colors disabled:opacity-50"
                      >
                        {cancelling === order.id
                          ? <><span className="animate-spin material-symbols-outlined text-sm">autorenew</span> Cancelling…</>
                          : <><span className="material-symbols-outlined text-sm">cancel</span> Cancel Order</>
                        }
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
