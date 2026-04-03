import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare } from "lucide-react";
// 1. Import tracking utilities
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import { trackPurchase } from "@/utils/gtm";
import { GA_ORDER} from "@/utils/product-info";

const WA_GROUP_LINK = "http://join.digitalwealthdomination.in/dwd-whatsapp";

/* -------------------- Component -------------------- */
export default function ThankYouGa() {
  
  // // 2. ✅ FACEBOOK PIXEL PURCHASE TRACKING
  // useFacebookPixel({
  //   eventName: "Purchase",
  //   eventParams: {
  //     value: 99,
  //     currency: "INR",
  //     content_name: "Workshop Registration GA",
  //     content_type: "product",
  //   },
  //   pixelId: "1953633955426093",
  // });

  // 3. ✅ GTM PURCHASE TRACKING (With Refresh Protection)
  useEffect(() => {
    // Get payment ID from URL
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id") || params.get("razorpay_payment_id");

    if (paymentId) {
      // Prevent duplicate tracking on page refresh
      const alreadyTracked = localStorage.getItem(`tracked_ga_${paymentId}`);
      if (alreadyTracked) return;
      
      localStorage.setItem(`tracked_ga_${paymentId}`, "true");
    }

    // Fire GTM Purchase Event
    trackPurchase({
      ...GA_ORDER,
      transaction_id: paymentId || `txn_ga_${Date.now()}`,
    });
  }, []);

  /* -------------------- UI -------------------- */
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(circle at top, #0B3E77, #021E3D)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center bg-[#ffffff08] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md"
      >
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#ffffff14]">
            <CheckCircle2 className="h-10 w-10 text-[#F3D35B]" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-[#EEEAD3]">
          Thank You For Registering! 🎉
        </h1>

        <p className="text-base leading-relaxed mb-6 text-[#EEEAD3] opacity-90">
          <span className="text-[#F5543A] font-semibold">
            Wait, your registration is incomplete...
          </span>{" "}
          Join the WhatsApp group below to receive updates, reminders, and
          access details for the{" "}
          <span className="text-[#F3D35B] font-semibold">
            Digital Wealth Domination Workshop
          </span>
          .
        </p>

        <motion.a
          href={WA_GROUP_LINK}
          target="_self"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 text-lg font-semibold rounded-full px-8 py-4 w-full sm:w-auto"
          style={{
            background:
              "linear-gradient(90deg, #F3D35B, #EA924D)",
            color: "#111",
            boxShadow: "0 4px 15px rgba(243, 211, 91, 0.3)",
          }}
        >
          <MessageSquare className="h-5 w-5" />
          Join WhatsApp Group Now
        </motion.a>

        <p className="text-[#EEEAD3]/40 text-xs mt-6 font-poppins">
          ⏰ Important: Join immediately to avoid missing session links.
        </p>
      </motion.div>
    </section>
  );
}