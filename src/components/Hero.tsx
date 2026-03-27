import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, Globe, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

/** For TS: declare fbq on window */
declare global { 
  interface Window 
  { fbq?: (...args: any[]) => void; 
    
  } }

/** ✅ Razorpay + Webhook (Deepak) */
const RAZORPAY_PAGE_URL = "https://pages.razorpay.com/pl_RYqME0TsEBkdG4/view";
const WEBHOOK_URL = "https://offbeatn8n.coachswastik.com/webhook/deepak-form";

/** ✅ UTM storage key */
const UTM_KEY = "lead_utms";

/** CSV endpoint for the same sheet (gid=0) */
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pub?gid=0&single=true&output=csv";

/** ✅ capture & persist UTMs (URL → localStorage fallback) */
function getUTMs() {
  const empty = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    fclid: "",
  };

  if (typeof window === "undefined") return empty;

  const params = new URLSearchParams(window.location.search);

  const fromUrl = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fclid: params.get("fclid") || "",
  };

  const saved = localStorage.getItem(UTM_KEY);

  const hasAny =
    !!fromUrl.utm_source ||
    !!fromUrl.utm_medium ||
    !!fromUrl.utm_campaign ||
    !!fromUrl.utm_content ||
    !!fromUrl.utm_term ||
    !!fromUrl.fclid;

  if (!saved && hasAny) localStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));

  try {
    const stored = saved ? JSON.parse(saved) : {};
    return {
      utm_source: fromUrl.utm_source || stored.utm_source || "",
      utm_medium: fromUrl.utm_medium || stored.utm_medium || "",
      utm_campaign: fromUrl.utm_campaign || stored.utm_campaign || "",
      utm_content: fromUrl.utm_content || stored.utm_content || "",
      utm_term: fromUrl.utm_term || stored.utm_term || "",
      fclid: fromUrl.fclid || stored.fclid || "",
    };
  } catch {
    return fromUrl;
  }
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const animateFromLeft = prefersReducedMotion ? {} : { opacity: 1, x: 0 };
  const animateFromRight = prefersReducedMotion ? {} : { opacity: 1, x: 0 };
  const initialLeft = prefersReducedMotion ? {} : { opacity: 0, x: -24 };
  const initialRight = prefersReducedMotion ? {} : { opacity: 0, x: 24 };

  const [dateText, setDateText] = useState("Date TBA");
  const [timeText, setTimeText] = useState("Time TBA");

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
  });

  /** ✅ Capture UTMs once on load */
  useEffect(() => {
    getUTMs();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDateTime = async () => {
      try {
        const { parseCsv } = await import("@/utils/sheetParser");

        const res = await fetch(SHEET_CSV_URL, {
          cache: "default",
        });
        const csv = await res.text();
        const rows = parseCsv(csv);

        const headerIdx = rows.findIndex(
          (r) =>
            r.some((c) => /(^|\s)date(\s|$)/i.test(c)) &&
            r.some((c) => /(^|\s)time(\s|$)/i.test(c))
        );

        if (headerIdx >= 0) {
          const header = rows[headerIdx].map((h) => h.toLowerCase());
          const dateIdx = header.findIndex((h) => h.includes("date"));
          const timeIdx = header.findIndex((h) => h.includes("time"));

          const data =
            rows
              .slice(headerIdx + 1)
              .find((r) => r.some((c) => c?.trim().length)) ?? [];

          const dateVal = data?.[dateIdx]?.trim() || "Date TBA";
          const timeVal = data?.[timeIdx]?.trim() || "Time TBA";

          if (isMounted) {
            setDateText(dateVal);
            setTimeText(timeVal);
          }
        }
      } catch {
        // keep defaults
      }
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof window !== "undefined" && window.requestIdleCallback) {
      idleId = window.requestIdleCallback(loadDateTime);
    } else {
      timeoutId = window.setTimeout(loadDateTime, 1200);
    }

    return () => {
      isMounted = false;
      if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  /** ✅ Submit → (fire fbq AddToCart) → webhook (UTMs) → Razorpay page (UTMs + fclid) */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // ✅ Logic to split Name for fn and ln (Last Name)
    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // ✅ Trigger event AFTER submit with Advanced Matching (em, ph, fn, ln)
    if (window.fbq) {
      window.fbq('init', '1953633955426093', {
        em: form.email.toLowerCase().trim(),
        ph: form.phone.replace(/\D/g, ""), 
        fn: firstName.toLowerCase().trim(),
        ln: lastName.toLowerCase().trim() 
      });

      window.fbq("track", "AddToCart", {
        value: 99,
        currency: "INR",
      });
    }

    const utms = getUTMs();

    // webhook
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...utms,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          ts: new Date().toISOString(),
        }),
        keepalive: true,
      });
    } catch {
      // silent fail
    }

    // razorpay redirect (with your exact keys)
    const payUrl =
      `${RAZORPAY_PAGE_URL}` +
      `?name=${encodeURIComponent(form.name)}` +
      `&email=${encodeURIComponent(form.email)}` +
      `&phone=${encodeURIComponent(form.phone)}` +
      `&profession=${encodeURIComponent(form.profession)}` +
      `&utm_source=${encodeURIComponent(utms.utm_source)}` +
      `&utm_medium=${encodeURIComponent(utms.utm_medium)}` +
      `&utm_campaign=${encodeURIComponent(utms.utm_campaign)}` +
      `&utm_content=${encodeURIComponent(utms.utm_content)}` +
      `&utm_term=${encodeURIComponent(utms.utm_term)}` +
      `&fclid=${encodeURIComponent(utms.fclid)}`;

    window.location.href = payUrl;
  };

  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={initialLeft}
            animate={animateFromLeft}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full text-[12px] sm:text-sm font-poppins font-medium mx-auto lg:mx-0">
              <span className="bg-destructive text-white px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold">
                LIVE
              </span>
              2-Day LIVE Online Blockchain &amp; Digital Asset Workshop
            </div>

            <h1
              className="font-montserrat font-bold leading-tight text-foreground
                         text-[clamp(1.75rem,5vw,3.75rem)]"
            >
              Master Crypto &amp; 5 other promising Domains that can help you{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
                make your first Million
              </span>
            </h1>

            <p
              className="font-poppins text-foreground/80 leading-relaxed
                         text-[clamp(0.95rem,2.5vw,1.125rem)]"
            >
              Learn how to confidently understand Crypto, NFTs, DeFi, and Metaverse{" "}
              <span className="font-semibold text-foreground">
                and build your foundation in digital asset literacy. No hype. No tips. 100% education
              </span>
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <div className="flex -ml-0.5">
                {[1, 2, 3, 4].map((_, i) => (
                  <span key={i} className="text-secondary text-xl sm:text-2xl">
                    ★
                  </span>
                ))}
                <span className="text-secondary/50 text-xl sm:text-2xl">★</span>
              </div>
              <span className="font-poppins font-medium text-foreground text-sm sm:text-base">
                4.6 | 134 Reviews By
              </span>
              <div className="bg-noir text-white px-2.5 py-1 rounded text-xs sm:text-sm font-medium">
                ★ Trustpilot
              </div>
            </div>

            <p className="text-xs text-red-900 font-base">
              Educational purpose only. No investment or financial advice.
            </p>
          </motion.div>

          {/* Right Content - Workshop Details Card */}
          <motion.div
            initial={initialRight}
            animate={animateFromRight}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:justify-self-end w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md lg:max-w-none mx-auto">
              {/* hero image */}
              <img
                src="/hero-1280.webp"
                srcSet="/hero-1280.webp 1280w, /hero-1920.webp 1920w"
                sizes="(max-width: 1024px) 100vw, 960px"
                alt="Crypto Investment Workshop"
                className="w-full h-44 sm:h-56 lg:h-64 object-cover"
                width={1920}
                height={1080}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              <div className="bg-card p-5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
                <div className="text-center border-b border-border pb-3 sm:pb-4">
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-foreground">
                    Starts On
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">Date</p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      {dateText}
                    </p>
                  </div>

                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">Time</p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      {timeText}
                    </p>
                  </div>

                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">
                      Language
                    </p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      English
                    </p>
                  </div>

                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">
                      Free Bonuses
                    </p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      Worth ₹29,997
                    </p>
                  </div>
                </div>

                {/* ✅ CTA now ONLY scrolls */}
                <div className="space-y-2 text-center">
                  <Button
                    onClick={scrollToRegister}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-montserrat font-bold
                               bg-gradient-to-r from-accent to-accent/80
                               hover:from-accent/90 hover:to-accent/70
                               text-white rounded-full shadow-lg hover:shadow-xl
                               transition-all duration-300"
                  >
                    Join now for ₹99
                  </Button>

                  <p className="font-poppins text-[13px] sm:text-sm font-bold text-accent mt-2">
                    Claim FREE bonuses worth ₹29,997
                  </p>
                </div>

                <p className="text-center font-poppins text-xs sm:text-sm">
                  Enrollment closes on <span className="text-accent font-semibold">today</span>
                </p>

                {/* ✅ FORM */}
                <div
                  id="register"
                  className="mt-4 rounded-2xl bg-secondary/5 border border-border p-4 sm:p-5"
                >
                  <h3 className="text-center text-base sm:text-lg font-semibold text-foreground mb-4">
                    Fill the details below to sign up
                  </h3>

                  <form onSubmit={onSubmit} className="space-y-3">
                    <input
                      required
                      placeholder="Full Name"
                      className="w-full h-11 rounded-xl border border-border px-4 bg-background"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    />

                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full h-11 rounded-xl border border-border px-4 bg-background"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    />

                    <input
                      required
                      inputMode="numeric"
                      placeholder="Phone Number"
                      className="w-full h-11 rounded-xl border border-border px-4 bg-background"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                    />

                    <select
                      required
                      className="w-full h-11 rounded-xl border border-border px-4 bg-background"
                      value={form.profession}
                      onChange={(e) => setForm((p) => ({ ...p, profession: e.target.value }))}
                    >
                      <option value="" disabled>
                        Select Profession
                      </option>
                      <option>Working Professional</option>
                      <option>Business Owner / Entrepreneur</option>
                      <option>Student</option>
                      <option>Freelancer</option>
                      <option>Other</option>
                    </select>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-11 sm:h-12 rounded-xl font-montserrat font-bold
                                 bg-[#6EC1E4] hover:bg-[#63b3d4] text-white
                                 shadow-[0_12px_32px_rgba(0,0,0,0.18)]
                                 disabled:opacity-60"
                    >
                      {submitting ? "Processing..." : "Proceed to Pay ₹99"}
                    </Button>
                  </form>

                  <p className="mt-3 text-center text-xs text-foreground/60">
                    Secure checkout powered by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;