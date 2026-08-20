import { Link } from "wouter";

const footerLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Founder", href: "#founder" },
  { label: "Programs", href: "#programs" },
  { label: "Board", href: "#board" },
  { label: "Events", href: "#events" },
  { label: "Merchandise", href: "#merchandise" },
  { label: "Invest", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="bg-[hsl(215,70%,6%)] text-white/60 pt-16 pb-8"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-14 pb-14 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full border-2 border-[hsl(43,85%,50%)] flex items-center justify-center bg-[hsl(215,65%,16%)]">
                <span className="font-display text-[hsl(43,85%,50%)] font-black text-base">A</span>
              </div>
              <div>
                <div className="font-display text-white text-sm font-bold tracking-widest uppercase">Arena of Life</div>
                <div className="text-[hsl(43,85%,50%)] text-xs tracking-widest uppercase">Foundation Inc.</div>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-4">
              An alliance for husbands and fathers navigating the hardest battles of their lives. No man fights alone.
            </p>
            <div className="space-y-1">
              <p className="text-[hsl(43,85%,50%)] text-[10px] font-bold tracking-[0.3em] uppercase">Not Alone. Always On Guard. Daring Greatly.</p>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[hsl(43,85%,50%)] text-[10px] font-bold tracking-[0.35em] uppercase mb-5">Navigation</p>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-white/50 hover:text-[hsl(43,85%,50%)] text-xs tracking-wide transition-colors"
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[hsl(43,85%,50%)] text-[10px] font-bold tracking-[0.35em] uppercase mb-5">Contact</p>
            <div className="space-y-2 text-xs text-white/50">
              <p>Naples, Florida</p>
              <p>Collier County, Southwest Florida</p>
              <div className="pt-2 border-t border-white/10 mt-3">
                <p>P: 407-272-3653</p>
                <p className="mt-1">arenaoflifefoundation.org</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/30">
          <div className="text-center md:text-left space-y-2">
            <p>The Arena of Life Foundation Inc. &nbsp;|&nbsp; EIN: 42-1797949 &nbsp;|&nbsp; FL State ID: N26000004684</p>
            <p>501(c)(3) status is pending. Donations are accepted now.</p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
              <Link href="/privacy" className="hover:text-[hsl(43,85%,50%)] transition-colors" data-testid="footer-link-privacy">
                Privacy Policy
              </Link>
              <span className="text-white/15">|</span>
              <Link href="/terms" className="hover:text-[hsl(43,85%,50%)] transition-colors" data-testid="footer-link-terms">
                Terms of Use
              </Link>
            </div>
          </div>
          <div className="text-center md:text-right text-white/20">
            <p>Est. April 2026 &nbsp;|&nbsp; Naples, Florida</p>
            <p className="mt-1">© {new Date().getFullYear()} Arena of Life Foundation Inc. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
