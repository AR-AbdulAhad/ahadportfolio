import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import {
  fetchHero,
  fetchAbout,
  fetchSkills,
  fetchProjects,
  fetchExperience,
  fetchTestimonials,
  fetchSocials,
  MOCK_DATA,
} from './services/api';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { CaseStudyPage } from './components/Projects/CaseStudyPage';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [heroData, setHeroData] = useState(MOCK_DATA.hero);
  const [aboutData, setAboutData] = useState(MOCK_DATA.about);
  const [skillsData, setSkillsData] = useState(MOCK_DATA.skills);
  const [projectsData, setProjectsData] = useState(MOCK_DATA.projects);
  const [experienceData, setExperienceData] = useState(MOCK_DATA.experience);
  const [socialsData, setSocialsData] = useState(MOCK_DATA.socials);
  const [activeProject, setActiveProject] = useState(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Fetch dynamic content from backend API if available
  useEffect(() => {
    async function loadData() {
      try {
        const [hero, about, skills, projects, exp, testimonials, socials] = await Promise.all([
          fetchHero(),
          fetchAbout(),
          fetchSkills(),
          fetchProjects(),
          fetchExperience(),
          fetchTestimonials(),
          fetchSocials(),
        ]);

        if (hero) setHeroData(hero);
        if (about) setAboutData(about);
        if (skills && skills.length) setSkillsData(skills);
        if (projects && projects.length) setProjectsData(projects);
        if (exp && exp.length) setExperienceData(exp);
        if (socials && socials.length) setSocialsData(socials);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
      }
    }

    loadData();
  }, []);

  // If a case study page is active, display the full Case Study Page
  if (activeProject) {
    return <CaseStudyPage project={activeProject} onBack={() => setActiveProject(null)} />;
  }

  return (
    <div className="s-pagewrap" id="top">
      <div className="circles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Navbar heroData={heroData} />

      <main className="s-content">
        <HeroSection heroData={heroData} />

        <AboutSection
          aboutData={aboutData}
          resumeUrl={heroData?.resumeUrl}
          skillsData={skillsData}
          experienceData={experienceData}
        />

        <ProjectsSection projectsData={projectsData} onSelectProject={(project) => setActiveProject(project)} />

        <ContactSection socialsData={socialsData} />
      </main>

      <Footer name={heroData?.name} />
    </div>
  );
}
