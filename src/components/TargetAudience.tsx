import { motion, useReducedMotion } from "framer-motion";
import { Users, Briefcase, GraduationCap, User } from "lucide-react";
// 1. Import the SubscribeButton
import SubscribeButton from "@/components/SubscribeButton";

const audiences = [
  { icon: Users,        title: "Working professionals",  },
  { icon: Briefcase,    title: "Business owners",       },
  { icon: GraduationCap,title: "College graduates",      },
  { icon: User,         title: "Anyone",                description: "who is curious about blockchain technology" },
];

const TargetAudience = () => {

  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? {} : { opacity: 0, y: 24 };
  const animate  = prefersReducedMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={initial}
          whileInView={animate}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,3rem)] text-foreground mb-2 leading-tight">
            Who this 2-Day program helps the most
          </h2>
          <p className="font-poppins text-[clamp(0.95rem,2.5vw,1.125rem)] text-foreground/70">
            2-Day LIVE Online Digital Wealth Domination Workshop
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-12">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-2.5 sm:p-3 rounded-xl flex-shrink-0">
                  <audience.icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-montserrat font-bold text-[clamp(1rem,2.4vw,1.125rem)] text-accent">
                    {audience.title}
                  </h3>
                  <p className="font-poppins text-foreground/70 leading-relaxed text-[clamp(0.9rem,2.2vw,1rem)]">
                    {audience.description}
                  </p>
                </div>
              </div>
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
            ctaLocation="target-audience-section"
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

export default TargetAudience;