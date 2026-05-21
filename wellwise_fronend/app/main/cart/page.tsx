export default function Cart() {
  return (
    <div className="pt-10 pb-32 max-w-5xl mx-auto">
      <div className="mb-12">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Your Cart</h2>
        <p className="text-stone-500 italic">Curating your path to restorative rest.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-7 space-y-16">
          {/* Product 1 */}
          <div className="group flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 aspect-[4/5] bg-surface-container-low overflow-hidden rounded-3xl">
              <img alt="Linen Weighted Blanket" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCbOyGw6Gvq_kfAstOTURz1_Dubt1kvwmW6CMmIvNhnme9mLciLsgbhQ-lmHVXJPMCN1ypBGiWZKh-c0Ua8lu3l96-c4ugJLrZvN5ps24DP-19G676g7-4DyaMgEJlEMPF2TtfREzG08ALN9sbJVmwZHUmTMeaPGGhJQYwQNBkyLyagpPoUku_qChSHD6m8Axggb2xBI9C3hp50CtQ86gFwTc_XjWIJLvBu1gtRLnQdhPjy_Cieln1bZCQG3fw-1XrhJstA3ULCeRP"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight mb-1">Linen Weighted Blanket</h3>
                  <p className="text-sm font-label uppercase tracking-widest text-stone-500">Sleep Hygiene</p>
                </div>
                <span className="font-label text-primary text-lg font-bold">$189.00</span>
              </div>
              <p className="text-stone-600 mb-6 pr-8">Breathable European linen paired with micro-glass beads for deep pressure stimulation without overheating.</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-surface-container-highest rounded-full px-4 py-1">
                  <button className="text-stone-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="mx-4 text-sm font-bold">1</span>
                  <button className="text-stone-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <button className="text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-base">delete</span> Remove
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 aspect-[4/5] bg-surface-container-low overflow-hidden rounded-3xl">
              <img alt="Magnesium Complex" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-kJvlF3DWT2EIwB7X6w0MTk9P-Z6OJJ1eDhIdmfsjWXhRXhRS1Hi1U_2g-vha9S9hgDM7VHkG_QoRCLgaQ_Cw65h1cm4q1vFr5hLp1LlH8OknYRi8YjvgWLAJR5vdFOCMPvQpxnJm9AwmwBHaQGztYDd1R07qLGYijnpjqxLb9-3vOlECUv2V9T4brCHdx3CCcR02QpMm-HZ-TSwWVyauaYURVIS4nTNmWAZhIZGN2lIyjkVRwQxNPEMrVWDmj7pNPiFbR-CrxlMb"/>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold tracking-tight mb-1">Magnesium Complex</h3>
                  <p className="text-sm font-label uppercase tracking-widest text-stone-500">Recovery</p>
                </div>
                <span className="font-label text-primary text-lg font-bold">$42.00</span>
              </div>
              <p className="text-stone-600 mb-6 pr-8">Triple-source magnesium chelate designed for optimal muscular relaxation and cognitive calm.</p>

              <div className="flex items-center gap-6">
                <div className="flex items-center bg-surface-container-highest rounded-full px-4 py-1">
                  <button className="text-stone-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="mx-4 text-sm font-bold">2</span>
                  <button className="text-stone-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
                <button className="text-stone-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-base">delete</span> Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            
            {/* AI Benefits Section */}
            <div className="bg-primary/5 p-8 rounded-3xl wellness-glow relative overflow-hidden border border-primary/10">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary text-5xl opacity-10" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              </div>
              <h4 className="font-headline text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                AI-Powered Benefits
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-primary rounded-full"></div>
                  <p className="text-sm text-stone-600 leading-relaxed font-medium">
                    <strong className="text-on-surface block mb-1">Synergy:</strong> Combined use of Magnesium and the Weighted Blanket is predicted to reduce your cortisol levels by 18% during the first REM cycle.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-primary rounded-full"></div>
                  <p className="text-sm text-stone-600 leading-relaxed font-medium">
                    <strong className="text-on-surface block mb-1">Insight:</strong> Based on your sleep tracking, this combination addresses the "tossing and turning" phase noted in your last 3 nights.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="bg-white p-8 rounded-3xl wellness-glow">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-stone-500">Subtotal</span>
                  <span>$273.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-stone-500">Sanctuary Shipping</span>
                  <span className="text-primary font-bold">Complimentary</span>
                </div>
                <div className="h-px bg-surface-container my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="font-headline font-bold text-lg">Total</span>
                  <span className="font-headline font-extrabold text-3xl text-primary">$273.00</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-4 rounded-xl font-label font-bold text-sm uppercase tracking-widest active:scale-95 transition-all duration-200">
                Secure Checkout
              </button>
              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">lock</span> Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified_user</span> Insured
                </span>
              </div>
            </div>

            {/* Assistance Note */}
            <div className="text-center px-4 pt-4">
              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                Need guidance on your selection? <br/>
                <a className="text-primary underline underline-offset-4 decoration-primary/20 hover:decoration-primary transition-all font-bold" href="#">Chat with your Wellness Coach</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
