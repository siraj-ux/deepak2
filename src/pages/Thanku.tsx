import { useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { trackPurchase } from "@/utils/gtm";
import { 
  ORDER, 
  WEBINAR_NAME 
} from "@/utils/product-info";

// Static WhatsApp Link
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/IRTf9ewumo67hbkhYIMHXF";

const ThankYou = () => {
  /* ✅ GTM PURCHASE TRACKING (With Refresh Protection) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id") || params.get("razorpay_payment_id");

    if (paymentId) {
      const alreadyTracked = localStorage.getItem(`tracked_${paymentId}`);
      if (alreadyTracked) return;
      
      localStorage.setItem(`tracked_${paymentId}`, "true");
    }

    trackPurchase({
      ...ORDER,
      transaction_id: paymentId || `txn_${Date.now()}`,
    });
  }, []);

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
          Registration Confirmed! 🎉
        </h1>

        <p className="font-poppins text-base sm:text-lg text-white/90 leading-relaxed mb-6">
          <span className="text-red-400 font-semibold">
            Action Required:
          </span>{" "}
          Join the official WhatsApp group to receive session links and important updates for the{" "}
          <span className="text-accent font-semibold">
            {WEBINAR_NAME}
          </span>.
        </p>

        {/* WhatsApp CTA */}
        <motion.a
          href={WHATSAPP_GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-montserrat font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center sm:w-auto"
        >
          <MessageCircle className="w-6 h-6" />
          Join WhatsApp Group Now
        </motion.a>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            ⚠️ <strong>IMPORTANT:</strong><br />
            Live session links aur bonuses sirf group par share kiye jayenge. Group miss na karein.
          </p>
        </div>

        <p className="text-white/50 text-xs mt-6 font-poppins">
          ⏰ Important: Join immediately to avoid missing session links.
        </p>
      </motion.div>
    </section>
  );
};

export default ThankYou;