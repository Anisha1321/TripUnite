import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Features", "How It Works", "Community"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const GlobeIllustration = () => (
  <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="160" cy="160" r="130" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.35" />
    <circle cx="160" cy="160" r="90" stroke="#1D9E75" strokeWidth="1" opacity="0.2" />
    <circle cx="160" cy="160" r="50" fill="#0F1C16" stroke="#1D9E75" strokeWidth="1.5" opacity="0.6" />
    <ellipse cx="160" cy="160" rx="90" ry="40" stroke="#1D9E75" strokeWidth="1" strokeDasharray="4 3" opacity="0.25" />
    <line x1="70" y1="160" x2="250" y2="160" stroke="#1D9E75" strokeWidth="0.8" opacity="0.2" />
    <line x1="160" y1="70" x2="160" y2="250" stroke="#1D9E75" strokeWidth="0.8" opacity="0.2" />
    {[
      { cx: 110, cy: 120 }, { cx: 195, cy: 140 }, { cx: 145, cy: 195 },
      { cx: 220, cy: 105 }, { cx: 90, cy: 175 },
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p.cx} cy={p.cy} r="5" fill="#1D9E75" opacity="0.8" />
        <circle cx={p.cx} cy={p.cy} r="9" fill="#1D9E75" opacity="0.15" />
      </g>
    ))}
    <line x1="110" y1="120" x2="195" y2="140" stroke="#1D9E75" strokeWidth="1" opacity="0.4" />
    <line x1="195" y1="140" x2="145" y2="195" stroke="#1D9E75" strokeWidth="1" opacity="0.4" />
    <line x1="110" y1="120" x2="90" y2="175" stroke="#1D9E75" strokeWidth="1" opacity="0.4" />
    <line x1="220" y1="105" x2="195" y2="140" stroke="#1D9E75" strokeWidth="1" opacity="0.4" />
    <circle cx="160" cy="160" r="130" stroke="#1D4030" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    title: "Solo travel feels unsafe",
    desc: "Navigating unfamiliar destinations alone leaves travellers vulnerable, anxious, and missing out on shared experiences.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: "Hard to find compatible companions",
    desc: "Finding travellers who share your pace, interests, and budget is nearly impossible through generic social platforms.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Group planning is chaotic",
    desc: "Coordinating itineraries, budgets, and preferences across a group quickly turns into a logistical nightmare.",
  },
];

const solutions = [
  {
    icon: "✦",
    title: "Create or join trips",
    desc: "Post your upcoming adventure or browse open trips to join — filtered by destination, date, and style.",
  },
  {
    icon: "◈",
    title: "Smart traveller matching",
    desc: "Our algorithm surfaces compatible companions based on travel style, budget range, and shared interests.",
  },
  {
    icon: "◉",
    title: "Verified profiles",
    desc: "Every traveller is identity-verified, so you can connect with confidence and peace of mind.",
  },
  {
    icon: "◎",
    title: "Built-in group chats",
    desc: "Plan, coordinate, and bond with your travel crew — all inside TripUnite, no third-party apps needed.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create a trip",
    desc: "Define your destination, dates, budget, and the kind of experience you're looking for.",
  },
  {
    num: "02",
    title: "Find companions",
    desc: "Browse travellers who match your trip or let TripUnite surface the best-fit profiles for you.",
  },
  {
    num: "03",
    title: "Explore together",
    desc: "Connect, plan in real time, and set off on an adventure that's better with company.",
  },
];

const stats = [
  { value: "5,000+", label: "Travellers worldwide" },
  { value: "120+", label: "Cities explored" },
  { value: "350+", label: "Trips created" },
];

