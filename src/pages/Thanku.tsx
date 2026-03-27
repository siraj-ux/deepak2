import { motion } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

const WA_GROUP_LINK = "http://join.digitalwealthdomination.in/dwd-whatsapp";

const ThankYou = () => {
  const fired = useRef(false);

  // ✅ PageView (both pixels)
  useFacebookPixel();

  // ✅ Purchase (ONLY one pixel)
  useFacebookPixel({
    eventName: "Purchase",
    eventParams: {
      value: 99,
      currency: "INR",
      content_name: "Workshop Registration",
      content_type: "product",
    },
    pixelId: "1953633955426093",
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-noir via-primary/80 to-noir px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-10 text-center max-w-xl w-full shadow-2xl"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 border border-accent/30">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
        </motion.div>

        <h1 className="font-montserrat font-bold text-3xl sm:text-4xl text-white mb-3">
          Thank You For Registering!
        </h1>

        <p className="font-poppins text-base sm:text-lg text-white/90 leading-relaxed mb-6">
          <span className="text-red-400 font-semibold">
            Wait, your registration is incomplete...
          </span>{" "}
          Join the WhatsApp group below to receive updates, reminders, and
          access details for the{" "}
          <span className="text-accent font-semibold">
            Digital Wealth Domination Workshop
          </span>
          .
        </p>

        <motion.a
          href={WA_GROUP_LINK}
          target="_self"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-white font-montserrat font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5" />
          Join WhatsApp Group
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ThankYou;