import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import CallModal from "@/components/layout/CallModal";
import PopupModal from "@/components/layout/PopupModal";

import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Departments from "@/components/sections/Departments";
import DialysisCenter from "@/components/sections/DialysisCenter";
import ConditionTabs from "@/components/sections/ConditionTabs";
import Team from "@/components/sections/Team";
import WhyDialysis from "@/components/sections/WhyDialysis";
import Equipment from "@/components/sections/Equipment";
import TourGallery from "@/components/sections/TourGallery";
import Visit from "@/components/sections/Visit";

import { NEPHROLOGY, INTERNAL } from "@/data/content";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Departments />
        <DialysisCenter />
        <ConditionTabs
          id="nephrology"
          eyebrow="Nephrology Clinic"
          titleLines={["혈뇨·단백뇨·부종까지", ""]}
          brand="신장클리닉"
          conditions={NEPHROLOGY}
        />
        <ConditionTabs
          id="internal"
          eyebrow="Internal Medicine Clinic"
          titleLines={["만성질환부터 일반내과까지", ""]}
          brand="내과클리닉"
          conditions={INTERNAL}
        />
        <Team />
        <WhyDialysis />
        <Equipment />
        <TourGallery />
        <Visit />
      </main>
      <Footer />
      <FloatingButtons />
      <CallModal />
      <PopupModal />
    </>
  );
}
