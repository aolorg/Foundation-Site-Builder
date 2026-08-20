import { useEffect, useRef, useState } from "react";
import { Shield, Users, Compass } from "lucide-react";

function useInView(threshold = 0.15) {
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

const gaps = [
  {
    icon: Users,
    title: "The Circle",
    body: "Men who truly understand — because they are living it too. Not therapists. Not well-wishers. Men who are in the arena, standing beside you.",
  },
  {
    icon: Compass,
    title: "Practical Resources",
    body: "Guidance for navigating family health crises — financial relief, nutrition, lodging, childcare, legal referrals, and more.",
  },
  {
    icon: Shield,
    title: "Bold Support",
    body: "Emotional support without the stigma of weakness. Honest alliance that says: you are not weak for struggling — you are exactly what this world needs.",
  },
];

const stats = [
  { value: "0", label: "Orgs that existed for men in this role before us" },
  { value: "9", label: "Years our founder fought largely alone" },
  { value: "2026", label: "Year we entered the arena" },
  { value: "501(c)(3)", label: "Pending — donations accepted now" },
];

export default function Mission() {
  const { ref, inView } = useInView();

  return (
    <section
      id="mission"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      data-testid="mission-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Our Purpose</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-6">
            Why We Exist
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            To equip, connect, and empower men — especially husbands and fathers — who are navigating the relentless battles of family health crises and life's most demanding arenas.
          </p>
        </div>

        {/* Vision statement */}
        <div
          className={`mb-20 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-[hsl(215,65%,16%)] rounded-2xl px-8 py-12 md:px-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{
              background: "radial-gradient(circle at 30% 50%, hsl(43,85%,50%) 0%, transparent 60%)"
            }} />
            <p className="font-serif-custom italic text-white/90 text-xl md:text-2xl leading-relaxed relative z-10 mb-4">
              "We exist to ensure that no man fights alone, and that every man has the Circle, the resources, and the courage to stay in the arena."
            </p>
            <div className="w-12 h-0.5 bg-[hsl(43,85%,50%)] mx-auto mt-6" />
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase mt-4">
              Mission Statement
            </p>
          </div>
        </div>

        {/* Three Gaps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {gaps.map((gap, i) => {
            const Icon = gap.icon;
            return (
              <div
                key={gap.title}
                className={`card-hover bg-gray-50 rounded-xl p-8 border border-gray-100 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${150 + i * 100}ms` }}
                data-testid={`gap-card-${i}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[hsl(215,65%,16%)] flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[hsl(43,85%,50%)]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[hsl(215,65%,16%)] mb-3">{gap.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{gap.body}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div
          className={`bg-[hsl(220,20%,97%)] rounded-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          data-testid="stats-row"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-black text-[hsl(215,65%,16%)] mb-2">{stat.value}</div>
              <div className="text-gray-500 text-xs leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vision */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Our Vision</p>
          <p className="text-[hsl(215,65%,16%)] text-xl md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
            To become the leading national organization for men who are caregivers and frontline fighters for their families.
          </p>
        </div>

      </div>
    </section>
  );
}
