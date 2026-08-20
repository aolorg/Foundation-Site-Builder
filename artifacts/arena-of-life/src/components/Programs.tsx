import { useEffect, useRef, useState } from "react";
import { DollarSign, Utensils, Building, Brain, Home, Map, Users, Zap, Shield } from "lucide-react";

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

const brotherhoodPrograms = [
  {
    icon: Users,
    codename: "PHALANX CIRCLES",
    title: "Confidential Peer Alliances",
    color: "hsl(43,85%,50%)",
    description:
      "Small, highly vetted regional mastermind groups where providers under pressure speak candid truth, share burdens, and strategize through family or business crises in absolute privacy.",
    services: [
      "Rigorous vetting — no spectators, only men in the arena",
      "Regional chapters launching in Naples / SW Florida",
      "Monthly deep-work sessions with structured protocols",
      "Lifetime bonds forged under real pressure — the Inner Circle",
    ],
  },
  {
    icon: Zap,
    codename: "EMERGENCY SHIELD PROTOCOL",
    title: "Rapid-Response Peer Deployment",
    color: "hsl(215,65%,40%)",
    description:
      "Rapid-response peer support deployed to members going through acute family or medical emergencies — ensuring logistical, emotional, and Circle-level backing on the ground when it matters most.",
    services: [
      "24-hour peer activation for acute crises",
      "On-ground Circle presence during hospitalizations",
      "Logistical coordination so no detail falls through",
      "Post-crisis debrief and ongoing support integration",
    ],
  },
  {
    icon: Shield,
    codename: "ON GUARD CURRICULUM",
    title: "Resilience Framework",
    color: "hsl(33,60%,38%)",
    description:
      "A focused operational framework of high-ownership strategies for physical wellness, mental resilience, and spiritual fortitude — built specifically for men balancing massive provider responsibilities.",
    services: [
      "Physical conditioning protocols for men under load",
      "Mental resilience training — no cliches, no hollow motivation",
      "Spiritual fortitude practices from men who've held the line",
      "Ongoing accountability within the Circle",
    ],
  },
];

const crisisPrograms = [
  {
    icon: DollarSign,
    codename: "WAR CHEST",
    title: "Financial Relief",
    color: "hsl(43,85%,50%)",
    description:
      "Direct financial grants to families in active crisis. No bureaucracy — rapid deployment when families need it most.",
    services: [
      "Financial Armor — mortgage & utility bridge grants",
      "Emergency income replacement",
      "Medical expense gap coverage",
      "School tuition relief for dependent children",
    ],
  },
  {
    icon: Utensils,
    codename: "READY-TO-DEPLOY",
    title: "Nutrition",
    color: "hsl(215,65%,40%)",
    description:
      "Coordinated meal delivery so the man in the arena never has to worry about what his family is eating during the hardest weeks.",
    services: [
      "Restaurant & catering partnerships",
      "Ketogenic & therapeutic diet support",
      "Grocery and meal kit programs",
      "Nutrition coordination near treatment centers",
    ],
  },
  {
    icon: Building,
    codename: "OG MEDICAL HOSPITALITY",
    title: "Crisis Shelter & Lodging",
    color: "hsl(33,60%,38%)",
    description:
      "When your wife is in surgery 200 miles from home, you need a place to stay that doesn't break the budget — or break your spirit.",
    services: [
      "Crisis shelter near major treatment centers",
      "Transportation coordination",
      "On-site support during surgical procedures",
      "Family logistics management",
    ],
  },
  {
    icon: Brain,
    codename: "RECON & RESPITE",
    title: "Mental Health",
    color: "hsl(215,55%,35%)",
    description:
      "Brotherhood groups. Licensed therapists. One-on-one mentoring from men who walked this road first. No weakness — just honesty.",
    services: [
      "Peer-to-peer Arena Circles",
      "Licensed therapist referrals (caregiver trauma specialists)",
      "One-on-one mentoring from veteran arena men",
      "Faith-based support options available",
    ],
  },
  {
    icon: Home,
    codename: "HOUSEHOLD COMMAND",
    title: "Childcare & Home",
    color: "hsl(215,65%,16%)",
    description:
      "When your spouse is in treatment, the household still runs. We make sure it does, so you can focus on what only you can do.",
    services: [
      "Vetted babysitter networks",
      "School pickup coordination",
      "Household task support during acute phases",
      "Emergency childcare placement",
    ],
  },
  {
    icon: Map,
    codename: "RESOURCE NAVIGATION",
    title: "Guidance & Advocacy",
    color: "hsl(220,10%,22%)",
    description:
      "The medical system is a labyrinth. We help you navigate it so you stop losing ground to confusion and bureaucracy.",
    services: [
      "Medical second opinion coordination",
      "Insurance advocacy & claims support",
      "Legal & estate planning referrals",
      "Integrative oncology resources",
    ],
  },
];

