
// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";

// import ContactHero from "../components/contact/ContactHero";
// import ContactCards from "../components/contact/ContactCards";
// import ContactForm from "../components/contact/ContactForm";
// import ContactFAQ from "../components/contact/ContactFAQ";
// import SocialLinks from "../components/contact/SocialLinks";


// function ContactPage() {
//   return (
//     <div className="bg-[#0D1117] text-white">
      
//       <Navbar />

//       <ContactHero />

//       <ContactCards />

//       <ContactForm />

//       <ContactFAQ />

//       <SocialLinks />

//       <Footer />

//     </div>
//   );
// }

// export default ContactPage;


import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = ["About", "Features", "How It Works", "Contact"];

const contactCards = [
  {
    label: "Email Support",
    email: "support@tripunite.com",
    desc: "Questions about your account or trips",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    label: "Partnerships",
    email: "partners@tripunite.com",
    desc: "Collab, brand deals & integrations",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "General Inquiries",
    email: "hello@tripunite.com",
    desc: "Anything else on your mind",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: "How do I create a trip?",
    a: "Sign up for a free account, hit 'Create a Trip', fill in your destination, dates, and preferences — then publish. Potential companions can discover and request to join instantly.",
  },
  {
    q: "Is TripUnite free to use?",
    a: "Core features — browsing trips, sending join requests, and group chats — are completely free. We offer a Pro tier for power travellers who want advanced filters and priority matching.",
  },
  {
    q: "How are travellers verified?",
    a: "Every member goes through ID verification powered by our identity partner. Verified badges appear on profiles so you always know who you're travelling with.",
  },
  {
    q: "Can I cancel or leave a trip?",
    a: "Yes, you can leave a trip at any time from your dashboard. Trip creators can manage their group roster and update trip details up until departure.",
  },
];

