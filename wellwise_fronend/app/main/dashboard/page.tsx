"use client";

import { toast } from "sonner";

export default function Dashboard() {
  return (
    <>
      {/* Greeting & Metrics Bento Grid */}
      <section className="mb-12">
        <div className="flex flex-col gap-1 mb-10 mt-6">
          <span className="font-label uppercase tracking-widest text-[10px] text-primary font-bold">Daily Overview</span>
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface">Good morning, Alex.</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {/* Core Score: Stress */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-3xl p-8 wellness-glow flex flex-col items-center justify-between" style={{ minHeight: "300px" }}>
            <div className="text-center">
              <h3 className="font-headline font-bold text-xl mb-1">Stress Level</h3>
              <p className="text-primary font-medium">Optimal Stability</p>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="270" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-headline">Low</span>
              </div>
            </div>
            <div className="text-center text-xs text-stone-500 px-4">
               You're in a high-recovery state today. Ideal for creative focus.
            </div>
          </div>
          {/* Core Score: Sleep */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-3xl p-8 wellness-glow flex flex-col items-center justify-between" style={{ minHeight: "300px" }}>
            <div className="text-center">
              <h3 className="font-headline font-bold text-xl mb-1">Sleep Score</h3>
              <p className="text-stone-500 font-medium">Restorative Rest</p>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="54" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold font-headline">85</span>
                <span className="text-[10px] font-label uppercase tracking-tighter">Excellent</span>
              </div>
            </div>
            <div className="text-center text-xs text-stone-500 px-4">
              Deep sleep duration was 15% higher than your weekly average.
            </div>
          </div>
          {/* Core Score: Focus */}
          <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-3xl p-8 wellness-glow flex flex-col items-center justify-between" style={{ minHeight: "300px" }}>
            <div className="text-center">
              <h3 className="font-headline font-bold text-xl mb-1">Focus Score</h3>
              <p className="text-stone-500 font-medium">Building Momentum</p>
            </div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-surface-container" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary opacity-70" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="109" strokeLinecap="round" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold font-headline">70</span>
                <span className="text-[10px] font-label uppercase tracking-tighter">Rising</span>
              </div>
            </div>
            <div className="text-center text-xs text-stone-500 px-4">
               Meditation sessions are positively impacting your cognitive load.
            </div>
          </div>
        </div>
      </section>
      
      {/* Today's Plan: Editorial Layout */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div className="flex flex-col gap-1">
            <span className="font-label uppercase tracking-widest text-[10px] text-stone-500 font-bold">Curated Journey</span>
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Today's Plan</h2>
          </div>
          <a className="text-primary font-semibold text-sm hover:underline" href="/main/tracker">View Full Calendar</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Morning Card */}
          <div className="group cursor-pointer" onClick={() => toast.success("Started Morning Alignment session")}>
            <div className="relative overflow-hidden mb-6 wellness-glow" style={{ aspectRatio: "4 / 5", borderRadius: "2rem" }}>
              <img alt="Morning yoga" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw1myYpaRLoEoy4zlKx10Btl39IvOT-cyhIZYJd8quZHOKgA7hKqpQDC2Vl4Wz0Q7TRFl8Co2qhPuD2usPkQP39dHyFqVlWVHdRfV0HrVskr4drYAj6BxPzRrjxlpoJdrcOjwOyoA20nrWe3VZqeR5dT6IhzwDPTjV8y4illCVRo1KCihzRlGx3Xf7bLGath9H1L3XXLtiK70MXJoZEzT4izyLuUoR70a5sCiFcVglpk3VkUJv5TRc64swSJPDv_81nPL2uGM4gBxp"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)" }}></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] opacity-80">07:30 AM</span>
                <h4 className="font-headline text-2xl font-bold">Morning Alignment</h4>
              </div>
            </div>
            <div className="px-2">
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">A 15-minute mobility flow designed to wake up the central nervous system.</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">High Priority</span>
              </div>
            </div>
          </div>
          
          {/* Day Card */}
          <div className="group cursor-pointer mt-0 md:mt-12" onClick={() => toast.info("Opening Deep Work Cycle settings")}>
            <div className="relative overflow-hidden mb-6 wellness-glow" style={{ aspectRatio: "4 / 5", borderRadius: "2rem" }}>
              <img alt="Focus work" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBK7X8kgJB7oYnHz4eEtOZFx6vyzwM8cUe-3139SsSq53UcbRRScg6MB0OnhtHEFGGqKQ2C4aZ4GogfzcCoOzXXvrzmQQm9rLfb__I61WYOxAEs-R3EpXCTuE2TkkAxxVn6DzJIqFl2t4fC63TIOsdUrCX9-chNpkhGehI4nsB6VmbkUrDShIxmRxF95UIhMkjdoQYscJOpqCxzteF5kCkdho2rLImwHjeKjC1TA58iGn3Figm1idbVcoLwtBKT7W5FLb_O4jAhsZz"/>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)" }}></div>
              <div className="absolute bottom-8 left-8 text-white">
                 <span className="font-label text-[10px] uppercase tracking-[0.2em] opacity-80">01:00 PM</span>
                 <h4 className="font-headline text-2xl font-bold">Deep Work Cycle</h4>
              </div>
            </div>
            <div className="px-2">
               <p className="text-on-surface-variant text-sm leading-relaxed mb-4">90 minutes of dedicated focus time with digital notifications silenced.</p>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-stone-400 text-lg">timer</span>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">1.5 Hours</span>
               </div>
            </div>
          </div>
          
          {/* Night Card */}
          <div className="group cursor-pointer" onClick={() => toast.info("Preparing Digital Sunset routine")}>
             <div className="relative overflow-hidden mb-6 wellness-glow" style={{ aspectRatio: "4 / 5", borderRadius: "2rem" }}>
               <img alt="Sleep preparation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPdNiFaiS-7KkWmz0TCsKAyW2La9KPibZ7injC4cYD9k4PmKHcswKQM6uGWes6Ca0mjbgfIBwlXoDrswKCxySAOMgPYHYKwk5pmt1bWuKSLONTJ8oz-ogfm0nmSRqoQDr3I6rxwJASHLucGQHc5b-pydd5zoceHKaijmM5JowfIkwlf42kbXQuhtKOBQw1fSrmEaGHhMB4bJWPdOJsheEmrAc9CbCVIgHakY5Cp69ngU90BKIHDHFLQd2gRtji_om0DOTkEmRRIXgw"/>
               <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)" }}></div>
               <div className="absolute bottom-8 left-8 text-white">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] opacity-80">09:30 PM</span>
                  <h4 className="font-headline text-2xl font-bold">Digital Sunset</h4>
               </div>
             </div>
             <div className="px-2">
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Reduce blue light exposure and begin the circadian rhythm wind-down.</p>
                <div className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-stone-400 text-lg">bedtime</span>
                   <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Restoration</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* AI Insight Toast (Pinned behavior mapped to a fixed element on page) */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-panel py-4 px-8 rounded-full wellness-glow flex items-center gap-4 border border-outline-variant/15 max-w-xl w-[calc(100%-2rem)] z-50">
        <div className="w-10 h-10 editorial-gradient rounded-full flex items-center justify-center" style={{ flexShrink: 0 }}>
          <span className="material-symbols-outlined text-white text-xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-on-surface leading-snug">
            <span className="font-bold">AI Insight:</span> Your focus peaked yesterday after the 10-minute breath-work. Want to schedule one before your big meeting at 2 PM?
          </p>
        </div>
        <button 
          onClick={() => toast.success("Breath-work scheduled for 1:50 PM!", { description: "We'll remind you 5 minutes before." })}
          className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Schedule Now
        </button>
      </div>
    </>
  )
}
