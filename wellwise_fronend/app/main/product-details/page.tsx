import Link from "next/link";

const highlights = [
  "Personalized to your current rhythm",
  "Calming, editor-picked design",
  "Ready for a low-friction checkout flow",
];

const relatedProducts = [
  {
    name: "Magnesium Complex",
    price: "$32.00",
  },
  {
    name: "Weighted Sleep Mask",
    price: "$45.00",
  },
  {
    name: "Ambient Salt Diffuser",
    price: "$65.00",
  },
];

export default function ProductDetailsPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-12">
      <div className="flex flex-col gap-4 mb-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Product Details</p>
        <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface max-w-3xl">
          Linen Weighted Blanket
        </h1>
        <p className="text-stone-500 max-w-2xl text-lg leading-relaxed">
          A restorative sleep companion designed to reduce sensory load, encourage deeper rest, and fit naturally into your evening routine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[2rem] overflow-hidden bg-surface-container-low wellness-glow aspect-[4/3]">
            <img
              alt="Linen Weighted Blanket"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCbOyGw6Gvq_kfAstOTURz1_Dubt1kvwmW6CMmIvNhnme9mLciLsgbhQ-lmHVXJPMCN1ypBGiWZKh-c0Ua8lu3l96-c4ugJLrZvN5ps24DP-19G676g7-4DyaMgEJlEMPF2TtfREzG08ALN9sbJVmwZHUmTMeaPGGhJQYwQNBkyLyagpPoUku_qChSHD6m8Axggb2xBI9C3hp50CtQ86gFwTc_XjWIJLvBu1gtRLnQdhPjy_Cieln1bZCQG3fw-1XrhJstA3ULCeRP"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-outline-variant/20 bg-white p-5 text-sm text-stone-600">
                {item}
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-outline-variant/20 bg-white p-8 md:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 mb-4">Description</p>
            <p className="text-stone-600 leading-relaxed">
              Breathable European linen paired with micro-glass beads for deep pressure stimulation without overheating. Ideal for users who want a premium sleep ritual with an editorial feel.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-[2rem] bg-white p-8 wellness-glow border border-outline-variant/20">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Sleep Hygiene</p>
                  <h2 className="mt-2 text-3xl font-headline font-bold text-on-surface">Linen Weighted Blanket</h2>
                </div>
                <span className="text-3xl font-headline font-extrabold text-primary">$189</span>
              </div>

              <p className="text-stone-600 leading-relaxed mb-6">
                Calm, breathable, and tailored for restorative evenings.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Stock</span>
                  <span className="font-semibold text-on-surface">In stock</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Delivery</span>
                  <span className="font-semibold text-on-surface">3-5 days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">Rating</span>
                  <span className="font-semibold text-on-surface">4.9 / 5</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/main/cart"
                  className="flex-1 rounded-xl bg-gradient-to-br from-primary to-primary-container px-5 py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Add to Cart
                </Link>
                <Link
                  href="/main/store"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold uppercase tracking-widest text-stone-700 transition-colors hover:bg-slate-50"
                >
                  Back
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 mb-5">Related Items</p>
              <div className="space-y-4">
                {relatedProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between rounded-2xl bg-white px-4 py-4">
                    <div>
                      <p className="font-semibold text-on-surface">{product.name}</p>
                      <p className="text-sm text-stone-500">Suggested for your routine</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
