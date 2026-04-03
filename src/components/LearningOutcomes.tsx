import { motion, useReducedMotion } from "framer-motion";
import { Video, MessageCircle, FileText, CheckCircle2 } from "lucide-react";
// 1. Import the SubscribeButton
import SubscribeButton from "@/components/SubscribeButton";

const outcomes = [
  { icon: Video, title: "Live Zoom Sessions", description: "This 2-day workshop is packed with in-depth training, technical demonstrations, and practical exercises.", value: "Worth Rs. 17,997" },
  { icon: MessageCircle, title: "WhatsApp Coaching", description: "Access a private WhatsApp community for 24/7 support & guidance from Deepak and his team.", value: "Worth Rs. 6,997" },
  { icon: FileText, title: " Personalized Action Plan Template —all educational and support-based", description: "Develop a customized investment plan based on your goals & risk tolerance.", value: "Priceless!" },
];

/** Text-only domain circles (clear + minimal) */
const domains = ["Metaverse", "NFT", "DeFi", "Blockchain", "P2E", "R2E"];

const circleBase =
  "rounded-full border border-foreground/15 bg-gradient-to-br from-muted/20 to-background backdrop-blur-sm text-center " +
  "w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center " +
  "transition-all duration-300 hover:shadow-md hover:border-accent/40 hover:scale-[1.05]";

/** NEW: concise 2-day agenda */
const agenda = [
  {
    day: "Day 1",
    title: "Blockchain & Digital Asset Foundations",
    points: [
      "Core blockchain principles & decentralization",
      "Wallet setup (custodial vs non-custodial)",
      "Keys, backups, and basic security",
      "Scam patterns & red flags awareness",
    ],
  },
  {
    day: "Day 2",
    title: "Applied Crypto & Diversification Concepts",
    points: [
      "Understanding NFTs, DeFi & Metaverse use-cases",
      "Risk awareness & position sizing basics",
      "Diversification frameworks",
      "Personalized learning & action roadmap",
    ],
  },
];

const LearningOutcomes = () => {

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };


  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? {} : { opacity: 0, y: 22 };
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background to-muted/10">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,2.25rem)] text-foreground mb-2">
            What will you learn in 2 days
          </h2>
          <p className="font-poppins text-[clamp(0.95rem,2.5vw,1.05rem)] text-foreground/70">
            Master the Art of Crypto Investing through Digital Wealth Domination
          </p>
          <p className="font-poppins text-[clamp(0.9rem,2.3vw,1rem)] text-foreground/70 mt-1">
            2-Day Online Workshop by Deepak Choudhary
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Text-based circular highlights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-muted/20 to-secondary/5 border border-accent/15 rounded-2xl p-6 sm:p-8 md:p-10 max-w-6xl mx-auto mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {domains.map((label, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={circleBase}
              >
                <span className="font-montserrat text-[clamp(0.85rem,2.8vw,1.05rem)] font-semibold text-foreground/80">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-center font-poppins text-foreground/70 text-[clamp(0.95rem,2.5vw,1.1rem)] mt-6">
            Gain clarity on the 6 major domains of blockchain and develop your personalised investment plan.
          </p>
        </motion.div>

        {/* Value stack header */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h3 className="font-montserrat font-bold text-[clamp(1.25rem,3.5vw,1.75rem)] text-foreground mb-2">
            Here’s everything you get when you join the workshop
          </h3>
          <p className="font-poppins text-[clamp(1rem,3vw,1.125rem)]">
            <span className="line-through text-destructive font-bold">worth Rs. 29,997</span>{" "}
            <span className="text-success font-bold text-[clamp(1.15rem,3.4vw,1.35rem)]">For just Rs. 99</span>
          </p>
        </motion.div>

        {/* 2-Day Agenda */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto mb-8 sm:mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {agenda.map((block, idx) => (
              <div
                key={idx}
                className="rounded-xl sm:rounded-2xl border border-accent/20 bg-card/60 backdrop-blur-sm p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-montserrat font-bold text-accent text-sm sm:text-base">
                    {block.day}
                  </span>
                </div>
                <h4 className="font-montserrat font-semibold text-[clamp(1.05rem,2.8vw,1.25rem)] text-foreground mb-3">
                  {block.title}
                </h4>
                <ul className="space-y-2">
                  {block.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
                      <span className="font-poppins text-[clamp(0.92rem,2.3vw,1rem)] text-foreground/80 leading-relaxed">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Outcome cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-10">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 sm:p-5 text-center hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="bg-gradient-to-br from-accent/10 to-secondary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <outcome.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
              </div>
              <h4 className="font-montserrat font-bold text-[clamp(1.05rem,2.8vw,1.25rem)] text-foreground mb-2">
                {outcome.title}
              </h4>
              <p className="font-poppins text-[clamp(0.9rem,2.4vw,0.98rem)] text-foreground/70 leading-relaxed mb-3">
                {outcome.description}
              </p>
              <p
                className={`font-montserrat font-bold text-[clamp(1rem,2.6vw,1.125rem)] ${
                  outcome.value === "Priceless!" ? "text-accent" : "text-destructive"
                }`}
              >
                {outcome.value}
              </p>

            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 flex flex-col items-center"
        >
          {/* ✅ UPDATED: Replaced Button with SubscribeButton */}
          <SubscribeButton
            label="Join now for ₹99"
            price="₹99"
            ctaLocation="learning-outcomes-section"
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

export default LearningOutcomes;