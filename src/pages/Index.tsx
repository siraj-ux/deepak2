import { Suspense, lazy, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import { useFacebookPixel } from "@/hooks/useFacebookPixelHome";

// ---- Lazy-loaded sections (below the fold) ----
const AboutInstructor = lazy(() => import("@/components/AboutInstructor"));
const WorkshopContent = lazy(() => import("@/components/WorkshopContent"));
const LifeChanges = lazy(() => import("@/components/LifeChanges"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const TargetAudience = lazy(() => import("@/components/TargetAudience"));
const ValueProposition = lazy(() => import("@/components/ValueProposition"));
const DontJoinIf = lazy(() => import("@/components/DontJoinIf"));
const LearningOutcomes = lazy(() => import("@/components/LearningOutcomes"));
const MeetCoach = lazy(() => import("@/components/MeetCoach"));
const StickyEnrollBar = lazy(() => import("@/components/StickyEnrollBar"));

const FAQSection = lazy(() =>
  import("@/components/Faq").then((m) => ({ default: m.FAQSection }))
);
const SiteFooter = lazy(() =>
  import("@/components/Faq").then((m) => ({ default: m.SiteFooter }))
);

const Index = () => {
  useFacebookPixel();

  // Show below-the-fold content only after idle / small delay
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const enableBelowFold = () => setShowBelowFold(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(enableBelowFold);
    } else if (typeof window !== "undefined") {
      timeoutId = setTimeout(enableBelowFold, 800);
    } else {
      // SSR / non-window
      setShowBelowFold(true);
    }

    return () => {
      if (
        typeof window !== "undefined" &&
        idleId !== null &&
        "cancelIdleCallback" in window
      ) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <main className="font-poppins">
      {/* Above-the-fold: load immediately */}
      <Hero />

      {/* Below-the-fold: lazily loaded when idle */}
      {showBelowFold && (
        <Suspense
          fallback={<div className="min-h-[200px]" aria-hidden="true" />}
        >
          <AboutInstructor />
          <WorkshopContent />
          <LifeChanges />
          <Testimonials />
          <TargetAudience />
          <ValueProposition />
          <DontJoinIf />
          <LearningOutcomes />
          <MeetCoach />

          <FAQSection />
          <SiteFooter />

          {/* <StickyEnrollBar /> */}
        </Suspense>
      )}
    </main>
  );
};

export default Index;
