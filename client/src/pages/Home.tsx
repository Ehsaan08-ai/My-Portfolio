import { Navigation } from '@/components/Navigation';
import { HeroScrollExperience } from '@/components/HeroScrollExperience';
import { Projects } from '@/components/Projects';
import { Timeline } from '@/components/Timeline';
import { TechStack } from '@/components/TechStack';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { SocialSidebar } from '@/components/SocialSidebar';
import { ResumeButton } from '@/components/ResumeButton';

/**
 * Home Page
 *
 * The HeroScrollExperience is one unified scroll container (300vh tall)
 * where the 3D robot stays sticky/visible while Hero, About, and WhatIDo
 * text content fades in and out as user scrolls.
 *
 * After that, normal sections: Timeline → Projects → TechStack → Contact → Footer
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed UI elements */}
      <SocialSidebar />
      <ResumeButton />
      <Navigation />

      <main>
        {/* Unified scroll experience: Hero + About + What I Do with persistent robot */}
        <HeroScrollExperience />

        {/* Regular sections below */}
        <Timeline />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
