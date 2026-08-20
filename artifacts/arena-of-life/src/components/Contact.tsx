import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Globe, Mail } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";

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

const inquiryTypes = [
  "General Inquiry",
  "Partnership / Sponsorship",
  "Board Interest",
  "Media",
  "Donate / Giving",
  "Program Support",
];

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Naples, Florida" },
  { icon: Phone, label: "Phone", value: "407-272-3653" },
  { icon: Globe, label: "Website", value: "arenaoflifefoundation.org" },
  { icon: Mail, label: "Contact", value: "Via form below" },
];

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await mutateAsync({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          inquiryType: form.inquiryType,
          message: form.message.trim(),
        },
      });
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your message. Please try again, or email us directly.",
      );
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[hsl(220,20%,97%)]"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-rule inline-block" />
          <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-[0.35em] uppercase mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[hsl(215,65%,16%)] mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Whether you need help, want to partner, or simply want to stand beside us — we want to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left: Info */}
          <div
            className={`transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <h3 className="font-display text-xl font-bold text-[hsl(215,65%,16%)] mb-6">Find Us</h3>

            <div className="space-y-5 mb-12">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(215,65%,16%)] flex items-center justify-center flex-shrink-0">
                      <Icon size={17} className="text-[hsl(43,85%,50%)]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-0.5">{info.label}</p>
                      <p className="text-[hsl(215,65%,16%)] font-medium text-sm">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map card */}
            <div className="bg-[hsl(215,65%,16%)] rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                background: "radial-gradient(circle at 50% 50%, hsl(43,85%,50%) 0%, transparent 60%)"
              }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-[hsl(43,85%,50%)] mx-auto flex items-center justify-center mb-4">
                  <MapPin size={22} className="text-[hsl(215,70%,8%)]" />
                </div>
                <p className="text-white font-semibold mb-1">Naples, Florida</p>
                <p className="text-white/50 text-xs mb-1">Collier County</p>
                <p className="text-[hsl(43,85%,50%)] text-xs font-bold tracking-widest uppercase">Southwest Florida</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[hsl(43,85%,50%)] mx-auto flex items-center justify-center mb-6">
                    <span className="font-display text-2xl font-black text-[hsl(215,70%,8%)]">✓</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[hsl(215,65%,16%)] mb-3">Message Received</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto">
                    Thank you for reaching out. We'll get back to you within 24-48 hours. You are not alone.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                data-testid="contact-form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] placeholder:text-gray-400 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] placeholder:text-gray-400 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] placeholder:text-gray-400 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all"
                      data-testid="input-phone"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      required
                      value={form.inquiryType}
                      onChange={handleChange}
                      className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all appearance-none"
                      data-testid="select-inquiry-type"
                    >
                      <option value="">Select type...</option>
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help, or how you'd like to get involved..."
                    className="w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-[hsl(215,65%,16%)] placeholder:text-gray-400 focus:outline-none focus:border-[hsl(43,85%,50%)] focus:ring-2 focus:ring-[hsl(43,85%,50%,0.15)] transition-all resize-none"
                    data-testid="textarea-message"
                  />
                </div>

                {error && (
                  <p
                    className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                    data-testid="text-contact-error"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-[hsl(215,65%,16%)] text-[hsl(43,85%,50%)] font-bold tracking-widest uppercase text-sm rounded-lg hover:bg-[hsl(215,65%,20%)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  data-testid="btn-submit-contact"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
