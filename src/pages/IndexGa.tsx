// src/pages/IndexGa.tsx
import { Suspense, lazy } from "react";

import Hero from "@/components/google/Hero"; // above-the-fold
import StickyEnrollBar from "@/components/google/StickyEnrollBar"; // important CTA

// ---- Lazy-loaded sections (split into separate chunks) ----
const AboutInstructor = lazy(() => import("@/components/google/AboutInstructor"));
const WorkshopContent = lazy(() => import("@/components/google/WorkshopContent"));
const LifeChanges = lazy(() => import("@/components/google/LifeChanges"));
const Testimonials = lazy(() => import("@/components/google/Testimonials"));
const TargetAudience = lazy(() => import("@/components/google/TargetAudience"));
const ValueProposition = lazy(() => import("@/components/google/ValueProposition"));
const DontJoinIf = lazy(() => import("@/components/google/DontJoinIf"));
const LearningOutcomes = lazy(() => import("@/components/google/LearningOutcomes"));
const MeetCoach = lazy(() => import("@/components/google/MeetCoach"));
const FAQSection = lazy(() =>
  import("@/components/google/Faq").then((m) => ({ default: m.FAQSection }))
);
const SiteFooter = lazy(() =>
  import("@/components/google/Faq").then((m) => ({ default: m.SiteFooter }))
);

export default function IndexGa() {
  return (
    <main className="font-poppins">
      {/* Above-the-fold: load immediately */}
      <Hero />

      {/* Below-the-fold sections: lazy + lightweight fallbacks */}
      <Suspense fallback={<div className="min-h-[160px]" />}>
        <AboutInstructor />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <WorkshopContent />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <LifeChanges />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <TargetAudience />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <ValueProposition />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <DontJoinIf />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <LearningOutcomes />
      </Suspense>

      <Suspense fallback={<div className="min-h-[160px]" />}>
        <MeetCoach />
      </Suspense>

      {/* FAQ + Footer in one lazy chunk */}
      <Suspense fallback={<div className="min-h-[160px]" />}>
        <FAQSection />
        <SiteFooter />
      </Suspense>

      {/* Sticky CTA: keep eager so user always sees it quickly */}
      {/* <StickyEnrollBar /> */}
    </main>
  );
}
