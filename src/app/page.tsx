"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import BootScreen from "@/components/BootScreen";

// Dynamically import heavy components below the fold
const BackgroundCanvas = dynamic(
  () => import("@/components/BackgroundCanvas"),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/CustomCursor"),
  { ssr: false }
);
const Navigation = dynamic(
  () => import("@/components/Navigation"),
  { ssr: false }
);
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
});
const Experience = dynamic(() => import("@/components/Experience"), {
  ssr: false,
});
const SkillsConstellation = dynamic(
  () => import("@/components/SkillsConstellation"),
  { ssr: false }
);
const Achievements = dynamic(() => import("@/components/Achievements"), {
  ssr: false,
});
const Suggestions = dynamic(() => import("@/components/Suggestions"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete && (
        <BootScreen onComplete={() => setBootComplete(true)} />
      )}

      <div
        className={`transition-opacity duration-700 ${
          bootComplete ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <BackgroundCanvas />
        <CustomCursor />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <SkillsConstellation />
          <Achievements />
          <Suggestions />
          <Contact />
        </main>
      </div>
    </>
  );
}
