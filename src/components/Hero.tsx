import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, Globe, Gift } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";
import RegistrationForm from "@/components/RegistrationForm"; // Import the new form

/** For TS: declare fbq on window */
// declare global { interface Window { fbq?: (...args: any[]) => void; } }

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBEUzUQQ_karr8w7rEIXcrHK9Gei6cz8medP-8vct1T48Lzx1l3Jg0kJGTLL6myJyR9EaevuPKlp1s/pub?gid=0&single=true&output=csv";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [dateText, setDateText] = useState("Date TBA");
  const [timeText, setTimeText] = useState("Time TBA");

  useEffect(() => {
    const loadDateTime = async () => {
      try {
        const { parseCsv } = await import("@/utils/sheetParser");
        const res = await fetch(SHEET_CSV_URL, { cache: "default" });
        const csv = await res.text();
        const rows = parseCsv(csv);
        const headerIdx = rows.findIndex(r => r.some(c => /date/i.test(c)) && r.some(c => /time/i.test(c)));
        if (headerIdx >= 0) {
          const header = rows[headerIdx].map(h => h.toLowerCase());
          const dateIdx = header.findIndex(h => h.includes("date"));
          const timeIdx = header.findIndex(h => h.includes("time"));
          const data = rows.slice(headerIdx + 1).find(r => r.some(c => c?.trim().length)) ?? [];
          setDateText(data?.[dateIdx]?.trim() || "Date TBA");
          setTimeText(data?.[timeIdx]?.trim() || "Time TBA");
        }
      } catch (err) { /* silent fail */ }
    };
    loadDateTime();
  }, []);

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1.5 rounded-full text-[12px] sm:text-sm font-poppins font-medium mx-auto lg:mx-0">
              <span className="bg-destructive text-white px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold">LIVE</span>
              2-Day LIVE Online Blockchain & Digital Asset Workshop
            </div>
            <h1 className="font-montserrat font-bold leading-tight text-foreground text-[clamp(1.75rem,5vw,3.75rem)]">
              Master Crypto & 5 other promising Domains that can help you{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">make your first Million</span>
            </h1>
            <p className="font-poppins text-foreground/80 leading-relaxed text-[clamp(0.95rem,2.5vw,1.125rem)]">
              Learn how to confidently understand Crypto, NFTs, DeFi, and Metaverse{" "}
              <span className="font-semibold text-foreground">and build your foundation in digital asset literacy. 100% education</span>
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
               <div className="flex -ml-0.5">{[1,2,3,4].map((_, i) => <span key={i} className="text-secondary text-xl sm:text-2xl">★</span>)}<span className="text-secondary/50 text-xl sm:text-2xl">★</span></div>
               <span className="font-poppins font-medium text-foreground text-sm sm:text-base">4.6 | 134 Reviews By</span>
               <div className="bg-noir text-white px-2.5 py-1 rounded text-xs sm:text-sm font-medium">★ Trustpilot</div>
            </div>
            <p className="text-xs text-red-900 font-base italic">Educational purpose only. No investment or financial advice.</p>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative lg:justify-self-end w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md lg:max-w-none mx-auto">
              <img src="/hero-1280.webp" alt="Crypto Workshop" className="w-full h-44 sm:h-56 lg:h-64 object-cover" width={1920} height={1080} loading="eager" />

              <div className="bg-card p-5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
                <div className="text-center border-b border-border pb-3 sm:pb-4">
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-foreground">Starts On</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs text-accent font-medium">Date</p>
                    <p className="font-montserrat font-bold text-sm sm:text-base">{dateText}</p>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs text-accent font-medium">Time</p>
                    <p className="font-montserrat font-bold text-sm sm:text-base">{timeText}</p>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs text-accent font-medium">Language</p>
                    <p className="font-montserrat font-bold text-sm sm:text-base">English</p>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-3 sm:p-4 space-y-1.5">
                    <Gift className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
                    <p className="font-poppins text-xs text-accent font-medium">Free Bonuses</p>
                    <p className="font-montserrat font-bold text-sm sm:text-base">Worth ₹29,997</p>
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
                  <p className="font-poppins text-[13px] sm:text-sm font-bold text-accent mt-2">Claim FREE bonuses worth ₹29,997</p>
                </div>

                {/* Separate Registration Form Component */}
                <RegistrationForm />

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;