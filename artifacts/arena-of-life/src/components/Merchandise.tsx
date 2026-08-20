import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Tag, X } from "lucide-react";

import teeBlackGold from "@assets/merch_web/merch-01.png";
import teeDaringGreatly from "@assets/merch_web/merch-02.png";
import teeWhite from "@assets/merch_web/merch-03.png";
import teeNavy from "@assets/merch_web/merch-05.png";
import teeGreen from "@assets/merch_web/merch-06.png";
import teeBackPrint from "@assets/merch_web/merch-07.png";
import dogTagBox from "@assets/merch_web/merch-08.png";
import battleTestedSet from "@assets/merch_web/merch-09.png";
import ogHat from "@assets/merch_web/mita-002.png";
import teeBlackLaurel from "@assets/merch_web/mita-003.png";
import challengeCoins from "@assets/merch_web/mita-000.png";
import warChestTee from "@assets/merch_web/mita-009.png";
import collectionOverview from "@assets/merch_web/mita-008.png";

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0, rootMargin: "200px 0px" },
    );
    obs.observe(el);
    // Safety net: a section much taller than the viewport (e.g. this one stacked
    // into a single column on mobile) can never reach a high intersection ratio,
    // so guarantee it reveals regardless of how the observer behaves.
    const fallback = window.setTimeout(() => setInView(true), 1500);
    return () => { obs.disconnect(); window.clearTimeout(fallback); };
  }, []);
  return { ref, inView };
}

const tees = [
  {
    name: "MITA Signature Tee — Gold Laurel",
    desc: "Black premium tee. Gold laurel wreath with cross and US flag. ALWAYS ON GUARD below. The defining shirt of the arena.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "Black",
    badge: "Bestseller",
    image: teeBlackGold,
  },
  {
    name: "MITA Tee — Daring Greatly",
    desc: "Black tee with cross, US flag, and gold laurel. 'Daring Greatly' and 'ALWAYS ON GUARD' below. Roosevelt's spirit on your chest.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "Black",
    badge: null,
    image: teeDaringGreatly,
  },
  {
    name: "MITA Tee — White Laurel",
    desc: "Classic white tee with olive laurel wreath, cross, and flag. Clean, powerful, undeniable. Wear it anywhere you need to be seen.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "White",
    badge: null,
    image: teeWhite,
  },
  {
    name: "MITA Foundation Tee — Navy Seal",
    desc: "Navy tee with circular foundation badge. Cross, US flag, GUARDIANS • PROTECTORS • PROVIDERS. Built for the man who carries the line.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "Navy",
    badge: null,
    image: teeNavy,
  },
  {
    name: "MITA Tee — Forest Sentinel",
    desc: "Forest green with gold cross and clean gold type: MEN IN THE ARENA. Minimal, authoritative, Naples-ready. GUARDIANS • PROTECTORS • PROVIDERS.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "Forest Green",
    badge: "Premium Look",
    image: teeGreen,
  },
  {
    name: "MITA Tee — 'Not Alone' Back Print",
    desc: "Black tee. Back: 'MEN IN THE ARENA / BECAUSE NO MAN SHOULD STAND IN THE ARENA ALONE.' with cross. The mission on your back — literally.",
    price: "$40",
    sizes: "S – 3XL",
    colors: "Black / Charcoal",
    badge: null,
    image: teeBackPrint,
  },
  {
    name: "MITA Tee — Olive Laurel",
    desc: "Black tee with olive laurel wreath, cross, and faded flag. ALWAYS ON GUARD. Men in the Arena Foundation.org • Naples FL.",
    price: "$38",
    sizes: "S – 3XL",
    colors: "Black",
    badge: null,
    image: teeBlackLaurel,
  },
  {
    name: "War Chest Supply Manifest Tee",
    desc: "Grey tee. Back print: WAR CHEST SUPPLY: MANIFEST with checked list — Financial Armor, Ready-to-Deploy Nutrition, Crisis Shelter, Recon & Respite. Wear the mission.",
    price: "$42",
    sizes: "S – 3XL",
    colors: "Military Grey",
    badge: "Mission Tee",
    image: warChestTee,
  },
];

