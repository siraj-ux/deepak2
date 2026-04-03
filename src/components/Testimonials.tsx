import { motion } from "framer-motion";
import { Star } from "lucide-react";
// 1. Import the SubscribeButton
import SubscribeButton from "@/components/SubscribeButton";
import React from "react";

const testimonials = [
  { name: "Mohamed Ali", reviews: "1 review", country: "IN", rating: 5, date: "Apr 15, 2024", text: "Made blockchain simple to understand" },
  { name: "Omkar Shivde", reviews: "5 reviews", country: "IN", rating: 5, date: "Apr 15, 2024",  text: "“Helped me see real-world applications." },
  { name: "Himesh Singh", reviews: "1 review", country: "IN", rating: 5, date: "Apr 15, 2024",  text: "Become rich at very young age. It is commendable." },
  { name: "boby raj", reviews: "1 review", country: "IN", rating: 4, date: "Apr 15, 2024",  text: "It seems a journey. Your guidence is great. You make the journey very enjoyable and easy" },
  { name: "Vinay B A", reviews: "1 review", country: "IN", rating: 5, date: "Apr 15, 2024",  text: "Excellent intro without hype." },
  { name: "vinay", reviews: "1 review", country: "NL", rating: 4, date: "Mar 10, 2024", text: "Mr Deepak is having good knowledge about crypto and conducts webinar so that all the attendees will get the knowledge of crypto metaverse NFT etc" },
];

const Card: React.FC<{ t: (typeof testimonials)[number] }> = ({ t }) => (
  <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
          {t.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-poppins font-semibold text-foreground">{t.name}</h4>
          <p className="text-xs font-poppins text-foreground/60">
            {t.reviews} · {t.country}
          </p>
        </div>
      </div>
      <span className="text-xs font-poppins text-foreground/60">{t.date}</span>
    </div>

    <div className="flex gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < t.rating ? "fill-success text-success" : "fill-muted text-muted"}`}
        />
      ))}
    </div>

    <p className="font-poppins text-sm text-foreground/70 leading-relaxed">{t.text}</p>

    <p className="text-xs font-poppins text-foreground/50 mt-4">Date of experience: {t.date}</p>
  </div>
);

const Testimonials = () => {
  const scrollToRegister = () => {
    const el = document.getElementById("register");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#register";
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <style>{`
        /* Hide scrollbar cross-browser */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="font-montserrat font-bold text-[clamp(1.5rem,4vw,3rem)] text-foreground leading-tight">
            Listen from the participants who transformed
          </h2>
          <p className="font-montserrat font-bold text-[clamp(1.1rem,3vw,1.75rem)] text-foreground mt-1">
            their careers with Deepak
          </p>
          <p className="font-poppins text-foreground/60 mt-2">And, these are just some of many!</p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Mobile: horizontal scroll + snap */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 py-1"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ y: 16, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="min-w-[85%] snap-start"
              >
                <Card t={t} />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-3 flex justify-center">
            <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-foreground/10 via-foreground/30 to-foreground/10" />
          </div>
        </div>

        {/* Desktop/Tablet: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Card t={t} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 mt-10 sm:mt-12 flex flex-col items-center"
        >
          {/* ✅ UPDATED: Replaced Button with SubscribeButton */}
          <SubscribeButton
            label="Join now for ₹99"
            price="₹99"
            ctaLocation="testimonials-section"
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
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;