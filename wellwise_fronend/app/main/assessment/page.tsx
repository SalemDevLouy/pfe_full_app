export default function Assessment() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 right-0 -z-10 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-100 h-100 bg-secondary-container/20 rounded-full blur-[80px] pointer-events-none"></div>

      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-6 bg-white/80 backdrop-blur-xl">
         <h1 className="text-xl font-bold text-green-900 font-headline tracking-tight">The Mindful Editorial</h1>
      </header>
      
      <main className="min-h-[calc(100vh-100px)] flex flex-col items-center px-6 py-12 md:py-20 w-full mx-auto">
        {/* Progress Indicator */}
        <div className="w-full max-w-2xl mb-12">
          <div className="flex justify-between items-end mb-4">
             <div>
               <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Step 02 of 04</span>
               <h2 className="font-headline text-2xl font-bold tracking-tight text-green-800 mt-1">Mental Clarity</h2>
             </div>
             <div className="text-right">
               <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Completion</span>
               <p className="font-headline text-lg font-bold text-primary italic">50%</p>
             </div>
          </div>
          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
             <div className="h-full w-1/2 bg-linear-to-r from-primary to-primary-container rounded-full"></div>
          </div>
        </div>
        
        {/* Question Container */}
        <section className="w-full max-w-2xl">
          <div className="bg-surface-container-lowest rounded-3xl rounded-tl-lg p-8 md:p-12 wellness-glow border border-outline-variant/10">
             <div className="mb-10">
                <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-3 block">Wellness Pulse Check</span>
                <h3 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight">
                    How would you rate your current stress levels?
                </h3>
                <p className="text-on-surface-variant mt-4 leading-relaxed max-w-md font-medium">
                    Think about the last 24 hours. How heavily has your cognitive load felt on your overall state of mind?
                </p>
             </div>
             
             {/* Modern Slider Component */}
             <div className="relative py-12">
                <input className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" max="10" min="1" type="range" defaultValue="6" />
                <div className="flex justify-between mt-6 px-1">
                   <div className="text-center">
                      <span className="block font-headline font-bold text-on-surface">1</span>
                      <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Zen</span>
                   </div>
                   <div className="text-center">
                      <span className="block font-headline font-bold text-on-surface">5</span>
                      <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Neutral</span>
                   </div>
                   <div className="text-center">
                      <span className="block font-headline font-bold text-on-surface">10</span>
                      <span className="font-label text-[10px] uppercase text-on-surface-variant tracking-wider">Peak</span>
                   </div>
                </div>
             </div>
             
             <div className="mt-8">
                <label htmlFor="stress-notes" className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold mb-3 block">Optional: What's on your mind?</label>
                <textarea id="stress-notes" className="w-full bg-surface-container-low border border-outline-variant/10 rounded-xl p-4 text-on-surface focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all outline-none resize-none font-medium" placeholder="Briefly describe the source of tension..." rows={3}></textarea>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
                <button className="flex items-center gap-2 text-stone-500 hover:text-green-800 transition-colors font-semibold py-3 px-6 rounded-xl hover:bg-stone-100/50">
                   <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                   <span>Previous Step</span>
                </button>
                <button className="w-full sm:w-auto bg-linear-to-br from-primary to-primary-container text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform flex items-center justify-center gap-3">
                   <span>Save & Next</span>
                   <span className="material-symbols-outlined">arrow_forward</span>
                </button>
             </div>
          </div>
          
          {/* AI Insight Toast preview */}
          <div className="mt-8 flex items-center gap-4 p-6 bg-surface-bright/90 backdrop-blur-md rounded-2xl wellness-glow border border-outline-variant/15">
             <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary">auto_awesome</span>
             </div>
             <div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                   <strong className="text-on-surface">AI Reflection:</strong> Most users feel a '6' on Tuesdays. You're aligning with a common peak in the weekly cycle.
                </p>
             </div>
          </div>
        </section>
      </main>
    </div>
  )
}