const hats = [
  {
    name: "OG On Guard Trucker Hat",
    desc: "Black or tan premium trucker. Bold 3D gold 'OG' monogram with 'ON GUARD' below. Gold shield + cross on side. 'Men in the Arena' strap. 'NOT ALONE' on back.",
    price: "$48",
    sizes: "One Size",
    colors: "Black / Tan",
    badge: "Signature",
    image: ogHat,
  },
  {
    name: "Battle Tested — Founders Hat",
    desc: "Black structured hat with 'BATTLE TESTED' in gold. Small 'OG' tab on side. Premium embroidery, luxury minimal design. 'Men In The Arena' on the back.",
    price: "$48",
    sizes: "One Size",
    colors: "Black",
    badge: "Battle Tested",
    image: battleTestedSet,
  },
];

const battleTested = [
  {
    name: "Battle Tested Tee — Front + Back",
    desc: "Black premium tee. Front: BATTLE TESTED shield crest in gold. Back: 'PRESSURE BUILDS MEN. BATTLE REVEALS THEM.' or 'STILL STANDING.' or 'FORGED IN FIRE.' Choose your back print.",
    price: "$42",
    sizes: "S – 3XL",
    colors: "Black",
    badge: "3 Back Designs",
    image: battleTestedSet,
  },
];

const metal = [
  {
    name: "MITA Dog Tag — Gift Box Set",
    desc: "Bronze military dog tag, ball chain included. 'MEN IN THE ARENA / GUARDIANS - PROTECTORS - PROVIDERS / ON GUARD - ON TIME - ALWAYS.' Comes in a premium black Men in the Arena gift box.",
    price: "$65",
    sizes: "One Size",
    colors: "Antique Bronze",
    badge: "Gift Ready",
    image: dogTagBox,
  },
  {
    name: "Challenge Coins & Pins — Set of 4",
    desc: "Four distinct designs: Shield Crest coin, Dog Tag coin, Laurel Wreath coin, and 'Not Alone' rectangular pin. Each stamped solid metal. Collectible. Gifted. Earned.",
    price: "$48",
    sizes: "Set of 4",
    colors: "Antique Bronze / Gold",
    badge: "Collectible",
    image: challengeCoins,
  },
];

interface MerchItem {
  name: string;
  desc: string;
  price: string;
  sizes: string;
  colors: string;
  badge: string | null;
  image: string;
}

