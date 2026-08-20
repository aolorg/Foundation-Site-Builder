import { useEffect, useRef, useState } from "react";
import { Shield, Crown, Star, Users, Heart } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// GIVEBUTTER CONNECTION
// Paste your Givebutter campaign URL here once your account is set up,
// e.g. "https://givebutter.com/arena-of-life". Every donate button below
// will instantly go live and open the giving form with the right amount.
const GIVEBUTTER_CAMPAIGN_URL = "";
// ─────────────────────────────────────────────────────────────

const giveLive = GIVEBUTTER_CAMPAIGN_URL.trim().length > 0;

function openGive(amount?: string, frequency?: "once" | "monthly") {
  if (!giveLive) {
    document.querySelector("#give-now")?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  try {
    // Normalize input so a pasted link like "givebutter.com/campaign" still works.
    const raw = /^https?:\/\//i.test(GIVEBUTTER_CAMPAIGN_URL)
      ? GIVEBUTTER_CAMPAIGN_URL
      : `https://${GIVEBUTTER_CAMPAIGN_URL}`;
    const url = new URL(raw);
    if (amount) {
      const clean = amount.replace(/[^0-9.]/g, "");
      if (clean) url.searchParams.set("amount", clean);
    }
    if (frequency) url.searchParams.set("frequency", frequency === "monthly" ? "recurring" : "once");
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  } catch {
    // Misconfigured campaign URL — fall back to scrolling rather than crashing.
    document.querySelector("#give-now")?.scrollIntoView({ behavior: "smooth" });
  }
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const sustainingTiers = [
  { name: "Guardian", amount: "$25", tagline: "You hold the line every month", icon: Shield, popular: false },
  { name: "Protector", amount: "$50", tagline: "You keep the wall standing", icon: Shield, popular: true },
  { name: "Provider", amount: "$100", tagline: "You carry the family forward", icon: Crown, popular: false },
  { name: "Arena Builder", amount: "$500", tagline: "You build the infrastructure of the brotherhood", icon: Star, popular: false },
  { name: "Sustaining Protector", amount: "$1,000+", tagline: "Your name becomes part of the foundation", icon: Users, popular: false },
];

const standTiers = [
  { name: "Take a Stand", amount: "$50" },
  { name: "Secure the Line", amount: "$250" },
  { name: "Arena Champion", amount: "$1,000" },
  { name: "Founding Legacy", amount: "$5,000+" },
];

const foundingMembers = [
  { tier: "Legacy Founders", amount: "$1,000,000+" },
  { tier: "Champions of the Arena", amount: "$250,000+" },
  { tier: "Inner Circle", amount: "$100,000+" },
  { tier: "Brotherhood Leaders", amount: "$50,000+" },
  { tier: "Founding Members", amount: "$10,000+" },
  { tier: "On Guard Members", amount: "$5,000+" },
  { tier: "Arena Builders", amount: "$2,500+" },
  { tier: "Phalanx Partners", amount: "$1,000+" },
];

export default function Donate() {
  const { ref, inView } = useInView();

  return (
    <section
      id="donate"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      data-testid="donate-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Invest in the Brotherhood</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-4">
            Secure the Line
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            This is not a charity. This is an elite alliance reinforcing strong men. Every dollar you commit funds the phalanx.
          </p>
        </div>

        {/* Give Now — primary action */}
        <div id="give-now" className={`mb-16 transition-all duration-700 delay-75 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-2xl mx-auto bg-[hsl(215,65%,16%)] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(43,85%,50%) 0%, transparent 60%)" }} />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[hsl(43,85%,50%)] flex items-center justify-center mx-auto mb-5">
                <Heart size={20} className="text-[hsl(215,70%,8%)]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Make Your Investment</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
                Choose any amount below, or give directly. Every gift funds the War Chest and the men in the arena.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["$25", "$50", "$100", "$250", "$500"].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => openGive(amt, "once")}
                    className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-bold rounded-lg hover:bg-[hsl(43,85%,50%)] hover:text-[hsl(215,70%,8%)] hover:border-[hsl(43,85%,50%)] transition-all"
                    data-testid={`quickgive-${amt.replace("$", "")}`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <button
                onClick={() => openGive(undefined, "once")}
                className="inline-block px-10 py-4 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-sm font-bold tracking-widest uppercase rounded hover:bg-[hsl(43,90%,60%)] transition-all hover:scale-105"
                data-testid="give-now-cta"
              >
                {giveLive ? "Give Now" : "Donations Activating Soon"}
              </button>
              {!giveLive && (
                <p className="text-white/40 text-xs mt-4 max-w-sm mx-auto">
                  Secure online giving goes live the moment our Givebutter account is connected. Donations are accepted now while 501(c)(3) status is pending.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Three Circles framework */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "The Inner Circle",
                desc: "Hands-on leaders, governance partners, and Phalanx Circle members. Active daily in the arena's operations and direction.",
                tier: "Founding Members — $10K+",
                icon: Crown,
                highlight: true,
              },
              {
                name: "The Arena Circle",
                desc: "Active members engaged in programs, events, and monthly sustaining investment. In the arena every month.",
                tier: "Sustaining Protectors — Monthly",
                icon: Shield,
                highlight: false,
              },
              {
                name: "The Outer Circle",
                desc: "Supporters who stand behind the mission — one-time investments, merchandise, and awareness. Every stand counts.",
                tier: "Stand & Deliver — Any Level",
                icon: Users,
                highlight: false,
              },
            ].map((circle, i) => {
              const Icon = circle.icon;
              return (
                <div
                  key={circle.name}
                  className={`rounded-xl p-6 border-2 text-center ${circle.highlight ? "bg-[hsl(215,65%,16%)] border-[hsl(43,85%,50%)]" : "bg-gray-50 border-gray-200"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${circle.highlight ? "bg-[hsl(43,85%,50%)]" : "bg-[hsl(215,65%,16%)]"}`}>
                    <Icon size={20} className={circle.highlight ? "text-[hsl(215,70%,8%)]" : "text-[hsl(43,85%,50%)]"} />
                  </div>
                  <h3 className={`font-display text-base font-bold mb-2 ${circle.highlight ? "text-white" : "text-[hsl(215,65%,16%)]"}`}>{circle.name}</h3>
                  <p className={`text-xs leading-relaxed mb-4 ${circle.highlight ? "text-white/60" : "text-gray-500"}`}>{circle.desc}</p>
                  <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded ${circle.highlight ? "bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)]" : "border border-gray-300 text-gray-400"}`}>
                    {circle.tier}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 501c3 notice */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[hsl(215,65%,16%)] border border-[hsl(43,85%,50%,0.3)] rounded-xl px-8 py-5 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[hsl(43,85%,50%)] flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-[hsl(215,70%,8%)]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-1">501(c)(3) Status Pending</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Donations are accepted now. Tax-deductibility will be confirmed once the foundation's 501(c)(3) status is approved; please consult your tax advisor.
              </p>
            </div>
          </div>
        </div>

        {/* Sustaining Protectors — Monthly */}
        <div
          className={`mb-16 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-center text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-2">Sustaining Protectors</p>
          <p className="text-center text-gray-400 text-xs tracking-wide mb-8">Monthly Brotherhood Investment</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sustainingTiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <button
                  type="button"
                  key={tier.name}
                  onClick={() => openGive(tier.amount, "monthly")}
                  className={`relative w-full rounded-xl p-6 border-2 text-center transition-all duration-700 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43,85%,50%)] focus-visible:ring-offset-2 ${
                    tier.popular
                      ? "bg-[hsl(215,65%,16%)] border-[hsl(43,85%,50%)] shadow-xl"
                      : "bg-gray-50 border-gray-200 hover:border-[hsl(43,85%,50%)]"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  data-testid={`monthly-tier-${i}`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-[10px] font-bold tracking-widest uppercase rounded-full">
                      Most Active
                    </span>
                  )}
                  <Icon
                    size={20}
                    className={`mx-auto mb-3 ${tier.popular ? "text-[hsl(43,85%,50%)]" : "text-[hsl(215,65%,16%)]"}`}
                  />
                  <div className={`font-display text-2xl font-black mb-1 ${tier.popular ? "text-white" : "text-[hsl(215,65%,16%)]"}`}>
                    {tier.amount}
                  </div>
                  <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${tier.popular ? "text-[hsl(43,85%,50%)]" : "text-gray-500"}`}>
                    / month
                  </div>
                  <div className={`font-display text-sm font-semibold mb-2 ${tier.popular ? "text-white" : "text-[hsl(215,65%,16%)]"}`}>
                    {tier.name}
                  </div>
                  <div className={`text-xs leading-relaxed ${tier.popular ? "text-white/60" : "text-gray-500"}`}>
                    {tier.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stand & Deliver — One-Time */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-center text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-2">Stand &amp; Deliver</p>
          <p className="text-center text-gray-400 text-xs tracking-wide mb-8">One-Time Investment</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {standTiers.map((tier, i) => (
              <button
                type="button"
                key={tier.name}
                onClick={() => openGive(tier.amount, "once")}
                className="w-full text-center bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[hsl(43,85%,50%)] hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43,85%,50%)] focus-visible:ring-offset-2"
                data-testid={`onetime-tier-${i}`}
              >
                <div className="font-display text-2xl font-black text-[hsl(215,65%,16%)] mb-1">{tier.amount}</div>
                <div className="text-xs font-semibold text-gray-500 tracking-wide">{tier.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Founding Members Program */}
        <div
          className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[hsl(215,65%,16%)] rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 70% 30%, hsl(43,85%,50%) 0%, transparent 50%)"
            }} />
            <div className="relative z-10">
              <div className="text-center mb-10">
                <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">High-Net-Worth Investment Program</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Founding Members</h3>
                <p className="text-white/50 text-sm max-w-lg mx-auto">
                  For high-net-worth individuals and corporate partners who fund the operational infrastructure of the foundation. Tiered benefits include executive access, governance input, and exclusive foundational artifacts.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {foundingMembers.map((d, i) => (
                  <div
                    key={d.tier}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-center hover:border-[hsl(43,85%,50%,0.5)] transition-colors"
                    data-testid={`major-donor-${i}`}
                  >
                    <div className="text-[hsl(43,85%,50%)] font-bold text-xs tracking-wide mb-1">{d.amount}</div>
                    <div className="text-white/70 text-xs">{d.tier}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-block px-10 py-4 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-sm font-bold tracking-widest uppercase rounded hover:bg-[hsl(43,90%,60%)] transition-all hover:scale-105"
                  data-testid="major-donor-cta"
                >
                  Become a Founding Member
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
