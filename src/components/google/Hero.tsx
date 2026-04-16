import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, Globe, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/coachbg.webp";
import SubscribeButton from "@/components/SubscribeButton";
import RegistrationForm from "@/components/google/RegistrationForm"; // Import the new form

/** For TS: declare fbq on window */
declare global { interface Window { fbq?: (...args: any[]) => void; } }

/** CSV endpoint for gid=0 */
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pub?gid=0&single=true&output=csv";

/** Clean stray emoji/controls + extra spaces */
function cleanText(text: string): string {
  return text
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\u2600-\u26FF]|\u200D|\uFE0F|\u2069|\u2066|\u2068|\u2067)/g,
      ""
    )
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** RFC4180-ish CSV parser (handles quotes, commas) */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let cell = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"'; // escaped "
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      row.push(cleanText(cell));
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i++; // CRLF
      row.push(cleanText(cell));
      cell = "";
      if (row.some((c) => c.length)) rows.push(row);
      row = [];
    } else {
      cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cleanText(cell));
    if (row.some((c) => c.length)) rows.push(row);
  }
  return rows;
}

// Timer Helper
function formatTime(msLeft: number) {
  if (msLeft < 0) msLeft = 0;
  const totalSec = Math.floor(msLeft / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const animateFromLeft = prefersReducedMotion ? {} : { opacity: 1, x: 0 };
  const animateFromRight = prefersReducedMotion ? {} : { opacity: 1, x: 0 };
  const initialLeft = prefersReducedMotion ? {} : { opacity: 0, x: -24 };
  const initialRight = prefersReducedMotion ? {} : { opacity: 0, x: 24 };

  const [dateText, setDateText] = useState("Date TBA");
  const [timeText, setTimeText] = useState("Time TBA");

  // Timer Logic
  const [now, setNow] = useState(Date.now());
  const intervalRef = useRef<number | null>(null);
  const deadline = useMemo(() => Date.now() + 15 * 60 * 1000, []); // 15 Minute Timer

  useEffect(() => {
    intervalRef.current = window.setInterval(() => setNow(Date.now()), 1000) as unknown as number;
    return () => intervalRef.current && window.clearInterval(intervalRef.current);
  }, []);

  const msLeft = Math.max(0, deadline - now);

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
        const csv = await res.text();
        const rows = parseCsv(csv);

        // Find header row that contains both "Date" and "Time"
        const headerIdx = rows.findIndex(
          (r) =>
            r.some((c) => /(^|\s)date(\s|$)/i.test(c)) &&
            r.some((c) => /(^|\s)time(\s|$)/i.test(c))
        );

        if (headerIdx >= 0) {
          const header = rows[headerIdx].map((h) => h.toLowerCase());
          const dateIdx = header.findIndex((h) => h.includes("date"));
          const timeIdx = header.findIndex((h) => h.includes("time"));

          // Next non-empty row after header is our data row
          const data =
            rows.slice(headerIdx + 1).find((r) => r.some((c) => c?.trim().length)) ??
            [];

          const dateVal = data?.[dateIdx]?.trim() || "Date TBA";
          const timeVal = data?.[timeIdx]?.trim() || "Time TBA";

          if (isMounted) {
            setDateText(dateVal);
            setTimeText(timeVal);
          }
        } else {
          if (isMounted) {
            setDateText("Date TBA");
            setTimeText("Time TBA");
          }
        }
      } catch {
        if (isMounted) {
          setDateText("Date TBA");
          setTimeText("Time TBA");
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={initialLeft}
            animate={animateFromLeft}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full text-[12px] sm:text-sm font-poppins font-medium">
              <span className="bg-destructive text-white px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold">
                LIVE
              </span>
              2-Day LIVE Online Blockchain & Digital Asset Workshop
            </div>

            <h1 className="font-montserrat font-bold leading-tight text-foreground text-[clamp(1.75rem,5vw,3.75rem)]">
              Master Crypto & 5 other promising Domains that can help you{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
                make your first Million
              </span>
            </h1>

            <p className="font-poppins text-foreground/80 leading-relaxed text-[clamp(0.95rem,2.5vw,1.125rem)]">
              Learn how to confidently understand Crypto, NFTs, DeFi, and Metaverse{" "}
              <span className="font-semibold text-foreground">
                and build your foundation in digital asset literacy. No hype. No tips. 100% education
              </span>
            </p>

            <div className="flex items-center gap-2 flex-wrap">
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
              <img
                src={heroImage}
                alt="Crypto Investment Workshop"
                className="w-full h-44 sm:h-56 lg:h-64 object-cover"
                loading="eager"
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
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">Language</p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      English
                    </p>
                  </div>

                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs sm:text-sm text-accent font-medium">Free Bonuses</p>
                    <p className="font-montserrat font-bold text-foreground text-sm sm:text-base">
                      Worth ₹29,997
                    </p>
                  </div>
                </div>

                {/* GTM-Ready CTA */}
                <div className="space-y-2 text-center flex flex-col items-center">
                  <SubscribeButton
                    label="Join now for"
                    price="₹99"
                    ctaLocation="hero-section"
                    href="#register"
                    onClick={scrollToRegister}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-montserrat font-bold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
                  />
                  <p className="font-poppins text-[13px] sm:text-sm font-bold text-accent mt-2">
                    Claim FREE bonuses worth ₹29,997
                  </p>
                </div>

                {/* --- TIMER & URGENCY SECTION (RED) --- */}
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                    </div>
                    <p className="font-poppins text-[13px] sm:text-sm font-bold text-destructive">
                      Seats filling fast!
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-destructive/60 leading-none mb-1">Offer Ends In</span>
                    <span className="font-montserrat font-bold text-sm sm:text-lg text-destructive tabular-nums leading-none">
                      {formatTime(msLeft)}
                    </span>
                  </div>
                </div>

                {/* Separate Registration Form Component */}
                <RegistrationForm />

                <p className="text-center font-poppins text-xs sm:text-sm">
                  Enrollment closes on <span className="text-accent font-semibold">today</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;