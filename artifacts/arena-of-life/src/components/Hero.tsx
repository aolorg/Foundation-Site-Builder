import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import crest from "@assets/generated_images/laurel-emblem-transparent.png";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-20 md:pt-24 md:pb-16"
      data-testid="hero-section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(160deg, hsl(215,75%,8%) 0%, hsl(215,62%,17%) 45%, hsl(215,70%,9%) 100%)",
        }}
      />

      {/* Warm gold glow behind the crest */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, hsla(43,85%,50%,0.22) 0%, hsla(43,85%,50%,0.06) 38%, transparent 62%)",
        }}
      />

      {/* Brand seal — gold laurel crest, framing the headline, fades in */}
      <div className="absolute inset-0 z-0 flex items-start justify-center pt-[14vh] md:pt-[12vh] pointer-events-none">
        <img
          src={crest}
          alt=""
          aria-hidden="true"
          decoding="async"
          className={`w-[88vw] max-w-2xl transition-all duration-[1500ms] ease-out ${visible ? "opacity-[0.45] scale-100" : "opacity-0 scale-95"}`}
        />
      </div>

      {/* Subtle gold grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(43,85%,50%) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(43,85%,50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="inline-flex flex-col items-center gap-1.5 text-[hsl(43,85%,50%)] font-bold uppercase mb-6 border border-[hsl(43,85%,50%,0.4)] px-6 py-3">
            <span className="text-sm tracking-[0.4em]">Naples, Florida</span>
            <span className="text-[10px] tracking-[0.3em] text-[hsl(43,85%,50%)]/75">
              Est. April 2026 &nbsp;·&nbsp; 501(c)(3) Pending
            </span>
          </span>
        </div>

        {/* Main headline */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "150ms" }}
        >
          <h1 className="font-display leading-none tracking-tight mb-8">
            <span className="block text-xl md:text-2xl font-bold text-white/70 tracking-[0.5em] uppercase mb-3 md:mb-4">
              The
            </span>
            <span className="block text-7xl sm:text-8xl md:text-9xl font-black leading-[0.85] gold-shimmer">
              ARENA
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl font-black leading-[1] gold-shimmer tracking-[0.12em] mb-4 md:mb-5">
              OF LIFE
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.25em] uppercase">
              Foundation
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            An alliance for husbands and fathers navigating the hardest battles of their lives — the arena of family health crises.
          </p>
        </div>

        {/* Roosevelt Quote */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "450ms" }}
        >
          <div className="mb-12 mx-auto max-w-3xl border-l-4 border-[hsl(43,85%,50%)] pl-6 text-left">
            <blockquote className="font-serif-custom italic text-white/60 text-base md:text-lg leading-relaxed mb-2">
              "It is not the critic who counts; not the man who points out how the strong man stumbles... The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood."
            </blockquote>
            <cite className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase not-italic">
              — Theodore Roosevelt, 1910
            </cite>
          </div>
        </div>

        {/* CTAs */}
        <div
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-4 justify-center ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <button
            onClick={() => scrollTo("#mission")}
            className="px-10 py-4 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] font-bold tracking-widest uppercase text-sm rounded hover:bg-[hsl(43,90%,60%)] transition-all hover:scale-105 shadow-lg shadow-[hsl(43,85%,50%,0.3)]"
            data-testid="hero-cta-enter"
          >
            Enter the Arena
          </button>
          <button
            onClick={() => scrollTo("#donate")}
            className="px-10 py-4 border-2 border-white/30 text-white font-bold tracking-widest uppercase text-sm rounded hover:border-[hsl(43,85%,50%)] hover:text-[hsl(43,85%,50%)] transition-all hover:scale-105"
            data-testid="hero-cta-donate"
          >
            Invest in the Circle
          </button>
        </div>

        {/* Pillars */}
        <div
          className={`transition-all duration-700 mt-16 flex flex-wrap justify-center gap-x-12 gap-y-2 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "800ms" }}
        >
          {["Guardians", "Protectors", "Providers"].map((pillar) => (
            <span
              key={pillar}
              className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase"
              data-testid={`pillar-${pillar.toLowerCase()}`}
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollTo("#mission")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-[hsl(43,85%,50%)] transition-colors animate-bounce"
        aria-label="Scroll down"
        data-testid="hero-scroll-cue"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
