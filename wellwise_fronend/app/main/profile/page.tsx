export default function Profile() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 w-full">
      <header className="mb-12">
        <p className="text-xs font-label uppercase tracking-[0.2em] text-primary font-semibold mb-4">Wellness Insights</p>
        <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-6 hidden md:block">
           Your Personal <br/>Harmonization.
        </h1>
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-6 md:hidden">
           Your <br/>Harmonization.
        </h1>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8 mb-20">
        
        {/* AI Insight Highlight */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-10 rounded-[2rem] rounded-tl-lg shadow-wellness relative overflow-hidden flex flex-col justify-between items-start border border-outline-variant/10">
          <div className="absolute top-0 right-0 p-8">
             <span className="material-symbols-outlined text-primary/10 text-8xl select-none" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">AI Analysis</span>
                <span className="text-stone-400 text-xs tracking-wide font-medium">Updated 2h ago</span>
             </div>
             <h3 className="text-3xl font-headline font-bold text-on-surface mb-6 leading-snug max-w-xl">
                 "You've improved your sleep quality by 12% this week."
             </h3>
             <p className="text-stone-600 font-medium leading-relaxed max-w-xl mb-10">
                 Your consistent evening meditation practice is correlating strongly with deeper REM cycles. We recommend maintaining the 8:30 PM wind-down schedule for continued recovery optimization.
             </p>
             <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-semibold shadow-wellness hover:shadow-lg transition-all duration-300 transform active:scale-[0.98]">
                 View Full Sleep Report
             </button>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-8 flex flex-col">
           <h4 className="font-headline font-bold text-on-surface mb-2">Monthly Trends</h4>
           <p className="text-xs text-stone-500 mb-8 tracking-wide font-medium uppercase">Wellness index over 30 days</p>
           <div className="flex-1 flex items-end justify-between gap-3 px-2 min-h-[200px]">
              {[24, 32, 40, 28, 48, 56].map((h, i) => (
                 <div key={i} className={`w-full bg-primary/20 rounded-t-lg relative group`} style={{ height: `${h * 0.8}%` }}>
                    <div className="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg transition-all group-hover:h-full" style={{ height: `${h * 0.6}%` }}></div>
                 </div>
              ))}
           </div>
           <div className="flex justify-between mt-6 text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span className="text-primary">Now</span>
           </div>
        </div>

        {/* Settings & Personal Goals */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-highest rounded-3xl p-8 border border-outline-variant/10">
           <div className="flex justify-between items-center mb-8">
              <h4 className="font-headline font-bold text-on-surface">Personal Goals</h4>
              <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-primary transition-colors">edit</span>
           </div>
           <div className="space-y-8">
              <div>
                 <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined">directions_walk</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-on-surface">Daily Steps</p>
                          <p className="text-xs text-stone-500 font-medium">8,500 / 10,000</p>
                       </div>
                    </div>
                    <span className="text-sm font-bold text-primary">85%</span>
                 </div>
                 <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[85%]"></div>
                 </div>
              </div>
              
              <div>
                 <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">self_improvement</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-on-surface">Meditation</p>
                          <p className="text-xs text-stone-500 font-medium">20 / 30 mins</p>
                       </div>
                    </div>
                    <span className="text-sm font-bold text-secondary">66%</span>
                 </div>
                 <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[66%]"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Data Connections */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-wellness">
           <h4 className="font-headline font-bold text-on-surface mb-8">Data Connections</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Apple Health', 'Strava', 'Manual Logging'].map((name, i) => (
                 <div key={i} className="p-5 bg-surface-container-low rounded-2xl flex items-center justify-between border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="bg-white p-3 rounded-xl shadow-sm hidden sm:block">
                          <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>watch</span>
                       </div>
                       <div>
                          <p className="text-sm font-bold text-on-surface">{name}</p>
                          <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Connected</p>
                       </div>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></div>
                 </div>
              ))}
              <div className="p-5 bg-surface-container-low rounded-2xl flex items-center justify-between border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                 <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm opacity-50 hidden sm:block">
                       <span className="material-symbols-outlined text-tertiary">bed</span>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-stone-400">Oura Ring</p>
                       <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Disconnected</p>
                    </div>
                 </div>
                 <span className="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/10 rounded-md shrink-0">LINK</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