const phases = [
  {
    phase: "Phase 1",
    active: true,
    year: "2026",
    items: ["Phalanx Circles launch — Naples / SW Florida", "Emergency Shield Protocol activated", "War Chest grants deployed", "On Guard Curriculum pilot cohort"],
  },
  {
    phase: "Phase 2",
    active: false,
    year: "2027",
    items: ["Arena Summits — multi-day executive retreats", "Gatherings at the Line — regional dinners", "Corporate speaking program", "Chapter expansion statewide"],
  },
  {
    phase: "Phase 3",
    active: false,
    year: "2028+",
    items: ["National chapter network", "Hospital & employer partnerships", "Podcast: Men in the Arena", "Founding Members governance council"],
  },
];

export default function Programs() {
  const { ref, inView } = useInView();

  return (
    <section
      id="programs"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[hsl(220,20%,97%)]"
      data-testid="programs-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Programs &amp; Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-4">
            The Arsenal
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nine programs built for the exact gaps that leave men isolated, overwhelmed, and fighting alone.
          </p>
        </div>

        {/* Brotherhood Programs */}
        <div className={`mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.3)]" />
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase flex-shrink-0">Brotherhood Programs</p>
            <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.3)]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {brotherhoodPrograms.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.codename}
                className={`card-hover bg-white rounded-xl border-2 border-[hsl(215,65%,16%,0.08)] p-7 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
                data-testid={`brotherhood-program-${i}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${prog.color}18` }}
                  >
                    <Icon size={20} style={{ color: prog.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: prog.color }}>
                      {prog.codename}
                    </p>
                    <h3 className="font-display text-base font-bold text-[hsl(215,65%,16%)] leading-tight">
                      {prog.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{prog.description}</p>
                <ul className="space-y-2">
                  {prog.services.map((svc) => (
                    <li key={svc} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(43,85%,50%)] mt-1.5 flex-shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Crisis Support Programs */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.3)]" />
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase flex-shrink-0">Crisis Support Programs</p>
            <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.3)]" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {crisisPrograms.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.codename}
                className={`card-hover bg-white rounded-xl border border-gray-100 p-7 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
                data-testid={`program-card-${i}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${prog.color}18` }}
                  >
                    <Icon size={20} style={{ color: prog.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: prog.color }}>
                      {prog.codename}
                    </p>
                    <h3 className="font-display text-base font-bold text-[hsl(215,65%,16%)] leading-tight">
                      {prog.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{prog.description}</p>
                <ul className="space-y-2">
                  {prog.services.map((svc) => (
                    <li key={svc} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(43,85%,50%)] mt-1.5 flex-shrink-0" />
                      {svc}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Roadmap */}
        <div
          className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-2">Growth Roadmap</p>
            <h3 className="font-display text-2xl font-bold text-[hsl(215,65%,16%)]">From Naples to the Nation</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((p, i) => (
              <div
                key={p.phase}
                className={`rounded-xl p-6 border-2 transition-all duration-700 ${
                  p.active
                    ? "bg-[hsl(215,65%,16%)] border-[hsl(43,85%,50%)]"
                    : "bg-white border-gray-200"
                }`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
                data-testid={`phase-card-${i}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {p.active && (
                    <span className="px-2 py-0.5 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-[10px] font-bold tracking-wider uppercase rounded">
                      Active
                    </span>
                  )}
                  <span className={`text-xs font-bold tracking-widest uppercase ${p.active ? "text-[hsl(43,85%,50%)]" : "text-gray-400"}`}>
                    {p.phase} — {p.year}
                  </span>
                </div>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${p.active ? "bg-[hsl(43,85%,50%)]" : "bg-gray-300"}`} />
                      <span className={p.active ? "text-white/80" : "text-gray-500"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
