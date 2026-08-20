import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, Mic } from "lucide-react";

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

const events = [
  {
    icon: Calendar,
    title: "Inaugural Naples Gala",
    subtitle: "An Evening in the Arena",
    year: "2026",
    status: "Planning",
    location: "Naples, FL",
    desc: "A high-end benefit dinner targeting the Port Royal donor circle — Naples' most committed philanthropic community. An evening of purpose, vision, and the beginning of something historic.",
    tags: ["Black Tie", "Naples", "Founding Event"],
  },
  {
    icon: Users,
    title: "Annual Men in the Arena Summit",
    subtitle: "The Circle. Strategy. Resilience.",
    year: "2027",
    status: "Phase 2",
    location: "Naples, FL",
    desc: "A gathering of men who are in the arena — caregivers, providers, survivors. Two days in the Circle, expert speakers, peer support, and strategic resources for the road ahead.",
    tags: ["Annual", "Multi-day", "National Reach"],
  },
  {
    icon: MapPin,
    title: "Charity Golf Tournament",
    subtitle: "Tee Up. Stand Up. Fight Back.",
    year: "2026–2027",
    status: "Planning",
    location: "SW Florida",
    desc: "An annual tournament bringing together Naples' business and philanthropic community to raise funds for War Chest grants and foundation programs. Corporate sponsorship opportunities available.",
    tags: ["Golf", "Corporate Sponsors", "Annual"],
  },
  {
    icon: Mic,
    title: "Corporate Speaking Program",
    subtitle: "Men in the Arena — Live",
    year: "Phase 2",
    status: "Coming",
    location: "National",
    desc: "Charles DiPerri brings the arena to corporations, health systems, and leadership organizations. A message of resilience, caregiving, and daring greatly — for any man who has ever been in the arena and refused to leave.",
    tags: ["Healthcare", "Real Estate", "Finance"],
  },
];

export default function Events() {
  const { ref, inView } = useInView();

  return (
    <section
      id="events"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[hsl(220,20%,97%)]"
      data-testid="events-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Upcoming</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-4">
            Events &amp; Gatherings
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            The arena has always been a physical place — where men gather, compete, and prove their mettle. Ours is no different.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-7">
          {events.map((evt, i) => {
            const Icon = evt.icon;
            const isPrimary = i === 0;
            return (
              <div
                key={evt.title}
                className={`card-hover rounded-xl border p-8 transition-all duration-700 ${
                  isPrimary
                    ? "bg-[hsl(215,65%,16%)] border-[hsl(43,85%,50%,0.5)]"
                    : "bg-white border-gray-100"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
                data-testid={`event-card-${i}`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isPrimary ? "bg-[hsl(43,85%,50%)]" : "bg-[hsl(215,65%,16%)]"}`}>
                      <Icon size={18} className={isPrimary ? "text-[hsl(215,70%,8%)]" : "text-[hsl(43,85%,50%)]"} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isPrimary ? "text-[hsl(43,85%,50%)]" : "text-[hsl(43,85%,50%)]"}`}>
                        {evt.year}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded ${
                    evt.status === "Planning"
                      ? "bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)]"
                      : "border border-gray-300 text-gray-400"
                  }`}>
                    {evt.status}
                  </span>
                </div>

                <h3 className={`font-display text-xl font-bold mb-1 ${isPrimary ? "text-white" : "text-[hsl(215,65%,16%)]"}`}>
                  {evt.title}
                </h3>
                <p className={`text-sm mb-1 ${isPrimary ? "text-[hsl(43,85%,50%)]" : "text-[hsl(43,85%,50%)]"} font-semibold`}>
                  {evt.subtitle}
                </p>
                <div className={`flex items-center gap-1 text-xs mb-4 ${isPrimary ? "text-white/40" : "text-gray-400"}`}>
                  <MapPin size={11} />
                  {evt.location}
                </div>

                <p className={`text-sm leading-relaxed mb-5 ${isPrimary ? "text-white/70" : "text-gray-600"}`}>
                  {evt.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {evt.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded text-[10px] font-medium tracking-wide ${
                        isPrimary
                          ? "bg-white/10 text-white/60"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sponsorship CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-gray-500 text-sm mb-4">
            Corporate sponsorship opportunities available for healthcare, real estate, and financial sector partners.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block px-8 py-3 bg-[hsl(215,65%,16%)] text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase rounded hover:bg-[hsl(215,65%,20%)] transition-all"
            data-testid="events-sponsor-cta"
          >
            Corporate Sponsorship Inquiry
          </a>
        </div>

      </div>
    </section>
  );
}
