import { motion, useReducedMotion } from "framer-motion";
import { XCircle } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";

const reasons = [
  "You are not willing to put in the time and effort to learn about blockchain technology and implement the strategies taught in the workshop.",
  "You are not interested in diversifying your investment portfolio and exploring new financial opportunities in the crypto space.",
  "You are not ready to take control of your financial future and make the necessary changes to achieve your goals",
  "You are not willing to commit to attending the 2 day workshop and actively participating in all sessions.",
  "You are not open to learning from a successful entrepreneur and crypto investing expert who has helped countless others achieve financial freedom.",
];

const DontJoinIf = () => {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? {} : { opacity: 0, y: 18 };
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 };

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 sm:py-14 md:py-18 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,3rem)] text-foreground mb-2 leading-tight">
            Don’t Join If
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-destructive to-destructive/60 mx-auto rounded-full" />
        </motion.div>

        {/* Cards: compact & 2 columns on mobile */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10">
          {reasons.slice(0, 4).map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-gradient-to-br from-destructive/5 to-destructive/10 border border-destructive/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-2.5">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-poppins text-foreground/80 leading-relaxed text-[clamp(0.9rem,2.2vw,1rem)]">
                  {reason}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight row: spans both columns but still compact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/25 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-3 sm:gap-4">
              <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-destructive flex-shrink-0 mt-0.5" />
              <p className="font-poppins text-foreground leading-relaxed text-[clamp(0.95rem,2.5vw,1.0625rem)]">
                {reasons[4]}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA (bonus outside the button) */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center space-y-3 sm:space-y-4 mt-8 sm:mt-10"
        >
          <SubscribeButton
            label="Join now for"
            price="₹99"
            ctaLocation="dont-join-if"
            href="#register"
            onClick={scrollToRegister}
            className="h-12 sm:h-14 px-8 sm:px-12 text-base sm:text-lg font-montserrat font-bold
                       bg-gradient-to-r from-accent to-accent/80
                       hover:from-accent/90 hover:to-accent/70
                       text-white rounded-full shadow-lg hover:shadow-xl
                       transition-all duration-300 inline-flex items-center justify-center gap-2"
          />

          <p className="font-poppins text-[13px] sm:text-sm font-bold text-accent">
            Claim FREE bonuses worth ₹29,997
          </p>

          <p className="font-poppins text-xs sm:text-sm text-foreground/70">
            Enrollment closes on <span className="text-accent font-semibold">today</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DontJoinIf;
