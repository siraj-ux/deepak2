import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRazorpay } from "@/hooks/useRazorpay";

// GTM & Product Imports
import { 
  trackAddToCart, 
  trackFormError, 
  trackFormSubmit, 
  trackPurchase 
} from "@/utils/gtm";
import { 
  DISCOUNTED_PRICE, 
  ORDER, 
  GA_PRODUCT as PRODUCT, 
  RAZORPAY_DESCRIPTION, 
  RAZORPAY_PRODUCT_NAME, 
  WEBINAR_NAME 
} from "@/utils/product-info";

/** ✅ Webhook (Deepak) */
const WEBHOOK_URL = "https://offbeatn8n.coachswastik.com/webhook/deepak-form";
const UTM_KEY = "lead_utms";

/** ✅ capture & persist UTMs */
function getUTMs() {
  const empty = { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", fclid: "" };
  if (typeof window === "undefined") return empty;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fclid: params.get("fclid") || "",
  };
  const saved = localStorage.getItem(UTM_KEY);
  if (!saved && Object.values(fromUrl).some(v => !!v)) {
    localStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
  }
  try {
    const stored = saved ? JSON.parse(saved) : {};
    return {
      utm_source: fromUrl.utm_source || stored.utm_source || "",
      utm_medium: fromUrl.utm_medium || stored.utm_medium || "",
      utm_campaign: fromUrl.utm_campaign || stored.utm_campaign || "",
      utm_content: fromUrl.utm_content || stored.utm_content || "",
      utm_term: fromUrl.utm_term || stored.utm_term || "",
      fclid: fromUrl.fclid || stored.fclid || "",
    };
  } catch { return fromUrl; }
}

const RegistrationForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", profession: "" });
  
  // 1. Initialize Razorpay Hook
  const { initiatePayment } = useRazorpay();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const utms = getUTMs();
    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // 2. GTM Tracking: Form Submit & Add To Cart
    trackFormSubmit({ formName: "Registration Form", formData: form });
    trackAddToCart(PRODUCT, "RegistrationForm");

    // // Facebook Pixel Tracking
    // if (window.fbq) {
    //   window.fbq('init', '1953633955426093', {
    //     em: form.email.toLowerCase().trim(),
    //     ph: form.phone.replace(/\D/g, ""), 
    //     fn: firstName.toLowerCase().trim(),
    //     ln: lastName.toLowerCase().trim() 
    //   });
    //   window.fbq("track", "AddToCart", { value: 99, currency: "INR" });
    // }

    // 3. Webhook Lead Capture
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form, ...utms,
          page_url: window.location.href,
          ts: new Date().toISOString(),
        }),
        keepalive: true,
      });
    } catch (err) {
      console.error("Webhook failed", err);
    }

    // 4. Initiate Local Razorpay Checkout
    try {
      const result = await initiatePayment({
        amount: DISCOUNTED_PRICE,
        productName: RAZORPAY_PRODUCT_NAME,
        description: RAZORPAY_DESCRIPTION,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: `+91${form.phone.replace(/\D/g, '')}`,
        },
        notes: {
          ...form,
          ...utms,
          webinar_name: WEBINAR_NAME,
          page_url: window.location.href
        }
      });

      // 5. Handle Payment Success
      if (result.status === "success") {
        // GTM: Track Purchase
        trackPurchase({
          ...ORDER,
          transaction_id: result.paymentId || 'raz_reg_' + Date.now()
        });

        toast.success("Payment Successful!");

        // Redirect to thank you page
        const redirectParams = new URLSearchParams({
          razorpay_payment_id: result.paymentId || "",
          razorpay_order_id: result.orderId || "",
          ...utms
        });

        setTimeout(() => {
          window.location.href = `/ty-digital-wealth-ga?${redirectParams.toString()}`;
        }, 800);

      } else if (result.error && result.error !== "Payment cancelled by user") {
        toast.error(result.error);
        setSubmitting(false);
      } else {
        // Handle cancellation
        setSubmitting(false);
      }

    } catch (error: any) {
      trackFormError({
        formName: "RegistrationForm",
        errorMessage: error?.message || 'Unknown error during checkout'
      });
      toast.error("Checkout failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div id="register" className="mt-4 rounded-2xl bg-secondary/5 border border-border p-4 sm:p-5">
      <h3 className="text-center text-base sm:text-lg font-semibold text-foreground mb-4">
        Fill the details below to sign up
      </h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <input 
          required 
          placeholder="Full Name" 
          className="w-full h-11 rounded-xl border border-border px-4 bg-background" 
          value={form.name} 
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} 
        />
        <input 
          required 
          type="email" 
          placeholder="Email Address" 
          className="w-full h-11 rounded-xl border border-border px-4 bg-background" 
          value={form.email} 
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} 
        />
        <input 
          required 
          inputMode="numeric" 
          placeholder="Phone Number" 
          className="w-full h-11 rounded-xl border border-border px-4 bg-background" 
          value={form.phone} 
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} 
        />
        <select 
          required 
          className="w-full h-11 rounded-xl border border-border px-4 bg-background" 
          value={form.profession} 
          onChange={(e) => setForm((p) => ({ ...p, profession: e.target.value }))}
        >
          <option value="" disabled>Select Profession</option>
          <option>Working Professional</option>
          <option>Business Owner / Entrepreneur</option>
          <option>Student</option>
          <option>Freelancer</option>
          <option>Other</option>
        </select>
        
        <Button 
          type="submit" 
          disabled={submitting} 
          className="w-full h-11 sm:h-12 rounded-xl font-montserrat font-bold bg-[#6EC1E4] hover:bg-[#63b3d4] text-white shadow-[0_12px_32px_rgba(0,0,0,0.18)] disabled:opacity-60"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} />
              PROCESSING...
            </span>
          ) : "Proceed to Pay ₹99"}
        </Button>
      </form>
      <p className="mt-3 text-center text-xs text-foreground/60">Secure checkout powered by Razorpay</p>
    </div>
  );
};

export default RegistrationForm;