export default function Insights() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 overflow-hidden w-full max-w-5xl mx-auto">
      {/* Abstract Wellness Pulse (Background Element) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[500px] h-[500px] bg-secondary-container/30 rounded-full blur-3xl animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      </div>
      
      {/* AI Analysis Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl py-20 mt-10">
         {/* Analysis State Icon / Spinner Cluster */}
         <div className="relative mb-12">
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="w-32 h-32 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-wellness relative z-10">
               <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-3xl animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
               </div>
            </div>
         </div>
         
         {/* Typography & Status */}
         <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-tertiary-fixed rounded-full">
               <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping relative"><span className="absolute inset-0 rounded-full bg-primary opacity-50"></span></span>
               <span className="font-label uppercase tracking-widest text-[10px] text-on-tertiary-fixed font-bold">Live Analysis in Progress</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight leading-tight">
               Analyzing your lifestyle...
            </h2>
            <p className="text-lg text-secondary font-body max-w-lg mx-auto leading-relaxed">
               Building your custom wellness plan based on your unique circadian rhythm and movement patterns.
            </p>
         </div>
         
         {/* Progression Cards (Asymmetric Bento Style) */}
         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
            {/* Card 1: Processing */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl rounded-tl-sm shadow-wellness flex flex-col items-start gap-4 border-l-4 border-primary">
               <span className="material-symbols-outlined text-primary-container">analytics</span>
               <div>
                  <p className="font-headline font-bold text-on-surface">Biometrics</p>
                  <p className="text-xs text-secondary font-label mt-1">Syncing health data...</p>
               </div>
               <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-primary h-full w-[85%] rounded-full transition-all duration-1000"></div>
               </div>
            </div>
            
            {/* Card 2: Generating */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col items-start gap-4 border border-outline-variant/10">
               <span className="material-symbols-outlined text-secondary">temp_preferences_custom</span>
               <div>
                  <p className="font-headline font-bold text-on-surface">Circadian</p>
                  <p className="text-xs text-secondary font-label mt-1">Optimizing sleep windows</p>
               </div>
               <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-secondary-fixed-dim h-full w-[40%] rounded-full transition-all duration-1000"></div>
               </div>
            </div>
            
            {/* Card 3: Finalizing */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col items-start gap-4 border border-outline-variant/10">
               <span className="material-symbols-outlined text-secondary">restaurant</span>
               <div>
                  <p className="font-headline font-bold text-on-surface">Nutrition</p>
                  <p className="text-xs text-secondary font-label mt-1">Pending biometric data</p>
               </div>
               <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-surface-variant h-full w-[10%] rounded-full transition-all duration-1000"></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
