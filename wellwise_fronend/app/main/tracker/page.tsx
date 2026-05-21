"use client";

import { toast } from "sonner";

export default function Tracker() {
  const habits = [
    { name: "Morning Meditation", details: "15 minutes • 8:00 AM", done: [true,true,true,true,true,false,false], icon: "self_improvement" },
    { name: "8 Glasses of Water", details: "2.5 Liters • Daily", done: [true,true,true,true,true,false,false], icon: "water_drop" },
    { name: "No Screens Before Bed", details: "60 mins before sleep", done: [true,true,true,true,true,false,false], icon: "bedtime" },
  ];
  const days = ['M','T','W','T','F','S','S'];

  return (
    <>
      <header className="sticky top-0 w-full z-30 flex justify-between items-center px-6 md:px-10 py-6 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-headline font-extrabold tracking-tight text-primary">Habit Tracker</h2>
          <div className="h-1 w-1 bg-outline-variant rounded-full hidden md:block"></div>
          <p className="text-sm font-medium text-stone-500 hidden md:block">October 14–20</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary-container/30 rounded-full">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
            <span className="text-sm font-bold text-on-secondary-container hidden md:inline">7-Day Streak</span>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-surface-container-lowest wellness-glow p-8 space-y-8 rounded-[1.5rem] rounded-tl-lg">
             <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div>
                   <h3 className="text-xl font-headline font-bold mb-1">Consistency Overview</h3>
                   <p className="text-sm text-stone-500">Weekly progress based on your active habits</p>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-primary"></div>
                       <span className="text-xs font-medium uppercase tracking-wider text-stone-400">Completion</span>
                   </div>
                </div>
             </div>
             <div className="relative h-48 w-full flex items-end justify-between px-2 gap-2">
                 {[85, 92, 78, 100, 88, 95, 100].map((h, i) => {
                    const daysLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    return (
                       <div key={i} className="flex flex-col items-center gap-4 w-full group">
                           <div className="relative w-full flex flex-col items-center">
                              <div className="w-1 bg-surface-container-high h-32 rounded-full relative overflow-hidden">
                                 <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-700" style={{ height: `${h}%` }}></div>
                              </div>
                           </div>
                           <span className={`text-[10px] md:text-xs font-bold uppercase tracking-tighter ${i === 6 ? 'text-primary' : 'text-stone-400'}`}>{daysLabel[i]}</span>
                       </div>
                    )
                 })}
             </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-primary-container p-8 text-white wellness-glow flex flex-col justify-between rounded-[1.5rem] rounded-tl-lg">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80 mb-4">Milestone</p>
              <h3 className="text-3xl font-headline font-extrabold leading-tight">Mastering Persistence</h3>
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">12</span>
                <span className="text-lg opacity-80 font-medium">days</span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">You are in the top 5% of mindful explorers this month. Keep the momentum.</p>
              <div className="pt-4">
                <button 
                  onClick={() => toast.success("Reward Claimed!", { description: "100 Mindful Points added to your account." })}
                  className="w-full py-4 bg-white text-primary font-bold rounded-2xl text-sm transition-transform active:scale-95"
                >
                  Claim Reward
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
           <div className="flex justify-between items-center">
             <h3 className="text-xl font-headline font-bold">Current Intentions</h3>
             <button 
                onClick={() => toast("Add Habit", { description: "Opening habit creation modal..." })}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:opacity-80 transition-opacity"
             >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span className="hidden md:inline">Add New Habit</span>
             </button>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {habits.map((habit, i) => (
                <div key={i} className="group bg-surface-container-lowest rounded-[2rem] p-6 wellness-glow flex flex-col md:flex-row md:items-center gap-6 transition-all hover:bg-surface-bright border border-outline-variant/10">
                   <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary shrink-0">
                         <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>{habit.icon}</span>
                      </div>
                      <div>
                         <h4 className="font-headline font-bold text-on-surface">{habit.name}</h4>
                         <p className="text-xs text-stone-500 mt-1">{habit.details}</p>
                      </div>
                   </div>
                   <div className="flex items-center justify-between gap-1 md:gap-4 flex-[1.5]">
                      {days.map((day, j) => {
                         const isDone = habit.done[j];
                         return (
                            <div key={j} className="flex flex-col items-center">
                               {isDone ? (
                                 <button 
                                   onClick={() => toast.info(`Unchecked ${habit.name} for ${day}`)}
                                   className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white"
                                 >
                                    <span className="material-symbols-outlined text-xs md:text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                                 </button>
                               ) : (
                                 <button 
                                   onClick={() => toast.success(`Checked ${habit.name} for ${day}!`)}
                                   className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-outline-variant bg-transparent flex items-center justify-center text-transparent transition-all hover:border-primary hover:text-primary"
                                 >
                                    <span className="material-symbols-outlined text-xs md:text-sm">check</span>
                                 </button>
                               )}
                               <span className="text-[9px] uppercase font-bold text-stone-400 mt-2">{day}</span>
                            </div>
                         )
                      })}
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </>
  )
}
