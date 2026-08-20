import { useEffect, useRef, useState } from "react";

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

const officers = [
  {
    name: "Charles DiPerri",
    role: "President & Founder",
    bio: "18-year veteran sales executive at Marriott Vacation Club, top 1–5% globally. Founded the organization after nine years as a sole caregiver for his wife through three brain surgeries. The man in the arena.",
    initials: "CD",
  },
  {
    name: "Leonardo DiPerri",
    role: "Treasurer",
    bio: "Manages fiscal responsibility and financial stewardship for the foundation, ensuring every dollar reaches those who need it most.",
    initials: "LD",
  },
];

export default function Board() {
  const { ref, inView } = useInView();

  return (
    <section
      id="board"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[hsl(215,65%,16%)] relative overflow-hidden"
      data-testid="board-section"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 10% 80%, hsl(43,85%,50%) 0%, transparent 50%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Leadership</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Board &amp; Advisors
          </h2>
          <p className="text-white/50 text-base max-w-2xl mx-auto">
            Founded and led by those who have lived the arena — and building a board united by shared experience and commitment to the mission.
          </p>
        </div>

        {/* Officers of Record */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-6 text-center">Officers of Record</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {officers.map((o, i) => (
              <div
                key={o.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex gap-4"
                data-testid={`officer-card-${i}`}
              >
                <div className="w-12 h-12 rounded-full bg-[hsl(43,85%,50%)] flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm font-black text-[hsl(215,70%,8%)]">{o.initials}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">{o.name}</h3>
                  <p className="text-[hsl(43,85%,50%)] text-xs tracking-widest uppercase font-semibold mb-2">{o.role}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{o.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board being assembled */}
        <div className={`mb-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-4">Board &amp; Advisory Council</p>
            <p className="text-white/60 text-sm leading-relaxed">
              We are currently assembling a board of directors and an advisory council drawn from medicine,
              philanthropy, and community leadership across Southwest Florida. Additional members will be
              announced as appointments are confirmed.
            </p>
          </div>
        </div>

        {/* Board interest CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-white/50 text-sm mb-4">Interested in board membership or strategic partnership?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block px-8 py-3 border border-[hsl(43,85%,50%)] text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase rounded hover:bg-[hsl(43,85%,50%)] hover:text-[hsl(215,70%,8%)] transition-all"
            data-testid="board-interest-cta"
          >
            Express Interest
          </a>
        </div>

      </div>
    </section>
  );
}
