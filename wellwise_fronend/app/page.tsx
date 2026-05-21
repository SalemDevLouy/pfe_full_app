import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl no-border tonal-shift">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-green-800 dark:text-green-400">spa</span>
          <h1 className="text-xl font-bold text-green-900 dark:text-green-500 font-headline tracking-tighter">The Mindful Editorial</h1>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <Link className="text-[10px] font-label uppercase tracking-widest text-green-900 dark:text-green-400 font-semibold" href="/">Home</Link>
            <Link className="text-[10px] font-label uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:opacity-80 transition-opacity" href="#why-us">Why Us</Link>
            <Link className="text-[10px] font-label uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:opacity-80 transition-opacity" href="#services">Services</Link>
            <Link className="text-[10px] font-label uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:opacity-80 transition-opacity" href="#testimonials">Testimonials</Link>
            <Link className="text-[10px] font-label uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:opacity-80 transition-opacity" href="/main/dashboard">Dashboard</Link>
          </nav>
          <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden wellness-glow">
            <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqOm_Ni5YHROPUsYXWLvBEfygdZkrnEwVn4zu6fqd1x_LzrLpnmBZigzyL3H4n_UwdytKSnzLjsc_My4Sq8VwodSR1gN9xAsCdfxR94ugUDTexZ6uR-7TO53bwB2zn-KOdtE5vaLZtbgEmvwpi7yuvBzk5T09pqKZPKFNjm2W7ccjn4t3EzNtct7leIMCe-_Hm8yoPz6NhmM5-hvlsHrq2Ilou5nKOt5BmwfYigeTq-UzhBtH0ClbmrgZ2J2plkiLeleZ2f-np2LH"/>
          </div>
        </div>
      </header>

      <main className="grow">
        {/* Hero Section */}
        <section data-aos="fade-up" className="relative min-h-198.75 flex items-center px-6 md:px-24 overflow-hidden">
          {/* Background Elements (Digital Sanctuary Aesthetic) */}
          <div className="absolute top-0 right-0 w-2/3 h-full -z-10 opacity-30 blur-[120px] bg-linear-to-br from-primary-fixed to-secondary-container"></div>
          <div className="max-w-4xl">
            <div className="mb-6 inline-block bg-primary-container/10 px-4 py-2 rounded-full">
              <span className="text-[10px] font-label uppercase tracking-widest text-primary font-bold">Personalized Wellness</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tight text-on-background leading-[0.95] mb-8">
              Your AI <br/><span className="text-primary italic">Wellness</span> Coach
            </h2>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed mb-12">
              A digital sanctuary designed to curate your path to balance. We translate complex bio-data into simple, editorialized daily rhythms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link className="px-10 py-5 bg-linear-to-br from-primary to-primary-container text-on-primary rounded-xl font-headline font-bold text-lg wellness-glow hover:scale-[1.02] active:scale-98 transition-all duration-300 text-center" href="/quiz">
                Start Quiz First
              </Link>
              <Link className="px-10 py-5 bg-surface-container-highest text-on-surface rounded-xl font-headline font-semibold text-lg hover:bg-surface-container-high transition-colors text-center" href="/main/dashboard">
                View Sample Plan
              </Link>
            </div>
          </div>
          {/* Hero Image / Visual Element */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-1/3 aspect-3/4 asymmetric-card overflow-hidden wellness-glow" style={{ borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem' }}>
            <img alt="Wellness Practice" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQV3kOUTBrOgRS0K-xv4pvWe7r1wLBor7yRfYuME2YxocHwhV6XCpQyhY6HDJAo_X5693HDZ6GGUbbjitGPqLlAMC9ATx1NkG900RsTDKzQf_opmSo4EzPamriq4UVnHTMDtVwpPNDqfNbTCn-8pcGqi1hwc2Vax9dwnISqD_qjAYEbdcu9jZQUr__2jbM2vy1HyTWEPsBo1srseMCC6eYZQ_hBt6Tc43m6bsvDpFzyvXVNY88CF21G7JVErJDhEkgC-IYOR6uOwIr"/>
          </div>
        </section>

        {/* Trust Banner */}
        <section data-aos="fade-up" data-aos-delay="80" className="px-6 md:px-24 py-10 border-y border-outline-variant/30 bg-surface-container-low">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-headline text-3xl font-extrabold text-primary">92%</p>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-1">Weekly Adherence</p>
            </div>
            <div>
              <p className="font-headline text-3xl font-extrabold text-primary">4.9/5</p>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-1">User Rating</p>
            </div>
            <div>
              <p className="font-headline text-3xl font-extrabold text-primary">18k+</p>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-1">Daily Rituals</p>
            </div>
            <div>
              <p className="font-headline text-3xl font-extrabold text-primary">24/7</p>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mt-1">AI Guidance</p>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section id="why-us" data-aos="fade-up" data-aos-delay="120" className="px-6 md:px-24 py-32 bg-surface scroll-mt-28">
          <div className="mb-20 text-center">
            <p className="text-[10px] font-label uppercase tracking-widest text-primary font-bold mb-4">Why Us</p>
            <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4">Crafted for Balance</h3>
            <div className="w-12 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div data-aos="zoom-in-up" data-aos-delay="100" className="bg-surface-container-lowest p-10 wellness-glow flex flex-col gap-6 group hover:-translate-y-1 transition-transform duration-500" style={{ borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem' }}>
              <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">insights</span>
              </div>
              <div>
                <h4 className="text-2xl font-headline font-bold mb-3">AI Analysis</h4>
                <p className="text-stone-600 leading-relaxed font-body">Deep neural processing of your sleep, movement, and mood patterns to uncover hidden wellness opportunities.</p>
              </div>
            </div>
            {/* Benefit 2 */}
            <div data-aos="zoom-in-up" data-aos-delay="180" className="bg-surface-container-lowest p-10 wellness-glow flex flex-col gap-6 group hover:-translate-y-1 transition-transform duration-500" style={{ borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem' }}>
              <div className="w-16 h-16 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-2xl font-headline font-bold mb-3">Personalized Plans</h4>
                <p className="text-stone-600 leading-relaxed font-body">Not just checklists, but a curated editorial experience tailored to your unique biological clock and lifestyle.</p>
              </div>
            </div>
            {/* Benefit 3 */}
            <div data-aos="zoom-in-up" data-aos-delay="260" className="bg-surface-container-lowest p-10 wellness-glow flex flex-col gap-6 group hover:-translate-y-1 transition-transform duration-500" style={{ borderRadius: '1.5rem 1.5rem 1.5rem 0.25rem' }}>
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl">shopping_basket</span>
              </div>
              <div>
                <h4 className="text-2xl font-headline font-bold mb-3">Product Curation</h4>
                <p className="text-stone-600 leading-relaxed font-body">Ethical recommendations for supplements, gear, and tools that actually align with your specific wellness goals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section id="services" data-aos="fade-up" className="px-6 md:px-24 pb-32 scroll-mt-28">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <p className="text-[10px] font-label uppercase tracking-widest text-primary font-bold mb-3">Our Services</p>
                <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Designed Around Real Life</h3>
              </div>
              <Link href="/main/dashboard" className="text-primary font-semibold hover:underline">Explore the live dashboard</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/main/dashboard" className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-3xl text-primary">dashboard</span>
                <h4 className="font-headline font-bold text-xl mt-4">Daily Dashboard</h4>
                <p className="text-stone-600 mt-2 text-sm">One place to understand your readiness, stress, and rhythm.</p>
              </Link>
              <Link href="/main/tracker" className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-3xl text-primary">event_note</span>
                <h4 className="font-headline font-bold text-xl mt-4">Habit Tracker</h4>
                <p className="text-stone-600 mt-2 text-sm">Track tiny wins and build consistency with contextual prompts.</p>
              </Link>
              <Link href="/main/insights" className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-3xl text-primary">auto_awesome</span>
                <h4 className="font-headline font-bold text-xl mt-4">AI Insights</h4>
                <p className="text-stone-600 mt-2 text-sm">Editorial guidance converted from your bio-signals in plain language.</p>
              </Link>
              <Link href="/main/store" className="bg-white rounded-3xl p-8 border border-outline-variant/20 hover:border-primary/40 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined text-3xl text-primary">shopping_bag</span>
                <h4 className="font-headline font-bold text-xl mt-4">Curated Store</h4>
                <p className="text-stone-600 mt-2 text-sm">Evidence-backed products selected for your immediate needs.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Quote / Anchor Section */}
        <section data-aos="fade-up" className="py-24 px-6 md:px-24">
          <div className="bg-primary p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20"></div>
            <span className="material-symbols-outlined text-primary-fixed text-6xl mb-8 block">format_quote</span>
            <h3 className="text-3xl md:text-5xl font-headline font-extrabold text-on-primary-container max-w-4xl mx-auto leading-tight italic">
              &quot;The future of wellness isn&apos;t more data, it&apos;s better synthesis. We provide the clarity you need to simply be.&quot;
            </h3>
            <p className="mt-12 text-[10px] font-label uppercase tracking-widest text-on-primary-container opacity-80">— Editorial Statement 01</p>
          </div>
        </section>

        {/* Banners */}
        <section data-aos="fade-up" className="px-6 md:px-24 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="rounded-3xl p-8 bg-surface-container-lowest border border-outline-variant/20 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10"></div>
              <p className="text-[10px] font-label uppercase tracking-widest text-primary font-bold">Limited Banner</p>
              <h4 className="font-headline text-3xl font-bold mt-3">7-Day Reset Path</h4>
              <p className="text-stone-600 mt-3 max-w-sm">Start a guided week focused on sleep recovery and energy stability.</p>
                <Link href="/quiz" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-white font-semibold">Begin Journey</Link>
            </div>
            <div className="rounded-3xl p-8 bg-stone-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #88d982, transparent 35%), radial-gradient(circle at 80% 80%, #2e7d32, transparent 35%)" }}></div>
              <div className="relative z-10">
                <p className="text-[10px] font-label uppercase tracking-widest text-green-300 font-bold">Member Banner</p>
                <h4 className="font-headline text-3xl font-bold mt-3">Unlock Pro Guidance</h4>
                <p className="text-stone-300 mt-3 max-w-sm">Get adaptive plans, deeper trend analysis, and priority coach prompts.</p>
                <Link href="/main/profile" className="inline-flex mt-6 px-5 py-3 rounded-xl bg-white text-stone-900 font-semibold">View Membership</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Insights / Asymmetric Row */}
        <section data-aos="fade-up" className="px-6 md:px-24 py-32 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-3xl overflow-hidden wellness-glow">
                <img alt="Smoothie" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgLw8-q-gGbI1PnyvDM4S-rrUDirnIDGKnWAWmESAy30lXxffsxIW93yMU7lusDnUcR9SPQxBJJ1lfUTBQvTAwhCgy_V-4cdQq4fWrLw6mwZMiajM0b1EHuf4FyGvmAKBieWEKe2o1rmvF3hbKYzqDLBEIpKK0Q9bD9CIOydi9Nz0uS1erfwRLvDVyEwT4e661HTDgzQi-dBA2NdVgN6paPxHdLCDjRsPx5k3qxA9FjeifnNkHnlUiscQ_kLZAmRj4McUYZ5z43Yi5"/>
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden wellness-glow translate-y-8">
                <img alt="Nature" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQSKboWy3s0lHRoI7Z9UCvSnX4Jo7nKJTVpPl4PvVpC_dikD5PtXDGPOZMtXZAND4ymElJUcAji-jP--6K7vX3ebFPxfx0AxjL6TPQz-8Zq3WAOXEbowMGCFQqh0Ouoom6s-4kgS_wPWcJHChIv-FteXRtCmwE2pIZ9mkppXqNG1l6v57HfVWXUGz5jNACEU-hz8Od0glrEVx0sqznMdg8COZ0lEEw5JZspfCYT-DdqaUlp6ZCRcqMjKJ5igwl4Fm8X9B19aLIjwqj"/>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-background mb-8 leading-tight">
              Beyond Tracking. <br/><span className="text-primary">Intuitive Coaching.</span>
            </h3>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">01</span>
                <div>
                  <h5 className="font-headline font-bold text-lg mb-2">Morning Resonance</h5>
                  <p className="text-stone-600">Wake up to a tailored briefing that adjusts based on your HRV and last night&apos;s sleep quality.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">02</span>
                <div>
                  <h5 className="font-headline font-bold text-lg mb-2">Circadian Alignment</h5>
                  <p className="text-stone-600">Sync your nutrition and activity with your body&apos;s natural clock for effortless energy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" data-aos="fade-up" className="px-6 md:px-24 pb-32 scroll-mt-28">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <p className="text-[10px] font-label uppercase tracking-widest text-primary font-bold mb-3">Testimonials</p>
              <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">People Who Found Their Rhythm</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article data-aos="fade-up" data-aos-delay="80" className="bg-white p-8 rounded-3xl border border-outline-variant/20">
                <p className="text-stone-700 leading-relaxed">&quot;In two weeks, my sleep stopped feeling random. The morning guidance is the first habit I have actually kept.&quot;</p>
                <p className="mt-6 font-headline font-bold">Noura A.</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Product Designer</p>
              </article>
              <article data-aos="fade-up" data-aos-delay="140" className="bg-white p-8 rounded-3xl border border-outline-variant/20">
                <p className="text-stone-700 leading-relaxed">&quot;I used to collect data and do nothing with it. This app turned numbers into decisions I can make daily.&quot;</p>
                <p className="mt-6 font-headline font-bold">Karim M.</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Founder</p>
              </article>
              <article data-aos="fade-up" data-aos-delay="200" className="bg-white p-8 rounded-3xl border border-outline-variant/20">
                <p className="text-stone-700 leading-relaxed">&quot;The route flow is smooth and clear. I jump from dashboard to tracker in seconds and stay consistent.&quot;</p>
                <p className="mt-6 font-headline font-bold">Lina R.</p>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Consultant</p>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-24 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tighter text-green-500 font-headline mb-8">The Mindful Editorial</h2>
            <p className="max-w-sm text-stone-500 leading-relaxed">
              A new paradigm in personal health. We combine artificial intelligence with human-centric design to create a sanctuary for your well-being.
            </p>
          </div>
          <div>
            <h4 className="text-white font-headline font-bold mb-6">Manifesto</h4>
            <ul className="space-y-4 text-sm font-label uppercase tracking-widest">
              <li><Link className="hover:text-green-400 transition-colors" href="#why-us">Our Approach</Link></li>
              <li><Link className="hover:text-green-400 transition-colors" href="#services">Privacy Ethics</Link></li>
              <li><Link className="hover:text-green-400 transition-colors" href="#testimonials">Research</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-headline font-bold mb-6">Connection</h4>
            <ul className="space-y-4 text-sm font-label uppercase tracking-widest">
              <li><Link className="hover:text-green-400 transition-colors" href="/main/profile">Instagram</Link></li>
              <li><Link className="hover:text-green-400 transition-colors" href="/main/insights">Substack</Link></li>
              <li><Link className="hover:text-green-400 transition-colors" href="/main/assessment">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-label uppercase tracking-widest opacity-50">
          <p>© 2024 The Mindful Editorial. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="/main/profile">Terms</Link>
            <Link href="/main/profile">Privacy</Link>
            <Link href="/main/profile">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
