import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import SubscribeButton from "@/components/SubscribeButton";

const workshopTopics = [
  { title: "Crypto Investing Essentials:", description: "Gain practical skills to start investing in crypto and begin your journey towards digital wealth." },
  { title: "Blockchain Fundamentals:", description: "Understand the six major domains of blockchain and create a personalized investment plan." },
  { title: "Wealth Creation Basics:", description: "Learn realistic strategies for leveraging blockchain technology to build wealth." },
  { title: "Profit from Blockchain Domains:", description: "Explore opportunities in Metaverse, NFTs, Crypto, DeFi, Play2Earn, and Raid2Earn for practical profit potential." },
  { title: "Crypto Wallet Mastery:", description: "Set up wallets, confidently buy and sell crypto, and learn how" },
  { title: "An opportunity to make your first million:", description: "You will get an opportunity to craft your personal financial action plan for the next 12 months and build your passively earned wealth with me!" },
];

const WorkshopContent = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,3rem)] text-foreground mb-3">
            Here’s what I’m going to teach you in this workshop
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full" />
        </motion.div>

        {/* Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
          {workshopTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-gradient-to-br from-success/5 to-muted/20 border border-success/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h3 className="font-montserrat font-bold text-[clamp(1rem,2.4vw,1.125rem)] text-foreground">
                    {topic.title}
                  </h3>
                  <p className="font-poppins text-foreground/70 leading-relaxed text-[clamp(0.9rem,2.2vw,1rem)]">
                    {topic.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <SubscribeButton
            label="Join now for"
            price="₹99"
            ctaLocation="workshop-content"
            href="#register"
            onClick={scrollToRegister}
            className="h-12 sm:h-14 px-8 sm:px-12 text-base sm:text-lg font-montserrat font-bold bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
          />

          {/* Bonus line outside the button (like Hero) */}
          <p className="font-poppins text-[13px] sm:text-sm font-bold text-accent">
            Claim FREE bonuses worth ₹29,997
          </p>

          <p className="font-poppins text-xs sm:text-sm text-foreground/70">
            Enrollment closes on <span className="text-accent font-semibold">today</span>
          </p>
        </motion.div>

        {/* Stylish section separator */}
        <div className="mt-10 sm:mt-12 md:mt-16">
          <div className="relative h-10">
            {/* subtle glow blur */}
            <div className="absolute inset-x-10 sm:inset-x-20 mx-auto -top-2 h-8 blur-2xl bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 rounded-full pointer-events-none" />
            {/* main line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
              <div className="mx-auto w-3/4 sm:w-2/3 md:w-1/2 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            </div>
            {/* small accent dot */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-accent to-secondary shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopContent;
