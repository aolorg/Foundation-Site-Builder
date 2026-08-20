import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)]">
      <header className="bg-[hsl(215,70%,6%)]">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <div className="w-10 h-10 rounded-full border-2 border-[hsl(43,85%,50%)] flex items-center justify-center bg-[hsl(215,65%,16%)]">
              <span className="font-display text-[hsl(43,85%,50%)] font-black text-base">A</span>
            </div>
            <div>
              <div className="font-display text-white text-xs font-bold tracking-widest uppercase">Arena of Life</div>
              <div className="text-[hsl(43,85%,50%)] text-[10px] tracking-widest uppercase">Foundation Inc.</div>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase hover:text-white transition-colors"
            data-testid="link-back"
          >
            <ArrowLeft size={15} /> Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Legal</p>
        <h1 className="font-display text-4xl font-bold text-[hsl(215,65%,16%)] mb-2">{title}</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: {lastUpdated}</p>

        <div className="border-l-4 border-[hsl(43,85%,50%)] bg-[hsl(43,85%,50%,0.08)] px-5 py-4 mb-10 text-sm text-gray-700">
          This page is provided as general information for transparency and is not legal advice. The Arena of Life
          Foundation recommends having these terms reviewed by a qualified attorney before relying on them.
        </div>

        <div className="space-y-6">{children}</div>
      </main>

      <footer className="bg-[hsl(215,70%,6%)] text-white/40 text-[11px] py-8">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-1">
          <p>The Arena of Life Foundation Inc. &nbsp;|&nbsp; EIN: 42-1797949 &nbsp;|&nbsp; Naples, Florida</p>
          <p>© {new Date().getFullYear()} Arena of Life Foundation Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