function ProductCard({ item, i, inView, onOpen }: { item: MerchItem; i: number; inView: boolean; onOpen: (item: MerchItem) => void }) {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 flex flex-col ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${i * 60}ms` }}
    >
      <div className="relative h-72 bg-gray-900 overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="block w-full h-full cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[hsl(43,85%,50%)] focus:ring-inset"
          aria-label={`View full-size image of ${item.name}`}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-center p-3 hover:scale-105 transition-transform duration-500"
          />
        </button>
        {item.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-[10px] font-bold tracking-widest uppercase rounded shadow">
            {item.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1.5 bg-[hsl(215,70%,8%)] text-[hsl(43,85%,50%)] text-lg font-black rounded shadow">
            {item.price}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-sm font-bold text-[hsl(215,65%,16%)] mb-2 leading-snug">{item.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{item.desc}</p>
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="text-[10px] text-gray-400 space-y-0.5">
            <div><span className="font-semibold text-gray-500">Sizes:</span> {item.sizes}</div>
            <div><span className="font-semibold text-gray-500">Colors:</span> {item.colors}</div>
          </div>
          <Tag size={14} className="text-gray-300" />
        </div>
      </div>
    </div>
  );
}

function SectionDivider({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.25)]" />
      <div className="text-center flex-shrink-0">
        <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase">{label}</p>
        <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
      </div>
      <span className="h-px flex-1 bg-[hsl(43,85%,50%,0.25)]" />
    </div>
  );
}

export default function Merchandise() {
  const { ref, inView } = useInView();
  const [lightbox, setLightbox] = useState<MerchItem | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <>
    <section
      id="merchandise"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-white"
      data-testid="merchandise-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Men in the Arena</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-4">
            Official Merchandise
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Every purchase funds the mission. All items carry <em>Men in the Arena | Arena of Life Foundation</em>.
          </p>
        </div>

        {/* Launch banner */}
        <div className={`mb-16 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="border border-[hsl(43,85%,50%)] bg-[hsl(43,85%,50%,0.05)] rounded-xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingBag size={18} className="text-[hsl(43,85%,50%)] flex-shrink-0" />
              <p className="text-[hsl(215,65%,16%)] text-sm font-medium">
                <strong>Online store launching soon.</strong> Prices shown are launch pricing — subject to final production confirmation.
              </p>
            </div>
            <span className="px-4 py-1.5 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-xs font-bold tracking-widest uppercase rounded flex-shrink-0">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Collection overview hero image */}
        <div className={`mb-16 rounded-2xl overflow-hidden shadow-lg transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src={collectionOverview} alt="Men in the Arena Apparel Collection" loading="lazy" decoding="async" className="w-full object-cover max-h-80 object-center" />
        </div>

        {/* TEES */}
        <div className={`mb-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionDivider label="The Tee Vault" sub="Men in the Arena Signature T-Shirts — $38–$42" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {tees.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} inView={inView} onOpen={setLightbox} />
          ))}
        </div>

        {/* HATS */}
        <div className={`mb-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionDivider label="Hat Collection" sub="OG On Guard & Battle Tested — $48" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-20 max-w-2xl mx-auto">
          {hats.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} inView={inView} onOpen={setLightbox} />
          ))}
        </div>

        {/* BATTLE TESTED */}
        <div className={`mb-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionDivider label="Battle Tested — Founders Collection" sub="Forged in Fire. Tested by Life. Still Standing." />
        </div>
        <div className="grid sm:grid-cols-1 gap-5 mb-20 max-w-sm mx-auto">
          {battleTested.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} inView={inView} onOpen={setLightbox} />
          ))}
        </div>

        {/* METAL & HONOR */}
        <div className={`mb-8 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionDivider label="Metal & Honor" sub="Dog Tags, Challenge Coins & Pins — Gifts That Mean Something" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-16 max-w-2xl mx-auto">
          {metal.map((item, i) => (
            <ProductCard key={item.name} item={item} i={i} inView={inView} onOpen={setLightbox} />
          ))}
        </div>

        {/* Price summary footer */}
        <div className={`bg-[hsl(215,65%,16%)] rounded-2xl p-8 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center mb-8">
            <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-2">Full Price Guide</p>
            <h3 className="font-display text-xl font-bold text-white">Launch Pricing — All Items</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { item: "MITA Signature Tees", price: "$38" },
              { item: "Mission Back-Print Tee", price: "$40" },
              { item: "War Chest Manifest Tee", price: "$42" },
              { item: "Battle Tested Tee", price: "$42" },
              { item: "OG On Guard Hat", price: "$48" },
              { item: "Battle Tested Hat", price: "$48" },
              { item: "Dog Tag Gift Set", price: "$65" },
              { item: "Challenge Coins (Set of 4)", price: "$48" },
            ].map((row) => (
              <div key={row.item} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center hover:border-[hsl(43,85%,50%,0.4)] transition-colors">
                <div className="text-[hsl(43,85%,50%)] font-black text-lg mb-1">{row.price}</div>
                <div className="text-white/60 text-[11px] leading-snug">{row.item}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-xs mt-6">
            Proceeds support War Chest grants and arena programs. All merchandise ships domestically. Bulk & event pricing available — contact us.
          </p>
        </div>

      </div>
    </section>

    {lightbox && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8"
        onClick={() => setLightbox(null)}
        role="dialog"
        aria-modal="true"
        aria-label={`Full-size image of ${lightbox.name}`}
      >
        <button
          type="button"
          onClick={() => setLightbox(null)}
          className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close full-size image"
        >
          <X size={22} />
        </button>
        <figure className="max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <img
            src={lightbox.image}
            alt={lightbox.name}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-white"
          />
          <figcaption className="mt-4 text-center text-white/80 text-sm font-medium px-4">
            {lightbox.name} <span className="text-[hsl(43,85%,50%)] font-bold ml-1">{lightbox.price}</span>
          </figcaption>
        </figure>
      </div>
    )}
    </>
  );
}