export default function Aboutpage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-gray-100" style={{ backgroundColor: "#0D1117", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&display=swap');
        .grad-text { background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #9FE1CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: border-color 0.25s, transform 0.25s; }
        .card-hover:hover { border-color: #1D9E75 !important; transform: translateY(-3px); }
        .btn-primary { background: linear-gradient(135deg, #1D9E75, #0F6E56); transition: opacity 0.2s, transform 0.15s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-outline { transition: background 0.2s, transform 0.15s; }
        .btn-outline:hover { background: rgba(29,158,117,0.1); transform: translateY(-1px); }
        .step-connector { background: linear-gradient(90deg, #1D9E75 0%, transparent 100%); }
        .noise-bg::before { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); opacity: 0.4; pointer-events: none; }
        .glow-dot { box-shadow: 0 0 0 4px rgba(29,158,117,0.15), 0 0 20px rgba(29,158,117,0.1); }
        @keyframes pulse-ring { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.15;transform:scale(1.15)} }
        .pulse { animation: pulse-ring 3s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float-anim { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(13,17,23,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(29,158,117,0.12)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1D9E75,#0F6E56)" }}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-100 tracking-tight text-[15px]">TripUnite</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="text-[13px] text-gray-400 hover:text-gray-100 transition-colors duration-200 tracking-wide">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-[13px] text-gray-400 hover:text-gray-100 transition-colors px-3 py-1.5">Sign in</button>
            <button className="btn-primary text-white text-[13px] font-medium px-4 py-2 rounded-lg">Get started</button>
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-5 pb-5 space-y-3 border-t" style={{ borderColor: "rgba(29,158,117,0.12)", backgroundColor: "rgba(13,17,23,0.97)" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="block text-[14px] text-gray-400 py-1">{l}</a>
            ))}
            <button className="btn-primary w-full text-white text-[13px] font-medium px-4 py-2.5 rounded-lg mt-2">Get started</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-5 overflow-hidden noise-bg" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(29,158,117,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 right-0 w-64 md:w-96 h-64 md:h-96 -translate-y-1/2 opacity-30 pointer-events-none float-anim" style={{ right: "-2rem" }}>
          <GlobeIllustration />
        </div>

        <div className="max-w-6xl mx-auto w-full relative">
          <div
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-[11px] font-medium tracking-widest uppercase"
              style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.2)", color: "#5DCAA5" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current pulse inline-block" />
              Now open for early access
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight mb-6 max-w-3xl"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Travel Together.{" "}
              <span className="grad-text italic">Explore More.</span>
            </h1>

            <p className="text-gray-400 text-[16px] md:text-lg leading-relaxed max-w-xl mb-10 font-light">
              TripUnite connects like-minded travellers so no one has to explore alone. Find your people, plan together, and make every journey unforgettable.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-white font-medium px-6 py-3 rounded-xl text-[14px]">
                Start exploring →
              </button>
              <button className="btn-outline text-gray-300 font-medium px-6 py-3 rounded-xl text-[14px]"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-2">
                {["#1D9E75", "#0F6E56", "#5DCAA5", "#085041"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-medium text-white"
                    style={{ borderColor: "#0D1117", backgroundColor: c }}>
                    {["R", "M", "J", "A"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-gray-500">Joined by <span className="text-gray-300 font-medium">5,000+</span> travellers worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="py-24 px-5" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-4">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Travel shouldn't be this hard.
            </h2>
            <p className="text-gray-400 text-[15px] max-w-lg mb-14">Millions of travellers face the same barriers before they even leave home.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-hover rounded-2xl p-6 h-full" style={{ backgroundColor: "#0D1117", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(29,158,117,0.12)", color: "#5DCAA5" }}>
                    {p.icon}
                  </div>
                  <h3 className="text-gray-100 font-medium mb-2 text-[15px]">{p.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="py-24 px-5" style={{ backgroundColor: "#0D1117" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-4">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>The Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-3 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              How TripUnite helps.
            </h2>
            <p className="text-gray-400 text-[15px] max-w-lg mb-14">Everything you need to find your tribe and travel smarter, in one place.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-hover rounded-2xl p-6 h-full relative overflow-hidden" style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-2xl mb-5 font-mono" style={{ color: "#1D9E75" }}>{s.icon}</div>
                  <h3 className="text-gray-100 font-medium mb-2 text-[15px]">{s.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{s.desc}</p>
                  <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-5" style={{ background: "#1D9E75" }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-5" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-4">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-14 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Up and exploring in three steps.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.15} className="relative">
                <div className="p-8 md:p-10">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-[3.5rem] right-0 w-1/2 h-px step-connector opacity-30" />
                  )}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 glow-dot"
                    style={{ background: "rgba(29,158,117,0.12)", border: "1px solid rgba(29,158,117,0.25)" }}>
                    <span className="text-[13px] font-semibold" style={{ color: "#5DCAA5" }}>{s.num}</span>
                  </div>
                  <h3 className="text-gray-100 font-medium text-lg mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-28 px-5 relative overflow-hidden" style={{ backgroundColor: "#0D1117" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(29,158,117,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <FadeIn>
            <div className="w-12 h-px mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, #1D9E75, transparent)" }} />
            <p className="text-[11px] font-medium tracking-widest uppercase mb-6" style={{ color: "#5DCAA5" }}>Our Mission</p>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-gray-200 tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}>
              "Our mission is to make travel more{" "}
              <span className="grad-text italic">social, safe, and accessible</span>{" "}
              for everyone."
            </blockquote>
            <p className="text-gray-500 text-[13px] mt-8 leading-relaxed max-w-md mx-auto">
              We believe the best journeys are shared — and that the right companion can transform any trip from ordinary to extraordinary.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 px-5" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-4">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>By the Numbers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-14 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              A growing community of explorers.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="card-hover rounded-2xl p-8 text-center" style={{ backgroundColor: "#0D1117", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-4xl md:text-5xl font-semibold mb-2 grad-text" style={{ fontFamily: "'Fraunces', serif" }}>{s.value}</div>
                  <p className="text-gray-500 text-[13px]">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-5" style={{ backgroundColor: "#0D1117" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(29,158,117,0.1) 0%, rgba(15,110,86,0.05) 100%)", border: "1px solid rgba(29,158,117,0.2)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(29,158,117,0.08) 0%, transparent 70%)" }} />
              <div className="relative">
                <p className="text-[11px] font-medium tracking-widest uppercase mb-5" style={{ color: "#5DCAA5" }}>Ready to explore?</p>
                <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                  Find your travel companions today.
                </h2>
                <p className="text-gray-400 text-[15px] mb-10 leading-relaxed">
                  Join thousands of travellers who've already found their perfect crew. Your next adventure is waiting.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button className="btn-primary text-white font-medium px-7 py-3.5 rounded-xl text-[14px]">
                    Explore trips →
                  </button>
                  <button className="btn-outline text-gray-300 font-medium px-7 py-3.5 rounded-xl text-[14px]"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                    Create a trip
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1D9E75,#0F6E56)" }}>
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="text-gray-400 text-[13px]">TripUnite</span>
          </div>
          <p className="text-gray-600 text-[12px]">© 2025 TripUnite. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-gray-600 text-[12px] hover:text-gray-400 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}