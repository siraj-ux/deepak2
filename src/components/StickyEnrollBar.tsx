import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
// 1. Import the SubscribeButton
import SubscribeButton from "@/components/SubscribeButton";

type StickyEnrollBarProps = {
  onCTAClick?: () => void;
  targetTimestampMs?: number;
  storageKey?: string;
  showAfterPx?: number;
};

function formatTime(msLeft: number) {
  if (msLeft < 0) msLeft = 0;
  const totalSec = Math.floor(msLeft / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function StickyEnrollBar({
  onCTAClick,
  targetTimestampMs,
  storageKey = "dwc_enroll_timer_deadline",
  showAfterPx = 200,
}: StickyEnrollBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [now, setNow] = useState(Date.now());
  const intervalRef = useRef<number | null>(null);

  // Set or restore timer
  const deadline = useMemo(() => {
    if (targetTimestampMs) return targetTimestampMs;
    // Always restart timer on page refresh
    const newDeadline = Date.now() + 15 * 60 * 1000;
    localStorage.setItem(storageKey, String(newDeadline));
    return newDeadline;
  }, [targetTimestampMs, storageKey]);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => setNow(Date.now()), 500) as unknown as number;
    return () => intervalRef.current && window.clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > showAfterPx) setVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  const msLeft = Math.max(0, deadline - now);
  const ended = msLeft <= 0;

  if (dismissed) return null;

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
    
    // Call the optional prop if provided
    if (onCTAClick) onCTAClick();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50"
        >
          <div className="mx-auto max-w-6xl px-3 sm:px-4 pb-3 sm:pb-4">
            <div
              className="
                bg-card/90 backdrop-blur-md border border-border shadow-2xl
                rounded-2xl sm:rounded-3xl px-3 sm:px-5 py-2.5 sm:py-3
                flex items-center justify-between gap-3 sm:gap-4
              "
            >
              {/* Left: Timer */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline font-poppins text-foreground/70 text-xs">
                  Offer ends in
                </span>
                <div className="font-montserrat font-bold text-[15px] sm:text-lg text-accent tabular-nums">
                  {ended ? "00:00:00" : formatTime(msLeft)}
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                {/* ✅ UPDATED: Replaced Button with SubscribeButton */}
                <SubscribeButton
                  label="Join now for ₹99"
                  price="₹99"
                  ctaLocation="sticky-enroll-bar"
                  href="#register"
                  onClick={scrollToRegister}
                  className="
                    h-10 sm:h-11 px-4 sm:px-6 rounded-full
                    font-montserrat font-bold text-sm sm:text-base
                    bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70
                    text-white shadow-lg hover:shadow-xl transition
                    inline-flex items-center justify-center gap-1.5
                  "
                />

                {/* Dismiss Icon */}
                <button
                  aria-label="Dismiss"
                  onClick={() => setDismissed(true)}
                  className="inline-flex items-center justify-center rounded-full p-1 hover:bg-foreground/10 transition"
                >
                  <X className="w-4 h-4 text-foreground/60" />
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}