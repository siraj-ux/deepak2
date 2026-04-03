import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
// 1. Import the SubscribeButton
import SubscribeButton from "@/components/SubscribeButton";

const benefits = [
  "Experience Financial Security and Freedom by Leveraging the Power of Blockchain Technology",
  "Develop the Confidence and Knowledge to Navigate the Crypto Market with Ease",
  "Gain Access to a Supportive Community of Like-Minded Investors and Experts",
  "Learn Effective Techniques for Diversifying Your Investment Portfolio and Managing Risk",
  "And Most Important! You Will Have the Tools and Roadmap to Generate Substantial Profits and Build Long-Term Wealth in the Crypto Space",
];

const LifeChanges = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-success/5 via-khaki/5 to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,3rem)] text-foreground mb-3">
            What Will Change in Your Life?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-success to-khaki mx-auto rounded-full" />
        </motion.div>

        {/* Benefits grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {benefits.slice(0, 4).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-gradient-to-br from-success/10 to-khaki/10 border border-success/20 rounded-xl p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex gap-2.5 sm:gap-3">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0 mt-0.5" />
                <p className="font-poppins text-foreground/80 leading-relaxed text-[clamp(0.85rem,2.4vw,1rem)]">
                  {benefit}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Highlight card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="col-span-2"
          >
            <div className="bg-gradient-to-br from-accent/10 to-secondary/10 border-2 border-accent/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-success flex-shrink-0 mt-0.5" />
                <p className="font-poppins text-foreground font-medium leading-relaxed text-[clamp(0.95rem,2.5vw,1.125rem)]">
                  {benefits[4]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 flex flex-col items-center"
        >
          {/* ✅ UPDATED: Replaced Button with SubscribeButton */}
          <SubscribeButton
            label="Join now for ₹99"
            price="₹99"
            ctaLocation="life-changes-section"
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

export default LifeChanges;