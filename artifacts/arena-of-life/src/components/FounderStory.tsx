import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

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

export default function FounderStory() {
  const { ref, inView } = useInView();

  return (
    <section
      id="founder"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[hsl(215,65%,16%)] relative overflow-hidden"
      data-testid="founder-section"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 80% 50%, hsl(43,85%,50%) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">The Man Who Started It</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            The Founder's Story
          </h2>
        </div>

        {/* 1. Lead pull quote */}
        <div
          className={`max-w-3xl mx-auto mb-20 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative">
            <Quote size={48} className="text-[hsl(43,85%,50%)] opacity-30 absolute -top-4 -left-2" />
            <blockquote className="font-serif-custom italic text-white text-xl md:text-2xl leading-relaxed pl-8 pt-2">
              "I built this because I refused to let another man go through what I went through without someone saying: You are not alone. You are seen. You are not weak for struggling. You are exactly the kind of man this world needs more of — a man who stayed in the arena."
            </blockquote>
            <div className="mt-6 pl-8">
              <div className="w-10 h-0.5 bg-[hsl(43,85%,50%)] mb-3" />
              <cite className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase not-italic">
                Charles DiPerri — Founder
              </cite>
            </div>
          </div>
        </div>

        {/* 2. The story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
          {/* Narrative */}
          <div
            className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="gold-border-left pl-5 space-y-4 text-white/75 text-sm md:text-base leading-relaxed">
              <p>
                His wife, 49, has been battling an oligodendroglioma brain tumor for <strong className="text-white">nine years</strong> — three left frontal lobe brain surgeries, the most recent six months ago. Charles is the sole financial provider for their family, with two children in private school.
              </p>
              <p>
                Every day off to care for his wife means zero income. Over nine years, he has lost <strong className="text-white">hundreds of thousands of dollars</strong> in commissions — and never stopped standing.
              </p>
              <p>
                The family's journey extends far beyond their own crisis. His wife previously lost her mother, father, grandmother, and grandfather — all to cancer. Her father traveled from Italy to die in their bedroom. Charles helped guide each one through their final chapter.
              </p>
            </div>
          </div>

          {/* The Why boxes */}
          <div
            className={`space-y-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-[hsl(43,85%,50%)] font-bold text-sm tracking-widest uppercase mb-2">Why Now</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Nine years of fighting alone revealed a gap that no organization was filling. Men in caregiver roles had no Circle, no financial safety net, no roadmap. The Arena of Life Foundation exists to close that gap — permanently.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-[hsl(43,85%,50%)] font-bold text-sm tracking-widest uppercase mb-2">Why Charles</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                He didn't build this from theory. He built it from nine years of scars, sacrifice, and still showing up. That is the credibility that no resume can manufacture. He is the man in the arena.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Who he is — identity at the end */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border border-[hsl(43,85%,50%,0.4)] rounded-2xl p-8 relative">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[hsl(43,85%,50%)] to-transparent" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[hsl(43,85%,50%)] flex items-center justify-center flex-shrink-0">
                <span className="font-display text-2xl font-black text-[hsl(215,70%,8%)]">CD</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Charles DiPerri</h3>
                <p className="text-[hsl(43,85%,50%)] text-sm tracking-widest uppercase font-semibold">President &amp; Founder</p>
                <p className="text-white/50 text-sm mt-1">Naples, Florida</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Professionally, Charles is an 18-year veteran sales executive at Marriott Vacation Club, consistently ranked in the <strong className="text-[hsl(43,85%,50%)]">top 1–5% worldwide</strong> — a man who performs at a world-class level while carrying a weight most men can't imagine.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "18 Years at Marriott Vacation Club",
                "Top 1–5% Globally",
                "Sole Provider",
                "Naples, FL",
                "Father of Two",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-white/20 text-white/60 text-xs tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
