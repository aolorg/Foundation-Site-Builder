import { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await mutateAsync({
        data: {
          name: "Newsletter Subscriber",
          email: trimmed,
          inquiryType: "Newsletter Signup",
          message: `Newsletter subscription request from ${trimmed}.`,
        },
      });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <section
      className="bg-[hsl(215,70%,6%)] border-t border-white/10 py-20"
      data-testid="newsletter-section"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Join the Arena</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Stand With Us From Day One</h2>
        <p className="text-white/60 text-sm max-w-xl mx-auto mb-8">
          Be the first to know when giving opens, when events are announced, and how the mission grows. No spam — just the
          call when it matters.
        </p>

        {done ? (
          <div className="inline-flex flex-col items-center" role="status" aria-live="polite" data-testid="newsletter-success">
            <div className="w-12 h-12 rounded-full bg-[hsl(43,85%,50%)] flex items-center justify-center mb-3">
              <span className="font-display text-xl font-black text-[hsl(215,70%,8%)]">✓</span>
            </div>
            <p className="text-white font-semibold">You're on the list.</p>
            <p className="text-white/50 text-sm">Welcome to the Arena. We'll be in touch.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            data-testid="newsletter-form"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-lg px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.2)] transition-all"
              data-testid="input-newsletter-email"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-[hsl(43,85%,50%)] text-[hsl(215,70%,8%)] font-bold tracking-widest uppercase text-xs rounded-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              data-testid="btn-newsletter-submit"
            >
              {isPending ? "Joining..." : "Join"}
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-300 text-sm mt-4" role="alert" aria-live="assertive" data-testid="text-newsletter-error">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