const socials = [
  {
    name: "Instagram",
    handle: "@tripunite",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@tripunite",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "TripUnite",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-2xl p-5 transition-all duration-200"
      style={{
        backgroundColor: open ? "#111827" : "transparent",
        border: `1px solid ${open ? "rgba(29,158,117,0.25)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-gray-200 text-[14px] font-medium">{q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: open ? "rgba(29,158,117,0.2)" : "rgba(255,255,255,0.06)",
            color: open ? "#5DCAA5" : "#6B7280",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </div>
      {open && (
        <p className="text-gray-400 text-[13px] leading-relaxed mt-3 pr-8">{a}</p>
      )}
    </button>
  );
}



export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSubmitted(true);
  };

  const inputStyle = (field) => ({
    backgroundColor: "#0D1117",
    border: `1px solid ${focused === field ? "#1D9E75" : "rgba(255,255,255,0.08)"}`,
    color: "#F3F4F6",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "13px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    resize: field === "message" ? "vertical" : "none",
  });

  return (
    <div className="min-h-screen text-gray-100" style={{ backgroundColor: "#0D1117", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&display=swap');
        .grad-text { background: linear-gradient(135deg, #5DCAA5 0%, #1D9E75 50%, #9FE1CB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: border-color 0.25s, transform 0.25s; }
        .card-hover:hover { border-color: rgba(29,158,117,0.35) !important; transform: translateY(-3px); }
        .btn-primary { background: linear-gradient(135deg, #1D9E75, #0F6E56); transition: opacity 0.2s, transform 0.15s; border: none; cursor: pointer; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .social-card { transition: background 0.2s, border-color 0.2s, transform 0.2s; }
        .social-card:hover { background: rgba(29,158,117,0.08) !important; border-color: rgba(29,158,117,0.25) !important; transform: translateY(-2px); }
        ::placeholder { color: #4B5563; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .tag-pill { background: rgba(29,158,117,0.1); border: 1px solid rgba(29,158,117,0.2); color: #5DCAA5; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
      className="fixed top-0 bg-[#111827] left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(13,17,23,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(29,158,117,0.12)" : "none",
      }}
    >
      <div className=" mx-auto px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#1D9E75,#0F6E56)" }}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </div>

          {/* <span className="font-semibold text-gray-100 tracking-tight text-[15px]">
            TripUnite
          </span> */}
          <Link to="/" className="text-[15px] font-medium text-gray-400">
            Trip<span className="text-white">Unite</span>
          </Link>
          
        </div>

        <div className="hidden md:flex items-center gap-7">
          {/* {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-[13px] text-gray-400 hover:text-gray-100">
              {l}
            </a>
          ))} */}
          <Link to="/about" className="text-[13px] text-gray-400 hover:text-gray-100">
            About
          </Link>

          <Link to="/contact" className="text-[13px] text-gray-400 hover:text-gray-100">
            Contact
          </Link> 
          <Link to="/explore" className="text-[13px] text-gray-400 hover:text-gray-100">
            Explore
          </Link>            
          {/* <button onClick={() => navigate("/auth")} className="text-[13px] text-white border border-white px-4 py-1.5 rounded-lg hover:bg-white hover:text-black hover:font-medium transition">
            Login / Sign Up
          </button> */}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="group text-[13px] text-white border w-[120px] border-white px-4 py-1.5 rounded-lg
                           hover:bg-white hover:text-black hover:font-medium transition"
              >
                {/* Default text */}
                <span className="block group-hover:hidden">
                  {user.displayName || user.email}
                </span>

                {/* Hover text */}
                <span className="hidden group-hover:block">
                  Log out
                </span>
              </button>
              
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="text-[13px] text-white border border-white px-4 py-1.5 rounded-lg
                         hover:bg-white hover:text-black hover:font-medium transition"
            >
              Login
            </button>
          )}
        </div>

        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden absolute right-6 mt-2 px-6 py-4 flex flex-col gap-4 bg-[#111827] rounded-lg shadow-lg w-max z-50">
          <Link to="/about" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/explore" className="text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>Explore</Link>

          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-white border border-white px-6 py-2 rounded-lg"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => { navigate("/auth"); setMenuOpen(false); }}
              className="text-white border border-white px-6 py-2 rounded-lg"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>


      
      {/* <nav
      className="fixed top-0 bg-[#0D1117]/90 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-600"
    >
      <Link to="/" className="text-[34px] font-medium text-gray-400">
        Trip<span className="text-white">Unite</span>
      </Link>

      <div className="flex items-center gap-6 ">
        <Link to="/explore" className="font-medium text-gray-200 hover:text-gray-400">
          Explore Trips
        </Link>

        <Link to="/create-trip" className="font-medium text-gray-200 hover:text-gray-400">
          Create Trip
        </Link>

        <Link to="/dashboard" className="font-medium text-gray-200 hover:text-gray-400">
          Dashboard
        </Link>
        <button onClick={() => navigate("/auth")} className="text-sm font-bold px-6 py-1.5 rounded-lg bg-gray-100 border border-gray-300 hover:text-gray-900">
          Login / Sign Up
        </button>
      </div>
      </nav> */}

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-5 overflow-hidden" style={{ backgroundColor: "#0D1117" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(29,158,117,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 tag-pill text-[11px] font-medium tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
            We're here to help
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-tight mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            Get in <span className="grad-text italic">Touch.</span>
          </h1>
          <p className="text-gray-400 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto">
            Have questions, feedback, or partnership ideas? We'd love to hear from you — our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="py-16 px-5" style={{ backgroundColor: "#0D1117" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactCards.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="card-hover rounded-2xl p-6" style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(29,158,117,0.12)", color: "#5DCAA5" }}>
                  {c.icon}
                </div>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1 font-medium">{c.label}</p>
                <a href={`mailto:${c.email}`} className="block text-[13px] font-medium mb-2 transition-colors hover:text-green-400" style={{ color: "#5DCAA5" }}>
                  {c.email}
                </a>
                <p className="text-gray-500 text-[12px] leading-relaxed">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-20 px-5" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>Send a message</span>
              <h2 className="text-2xl md:text-3xl font-light mt-3 mb-2 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Drop us a line
              </h2>
              <p className="text-gray-500 text-[13px]">Fill in the form below and we'll get back to you shortly.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl p-7 md:p-10" style={{ backgroundColor: "#0D1117", border: "1px solid rgba(255,255,255,0.07)" }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(29,158,117,0.15)", border: "1px solid rgba(29,158,117,0.3)" }}>
                    <svg className="w-7 h-7" fill="none" stroke="#5DCAA5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-gray-100 font-medium text-lg mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-[13px]">Thanks for reaching out. We'll be in touch within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 text-[12px] underline underline-offset-2" style={{ color: "#5DCAA5" }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-widest mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-widest mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-widest mb-2">Subject</label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("subject")}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("message")}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full text-white font-medium py-3.5 rounded-xl text-[14px]">
                    Send message →
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5" style={{ backgroundColor: "#0D1117" }}>
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>FAQ</span>
              <h2 className="text-2xl md:text-3xl font-light mt-3 mb-2 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
                Common questions
              </h2>
              <p className="text-gray-500 text-[13px]">Quick answers before you reach out.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3">
              {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Socials ── */}
      <section className="py-20 px-5" style={{ backgroundColor: "#111827" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#5DCAA5" }}>Follow us</span>
            <h2 className="text-2xl md:text-3xl font-light mt-3 mb-2 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Stay in the loop
            </h2>
            <p className="text-gray-500 text-[13px] mb-10">Trip inspiration, feature updates, and traveller stories — follow along.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="social-card rounded-2xl p-5 flex flex-col items-center gap-3 no-underline"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(29,158,117,0.1)", color: "#5DCAA5" }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-gray-200 text-[13px] font-medium">{s.name}</p>
                    <p className="text-gray-500 text-[12px]">{s.handle}</p>
                  </div>
                </a>
              ))}
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