import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Loader2 } from "lucide-react";
import { trackPurchase } from "@/utils/gtm";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { 
  DISCOUNTED_PRICE, 
  ORDER, 
  PRODUCT,
  WEBINAR_NAME 
} from "@/utils/product-info";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNbThNq5PaLsO8hgj4EIb5CTjMp8-kOOI9jpi18eTL-p9v5vh-QeOSOeqaozauJOAy2fs5mOQIhk4G/pub?output=csv";

const ThankYou = () => {
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  /* 🔥 FACEBOOK PIXEL TRACKING (Optional/Commented) */
  /*
  useFacebookPixel({
    eventName: "Purchase",
    eventParams: {
      value: DISCOUNTED_PRICE,
      currency: "INR",
      content_name: WEBINAR_NAME,
      content_type: "product",
    },
    pixelId: "1953633955426093",
  });
  */

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

  /* ✅ FETCH WHATSAPP LINK FROM GOOGLE SHEET */
  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split('\n');
        if (rows.length > 1) {
          const values = rows[1].split(',');
          // Column index 2 is the whatsapp_link
          const link = values[2] ? values[2].trim().replace(/^"|"$/g, '') : '';
          setWhatsappLink(link);
        }
      })
      .catch((err) => {
        console.error('CSV fetch error:', err);
        // Fallback link if CSV fails
        setWhatsappLink("https://wa.me/your_fallback_link");
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

        {/* WhatsApp CTA with Loading State */}
        {whatsappLink ? (
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-montserrat font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center sm:w-auto"
          >
            <MessageCircle className="w-6 h-6" />
            Join WhatsApp Group Now
          </motion.a>
        ) : (
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/50 font-montserrat font-bold px-8 py-4 rounded-full w-full justify-center sm:w-auto cursor-not-allowed">
            <Loader2 className="w-5 h-5 animate-spin" />
            Fetching Group Link...
          </div>
        )}

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