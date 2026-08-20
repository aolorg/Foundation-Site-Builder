import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Founder", href: "#founder" },
  { label: "Programs", href: "#programs" },
  { label: "Merchandise", href: "#merchandise" },
  { label: "Board", href: "#board" },
  { label: "Events", href: "#events" },
  { label: "Invest", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(215,70%,8%)] shadow-lg shadow-black/30 py-3"
          : "bg-gradient-to-b from-[hsl(215,70%,6%)] to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
        >
          <div className="w-10 h-10 rounded-full border-2 border-[hsl(43,85%,50%)] flex items-center justify-center bg-[hsl(215,65%,16%)] group-hover:bg-[hsl(43,85%,50%)] transition-colors">
            <span className="font-display text-[hsl(43,85%,50%)] group-hover:text-[hsl(215,70%,8%)] font-bold text-sm leading-none transition-colors">A</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-sm font-semibold tracking-widest uppercase">Arena of Life</div>
            <div className="text-[hsl(43,85%,50%)] text-xs tracking-widest uppercase">Foundation</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link text-white/80 hover:text-[hsl(43,85%,50%)] text-xs font-medium tracking-widest uppercase transition-colors"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#donate"
            onClick={(e) => handleNavClick(e, "#donate")}
            className="ml-2 px-5 py-2 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-xs font-bold tracking-widest uppercase rounded hover:bg-[hsl(43,90%,60%)] transition-colors animate-gold-pulse"
            data-testid="nav-donate-btn"
          >
            Secure the Line
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white hover:text-[hsl(43,85%,50%)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-[hsl(215,70%,8%)] border-t border-white/10 px-6 py-6"
          data-testid="nav-mobile-menu"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 hover:text-[hsl(43,85%,50%)] text-sm font-medium tracking-widest uppercase transition-colors py-1"
                data-testid={`nav-mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={(e) => handleNavClick(e, "#donate")}
              className="mt-2 text-center px-5 py-3 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] text-sm font-bold tracking-widest uppercase rounded hover:bg-[hsl(43,90%,60%)] transition-colors"
              data-testid="nav-mobile-donate-btn"
            >
              Secure the Line
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
